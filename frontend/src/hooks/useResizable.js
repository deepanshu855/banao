import { useState, useCallback } from 'react';

export function useResizable(initialSize, minSize = 100, maxSize = 800) {
  const [size, setSize] = useState(initialSize);

  const startResizing = useCallback((e, direction = 'horizontal') => {
    e.preventDefault();
    const startPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const startSize = size;

    const onMouseMove = (moveEvent) => {
      const currentPos = direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY;
      const delta = currentPos - startPos;
      const newSize = Math.max(minSize, Math.min(maxSize, startSize + delta));
      setSize(newSize);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [size, minSize, maxSize]);

  return { size, setSize, startResizing };
}
