// src/utils/devtools-detect.ts
export function detectDevTools(onOpen: () => void) {
  const threshold = 160;
  setInterval(() => {
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      onOpen();
    }
  }, 1000);
}
