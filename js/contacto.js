// Prefill de datos cuando viene desde un producto
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const producto = params.get('producto');
  const precio = params.get('precio');
  
  if (!producto) return;
  
  document.getElementById('producto-hidden').value = producto;
  document.getElementById('prefill-display').innerHTML = `<div class="prefill-box">Consulta seleccionada: ${producto}${precio ? ` · ${precio}` : ''}</div>`;
  document.getElementById('asunto').value = `Consulta / Pedido: ${producto}`;
  document.getElementById('mensaje').value = `Hola, estoy interesado/a en ${producto}${precio ? ` con precio de ${precio}` : ''}. Por favor contáctenme.`;
});

// El formulario se envía automáticamente con Netlify
// No necesitamos hacer nada más, Netlify lo captura
console.log('Formulario de contacto cargado y listo para Netlify');
