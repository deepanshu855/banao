import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSandbox } from '../hooks/useSandbox';
import { createProject, getProjects } from '../services/sandboxService';
import { Loader2, Sparkles, Plus } from 'lucide-react';
import { cn } from '../utils/cn';

export default function HomePage() {
  const { start, isStarting, error: sandboxError } = useSandbox();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const data = await getProjects();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load projects. Make sure you are logged in.');
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    try {
      const data = await createProject(newProjectTitle.trim());
      setProjects([data.project, ...projects]);
      setNewProjectTitle('');
    } catch (err) {
      console.error(err);
      setError('Failed to create project.');
    }
  };

  const handleStartProject = async (projectId) => {
    try {
      const { sandboxId } = await start(projectId);
      navigate(`/workspace/${sandboxId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-dim p-4">
      <div className="w-full max-w-lg p-10 rounded-xl bg-surface-raised border border-border-subtle shadow-2xl flex flex-col items-center">
        <Sparkles className="text-primary w-12 h-12 mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-text-main">
          Banao AI
        </h1>
        <p className="text-text-muted mb-8 text-center text-lg">Your intelligent app builder environment.</p>
        
        {(error || sandboxError) && (
          <div className="text-red-500 text-sm mb-4 bg-red-500/10 p-3 rounded w-full text-center border border-red-500/20">
            {error || sandboxError}
          </div>
        )}

        <form onSubmit={handleCreateProject} className="w-full flex gap-2 mb-8">
          <input 
            type="text" 
            placeholder="New Project Title" 
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            className="flex-1 bg-surface-base border border-border-subtle rounded-lg px-4 py-2 text-text-main focus:outline-none focus:border-primary transition-colors"
          />
          <button 
            type="submit"
            disabled={!newProjectTitle.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Plus className="w-4 h-4" /> Create
          </button>
        </form>

        <div className="w-full space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {isLoadingProjects ? (
            <div className="flex justify-center p-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <p className="text-text-muted text-center py-4">No projects yet. Create one above!</p>
          ) : (
            projects.map(project => (
              <div 
                key={project._id}
                className="flex items-center justify-between p-4 bg-surface-base border border-border-subtle rounded-lg hover:border-primary transition-colors group"
              >
                <div>
                  <h3 className="font-medium text-text-main">{project.title}</h3>
                  <p className="text-xs text-text-muted mt-1">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleStartProject(project._id)}
                  disabled={isStarting}
                  className="px-4 py-2 bg-surface-dim text-text-main border border-border-subtle rounded hover:bg-primary hover:text-white hover:border-primary transition-all text-sm font-medium"
                >
                  Open
                </button>
              </div>
            ))
          )}
        </div>
        
        {isStarting && (
          <div className="absolute inset-0 bg-surface-dim/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
            <div className="bg-surface-raised p-6 rounded-lg border border-border-subtle shadow-xl flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-text-main font-medium">Starting Environment...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
