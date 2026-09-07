
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cursor = document.querySelector('.cursor-dot');
if (cursor && !reduceMotion && matchMedia('(hover:hover)').matches){
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .project-row').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

document.querySelectorAll('.marquee__track').forEach(track => {
  track.innerHTML += track.innerHTML;
});

const revealEls = document.querySelectorAll('.reveal, .skills__grid');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

const preview = document.querySelector('.project-preview');
const previewPh = preview ? preview.querySelector('.project-preview__ph') : null;
const rows = document.querySelectorAll('.project-row');

if (preview && !reduceMotion && matchMedia('(hover:hover)').matches){
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const color = row.dataset.color || '#2a3bff';
      const label = row.dataset.label || '';
      preview.style.background = color;
      if (previewPh) previewPh.textContent = label;
      preview.classList.add('is-active');
    });
    row.addEventListener('mousemove', (e) => {
      preview.style.left = e.clientX + 'px';
      preview.style.top  = e.clientY + 'px';
    });
    row.addEventListener('mouseleave', () => preview.classList.remove('is-active'));
  });
}

rows.forEach(row => {
  const href = row.dataset.href;
  if (href){
    row.addEventListener('click', () => { window.location.href = href; });
  }
});

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
