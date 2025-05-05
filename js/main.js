// main.js actualizado
import { cargarEventos, setupCarouselControls, obtenerEventos, renderEventosFiltrados } from "./eventos.js";
import { inicializarBusqueda } from "./filtros.js";

document.addEventListener('DOMContentLoaded', async () => {
  await loadSearchFilter();        // ⚡ Cargar componente de búsqueda
  await loadEventCards();          // ⚡ Cargar estructura de eventos
  setupCarouselControls();         // ⚡ Configurar controles del carrusel de eventos
  await cargarEventos();           // ⚡ Cargar datos de eventos
  inicializarBusqueda();           // ⚡ Inicializar funcionalidad de búsqueda y filtros
  initializeLoginButtons();
  loadCategoriesCarousel();        // ⚡ Cargar categorías
});

async function loadSearchFilter() {
  const container = document.getElementById('search-filter');
  if (container) {
    try {
      const response = await fetch('../Components/search-filter.html');
      const data = await response.text();
      container.innerHTML = data;

      // ⚠️ IMPORTANTE: inicializar después de insertar el HTML
      inicializarBusqueda();
    } catch (error) {
      console.error('Error al cargar el componente de búsqueda:', error);
    }
  }
}

function loadCategoriesCarousel() {
  const container = document.getElementById('categories-carousel');
  if (container) {
    fetch('../Components/categories-carousel.html')
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
      })
      .catch(error => console.error('Error al cargar las categorías:', error));
  }
}

async function loadEventCards() {
  const container = document.getElementById('event-cards');
  if (container) {
    try {
      const response = await fetch('../Components/event-cards.html');
      const data = await response.text();
      container.innerHTML = data;
    } catch (error) {
      console.error('Error al cargar las cards de eventos:', error);
    }
  }
}

function initializeLoginButtons() {
  // lógica placeholder si fuera necesaria
}
