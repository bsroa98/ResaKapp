import { initializeUserMenu } from "./user-menu.js";

document.addEventListener('DOMContentLoaded', async () => {
  
  checkSessionAndLoadHeader()
    .then(() => {
      initializeUserMenu();
    });
});

async function loadHeader(type) {
    const headerContainer = document.getElementById('header');
    if (!headerContainer) return;
  
    let headerFile = '';
  
    if (type === 'user') {
      headerFile = '../Components/header-user.html';
    } else {
      headerFile = '../Components/header.html';
    }
  
    try {
      const response = await fetch(headerFile);
      const html = await response.text();
      headerContainer.innerHTML = html;
  
      if (type === 'public') {
        initializeLoginButtons(); // ✅ Inicializar botones una vez el HTML ya fue insertado
      }
  
    } catch (error) {
      console.error('Error loading header:', error);
    }
  }

  async function checkSessionAndLoadHeader() {
    try {
      const response = await fetch('http://localhost:80/api/auth/userinfo', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('User not authenticated');
      }
  
      const userData = await response.json();
      console.log('Authenticated user:', userData);
  
      // ⚡ Primero cargamos el header
      await loadHeader('user');
  
      // ⚡ Luego insertamos la inicial
      insertUserInitial(userData.username);
  
    } catch (error) {
      console.log('User not logged in');
      await loadHeader('public');
    }
  }

  function insertUserInitial(username) {
    const userInitialDiv = document.getElementById('user-initial');
    if (userInitialDiv && username) {
      const initial = username.charAt(0).toUpperCase(); // ⚡ Tomar la primera letra en mayúscula
      userInitialDiv.textContent = initial;
    }
  }