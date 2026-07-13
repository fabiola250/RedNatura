// contacto.js — minimal script to prefill hidden fields from query params
// and improve UX without preventing the native form POST (Netlify-friendly).
document.addEventListener('DOMContentLoaded', function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const producto = params.get('producto');
    const precio = params.get('precio');

    // Prefill hidden fields if present
    const productoHidden = document.getElementById('producto-hidden');
    if (producto && productoHidden) productoHidden.value = producto;

    const precioHidden = document.getElementById('precio-hidden') || document.querySelector('input[name="precio"]');
    if (precio && precioHidden) precioHidden.value = precio;

    // Show a small prefill box to the user (non-intrusive)
    const prefillDisplay = document.getElementById('prefill-display');
    if (prefillDisplay && producto) {
      prefillDisplay.innerHTML = `<div class="prefill-box">Interesado en: <strong>${escapeHtml(producto)}</strong>${precio ? ' — ' + escapeHtml(precio) : ''}</div>`;
    }

    // Prefill asunto/mensaje if inputs exist
    const asuntoInput = document.getElementById('asunto');
    const mensajeTextarea = document.getElementById('mensaje');
    if (producto && asuntoInput) asuntoInput.value = `Consulta / Pedido: ${producto}`;
    if (producto && mensajeTextarea && !mensajeTextarea.value) {
      mensajeTextarea.value = `Hola, estoy interesada/o en el producto: ${producto}${precio ? '\nPrecio: ' + precio : ''}\nPor favor contáctenme.`;
    }

    // Improve UX: disable submit button after click to avoid double submissions
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        const btn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (btn) {
          try { btn.disabled = true; btn.classList.add('disabled'); } catch (err) {}
        }
        // allow native submit to proceed — important for Netlify
        setTimeout(() => { if (btn) btn.disabled = false; }, 5000);
      });
    }
  } catch (err) {
    // don't break the page if anything goes wrong
    console.warn('contacto.js error:', err);
  }
});

// small helper to avoid XSS when injecting params into the page
function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
