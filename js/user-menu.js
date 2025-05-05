export function initializeUserMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuToggle) return;
  
    menuToggle.addEventListener('click', async (e) => {
      e.preventDefault();
      let menu = document.getElementById('user-menu');
      
      if (!menu) {
        // Si no existe aún el menú, lo cargamos dinámicamente
        const container = document.createElement('div');
        container.id = 'user-menu-container';
        document.body.appendChild(container);
  
        const response = await fetch('../Components/user-menu.html');
        const html = await response.text();
        container.innerHTML = html;
  
        menu = document.getElementById('user-menu');
        setupLogoutButton(); // Configurar el botón de cerrar sesión
      }
      
      // Posicionar el menú correctamente bajo el botón
      const buttonRect = menuToggle.getBoundingClientRect();
      menu.style.position = 'fixed';
      menu.style.top = (buttonRect.bottom + 8) + 'px'; // 8px de espacio
      menu.style.right = (window.innerWidth - buttonRect.right) + 'px';
      menu.style.zIndex = '1000';
      
      // Alternar clase hidden
      menu.classList.toggle('hidden');
    });
    
    // Cerrar el menú al hacer clic fuera de él (opcional pero recomendado)
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('user-menu');
      const menuToggle = document.querySelector('.menu-toggle');
      
      if (menu && !menu.classList.contains('hidden') && 
          !menu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });
  }
  function setupLogoutButton() {
    const logoutButton = document.getElementById('logout-button');
  
    if (logoutButton) {
      logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();
  
        try {
          const response = await fetch('http://localhost:80/api/auth/signout', {
            method: 'POST',
            credentials: 'include',
          });
  
          if (response.ok) {
            console.log('Sesión cerrada correctamente.');
            window.location.href = '../Pages/index.html'; // 🔥 Redirigir al inicio
          } else {
            console.error('Error al cerrar sesión:', response.status);
          }
        } catch (error) {
          console.error('Error en cierre de sesión:', error);
        }
      });
    }
  }