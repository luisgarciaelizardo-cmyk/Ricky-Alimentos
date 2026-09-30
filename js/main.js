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

// Catálogo: filtro por categoría y búsqueda
const chips = document.querySelectorAll('.chip');
const categories = document.querySelectorAll('.category');
const search = document.getElementById('buscar');
const empty = document.getElementById('sin-resultados');
let activeFilter = 'todos';

const normalize = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function applyFilters() {
  const query = normalize(search.value.trim());
  let totalVisible = 0;

  categories.forEach((category) => {
    const inFilter = activeFilter === 'todos' || category.dataset.category === activeFilter;
    let visibleInCategory = 0;

    category.querySelectorAll('li').forEach((item) => {
      const match = inFilter && normalize(item.textContent).includes(query);
      item.hidden = !match;
      if (match) visibleInCategory++;
    });

    category.hidden = visibleInCategory === 0;
    totalVisible += visibleInCategory;
  });

  empty.hidden = totalVisible > 0;
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    activeFilter = chip.dataset.filter;
    applyFilters();
  });
});

search.addEventListener('input', applyFilters);

// Año actual en el pie de página
document.getElementById('anio').textContent = new Date().getFullYear();
