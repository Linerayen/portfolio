// Menú móvil
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// =====================================================
// Gradiente animada de manchas de color (tierras + verdes)
// Se dibuja en <canvas>, el desenfoque y el grano se aplican por CSS.
// =====================================================
function initGradientCanvas(canvasId, palette, blobCount) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, dpr;
  let blobs = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeBlobs() {
    blobs = Array.from({ length: blobCount }, (_, i) => ({
      color: palette[i % palette.length],
      x: Math.random(),
      y: Math.random(),
      r: 0.35 + Math.random() * 0.25,
      speedX: (Math.random() - 0.5) * 0.06,
      speedY: (Math.random() - 0.5) * 0.06,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    // base wash
    ctx.fillStyle = palette[0];
    ctx.fillRect(0, 0, width, height);

    blobs.forEach((b, i) => {
      const t = reduceMotion ? 0 : time * 0.00004;
      const x = (b.x + Math.sin(t + b.phase) * b.speedX) * width;
      const y = (b.y + Math.cos(t + b.phase * 1.3) * b.speedY) * height;
      const r = b.r * Math.max(width, height);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, b.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    });

    if (!reduceMotion) {
      requestAnimationFrame(draw);
    }
  }

  resize();
  makeBlobs();
  requestAnimationFrame(draw);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); }, 200);
  });
}

// Paleta tierras + verdes claros para las gradientes generadas por código
initGradientCanvas('heroCanvas', ['#EDE7D9', '#C79D6E', '#9CAE87', '#A9623E', '#7C8B6F'], 5);
initGradientCanvas('proyCanvas', ['#F1EEE0', '#9CAE87', '#C79D6E', '#7C8B6F'], 4);

// =====================================================
// Filtro de proyectos por categoría
// =====================================================
const filterPills = document.querySelectorAll('.filter-pill');
const proyCards = document.querySelectorAll('.proy-card');
const proyEmpty = document.getElementById('proyEmpty');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('is-active'));
    pill.classList.add('is-active');
    const filter = pill.dataset.filter;
    let visibleCount = 0;

    proyCards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('is-hidden', !show);
      if (show) visibleCount++;
    });

    if (proyEmpty) proyEmpty.hidden = visibleCount !== 0;
  });
});

// Revelado de tarjetas al hacer scroll
const cards = document.querySelectorAll('.card, .proy-card');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(card => io.observe(card));
} else {
  cards.forEach(card => card.classList.add('in-view'));
}
