(() => {
  const preference = matchMedia('(any-pointer: fine) and (prefers-reduced-motion: no-preference)');
  const ring = document.createElement('div');
  ring.className = 'cursor-trail';
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(ring);
  let x = 0, y = 0, targetX = 0, targetY = 0, frame = 0, visible = false;
  const hide = () => {
    visible = false;
    ring.classList.remove('visible');
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const animate = () => {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1) {
      frame = requestAnimationFrame(animate);
    } else {
      frame = 0;
    }
  };
  document.addEventListener('pointermove', event => {
    if (!preference.matches || event.pointerType !== 'mouse') return hide();
    targetX = event.clientX;
    targetY = event.clientY;
    if (!visible) {
      x = targetX;
      y = targetY;
      visible = true;
      ring.classList.add('visible');
    }
    ring.classList.toggle('interactive', Boolean(event.target.closest('a, button, summary, input, textarea, select')));
    if (!frame) frame = requestAnimationFrame(animate);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  preference.addEventListener('change', hide);
})();
