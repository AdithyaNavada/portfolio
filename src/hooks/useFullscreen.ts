// src/hooks/useFullscreen.ts
import { useEffect } from 'react';

export function useFullscreen(isMobile: boolean) {
  const requestFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        await (document.documentElement as any).webkitRequestFullscreen();
      } else if ((document.documentElement as any).msRequestFullscreen) {
        await (document.documentElement as any).msRequestFullscreen();
      }
    } catch (err) {
      console.log('Fullscreen request failed:', err);
    }
  };

  useEffect(() => {
    if (isMobile) {
      const handleTouch = () => {
        if (!document.fullscreenElement) {
          requestFullscreen();
        }
      };

      document.addEventListener('touchstart', handleTouch);
      return () => document.removeEventListener('touchstart', handleTouch);
    }

    requestFullscreen();

    let isRequestingFullscreen = false;

    const checkAndRequestFullscreen = async () => {
      if (!isRequestingFullscreen && !document.fullscreenElement) {
        isRequestingFullscreen = true;
        await requestFullscreen();
        setTimeout(() => {
          isRequestingFullscreen = false;
        }, 1000);
      }
    };

    const handleClick = () => {
      checkAndRequestFullscreen();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(() => {
          checkAndRequestFullscreen();
        }, 100);
      }
    };

    const handleFocus = () => {
      setTimeout(() => {
        checkAndRequestFullscreen();
      }, 100);
    };

    const handleMouseMove = () => {
      if (!document.fullscreenElement && !document.hidden) {
        checkAndRequestFullscreen();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);

      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log('Exit fullscreen failed:', err));
      }
    };
  }, [isMobile]);
}
