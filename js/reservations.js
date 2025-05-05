document.addEventListener('DOMContentLoaded', () => {
    loadReservations();
  });
  
  async function loadReservations() {
    const container = document.getElementById('reservations-list');
    if (!container) return;
  
    try {
      const response = await fetch('http://localhost:80/reservas/mis-reservas', {
        method: 'GET',
        credentials: 'include' // Importante para que mande la cookie
      });
  
      if (!response.ok) {
        throw new Error('No se pudieron cargar las reservas');
      }
  
      const reservas = await response.json();
  
      if (reservas.length === 0) {
        container.innerHTML = '<p>No tienes reservas registradas.</p>';
        return;
      }
  
      reservas.forEach(reserva => {
        const card = document.createElement('div');
        card.className = 'reservation-card';
  
        card.innerHTML = `
          <img src="../assets/images/noimage.png" alt="Imagen de ${reserva.eventoid.nombreEvento}">
          <div class="reservation-info">
            <h3>${reserva.eventoid.nombreEvento}</h3>
            <p><strong>Ubicación:</strong> ${reserva.eventoid.ubicacion}</p>
            <p><strong>Fecha del Evento:</strong> ${formatDate(reserva.fechaEvento)}</p>
            <p><strong>Precio Total:</strong> $${formatPrice(reserva.precioTotal)}</p>
            <p><strong>Abono:</strong> $${formatPrice(reserva.abono)}</p>
          </div>
        `;
  
        container.appendChild(card);
      });
  
    } catch (error) {
      console.error('Error cargando reservas:', error);
      container.innerHTML = '<p>Error al cargar las reservas.</p>';
    }
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  function formatPrice(price) {
    return price.toLocaleString('es-CO');
  }
  