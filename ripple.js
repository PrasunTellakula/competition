// Classic Ripple Effect on Mouse Move
(function() {
  const area = document.querySelector('.ripple-move-area');
  if (!area) return;
  let lastTime = 0;
  let ripples = [];
  area.addEventListener('mousemove', function(e) {
    // Throttle ripples to avoid too many per second
    const now = Date.now();
    if (now - lastTime < 30) return;
    lastTime = now;
    const rect = area.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = 80 + Math.random() * 40;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    area.appendChild(ripple);
    ripples.push(ripple);
    ripple.addEventListener('animationend', () => {
      ripple.remove();
      ripples = ripples.filter(r => r !== ripple);
    });
    // Limit number of ripples in DOM
    if (ripples.length > 20) {
      ripples[0].remove();
      ripples.shift();
    }
  });
})(); 