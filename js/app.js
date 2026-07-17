function formatMoneda(value) {
  if (isNaN(Number(value))) return value;
  return Number(value).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}

function crearPlaceholderProducto(nombre) {
  const placeholder = document.createElement('div');
  placeholder.className = 'producto-placeholder';
  placeholder.textContent = nombre;
  return placeholder;
}

const PRODUCTOS_INICIALES = 6;
let filtroActual = 'destacados';
let mostrarCatalogoCompleto = false;

function actualizarControlesCatalogo(filtro) {
  document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('[data-categoria]').forEach(btn => {
    const activo = btn.dataset.categoria === filtro;
    btn.classList.toggle('active', activo);
    btn.setAttribute('aria-pressed', String(activo));
  });

  const select = document.getElementById('categoria-select');
  if (select) select.value = filtro;
}

function filtrarProductos(filtro = 'destacados', boton = null, desplazar = false) {
  filtroActual = filtro;
  mostrarCatalogoCompleto = filtro !== 'destacados';
  actualizarControlesCatalogo(filtro);

  const grid = document.getElementById('productos-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const productosFiltrados = filtro === 'destacados'
    ? productos.slice(0, PRODUCTOS_INICIALES)
    : filtro === 'todos'
    ? productos
    : productos.filter(producto => producto.categoria?.toLowerCase() === filtro.toLowerCase());

  if (!productosFiltrados.length) {
    grid.innerHTML = '<div class="empty-state"><h3>Pronto habrá opciones aquí.</h3><p>Explora otra categoría o solicita orientación personalizada.</p></div>';
    return;
  }

  productosFiltrados.forEach(producto => {
    const card = document.createElement('article');
    card.className = 'producto-card';
    const precio = Number(producto.precio) || 0;
    const tieneDescuento = precio > 350;
    const precioFinal = tieneDescuento ? Math.round(precio * 0.7) : precio;
    const ahorro = precio - precioFinal;

    card.innerHTML = `
      <div class="producto-imagen-container">
        <img src="${producto.imagen || generarImagen(producto.nombre)}" alt="${producto.nombre}" class="producto-imagen" loading="lazy">
        ${tieneDescuento ? '<span class="descuento-badge">30% DE DESCUENTO</span>' : ''}
      </div>
      <div class="producto-body">
        <p class="producto-category">${producto.categoria || 'Bienestar'}</p>
        <h3>${producto.nombre}</h3>
        <p class="desc-corta">${producto.descripcionCorta || 'Conoce sus beneficios y presentación.'}</p>
        <div class="producto-info">
          <div class="price-stack">
            ${tieneDescuento ? `<span class="price-label">Precio regular</span><span class="precio original">${formatMoneda(precio)}</span><span class="price-label">Precio promoción</span><strong class="precio-descuento">${formatMoneda(precioFinal)}</strong>` : `<span class="price-label">Precio</span><strong class="precio-descuento">${formatMoneda(precio)}</strong>`}
          </div>
          ${tieneDescuento ? `<span class="saving-pill">Ahorras ${formatMoneda(ahorro)}</span>` : ''}
        </div>
        <div class="producto-actions">
          <button class="btn" onclick="verDescripcion(${producto.id})">Ver producto <span aria-hidden="true">→</span></button>
          <a class="btn btn-whatsapp" href="https://wa.me/525555070734?text=${encodeURIComponent(`Hola, quiero información sobre ${producto.nombre} (${formatMoneda(precioFinal)}).`)}" target="_blank" rel="noopener" aria-label="Consultar ${producto.nombre} por WhatsApp">↗<span> WhatsApp</span></a>
        </div>
      </div>`;

    const image = card.querySelector('.producto-imagen');
    image.addEventListener('error', () => image.replaceWith(crearPlaceholderProducto(producto.nombre)), { once: true });
    grid.appendChild(card);
  });

  const estado = document.getElementById('catalogo-estado');
  if (estado) {
    const etiqueta = filtro === 'destacados' ? 'productos recomendados' : filtro === 'todos' ? 'productos' : `productos de ${filtro}`;
    estado.textContent = `${productosFiltrados.length} ${etiqueta} disponibles.`;
  }

  const verTodos = document.getElementById('ver-todos-productos');
  if (verTodos) verTodos.hidden = filtro === 'todos';

  if (desplazar) {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => grid.querySelector('button, a')?.focus({ preventScroll: true }), 450);
  }
}

function explorarCategoria(categoria) {
  filtrarProductos(categoria, null, true);
}

function mostrarTodosLosProductos() {
  mostrarCatalogoCompleto = true;
  filtrarProductos('todos', null, false);
}

function verDescripcion(id) { window.location.href = `producto.html?id=${id}`; }
function generarImagen(nombre) {
  if (!nombre) return 'img/default.jpg';
  return `img/${nombre.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '')}.jpg`;
}
window.addEventListener('DOMContentLoaded', () => {
  const categoriaUrl = new URLSearchParams(window.location.search).get('categoria');
  filtrarProductos(categoriaUrl || 'destacados');
});
