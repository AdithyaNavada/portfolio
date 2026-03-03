// src/utils/security.ts
export function applySecurityPolicies() {
  // Block right-click context menu
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Block common DevTools keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    const blocked = [
      e.key === 'F12',
      e.ctrlKey && e.shiftKey && e.key === 'I',   // Ctrl+Shift+I
      e.ctrlKey && e.shiftKey && e.key === 'J',   // Ctrl+Shift+J
      e.ctrlKey && e.shiftKey && e.key === 'C',   // Ctrl+Shift+C
      e.ctrlKey && e.key === 'U',                  // Ctrl+U (view source)
    ];
    if (blocked.some(Boolean)) e.preventDefault();
  });

  // Block text selection (makes copy harder)
  document.addEventListener('selectstart', (e) => e.preventDefault());

  // Block drag (prevents drag-to-copy)
  document.addEventListener('dragstart', (e) => e.preventDefault());
}
