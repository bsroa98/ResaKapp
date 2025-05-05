// Inicializar botones de Login y Sign Up en el header
function initializeLoginButtons() {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
  
    if (loginButton) {
      loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginModal('login');
      });
    }
  
    if (signupButton) {
      signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginModal('signup');
      });
    }
  }
  
  // Abrir el modal de login/signup
  function openLoginModal(mode = 'login') {
    if (document.getElementById('login-modal')) return;
  
    const modalDiv = document.createElement('div');
    modalDiv.id = 'login-modal';
    document.body.appendChild(modalDiv);
  
    fetch('../Components/login-modal.html')
    .then(response => response.text())
  .then(html => {
    modalDiv.innerHTML = html;
    configureLoginModal(mode);
    document.body.classList.add('modal-open');

    // 🔥 Este bloque es crucial
    if (typeof renderGoogleStyledButton === "function") {
      renderGoogleStyledButton(); // 👉 Renderiza el botón de Google ya inicializado
    } else {
      console.warn("⚠️ renderGoogleStyledButton no está disponible");
    }
    
  })
      .catch(error => console.error('Error cargando el login modal:', error));
  }
  
  // Configurar el modal después de cargar
  function configureLoginModal(mode = 'login') {
    setupTabSwitching(mode);
    handleLoginSubmit();
    const closeButton = document.getElementById('close-modal');
    if (closeButton) {
      closeButton.addEventListener('click', closeLoginModal);
    }
  
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeLoginModal();
        }
      });
    }
  }
  
  // Función para cerrar el modal
  function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.style.animation = 'fadeZoomOut 0.3s ease forwards';
        setTimeout(() => {
          modal.remove();
          document.body.classList.remove('modal-open');
        }, 300); // Espera a que termine la animación
      } else {
        modal.remove();
        document.body.classList.remove('modal-open');
      }
    }
  }
  
  
  // Configurar el cambio entre Login y Sign Up tabs
  function setupTabSwitching(activeMode = 'login') {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
  
    if (!loginTab || !signupTab || !loginForm || !signupForm) return;
  
    function showForm(formToShow, formToHide) {
      // Paso 1: oculta de inmediato el anterior
      formToHide.style.display = 'none';
      formToHide.style.opacity = '0';
      
      // Paso 2: muestra el nuevo en display flex pero opacity 0
      formToShow.style.display = 'flex';
      formToShow.style.opacity = '0';
  
      // Paso 3: en el siguiente repaint, transiciona a opacity 1
      requestAnimationFrame(() => {
        formToShow.style.opacity = '1';
      });
    }
  
    function activateLogin() {
      showForm(loginForm, signupForm);
      loginTab.classList.add('active-tab');
      signupTab.classList.remove('active-tab');
    }
  
    function activateSignup() {
      showForm(signupForm, loginForm);
      signupTab.classList.add('active-tab');
      loginTab.classList.remove('active-tab');
    }
  
    loginTab.addEventListener('click', (e) => {
      e.preventDefault();
      activateLogin();
    });
  
    signupTab.addEventListener('click', (e) => {
      e.preventDefault();
      activateSignup();
    });
  
    // Inicializar modo correcto
    if (activeMode === 'signup') {
      activateSignup();
    } else {
      activateLogin();
    }
  }

  function handleLoginSubmit() {
    const loginForm = document.querySelector('.login-form');
    if (!loginForm) return;
  
    // 🔥 Asegurarse de no duplicar event listeners
    loginForm.removeEventListener('submit', loginSubmitHandler);
  
    // 🔥 Luego agregarlo
    loginForm.addEventListener('submit', loginSubmitHandler);
  }
  
  async function loginSubmitHandler(e) {
    e.preventDefault();
  
    const loginForm = e.target;
    const usernameInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
  
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    try {
      const response = await fetch('http://localhost:80/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
  
      const data = await response.json();
      console.log('Login exitoso:', data);
  
      alert('¡Bienvenido!');
      closeLoginModal();
      window.location.href = '../Pages/index.html';
      // Esperar un pequeñísimo delay para que la cookie esté lista
      setTimeout(async () => {
        await loadHeader('user');
        insertUserInitial(data.username);
        
      }, 100); // 100ms pequeño delay
    } catch (error) {
      console.error('Error en login:', error);
      alert('Correo o contraseña incorrectos');
    }
  }
  

  
  
  
  
  
  