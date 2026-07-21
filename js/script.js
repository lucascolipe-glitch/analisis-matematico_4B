/* ======================================================
   DETALLES DESPLEGABLES
====================================================== */

function mostrarDetalle(id) {
  const detalle = document.getElementById(id);

  if (!detalle) {
    console.error("No se encontró el detalle:", id);
    return;
  }

  detalle.classList.toggle("visible");

  // Si usás MathJax para fórmulas dentro del detalle:
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([detalle]);
  }
}


/* ======================================================
   MODAL DE AYUDA PARA TABLAS
====================================================== */

function obtenerModalAyudaTabla() {
  let modal = document.getElementById("modal-ayuda-tabla");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-ayuda-tabla";
    modal.className = "modal-ayuda";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="modal-contenido" tabindex="-1">
        <button class="cerrar-modal" type="button" aria-label="Cerrar ayuda">×</button>
        <div id="contenido-ayuda-tabla"></div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".cerrar-modal").addEventListener("click", cerrarAyudaTabla);

    modal.addEventListener("click", function (evento) {
      if (evento.target === modal) {
        cerrarAyudaTabla();
      }
    });
  }

  return modal;
}

function mostrarContenidoAyudaTabla(contenido) {
  const modal = obtenerModalAyudaTabla();
  const contenedor = modal.querySelector("#contenido-ayuda-tabla");

  contenedor.innerHTML = "";

  if (typeof contenido === "string") {
    contenedor.innerHTML = contenido;
  } else {
    contenedor.appendChild(contenido);
  }

  modal.classList.add("abierto");
  modal.setAttribute("aria-hidden", "false");
  modal.querySelector(".modal-contenido").focus();

  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([contenedor]);
  }
}

function abrirAyudaTabla(idTemplate) {
  const template = document.getElementById(idTemplate);

  if (!template) {
    console.error("No se encontró el template:", idTemplate);
    return;
  }

  mostrarContenidoAyudaTabla(template.innerHTML);
}

function cerrarAyudaTabla() {
  const modal = document.getElementById("modal-ayuda-tabla");

  if (modal) {
    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");
  }
}

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    cerrarAyudaTabla();
  }
});


/* ======================================================
   NAVEGACIÓN POR SECCIONES DESDE EL TEMARIO
   - Muestra una sola sección por vez.
   - Detiene los videos de YouTube al cambiar de tema.
====================================================== */

function detenerVideosDeYoutube(contenedor) {
  if (!contenedor) return;

  contenedor.querySelectorAll("iframe").forEach(function (iframe) {
    const src = iframe.getAttribute("src") || "";
    const esYoutube = /youtube(?:-nocookie)?\.com\/embed/i.test(src);

    if (!esYoutube) return;

    // Recargar el iframe detiene inmediatamente el video sin necesidad
    // de usar la API de YouTube.
    iframe.setAttribute("src", "about:blank");
    iframe.setAttribute("src", src);
  });
}

function inicializarNavegacionTemario() {
  const main = document.querySelector("main");
  if (!main) return;

  const temario = main.querySelector(":scope > .temario");
  const secciones = Array.from(main.querySelectorAll(":scope > section[id]"));

  if (!temario || secciones.length === 0) return;

  const enlaces = Array.from(temario.querySelectorAll('a[href^="#"]'));
  if (enlaces.length === 0) return;

  temario.classList.add("temario-interactivo");

  secciones.forEach(function (seccion) {
    seccion.classList.add("seccion-tema");
    seccion.hidden = true;
  });

  const aviso = document.createElement("div");
  aviso.className = "aviso-seleccion-tema";
  aviso.innerHTML = `
    <strong>Elegí un tema del índice.</strong>
    <span>La sección seleccionada aparecerá en este espacio.</span>
  `;
  temario.insertAdjacentElement("afterend", aviso);

  function mostrarSeccion(id, actualizarUrl = true) {
    const seleccionada = document.getElementById(id);

    if (!seleccionada || !secciones.includes(seleccionada)) return;

    secciones.forEach(function (seccion) {
      if (seccion === seleccionada) {
        seccion.hidden = false;
      } else {
        if (!seccion.hidden) {
          detenerVideosDeYoutube(seccion);
        }
        seccion.hidden = true;
      }
    });

    aviso.hidden = true;

    enlaces.forEach(function (enlace) {
      const activo = enlace.getAttribute("href") === `#${id}`;
      enlace.classList.toggle("tema-activo", activo);
      enlace.setAttribute("aria-current", activo ? "true" : "false");
    });

    if (actualizarUrl) {
      history.pushState(null, "", `#${id}`);
    }

    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([seleccionada]);
    }

    seleccionada.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function (evento) {
      const id = enlace.getAttribute("href").slice(1);
      evento.preventDefault();
      mostrarSeccion(id);
    });
  });

  window.addEventListener("popstate", function () {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) mostrarSeccion(id, false);
  });

  const idInicial = decodeURIComponent(location.hash.slice(1));
  if (idInicial && document.getElementById(idInicial)) {
    mostrarSeccion(idInicial, false);
  }
}


/* ======================================================
   AYUDAS AUTOMÁTICAS EN TABLAS DE VALORES DE FUNCIONES
   Detecta tablas cuya primera columna es x y cuya segunda
   columna contiene f(x), g(x), sen(x), cos(x), etc.
====================================================== */

function textoLimpio(elemento) {
  return (elemento?.textContent || "")
    .replace(/\\[()[\]]/g, "")
    .replace(/\$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function esTablaDeValoresDeFuncion(tabla) {
  if (tabla.classList.contains("tabla-ruffini")) return false;
  if (tabla.closest(".tabla-ayudada")) return false;

  const primeraFila = tabla.querySelector("tr");
  if (!primeraFila) return false;

  const celdas = primeraFila.querySelectorAll("th, td");
  if (celdas.length < 2) return false;

  const primera = textoLimpio(celdas[0]).replace(/\s/g, "").toLowerCase();
  const segunda = textoLimpio(celdas[1]).replace(/\s/g, "").toLowerCase();

  const primeraEsX = primera === "x";
  const segundaEsFuncion =
    /[fghpq]\(x\)/.test(segunda) ||
    /sen\(x\)|sin\(x\)|cos\(x\)|tan\(x\)/.test(segunda);

  return primeraEsX && segundaEsFuncion;
}

function crearBotonAyudaTabla(simbolo, clase, etiqueta, accion) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = `boton-ayuda-tabla ${clase}`;
  boton.textContent = simbolo;
  boton.setAttribute("aria-label", etiqueta);
  boton.addEventListener("click", accion);
  return boton;
}

function crearExplicacionTabla(tipo, datos) {
  const bloque = document.createElement("div");
  const titulo = document.createElement("h3");
  const texto = document.createElement("p");
  const lista = document.createElement("ol");

  const agregarPaso = function (contenido) {
    const item = document.createElement("li");
    item.textContent = contenido;
    lista.appendChild(item);
  };

  if (tipo === "columna") {
    titulo.textContent = "¿Cómo se completa la columna de la función?";
    texto.textContent = `La columna ${datos.formula} contiene las imágenes de los valores de x.`;
    agregarPaso("Tomá un valor de x de la primera columna.");
    agregarPaso(`Reemplazá x en la expresión ${datos.formula}.`);
    agregarPaso("Resolvé las operaciones respetando su orden.");
    agregarPaso("Escribí el resultado en la misma fila.");
  }

  if (tipo === "fila") {
    titulo.textContent = "¿Cómo se completa esta fila?";
    texto.textContent = `En esta fila se trabaja con ${datos.valorX}.`;
    agregarPaso(`Sustituí x por ${datos.valorX} en ${datos.formula}.`);
    agregarPaso("Calculá el valor de la función.");
    agregarPaso(`La imagen obtenida se escribe en la segunda columna${datos.resultado ? `: ${datos.resultado}` : "."}`);
  }

  if (tipo === "celda") {
    titulo.textContent = "¿Qué representa esta celda?";
    texto.textContent = `Esta celda es la intersección entre la fila ${datos.valorX} y la columna ${datos.formula}.`;
    agregarPaso(`Se evalúa ${datos.formula} usando ${datos.valorX}.`);
    agregarPaso(`El resultado de esa evaluación es ${datos.resultado}.`);
    agregarPaso("Ese número es la imagen del valor de x elegido.");
  }

  bloque.append(titulo, texto, lista);
  return bloque;
}

function agregarAyudasATablaDeFuncion(tabla) {
  const contenedor = tabla.closest(".tabla-responsive") || tabla.parentElement;
  contenedor.classList.add("tabla-ayudada");

  const filas = tabla.querySelectorAll("tr");
  if (filas.length < 2) return;

  const encabezados = filas[0].querySelectorAll("th, td");
  const primeraFilaDatos = filas[1].querySelectorAll("th, td");
  if (encabezados.length < 2 || primeraFilaDatos.length < 2) return;

  const celdaX = primeraFilaDatos[0];
  const celdaResultado = primeraFilaDatos[1];
  const encabezadoFuncion = encabezados[1];

  const datos = {
    formula: textoLimpio(encabezadoFuncion),
    valorX: textoLimpio(celdaX),
    resultado: textoLimpio(celdaResultado)
  };

  encabezadoFuncion.appendChild(
    crearBotonAyudaTabla("↓", "ayuda-columna", "Ayuda para completar la columna", function () {
      mostrarContenidoAyudaTabla(crearExplicacionTabla("columna", datos));
    })
  );

  celdaX.appendChild(
    crearBotonAyudaTabla("→", "ayuda-fila", "Ayuda para completar la fila", function () {
      mostrarContenidoAyudaTabla(crearExplicacionTabla("fila", datos));
    })
  );

  celdaResultado.appendChild(
    crearBotonAyudaTabla("?", "ayuda-celda", "Ayuda para completar esta celda", function () {
      mostrarContenidoAyudaTabla(crearExplicacionTabla("celda", datos));
    })
  );
}

function inicializarAyudasTablasFunciones() {
  document.querySelectorAll("table").forEach(function (tabla) {
    if (esTablaDeValoresDeFuncion(tabla)) {
      agregarAyudasATablaDeFuncion(tabla);
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  inicializarNavegacionTemario();
  inicializarAyudasTablasFunciones();
});
