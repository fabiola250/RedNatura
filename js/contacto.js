const flash = document.getElementById('flash-messages');

function showFlash(message, type = 'success') {
  flash.innerHTML = `<div class="flash ${type}">${message}</div>`;
}

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

document.getElementById('contact-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  
  button.disabled = true;
  button.textContent = 'Enviando...';
  
  try {
    // Enviar con encode correcto para Netlify
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    
    if (response.ok) {
      showFlash('¡Mensaje enviado! Gracias, te contactaremos pronto.', 'success');
      form.reset();
      // Limpiar la pantalla de prefill después de enviar
      setTimeout(() => {
        document.getElementById('prefill-display').innerHTML = '';
      }, 1000);
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    console.error('Error enviando formulario:', error);
    showFlash('No pudimos enviar el mensaje. Intenta nuevamente o contáctanos por WhatsApp.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});
