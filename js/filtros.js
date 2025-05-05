// filtros.js actualizado para trabajar con eventos.js modularizado
import { obtenerEventos, renderEventosFiltrados } from "./eventos.js";

export function inicializarBusqueda() {
  const inputBusqueda = document.getElementById("search-input");
  const filtroBtn = document.getElementById("filter-button");
  const modal = document.getElementById("filter-modal");
  const cerrarModalBtn = document.getElementById("close-modal");
  const aplicarFiltroBtn = document.getElementById("apply-filters");

  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", () => {
      aplicarFiltros();
    });
  }

  if (filtroBtn && modal && cerrarModalBtn) {
    filtroBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    cerrarModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (aplicarFiltroBtn) {
    aplicarFiltroBtn.addEventListener("click", () => {
      aplicarFiltros();
      modal.style.display = "none";
    });
  }

  // Escuchar clicks en las categorías del carrusel
  document.addEventListener("click", (e) => {
    if (e.target.closest(".category-card")) {
      const categoria = e.target.closest(".category-card").innerText.trim();
      aplicarFiltros({ categoria });
    }
  });
}

function aplicarFiltros(extraFiltro = {}) {
  const eventos = obtenerEventos();
  const texto = document.getElementById("search-input")?.value.toLowerCase() || "";
  const edadMin = parseInt(document.getElementById("edad-min")?.value) || 0;
  const edadMax = parseInt(document.getElementById("edad-max")?.value) || 99;
  const precioMin = parseInt(document.getElementById("precio-min")?.value) || 0;
  const precioMax = parseInt(document.getElementById("precio-max")?.value) || Infinity;
  const ubicacion = document.getElementById("ubicacion")?.value.toLowerCase() || "";

  const filtrados = eventos.filter(e => {
    const cumpleTexto = e.nombreEvento.toLowerCase().includes(texto) || e.descripcion.toLowerCase().includes(texto);
    const cumpleEdad = e.edadRecomendada >= edadMin && e.edadRecomendada <= edadMax;
    const cumplePrecio = e.precio >= precioMin && e.precio <= precioMax;
    const cumpleUbicacion = e.ubicacion.toLowerCase().includes(ubicacion);
    const cumpleCategoria = extraFiltro.categoria ? e.categoria.toLowerCase() === extraFiltro.categoria.toLowerCase() : true;

    return cumpleTexto && cumpleEdad && cumplePrecio && cumpleUbicacion && cumpleCategoria;
  });

  renderEventosFiltrados(filtrados);
}
