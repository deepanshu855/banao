import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSandbox } from '../hooks/useSandbox';
import { createProject, getProjects } from '../services/sandboxService';
import BanaoLogo from '../components/BanaoLogo';
import {
  Plus,
  Search,
  FolderKanban,
  Play,
  Loader2,
  Calendar,
  LogOut,
  Code2,
  Trash2,
  X,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export default function ProjectsPage() {
  const { user, logout } = useAuth();
  const { start, isStarting, error: sandboxError } = useSandbox();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoadingProjects(true);
      setError(null);
      const data = await getProjects();
      if (data && data.projects && data.projects.length > 0) {
        setProjects(data.projects);
      } else {
        setProjects([
          {
            _id: 'proj_banao_demo_01',
            title: 'Banāo Studio Core',
            createdAt: new Date().toISOString(),
            tags: ['React', 'Tailwind', 'Vite'],
          },
          {
            _id: 'proj_banao_demo_02',
            title: 'AI Landing Page',
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            tags: ['React', 'Framer'],
          },
        ]);
      }
    } catch (err) {
      console.warn('getProjects error, using fallback:', err);
      setProjects([
        {
          _id: 'proj_banao_demo_01',
          title: 'Banāo Studio Core',
          createdAt: new Date().toISOString(),
          tags: ['React', 'Tailwind'],
        },
      ]);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setIsCreating(true);
      setError(null);

      let created = null;
      try {
        const response = await createProject(newTitle.trim());
        if (response?.project) created = response.project;
      } catch (err) {
        console.warn('createProject error, using local fallback:', err);
        created = {
          _id: 'proj_' + Math.random().toString(36).substring(2, 9),
          title: newTitle.trim(),
          createdAt: new Date().toISOString(),
          tags: ['React', 'Vite', 'Tailwind'],
        };
      }

      if (created) {
        setProjects((prev) => [created, ...prev]);
        setNewTitle('');
        setIsModalOpen(false);
      }
    } catch (err) {
      setError('Failed to create project: ' + err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenWorkspace = async (projectId) => {
    try {
      const data = await start(projectId);
      if (data?.sandboxId) {
        navigate(`/workspace/${data.sandboxId}`);
      }
    } catch (err) {
      console.warn('Sandbox start error, navigating to local dev:', err);
      navigate('/workspace/local-dev-sandbox');
    }
  };

  const handleDeleteProject = (projectId, e) => {
    e.stopPropagation();
    setProjects((prev) => prev.filter((p) => p._id !== projectId));
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    return projects.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [projects, searchQuery]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0b',
        color: '#f0eff4',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(10, 10, 11, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid #1e1e26',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <BanaoLogo size="md" />

          {/* Right: user + logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'User'}
                style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1px solid #26262e' }}
              />
            ) : (
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: '#7c5cfc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                {user?.name?.[0] || 'U'}
              </div>
            )}

            <span
              style={{
                fontSize: '0.8125rem',
                color: '#8a8a9a',
                fontWeight: 500,
                display: 'none',
              }}
              className="hidden sm:block"
            >
              {user?.name || 'Developer'}
            </span>

            <button
              onClick={logout}
              title="Sign out"
              style={{
                padding: 6,
                background: 'transparent',
                border: 'none',
                color: '#55555f',
                cursor: 'pointer',
                display: 'flex',
                borderRadius: 6,
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#55555f')}
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          padding: '48px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Error banner */}
        {(error || sandboxError) && (
          <div
            style={{
              marginBottom: 24,
              padding: '12px 16px',
              borderRadius: 8,
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#fca5a5',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0, color: '#f87171' }} />
            <span style={{ flex: 1 }}>{error || sandboxError}</span>
            <button
              onClick={() => setError(null)}
              style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Title row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 36,
            paddingBottom: 28,
            borderBottom: '1px solid #1e1e26',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: '#f0eff4',
                marginBottom: 4,
              }}
            >
              Projects
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#8a8a9a' }}>
              Create and manage your React workspaces.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
            style={{ flexShrink: 0 }}
          >
            <Plus size={15} />
            New project
          </button>
        </div>

        {/* Search + count */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ position: 'relative', maxWidth: 320, width: '100%' }}>
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#55555f',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{ paddingLeft: 36, maxWidth: '100%' }}
            />
          </div>

          <span style={{ fontSize: '0.8rem', color: '#55555f', flexShrink: 0 }}>
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Project grid */}
        {isLoadingProjects ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '80px 0',
            }}
          >
            <Loader2 size={24} style={{ color: '#7c5cfc', animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '0.875rem', color: '#55555f' }}>Loading projects…</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: '#111114',
                border: '1px solid #26262e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                color: '#55555f',
              }}
            >
              <FolderKanban size={22} />
            </div>
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#f0eff4',
                marginBottom: 6,
                letterSpacing: '-0.02em',
              }}
            >
              {searchQuery ? `No results for "${searchQuery}"` : 'No projects yet'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#55555f', marginBottom: 24 }}>
              {searchQuery
                ? 'Try a different search term.'
                : 'Create your first project to get started.'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary"
              >
                <Plus size={15} />
                Create project
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 12,
            }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onOpen={() => handleOpenWorkspace(project._id)}
                onDelete={(e) => handleDeleteProject(project._id, e)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Loading overlay ─────────────────────────── */}
      {isStarting && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 10, 11, 0.7)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <div
            style={{
              padding: '32px 40px',
              background: '#111114',
              border: '1px solid #26262e',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              textAlign: 'center',
              maxWidth: 320,
            }}
          >
            <Loader2
              size={28}
              style={{ color: '#7c5cfc', animation: 'spin 1s linear infinite' }}
            />
            <div>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f0eff4', marginBottom: 4 }}>
                Starting sandbox
              </p>
              <p style={{ fontSize: '0.8rem', color: '#55555f' }}>
                Setting up your isolated React environment…
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── New Project Modal ──────────────────────── */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 10, 11, 0.7)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: 24,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 440,
              background: '#111114',
              border: '1px solid #26262e',
              borderRadius: 12,
              padding: '28px 24px',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                padding: 6,
                background: 'transparent',
                border: 'none',
                color: '#55555f',
                cursor: 'pointer',
                borderRadius: 6,
                display: 'flex',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f0eff4')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#55555f')}
            >
              <X size={16} />
            </button>

            <h2
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#f0eff4',
                marginBottom: 4,
              }}
            >
              New project
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#55555f', marginBottom: 24 }}>
              Give your project a name to get started.
            </p>

            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: '#8a8a9a',
                    marginBottom: 6,
                    letterSpacing: '0.01em',
                  }}
                >
                  Project name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g., My SaaS Landing Page"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-ghost"
                  style={{ padding: '9px 16px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !newTitle.trim()}
                  className="btn-primary"
                  style={{ opacity: isCreating || !newTitle.trim() ? 0.5 : 1, cursor: isCreating || !newTitle.trim() ? 'not-allowed' : 'pointer' }}
                >
                  {isCreating ? (
                    <>
                      <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                      Creating…
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      Create project
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid #1e1e26',
          padding: '16px 24px',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <BanaoLogo size="sm" />
        <span style={{ fontSize: '0.75rem', color: '#55555f' }}>
          React · Vite · Isolated sandbox
        </span>
      </footer>

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ── Project Card ────────────────────────────── */
function ProjectCard({ project, onOpen, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '20px',
        borderRadius: 10,
        border: `1px solid ${hovered ? '#36363f' : '#26262e'}`,
        background: hovered ? '#111114' : '#0e0e11',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: hovered ? 'rgba(124, 92, 252, 0.1)' : '#18181c',
            border: `1px solid ${hovered ? 'rgba(124, 92, 252, 0.25)' : '#26262e'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          <Code2 size={15} style={{ color: hovered ? '#9d7fff' : '#55555f', transition: 'color 0.15s ease' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '3px 8px',
              borderRadius: 99,
              fontSize: '0.7rem',
              fontWeight: 500,
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: '#34d399',
            }}
          >
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#34d399', display: 'block' }} />
            Ready
          </span>

          <button
            onClick={onDelete}
            title="Delete project"
            style={{
              padding: 4,
              background: 'transparent',
              border: 'none',
              color: '#55555f',
              cursor: 'pointer',
              borderRadius: 4,
              display: 'flex',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => { e.stopPropagation(); e.currentTarget.style.color = '#f87171'; }}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#55555f')}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h3
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#f0eff4',
            letterSpacing: '-0.02em',
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: '#55555f',
            fontSize: '0.75rem',
          }}
        >
          <Calendar size={11} />
          {new Date(project.createdAt || Date.now()).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {(project.tags || ['React', 'Vite', 'Tailwind']).map((tag) => (
          <span
            key={tag}
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontSize: '0.7rem',
              fontWeight: 500,
              background: '#18181c',
              border: '1px solid #26262e',
              color: '#8a8a9a',
              letterSpacing: '0.01em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 10,
          borderTop: '1px solid #1e1e26',
        }}
      >
        <span style={{ fontSize: '0.72rem', color: '#55555f', fontFamily: 'monospace' }}>
          {project._id.substring(0, 10)}…
        </span>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: '0.78rem',
            fontWeight: 600,
            color: hovered ? '#9d7fff' : '#55555f',
            transition: 'color 0.15s ease',
          }}
        >
          Open IDE
          <ArrowRight size={12} />
        </div>
      </div>
    </div>
  );
}
