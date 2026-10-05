export function buildFileTree(paths) {
  const root = { name: 'root', type: 'directory', children: [] };

  paths.forEach(path => {
    const parts = path.split('/').filter(Boolean);
    let currentNode = root;

    parts.forEach((part, index) => {
      let childNode = currentNode.children.find(child => child.name === part);

      if (!childNode) {
        childNode = {
          name: part,
          path: '/' + parts.slice(0, index + 1).join('/'),
          type: index === parts.length - 1 ? 'file' : 'directory',
          children: []
        };
        currentNode.children.push(childNode);
      }
      currentNode = childNode;
    });
  });

  return root.children;
}
