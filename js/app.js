// --- Renderizado de productos ---
function formatMoneda(n) {
  if (isNaN(Number(n))) return n;
  return '$' + Number(n).toLocaleString('es-MX', { maximumFractionDigits: 0 });
}

function filtrarProductos(filtro, boton = null) {
  // Quitar la clase activa de todos los botones
  document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
  if (boton) boton.classList.add('active');

  const grid = document.getElementById('productos-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Filtrar productos por categoría
  const productosFiltrados = filtro === 'todos'
    ? productos
    : productos.filter(p => p.categoria && p.categoria.toLowerCase() === filtro.toLowerCase());

  // Crear tarjetas de producto
  productosFiltrados.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto-card';

    // Si no tiene imagen definida, generar nombre de archivo automático
    const imagenSrc = producto.imagen || generarImagen(producto.nombre);

    const precioNum = parseFloat(String(producto.precio).replace(/[^0-9.-]+/g, '')) || 0;
    const tieneDescuento = precioNum > 350;
    const precioDescuento = tieneDescuento ? Math.round(precioNum * 0.7) : null;

    card.innerHTML = `
      <div class="producto-imagen-container">
        <img src="${imagenSrc}" alt="${producto.nombre}" class="producto-imagen" loading="lazy" onerror="this.src='img/default.jpg'">
        ${tieneDescuento ? '<span class="descuento-badge">30% OFF</span>' : ''}
      </div>
      <div class="producto-body">
        <h3>${producto.nombre}</h3>
        <p class="desc-corta">${producto.descripcionCorta || ''}</p>
        <div class="producto-info">
          <div class="precio">${formatMoneda(precioNum)}</div>
          ${tieneDescuento ? `<div class="precio-descuento">Ahora ${formatMoneda(precioDescuento)}</div>` : ''}
        </div>
        <div class="producto-actions">
          <button class="btn" onclick="verDescripcion(${producto.id})">📄 Ver detalles</button>
          <a class="btn btn-whatsapp" href="https://wa.me/52${'5555070734'}?text=${encodeURIComponent('Hola, estoy interesado en ' + producto.nombre + '. ¿Me pueden dar más información?')}" target="_blank" rel="noopener">💬 Consultar por WhatsApp</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// --- Función para abrir detalle de producto ---
function verDescripcion(id) {
  window.location.href = `producto.html?id=${id}`;
}

// --- Generador automático de nombres de imagen ---
function generarImagen(nombre) {
  if (!nombre) return "img/default.jpg";
  return "img/" + nombre.toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-") // reemplaza espacios y caracteres raros por guiones
    .replace(/-+$/,"")            // quita guiones al final
    + ".jpg";
}

// --- Inicialización al cargar la página ---
window.addEventListener('DOMContentLoaded', () => {
  filtrarProductos('todos');
});
