// src/hooks/useClock.ts
import { useState, useEffect } from 'react';

export function useClock() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentTime;
}
