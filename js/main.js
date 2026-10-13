// Menú en móvil
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Catálogo: pestañas (Hamburguesas / Tacos) y búsqueda
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
const search = document.getElementById('buscar');
const empty = document.getElementById('sin-resultados');

const normalize = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function applySearch() {
  const query = normalize(search.value.trim());
  const panel = document.querySelector('.tab-panel:not([hidden])');
  let totalVisible = 0;

  panel.querySelectorAll('.category').forEach((category) => {
    let visibleInCategory = 0;

    category.querySelectorAll('li').forEach((item) => {
      const match = normalize(item.textContent).includes(query);
      item.hidden = !match;
      if (match) visibleInCategory++;
    });

    category.hidden = visibleInCategory === 0;
    totalVisible += visibleInCategory;
  });

  empty.hidden = totalVisible > 0;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active);
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute('aria-controls');
    });
    applySearch();
  });
});

search.addEventListener('input', applySearch);

// Año actual en el pie de página
document.getElementById('anio').textContent = new Date().getFullYear();
