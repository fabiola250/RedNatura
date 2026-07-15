document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const producto = params.get('producto');
  const precio = params.get('precio');
  const form = document.getElementById('contact-form');
  const nextInput = document.getElementById('form-next');
  const flash = document.getElementById('flash-messages');

  if (nextInput) {
    const returnUrl = new URL(window.location.href);
    returnUrl.search = '';
    returnUrl.hash = 'contact-form';
    returnUrl.searchParams.set('success', '1');
    nextInput.value = returnUrl.toString();
  }

  if (params.get('success') === '1' && flash) {
    flash.innerHTML = '<div class="flash success"><strong>¡Mensaje enviado!</strong><span>Gracias por escribirnos. Te contactaremos pronto.</span></div>';
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('success');
    window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
  }

  if (producto) {
    document.getElementById('producto-hidden').value = producto;
    document.getElementById('precio-hidden').value = precio || '';
    document.getElementById('prefill-display').innerHTML = `<div class="prefill-box">Consulta seleccionada: ${producto}${precio ? ` · ${precio}` : ''}</div>`;
    document.getElementById('asunto').value = `Consulta / Pedido: ${producto}`;
    document.getElementById('mensaje').value = `Hola, estoy interesado/a en ${producto}${precio ? ` con precio de ${precio}` : ''}. Por favor contáctenme.`;
  }

  form?.addEventListener('submit', () => {
    const button = form.querySelector('.btn-send');
    const label = button?.querySelector('.btn-send-label');
    if (!button || !label) return;
    button.disabled = true;
    button.classList.add('is-sending');
    label.textContent = 'Enviando mensaje…';
  });
});
