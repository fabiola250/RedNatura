// Respuestas del chatbot
const respuestasBot = {
  bienvenida: "¡Hola! Soy el Asistente IA de RedNatura 🤖. Estoy aquí para ayudarte a encontrar el suplemento perfecto. ¿Qué necesitas?",
  contacto: `📞 **Contáctanos:**

📱 WhatsApp
💬 Chat
📧 Email: fabiola250204@gmail.com`
};

let chatMessages = [];

// Función para enviar mensaje
function sendMessage() {
  const input = document.getElementById('chat-input');
  const mensaje = input.value.trim();
  if (!mensaje) return;

  addMessage(mensaje, 'user');
  input.value = '';

  setTimeout(() => {
    const respuesta = obtenerRespuesta(mensaje);
    addMessage(respuesta, 'bot');
  }, 300);
}

function obtenerRespuesta(texto) {
  const lower = texto.toLowerCase();
  const productoEncontrado = productos.find(p => lower.includes(p.nombre.toLowerCase().split(' ')[0]));
  if (productoEncontrado) {
    return `Encontré **${productoEncontrado.nombre}** - $${productoEncontrado.precio}. ¡Ve a Productos para ver más!`;
  }
  return "¿Quieres buscar un producto, encontrar una sucursal o conocer nuestras ofertas?";
}

// Función para agregar mensaje
function addMessage(texto, tipo) {
  const messagesDiv = document.getElementById('chat-messages');
  const messageEl = document.createElement('div');
  messageEl.className = `message ${tipo}`;
  
  let contenido = texto
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  
  messageEl.innerHTML = contenido;
  messagesDiv.appendChild(messageEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Función para alternar chat
function toggleChat() {
  const chatbot = document.getElementById('chatbot');
  
  if (chatbot.classList.contains('hidden')) {
    chatbot.classList.remove('hidden');
    chatbot.classList.add('show');
    
    if (chatMessages.length === 0) {
      setTimeout(() => {
        addMessage(respuestasBot.bienvenida, 'bot');
        mostrarMenuPrincipal();
        chatMessages.push('bienvenida');
      }, 200);
    }
  } else {
    chatbot.classList.add('hidden');
    chatbot.classList.remove('show');
  }
}

function mostrarMenuPrincipal() {
  const messagesDiv = document.getElementById('chat-messages');
  const menuEl = document.createElement('div');
  menuEl.className = 'chat-menu';
  menuEl.innerHTML = `
    <button class="menu-btn" onclick="mostrarCategorias()">🔍 Productos</button>
    <button class="menu-btn" onclick="mostrarFormularioEstado()">🏪 Sucursales</button>
    <button class="menu-btn" onclick="mostrarContacto()">💬 Contacto</button>
    <button class="menu-btn" onclick="mostrarOfertas()">🎁 Ofertas</button>
  `;
  messagesDiv.appendChild(menuEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function mostrarCategorias() {
  addMessage('¿Qué tipo de producto buscas?', 'bot');
  const messagesDiv = document.getElementById('chat-messages');
  const categoriasEl = document.createElement('div');
  categoriasEl.className = 'chat-menu';
  const categorias = ['Digestión', 'Mental', 'Mujeres', 'Hombres', 'Niños', 'Belleza', 'Inmunológico', 'Energía'];
  categoriasEl.innerHTML = categorias.map(cat => `<button class="menu-btn" onclick="buscarCategoria('${cat}')">${cat}</button>`).join('');
  messagesDiv.appendChild(categoriasEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function buscarCategoria(categoria) {
  const total = productos.filter(p => p.categoria === categoria).length;
  addMessage(`Encontré ${total} productos en ${categoria}. ¡Ve a la sección de Productos!`, 'bot');
  document.getElementById('productos').scrollIntoView({behavior:'smooth'});
  setTimeout(() => {
    filtrarProductos(categoria, document.querySelector('.filtro-btn'));
  }, 500);
}

function mostrarFormularioEstado() {
  addMessage('¿De cuál estado me llamas?', 'bot');
  const messagesDiv = document.getElementById('chat-messages');
  const estadosEl = document.createElement('div');
  estadosEl.className = 'chat-menu';
  estadosEl.innerHTML = estados.map(est => `<button class="menu-btn" onclick="seleccionarEstado('${est}')">${est}</button>`).join('');
  messagesDiv.appendChild(estadosEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function seleccionarEstado(estado) {
  const suc = encontrarSucursalesPorEstado(estado);
  addMessage(`Tenemos ${suc.length} sucursal(es) en ${estado}:`, 'bot');
  
  const messagesDiv = document.getElementById('chat-messages');
  const sucEl = document.createElement('div');
  sucEl.className = 'chat-menu';
  sucEl.innerHTML = suc.map(s => `<button class="menu-btn" onclick="seleccionarSucursal('${s.nombre}', '${s.direccion}', '${s.horario}')">${s.nombre}</button>`).join('');
  messagesDiv.appendChild(sucEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function seleccionarSucursal(nombre, direccion, horario) {
  addMessage(`📍 **${nombre}**\n📮 ${direccion}\n⏰ ${horario}`, 'bot');
  
  const messagesDiv = document.getElementById('chat-messages');
  const botonesEl = document.createElement('div');
  botonesEl.className = 'chat-menu';
  botonesEl.innerHTML = `
    <a href="https://wa.me/5551234567?text=Estoy%20interesado%20en%20la%20sucursal%20de%20${encodeURIComponent(nombre)}" target="_blank" class="menu-btn">💬 WhatsApp</a>
    <button class="menu-btn" onclick="abrirModalSucursal('${nombre}')">✍️ Registrarse</button>
  `;
  messagesDiv.appendChild(botonesEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function abrirModalSucursal(nombreSucursal) {
  const modal = document.getElementById('registro-modal');
  const titulo = modal.querySelector('h2');
  titulo.textContent = `Interés en Sucursal: ${nombreSucursal}`;
  modal.setAttribute('data-tipo', 'sucursal');
  modal.setAttribute('data-nombre', nombreSucursal);
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

function mostrarContacto() {
  addMessage(respuestasBot.contacto, 'bot');
  const messagesDiv = document.getElementById('chat-messages');
  const contactoEl = document.createElement('div');
  contactoEl.className = 'chat-menu';
  contactoEl.innerHTML = `
    <a href="https://wa.me/5551234567?text=Estoy%20interesado%20en%20RedNatura" target="_blank" class="menu-btn">💬 WhatsApp</a>
    <a href="mailto:fabiola250204@gmail.com?subject=Consulta RedNatura" class="menu-btn">📧 Email</a>
  `;
  messagesDiv.appendChild(contactoEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function mostrarOfertas() {
  addMessage('🎁 Productos con DESCUENTO 30% (mayores a $350)\n\n¡Ve a la sección de Productos!', 'bot');
  const messagesDiv = document.getElementById('chat-messages');
  const ofertasEl = document.createElement('div');
  ofertasEl.className = 'chat-menu';
  ofertasEl.innerHTML = `<button class="menu-btn" onclick="document.getElementById('productos').scrollIntoView({behavior:'smooth'})">🛍️ Ver Productos</button>`;
  messagesDiv.appendChild(ofertasEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleChatInput(event) {
  if (event.key === 'Enter') sendMessage();
}

document.addEventListener('DOMContentLoaded', () => {
  // Chat inicia cuando se abre
});
