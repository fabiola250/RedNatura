function formatMoneda(value) {
  return Number(value).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}

const params = new URLSearchParams(window.location.search);
const productoId = Number.parseInt(params.get('id'), 10);
const producto = productos.find(item => item.id === productoId);
const detalle = document.getElementById('producto-detalle');

const paquetes = [
  {
    nombre: 'Energía masculina',
    productos: ['FLUSSORIN', 'DUGRAN-X'],
    etiqueta: 'Vitalidad en pareja',
    descripcion: 'Combina Flussorin y Dugran-X en una sola compra para acompañar objetivos de vitalidad y bienestar sexual masculino. Para una mejor salud sexual.',
    precio: 932
  },
  {
    nombre: 'Bienestar femenino',
    productos: ['PLENNA', 'FEMICOL', 'FEMBALANZ'],
    etiqueta: 'Cuidado integral',
    descripcion: 'Reúne Plenna, Femicol y Fembalanz para acompañar el bienestar femenino, el equilibrio diario y distintas etapas del ciclo menstrual. Este paquete apoya a mejorar la salud femenina.',
    precio: 1305
  }
];

function obtenerPaquete(productoActual) {
  return paquetes.find(paquete => paquete.productos.includes(productoActual.nombre));
}

function renderPaquete(paquete) {
  if (!paquete) return '';
  const productosPaquete = paquete.productos.map(nombre => productos.find(item => item.nombre === nombre)).filter(Boolean);
  const lista = productosPaquete.map(item => `<li><img src="${item.imagen}" alt=""><span><strong>${item.nombre}</strong><small>${formatMoneda(item.precio)}</small></span></li>`).join('');
  const consulta = encodeURIComponent(`Hola, quiero información sobre el paquete ${paquete.nombre} con ${paquete.productos.join(', ')} por ${formatMoneda(paquete.precio)}.`);

  return `
    <aside class="bundle-card" aria-labelledby="bundle-title">
      <span class="bundle-kicker">${paquete.etiqueta}</span>
      <h2 id="bundle-title">También puedes elegir el paquete “${paquete.nombre}”</h2>
      <p>${paquete.descripcion}</p>
      <ul class="bundle-products">${lista}</ul>
      <div class="bundle-total">
        <span><small>Precio del paquete</small><strong>${formatMoneda(paquete.precio)}</strong></span>
      </div>
      <div class="bundle-actions">
        <a class="btn btn-primary" href="contacto.html?producto=${encodeURIComponent(`Paquete ${paquete.nombre}: ${paquete.productos.join(' + ')}`)}&precio=${encodeURIComponent(formatMoneda(paquete.precio))}">Pedir información del paquete</a>
        <a class="btn btn-outline" href="https://wa.me/525555070734?text=${consulta}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
      </div>
    </aside>`;
}

function urlContactoProducto() {
  const precio = Number(producto.precio) > 350 ? Math.round(Number(producto.precio) * 0.7) : Number(producto.precio);
  return `contacto.html?producto=${encodeURIComponent(producto.nombre)}&precio=${encodeURIComponent(formatMoneda(precio))}`;
}

function urlContactoPaquete(paquete) {
  const contenido = `Paquete ${paquete.nombre}: ${paquete.productos.join(' + ')}`;
  return `contacto.html?producto=${encodeURIComponent(contenido)}&precio=${encodeURIComponent(formatMoneda(paquete.precio))}`;
}

function abrirDecisionPaquete() {
  const modal = document.getElementById('package-choice');
  if (!modal) {
    window.location.href = urlContactoProducto();
    return;
  }
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  modal.querySelector('[data-package-accept]')?.focus();
}

function cerrarDecisionPaquete() {
  document.getElementById('package-choice')?.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('[data-product-request]')?.focus();
}

function elegirPaquete() {
  const paquete = obtenerPaquete(producto);
  window.location.href = paquete ? urlContactoPaquete(paquete) : urlContactoProducto();
}

function elegirSoloProducto() {
  window.location.href = urlContactoProducto();
}

if (!producto) {
  detalle.innerHTML = '<div class="empty-state"><h3>Producto no encontrado.</h3><p>Regresa al catálogo para explorar todas las opciones disponibles.</p><a class="cta-btn cta-primary" href="index.html#productos">Volver al catálogo</a></div>';
} else {
  const precio = Number(producto.precio) || 0;
  const tieneDescuento = precio > 350;
  const precioFinal = tieneDescuento ? Math.round(precio * 0.7) : precio;
  const ahorro = precio - precioFinal;
  const paquete = obtenerPaquete(producto);
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
          ${paquete ? '<button class="btn btn-primary" type="button" data-product-request onclick="abrirDecisionPaquete()">Pedir información</button>' : `<a class="btn btn-primary" href="${urlContactoProducto()}">Pedir información</a>`}
          <a class="btn btn-outline" href="https://wa.me/525555070734?text=${encodeURIComponent(`Hola, estoy interesado en ${producto.nombre} por ${formatMoneda(precioFinal)}.`)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
        </div>
        <div class="detail-sections">
          <section class="detail-card"><h2>Ingredientes</h2><ul class="detail-list">${producto.ingredientes.map(item => `<li>${item}</li>`).join('')}</ul></section>
          <section class="detail-card"><h2>Beneficios</h2><ul class="detail-list">${producto.beneficios.map(item => `<li>${item}</li>`).join('')}</ul></section>
          <section class="detail-card usage-card"><h2>Modo de uso</h2><p>${producto.modoUso}</p></section>
        </div>
        ${renderPaquete(paquete)}
      </article>
    </div>
    ${paquete ? `<div id="package-choice" class="package-choice hidden" role="dialog" aria-modal="true" aria-labelledby="package-choice-title" aria-describedby="package-choice-description">
      <div class="package-choice__panel">
        <button class="package-choice__close" type="button" onclick="cerrarDecisionPaquete()" aria-label="Cerrar">×</button>
        <span class="bundle-kicker">Antes de continuar</span>
        <h2 id="package-choice-title">También puedes elegir el paquete “${paquete.nombre}”</h2>
        <p id="package-choice-description">Incluye ${paquete.productos.join(', ')} por <strong>${formatMoneda(paquete.precio)}</strong>. ¿Deseas pedir información del paquete completo?</p>
        <div class="package-choice__actions">
          <button class="btn btn-primary" type="button" data-package-accept onclick="elegirPaquete()">Aceptar paquete</button>
          <button class="btn btn-outline" type="button" onclick="elegirSoloProducto()">Rechazar y continuar solo con ${producto.nombre}</button>
        </div>
      </div>
    </div>` : ''}`;

  const image = detalle.querySelector('.detail-image');
  image.addEventListener('error', () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'producto-placeholder';
    placeholder.textContent = producto.nombre;
    image.replaceWith(placeholder);
  }, { once: true });

  document.getElementById('package-choice')?.addEventListener('click', event => {
    if (event.target.id === 'package-choice') cerrarDecisionPaquete();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !document.getElementById('package-choice')?.classList.contains('hidden')) cerrarDecisionPaquete();
  });
}
