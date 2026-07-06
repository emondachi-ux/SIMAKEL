import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
      const ctrl = isMac ? e.metaKey : e.ctrlKey;

      Object.entries(shortcuts).forEach(([key, callback]) => {
        const [modifier, actualKey] = key.split('+');
        const shouldTrigger =
          (modifier === 'ctrl' && ctrl && e.key.toLowerCase() === actualKey.toLowerCase()) ||
          (modifier === 'shift' && e.shiftKey && e.key.toLowerCase() === actualKey.toLowerCase()) ||
          (e.key.toLowerCase() === actualKey.toLowerCase() && !e.ctrlKey && !e.metaKey);

        if (shouldTrigger) {
          e.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
