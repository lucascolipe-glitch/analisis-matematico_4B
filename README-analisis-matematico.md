# Análisis Matemático — sitio educativo interactivo

Sitio web educativo para organizar y compartir contenidos de **Análisis Matemático** mediante teoría, ejemplos, tablas, gráficos, videos, documentos y recursos interactivos.

🌐 **Sitio publicado:** [Análisis Matemático](https://lucascolipe-glitch.github.io/analisis-matematico_4B/)

---

## ¿Qué se puede hacer en la página?

### Como estudiante

La página permite:

- recorrer los contenidos organizados por unidades;
- seleccionar un tema desde la tabla de contenidos;
- ver solamente la sección elegida, sin recorrer toda la página;
- estudiar definiciones, propiedades y ejemplos;
- leer fórmulas matemáticas escritas con LaTeX;
- analizar funciones mediante fórmulas, tablas y gráficos;
- utilizar botones de ayuda en tablas de valores;
- reproducir videos explicativos de YouTube;
- trabajar con construcciones interactivas de GeoGebra;
- consultar apuntes y materiales en PDF;
- ingresar directamente a un tema mediante un enlace como `unidad1.html#9`.

Cuando se cambia de tema, la sección anterior se oculta y los videos de YouTube que estaban reproduciéndose se detienen automáticamente.

### Como docente o editor del proyecto

El sitio permite:

- agregar nuevas unidades y temas en HTML;
- incorporar teoría, ejemplos y actividades;
- escribir fórmulas con MathJax;
- insertar videos, archivos PDF y applets de GeoGebra;
- crear explicaciones desplegables;
- agregar ayudas personalizadas a tablas;
- detectar automáticamente tablas de valores de funciones y añadir botones de ayuda;
- modificar el diseño general desde un único archivo CSS;
- publicar gratuitamente el proyecto con GitHub Pages.

---

## Contenidos

### Unidad 0 — Repaso y diagnóstico

- Números reales y recta real.
- Operaciones algebraicas.
- Potencias, raíces y propiedades.
- Intervalos.
- Expresiones algebraicas.
- Polinomios.
- División de polinomios y regla de Ruffini.
- Función lineal.
- Función cuadrática.

### Unidad 1 — Concepto de función y análisis

- Concepto de función.
- Dominio e imagen.
- Intervalos en la recta real.
- Representación mediante fórmula, tabla y gráfica.
- Raíces y ordenada al origen.
- Positividad y negatividad.
- Crecimiento y decrecimiento.
- Función lineal.
- Función cuadrática.
- Función racional.
- Función exponencial.
- Función logarítmica.
- Funciones polinómicas.
- Funciones trigonométricas: seno y coseno.
- Interpretación de gráficos.
- Uso de software matemático.

### Unidad 2 — Límites y continuidad

Estructura preparada para desarrollar límites, límites laterales, indeterminaciones, continuidad y discontinuidades.

### Unidad 3 — Derivada

Estructura preparada para desarrollar definición, interpretaciones, reglas de derivación, derivación logarítmica y derivadas sucesivas.

### Unidad 4 — Aplicaciones de la derivada

Estructura preparada para crecimiento, decrecimiento, regla de L’Hôpital, máximos, mínimos, optimización y estudio completo de funciones.

### Unidad 5 — Integrales y aplicaciones

Estructura preparada para integral indefinida, integral definida, área bajo la curva, métodos de integración y áreas entre curvas.

> Las unidades 2, 3, 4 y 5 contienen una estructura inicial con espacios preparados para incorporar teoría, videos y documentos.

---

## Funciones interactivas

### Navegación por secciones

Al seleccionar un tema desde el índice:

1. se ocultan las demás secciones;
2. aparece la sección elegida;
3. el enlace activo queda destacado;
4. la dirección se actualiza con `#número`;
5. MathJax procesa las fórmulas de la sección;
6. los videos de la sección anterior se detienen.

### Explicaciones desplegables

La función `mostrarDetalle(id)` permite mostrar y ocultar contenido:

```html
<button type="button" onclick="mostrarDetalle('detalle-lineal')">
  Ver explicación
</button>

<div id="detalle-lineal" class="detalle-tarjeta">
  <p>La pendiente de \(f(x)=2x-3\) es \(m=2\).</p>
</div>
```

El valor utilizado en `mostrarDetalle()` debe coincidir con el `id` del contenido.

### Ayudas en tablas

Las tablas de valores pueden mostrar tres botones:

- `↓`: explica cómo completar una columna;
- `→`: explica cómo completar una fila;
- `?`: explica cómo obtener o interpretar una celda.

El sistema reconoce automáticamente tablas cuya primera columna es `x` y cuya segunda columna contiene expresiones como:

```latex
\(f(x)\), \(g(x)\), \(\sen(x)\), \(\cos(x)\)
```

Las fórmulas de las ventanas de ayuda se procesan con MathJax, por lo que pueden contener exponentes, fracciones, raíces y otros comandos TeX.

### Videos de YouTube

```html
<div class="video-contenedor">
  <iframe
    class="video-embed"
    src="https://www.youtube-nocookie.com/embed/ID_DEL_VIDEO"
    title="Descripción del video"
    allowfullscreen>
  </iframe>
</div>
```

Se debe utilizar una dirección `/embed/` y no una dirección `/watch?v=`.

### GeoGebra

```html
<div class="geogebra">
  <iframe
    src="https://www.geogebra.org/material/iframe/id/ID_DEL_MATERIAL"
    title="Construcción interactiva"
    loading="lazy">
  </iframe>
</div>
```

### Documentos PDF

```html
<iframe
  class="pdf-embed"
  src="../pdf/apunte.pdf"
  title="Apunte de la unidad">
</iframe>
```

---

## Fórmulas matemáticas

El sitio utiliza **MathJax 3**.

### Fórmula dentro de una oración

```html
<p>La función es \(f(x)=2x^2-3x+1\).</p>
```

### Fórmula centrada

```html
<p class="formula">
  \[
    f(x)=\frac{x+1}{x-2}
  \]
</p>
```

Algunos comandos útiles:

```latex
\frac{a}{b}
\sqrt{x}
x^2
x_1
\sen(x)
\cos(x)
\log(x)
```

---

## Estructura del proyecto

```text
analisis-matematico_4B-main/
│
├── index.html
├── README.md
│
├── css/
│   └── estilos.css
│
├── js/
│   └── script.js
│
├── img/
│   └── archivos de imagen
│
├── pdf/
│   └── materiales complementarios
│
└── unidades/
    ├── unidad0.html
    ├── unidad1.html
    ├── unidad2.html
    ├── unidad3.html
    ├── unidad4.html
    └── unidad5.html
```

| Archivo | Función |
|---|---|
| `index.html` | Página principal y acceso a las unidades. |
| `unidades/unidad0.html` | Repaso y diagnóstico. |
| `unidades/unidad1.html` | Concepto de función y análisis. |
| `unidades/unidad2.html` a `unidad5.html` | Estructura de las unidades posteriores. |
| `css/estilos.css` | Diseño, tablas, tarjetas, modales y adaptación a pantallas. |
| `js/script.js` | Navegación, videos, detalles desplegables y ayudas en tablas. |
| `img/` | Imágenes y gráficos. |
| `pdf/` | Apuntes y materiales complementarios. |

---

## Cómo abrir el proyecto

El proyecto no necesita instalación ni compilación.

1. Descargar el repositorio.
2. Descomprimir el archivo ZIP.
3. Abrir `index.html` con un navegador.

También se puede iniciar un servidor local desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000
```

---

## Cómo agregar un tema

Agregar primero el enlace en la tabla de contenidos:

```html
<li><a href="#15">Nuevo tema</a></li>
```

Después agregar una sección con el mismo identificador:

```html
<section id="15">
  <h2>Nuevo tema</h2>

  <article class="tarjeta">
    <h3>Teoría</h3>
    <p>Contenido del tema.</p>
  </article>
</section>
```

El valor de `href="#15"` debe coincidir con `id="15"`. La navegación detectará automáticamente la nueva sección.

---

## Publicación en GitHub Pages

1. Modificar o reemplazar los archivos del repositorio.
2. Confirmar los cambios mediante un `commit`.
3. Subirlos a la rama publicada, normalmente `main`.
4. Esperar la actualización de GitHub Pages.
5. Recargar el sitio con `Ctrl + Shift + R` para evitar archivos antiguos guardados en caché.

---

## Recomendaciones de organización

Como el proyecto contiene cada vez más material, se recomienda:

- mantener una unidad por archivo HTML;
- guardar imágenes en `img/`;
- guardar documentos en `pdf/`;
- colocar los estilos comunes en `css/estilos.css`;
- colocar las funciones comunes en `js/script.js`;
- evitar repetir valores de `id`;
- revisar las rutas relativas al mover archivos;
- indicar qué unidades están completas y cuáles están en construcción.

Si una unidad crece demasiado, puede dividirse en varios archivos:

```text
unidades/unidad1/
├── concepto-funcion.html
├── dominio-imagen.html
├── funcion-lineal.html
├── funcion-cuadratica.html
└── funcion-exponencial.html
```

---

## Tecnologías utilizadas

- HTML5.
- CSS3.
- JavaScript.
- MathJax 3.
- YouTube.
- GeoGebra.
- GitHub Pages.

---

## Estado del proyecto

- Unidad 0: desarrollada.
- Unidad 1: desarrollada y en ampliación.
- Unidades 2 a 5: estructura inicial.
- Navegación por secciones: implementada.
- Detención automática de videos: implementada.
- Ayudas en tablas de valores: implementadas.
- Fórmulas TeX dentro de las ayudas: corregidas.

---

## Finalidad

Proyecto educativo destinado a acompañar la enseñanza y el aprendizaje de Análisis Matemático. El contenido puede continuar adaptándose, ampliándose y reorganizándose según las necesidades de cada curso.
