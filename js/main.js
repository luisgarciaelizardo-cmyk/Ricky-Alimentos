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

// Catálogos: búsqueda por sección y pestañas (Hamburguesas / Tacos)
const normalize = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

document.querySelectorAll('[data-catalog]').forEach((section) => {
  const search = section.querySelector('.search');
  const empty = section.querySelector('.catalog-empty');
  const tabs = section.querySelectorAll('.tab');
  const panels = section.querySelectorAll('.tab-panel');

  function applySearch() {
    const query = normalize(search.value.trim());
    const scope = section.querySelector('.tab-panel:not([hidden])') || section;
    let totalVisible = 0;

    scope.querySelectorAll('.category').forEach((category) => {
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
});

// Opciones de productos: Generales / Restaurantes
const choices = document.querySelectorAll('.choice');

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const opening = choice.getAttribute('aria-expanded') !== 'true';

    choices.forEach((c) => {
      const active = c === choice && opening;
      c.setAttribute('aria-expanded', active);
      document.getElementById(c.getAttribute('aria-controls')).hidden = !active;
    });
  });
});

// Año actual en el pie de página
document.getElementById('anio').textContent = new Date().getFullYear();
