export function applyScrollIfOverflowing() {
  const titleEl = document.getElementById('now-playing-title');
  const container = titleEl?.parentElement;

  if (!titleEl || !container) return;

  requestAnimationFrame(() => {
    const isOverflowing = titleEl.scrollWidth > container.clientWidth;

    if (isOverflowing) {
      titleEl.classList.add('scroll-animate');
    } else {
      titleEl.classList.remove('scroll-animate');
    }
  });
}

