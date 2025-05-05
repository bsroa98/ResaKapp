let eventos = [];

export async function cargarEventos() {
  try {
    const response = await fetch('http://localhost:80/public/eventos');
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.status);
    }

    eventos = await response.json();
    console.log('Eventos recibidos:', eventos);

    renderEventos();
  } catch (error) {
    console.error('Error al cargar eventos:', error);
  }
}

function renderEventos(eventosFiltrados = null) {
  const container = document.getElementById('carousel-container');
  if (!container) return;

  container.innerHTML = '';
  const lista = eventosFiltrados || eventos;

  lista.forEach(evento => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.cursor = 'pointer';

    card.innerHTML = `
      <img src="../assets/images/noimage.png" alt="Imagen de ${evento.nombreEvento}">
      <div class="event-info">
        <h3>${evento.nombreEvento}</h3>
        <p>${evento.ubicacion}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      verEventoDetalle(evento);
    });

    container.appendChild(card);
  });
}

export async function setupCarouselControls() {
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const viewport = document.querySelector('.carousel-viewport');

  if (prevButton && viewport) {
    prevButton.addEventListener('click', () => {
      viewport.scrollBy({
        left: -(250 + 32),
        behavior: 'smooth'
      });
    });
  } else {
    console.warn('Prev button or viewport not found.');
  }

  if (nextButton && viewport) {
    nextButton.addEventListener('click', () => {
      viewport.scrollBy({
        left: (250 + 32),
        behavior: 'smooth'
      });
    });
  } else {
    console.warn('Next button or viewport not found.');
  }
}

function verEventoDetalle(evento) {
  localStorage.setItem('eventoSeleccionado', JSON.stringify(evento));
  window.open('event-detail.html', '_blank');
}

export function obtenerEventos() {
  return eventos;
}

export function renderEventosFiltrados(filtrados) {
  renderEventos(filtrados);
}
