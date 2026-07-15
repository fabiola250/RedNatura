document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const producto = params.get('producto');
  const precio = params.get('precio');
  const form = document.getElementById('contact-form');
  const flash = document.getElementById('flash-messages');
  const whatsappUrl = 'https://wa.me/525555070734?text=Hola%2C%20necesito%20ayuda%20con%20mi%20mensaje%20de%20contacto';

  const showStatus = (type, title, message) => {
    if (!flash) return;

    flash.replaceChildren();
    const notice = document.createElement('div');
    const heading = document.createElement('strong');
    const description = document.createElement('span');
    notice.className = `flash ${type}`;
    heading.textContent = title;
    description.textContent = message;
    notice.append(heading, description);

    if (type === 'error') {
      const whatsappLink = document.createElement('a');
      whatsappLink.className = 'flash-whatsapp';
      whatsappLink.href = whatsappUrl;
      whatsappLink.target = '_blank';
      whatsappLink.rel = 'noopener';
      whatsappLink.textContent = 'Contáctanos por WhatsApp';
      notice.append(whatsappLink);
    }

    flash.append(notice);
  };

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

  form?.addEventListener('submit', async (event) => {
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

    try {
      // Usar FormSubmit de manera directa
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario');
      }

      showStatus('success', '¡Mensaje enviado!', 'Gracias por escribirnos. Te contactaremos lo antes posible.');
      form.reset();
      document.getElementById('prefill-display')?.replaceChildren();
    } catch (error) {
      console.error('Error enviando el formulario:', error);
      showStatus('error', 'Mensaje no enviado', 'No pudimos enviar tu mensaje. Intenta de nuevo o usa nuestro canal directo.');
    } finally {
      button.disabled = false;
      button.classList.remove('is-sending');
      label.textContent = originalLabel;
    }
  });
});
