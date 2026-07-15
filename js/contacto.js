document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const producto = params.get('producto');
  const precio = params.get('precio');
  const form = document.getElementById('contact-form');
  const flash = document.getElementById('flash-messages');

  if (producto) {
    document.getElementById('producto-hidden').value = producto;
    document.getElementById('precio-hidden').value = precio || '';
    const prefillBox = document.createElement('div');
    prefillBox.className = 'prefill-box';
    prefillBox.textContent = `Consulta seleccionada: ${producto}${precio ? ` · ${precio}` : ''}`;
    document.getElementById('prefill-display').replaceChildren(prefillBox);
    document.getElementById('asunto').value = `Consulta / Pedido: ${producto}`;
    document.getElementById('mensaje').value = `Hola, estoy interesado/a en ${producto}${precio ? ` con precio de ${precio}` : ''}. Por favor contáctenme.`;
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const button = form.querySelector('.btn-send');
    const label = button?.querySelector('.btn-send-label');
    if (!button || !label) return;

    const originalLabel = label.textContent;
    button.disabled = true;
    button.classList.add('is-sending');
    label.textContent = 'Enviando mensaje…';
    flash?.replaceChildren();

    // Enviar el formulario sin mostrar mensaje de éxito
    // El mensaje de éxito se mostrará en gracias.html
    setTimeout(() => {
      form.submit();
    }, 500);
  });
});
