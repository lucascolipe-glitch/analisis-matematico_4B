
function mostrarDetalle(id) {
  const detalle = document.getElementById(id);

  if (detalle.style.display === "block") {
    detalle.style.display = "none";
  } else {
    detalle.style.display = "block";
  }

  // Si usás MathJax para fórmulas dentro del detalle:
  if (window.MathJax) {
    MathJax.typesetPromise([detalle]);
  }
}



/* =========================
   MODAL DE AYUDA PARA TABLAS
========================= */

function abrirAyudaTabla(idTemplate) {
  const template = document.getElementById(idTemplate);

  if (!template) {
    console.error("No se encontró el template:", idTemplate);
    return;
  }

  let modal = document.getElementById("modal-ayuda-tabla");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-ayuda-tabla";
    modal.className = "modal-ayuda";

    modal.innerHTML = `
      <div class="modal-contenido">
        <button class="cerrar-modal" type="button" aria-label="Cerrar ayuda">×</button>
        <div id="contenido-ayuda-tabla"></div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".cerrar-modal").addEventListener("click", cerrarAyudaTabla);

    modal.addEventListener("click", function(evento) {
      if (evento.target === modal) {
        cerrarAyudaTabla();
      }
    });
  }

  const contenido = document.getElementById("contenido-ayuda-tabla");
  contenido.innerHTML = template.innerHTML;

  modal.classList.add("abierto");

  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([contenido]);
  }
}

function cerrarAyudaTabla() {
  const modal = document.getElementById("modal-ayuda-tabla");
  if (modal) {
    modal.classList.remove("abierto");
  }
}

/* Permite cerrar con la tecla Escape */
document.addEventListener("keydown", function(evento) {
  if (evento.key === "Escape") {
    cerrarAyudaTabla();
  }
});
