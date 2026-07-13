function encodeFormData(formData) {
  return new URLSearchParams(formData).toString();
}

async function enviarFormulario(event) {
  event.preventDefault();
  const form = event.target;
  if (!form || !form.reportValidity()) return false;

  const telefono = (form.telefono?.value || '').replace(/\D/g, '');
  if (telefono.length < 7) {
    alert('Introduce un teléfono válido.');
    return false;
  }

  const button = form.querySelector('button[type="submit"]');
  const confirmation = document.getElementById('mensaje-confirmacion');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'Enviando...';

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(new FormData(form))
    }).then(response => {
      if (!response.ok) throw new Error('No se pudo registrar el formulario');
    });

    confirmation.innerHTML = '<div class="form-message success">¡Listo! Recibimos tus datos. Te contactaremos pronto.</div>';
    form.reset();
    setTimeout(cerrarRegistro, 1800);
  } catch (error) {
    console.error('Error enviando formulario:', error);
    confirmation.innerHTML = '<div class="form-message error">No pudimos enviar tus datos. Intenta nuevamente o escríbenos por WhatsApp.</div>';
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }

  return false;
}

function abrirRegistroCon(tipo) {
  const modal = document.getElementById('registro-modal');
  const inputTipo = document.getElementById('tipo');
  if (inputTipo) inputTipo.value = tipo || '';
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('show');
  }
}

function cerrarRegistro() {
  const modal = document.getElementById('registro-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('show');
  }
}
