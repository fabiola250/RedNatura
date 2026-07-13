function formatMoneda(value) {
  return Number(value).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}

const params = new URLSearchParams(window.location.search);
const productoId = Number.parseInt(params.get('id'), 10);
const producto = productos.find(item => item.id === productoId);
const detalle = document.getElementById('producto-detalle');

if (!producto) {
  detalle.innerHTML = '<div class="empty-state"><h3>Producto no encontrado.</h3><p>Regresa al catálogo para explorar todas las opciones disponibles.</p><a class="cta-btn cta-primary" href="index.html#productos">Volver al catálogo</a></div>';
} else {
  const precio = Number(producto.precio) || 0;
  const tieneDescuento = precio > 350;
  const precioFinal = tieneDescuento ? Math.round(precio * 0.7) : precio;
  const ahorro = precio - precioFinal;
  document.title = `${producto.nombre} | RedNatura`;

  detalle.innerHTML = `
    <div class="detail-layout">
      <div class="detail-visual">
        <div class="detail-image-wrap">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="detail-image">
          ${tieneDescuento ? `<div class="detail-promo"><span>Promoción especial</span><strong>30% menos</strong></div>` : ''}
        </div>
      </div>
      <article class="detail-copy">
        <a href="index.html#productos" class="detail-category">← Volver a ${producto.categoria || 'productos'}</a>
        <h1>${producto.nombre}</h1>
        <p class="detail-presentation">${producto.presentacion}</p>
        <p class="detail-description">${producto.descripcionLarga}</p>
        <div class="detail-price">
          <div class="price-stack">
            ${tieneDescuento ? `<span class="price-label">Precio regular</span><span class="precio original">${formatMoneda(precio)}</span><span class="price-label">Precio con promoción</span><strong class="precio-descuento">${formatMoneda(precioFinal)}</strong>` : `<span class="price-label">Precio</span><strong class="precio-descuento">${formatMoneda(precioFinal)}</strong>`}
          </div>
          ${tieneDescuento ? `<span class="saving-pill">Ahorras ${formatMoneda(ahorro)}</span>` : ''}
        </div>
        <div class="detail-actions">
          <a class="btn btn-primary" href="contacto.html?producto=${encodeURIComponent(producto.nombre)}&precio=${encodeURIComponent(formatMoneda(precioFinal))}">Pedir información</a>
          <a class="btn btn-outline" href="https://wa.me/525555070734?text=${encodeURIComponent(`Hola, estoy interesado en ${producto.nombre} por ${formatMoneda(precioFinal)}.`)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
        </div>
        <div class="detail-sections">
          <section class="detail-card"><h2>Ingredientes</h2><ul class="detail-list">${producto.ingredientes.map(item => `<li>${item}</li>`).join('')}</ul></section>
          <section class="detail-card"><h2>Beneficios</h2><ul class="detail-list">${producto.beneficios.map(item => `<li>${item}</li>`).join('')}</ul></section>
          <section class="detail-card usage-card"><h2>Modo de uso</h2><p>${producto.modoUso}</p></section>
        </div>
      </article>
    </div>`;

  const image = detalle.querySelector('.detail-image');
  image.addEventListener('error', () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'producto-placeholder';
    placeholder.textContent = producto.nombre;
    image.replaceWith(placeholder);
  }, { once: true });
}
