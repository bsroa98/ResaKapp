const clientId = "451545397871-tnqk93ts6o7dng6iun10iugn4n0fm421.apps.googleusercontent.com";
let sdkReady = false;

// Inicializa Google SDK solo cuando se ha cargado
function onGoogleSdkLoaded() {
  if (!window.google || !google.accounts || !google.accounts.id) {
    console.error("❌ SDK cargado pero no disponible.");
    return;
  }

  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleGoogleCredential,
    auto_select: false,
    use_fedcm_for_prompt: true
  });

  sdkReady = true;
  console.log("✅ Google SDK inicializado correctamente");
}

// Recibe el token de Google
function handleGoogleCredential(response) {
  console.log("🔐 Token recibido:", response.credential);

  fetch("http://localhost:80/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: response.credential }),
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Login exitoso:", data);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }
      location.reload();
    })
    .catch(err => console.error("❌ Error autenticando:", err));
}

// Vincula los botones personalizados al prompt
window.bindGoogleButtons = function () {
  const buttons = document.querySelectorAll(".google-btn");

  if (!sdkReady) {
    console.warn("⏳ SDK aún no está listo, reintentando en 100ms...");
    setTimeout(window.bindGoogleButtons, 100);
    return;
  }

  buttons.forEach((btn) => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = "true";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("🔘 Ejecutando prompt de Google...");

        google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.warn("❌ Prompt no se pudo mostrar:", notification.getNotDisplayedReason());
          }
          if (notification.isSkippedMoment()) {
            console.warn("ℹ️ Usuario cerró el prompt.");
          }
        });
      });

      console.log("🔗 Botón vinculado al login de Google");
    }
  });
};

// Esperamos a que el SDK de Google termine de cargar
window.addEventListener("load", () => {
  if (window.google && google.accounts && google.accounts.id) {
    onGoogleSdkLoaded();
  } else {
    const checkSdk = setInterval(() => {
      if (window.google && google.accounts && google.accounts.id) {
        clearInterval(checkSdk);
        onGoogleSdkLoaded();
      }
    }, 100);
  }
});
function renderGoogleStyledButton() {
    if (!window.google || !google.accounts || !google.accounts.id) {
      console.error("❌ SDK de Google no cargado todavía");
      return;
    }
  
    google.accounts.id.renderButton(
      document.getElementById("google-btn-container"),
      {
        theme: "outline",
        size: "large",
        type: "standard", // también puedes usar 'icon'
        shape: "pill",    // opciones: rectangular, pill, circle, square
        text: "continue_with", // o 'signin_with'
        logo_alignment: "left"
      }
    );
  }
  