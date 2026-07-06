import { useEffect, useState } from 'react';

interface UseOfflineState {
  isOnline: boolean;
  wasOffline: boolean;
}

export const useOffline = (): UseOfflineState => {
  const [state, setState] = useState<UseOfflineState>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    wasOffline: false,
  });

  useEffect(() => {
    const handleOnline = (): void => {
      setState((prev) => ({
        isOnline: true,
        wasOffline: prev.isOnline === false,
      }));
    };

    const handleOffline = (): void => {
      setState((prev) => ({
        ...prev,
        isOnline: false,
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return state;
};
