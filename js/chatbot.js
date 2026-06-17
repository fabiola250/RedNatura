// Respuestas del chatbot
const respuestasBot = {
  bienvenida: "¡Hola! Soy el Asistente IA de RedNatura 🤖. Estoy aquí para ayudarte a encontrar el suplemento perfecto para tu bienestar. Escribe 'ayuda' para ver mis opciones.",
  
  ayuda: `📋 **Aquí puedo ayudarte:**

🔍 **Búsqueda de productos:** Cuéntame qué necesitas (digestión, energía, belleza, etc.)
📦 **Detalles de productos:** Pregunta por ingredientes, beneficios o modo de uso
🏪 **Sucursales:** ¿Dónde nos encontramos?
💬 **Contacto:** Cómo comunicarte con nosotros
🎁 **Ofertas:** Productos con descuento del 30% (mayores a $350)

Escribe una palabra clave o tu pregunta:`,

  descuento: `🎁 **¡OFERTA ESPECIAL!** 🎁

Todos los productos con precio superior a $350 tienen un **descuento automático del 30%**.

Algunos productos destacados con descuento:
- KRONNOS+ 
- BLUNNER NF
- MUSH KAFFI
- RED KAFFI
- KAVARNA
- KAFICHAI
- RESVIV NF

¿Quieres conocer más sobre alguno de estos?`,

  sucursales: `📍 **Nuestras Sucursales:**

1. **Sucursal Centro** - Ciudad de México
   Reforma 505 | Lun-Sab: 9AM-8PM

2. **Sucursal Sur** - Xochimilco
   Calle Allende 123 | Lun-Sab: 10AM-7PM

3. **Sucursal Norte** - Ecatepec
   Blvd. Benito Juárez 456 | Lun-Sab: 9:30AM-8:30PM

4. **Sucursal Oriente** - Iztapalapa
   Calle 5 de Mayo 789 | Lun-Sab: 9AM-7PM

¿Necesitas más información de alguna sucursal?`,

  contacto: `📞 **Formas de contactarnos:**

📱 **Teléfono:** 555-507-0734
📧 **Email:** fabiola250204@gmail.com
💬 **Chat:** Estoy disponible en esta ventana

**Horario de atención:** Lun-Sab 9AM-8PM

Haz clic en "Estoy interesado" en cualquier producto para enviar un formulario de contacto directo.`,

  digestión: `🌿 **Productos para Digestión:**

- **PROBI GO!** - Prebióticos y probióticos ($1,098)
- **NORANTRIX** - Té herbolario ($480)
- **DIALEGRI NF** - Bienestar digestivo ($555)
- **OXIALOE NF** - Sábila y extractos ($802)
- **VENTRE TEA** - Infusión ($292)
- **OMEPAX** - Salud digestiva

Todos estos favorecen la digestión y el equilibrio intestinal. ¿Quieres más detalles?`,

  mental: `🧘 **Productos para Salud Mental:**

- **ZENDRA** - Reduce estrés ($807)
- **SERENTRA** - Relajación y sueño ($619)

Ideales para equilibrio emocional, memoria y concentración. ¿Te interesa conocer más?`,

  mujeres: `🌸 **Productos para Mujeres:**

- **FEMBALANZ** - Equilibrio femenino ($900)
- **PLENNA** - Equilibrio hormonal

Especialmente diseñados para salud urinaria, intestinal y equilibrio hormonal. ¿Necesitas más información?`,

  energía: `⚡ **Productos para Energía:**

- **BLUNNER NF** - Bebida energizante ($625)
- **MUSH KAFFI** - Café con hongos ($805.50)
- **RED KAFFI** - Café funcional ($934)
- **KAVARNA** - Café con antioxidantes ($717)
- **KAFICHAI** - Café con chai ($769)
- **PRO SHAKE** - Capuchino o Fresa ($983)

Aumentan energía sin cafeína excesiva. ¿Cuál te atrae?`,

  belleza: `✨ **Productos para Belleza:**

- **FEMICOL** - Colágeno ($---)
- **RENAISS en polvo** - Colágeno ($---)
- **RENAISS Crema** - Crema tópica ($---)

Para piel, cabello y uñas saludables. ¿Quieres detalles?`,

  peso: `🔥 **Control de Peso:**

- **LEVIUS** - Control de apetito ($516)
- **LEVIUS NIGHT** - Para dormir ($593)
- **Gummys RedNatura** - Gomitas ($697)
- **RED KAFFI** - Café funcional ($934)

Todos con descuento 30%. ¿Te interesa?`,

  niños: `👶 **Productos para Niños:**

- **GELTYVIT GUMMYS** - Multivitamínico ($730)
- **4 KIDDY'S GUMMYS** - Gomitas ($728)
- **4 KIDDY'S NF** - Líquido ($494)

Nutrición completa y deliciosa. ¿Necesitas más info?`,

  inmunologia: `🛡️ **Para el Sistema Inmunológico:**

- **ANT1-VR** - Defensas ($450)
- **EPAX NF** - Omega 3 ($---)
- **BLEX** - Defensas y energía ($---)

Fortalece defensas naturales. ¿Cuál prefieres?`
};

// Palabras clave para respuestas
const palabrasClave = {
  'ayuda': 'ayuda',
  'digestión': 'digestión',
  'digestivo': 'digestión',
  'mental': 'mental',
  'estrés': 'mental',
  'mujeres': 'mujeres',
  'mujer': 'mujeres',
  'femenino': 'mujeres',
  'energía': 'energía',
  'energético': 'energía',
  'café': 'energía',
  'belleza': 'belleza',
  'piel': 'belleza',
  'cabello': 'belleza',
  'peso': 'peso',
  'adelgazar': 'peso',
  'control': 'peso',
  'niños': 'niños',
  'niño': 'niños',
  'infantil': 'niños',
  'defensas': 'inmunologia',
  'inmune': 'inmunologia',
  'inmunológico': 'inmunologia',
  'sucursales': 'sucursales',
  'ubicación': 'sucursales',
  'dónde': 'sucursales',
  'contacto': 'contacto',
  'teléfono': 'contacto',
  'email': 'contacto',
  'descuento': 'descuento',
  'oferta': 'descuento',
  '30%': 'descuento',
  'promoción': 'descuento'
};

// Variables globales
let chatAbierto = false;
const chatMessages = [];

// Función para obtener respuesta del bot
function obtenerRespuestaBot(pregunta) {
  pregunta = pregunta.toLowerCase().trim();

  // Si la pregunta está vacía
  if (!pregunta) {
    return "Por favor escribe tu pregunta. Puedo ayudarte con productos, sucursales o contacto.";
  }

  // Buscar palabras clave
  for (const [palabra, clave] of Object.entries(palabrasClave)) {
    if (pregunta.includes(palabra)) {
      return respuestasBot[clave] || respuestasBot.ayuda;
    }
  }

  // Buscar en nombres de productos
  const productoEncontrado = productos.find(p => 
    pregunta.includes(p.nombre.toLowerCase()) || 
    pregunta.includes(p.nombre.toLowerCase().split(' ')[0])
  );

  if (productoEncontrado) {
    return `${productoEncontrado.nombre} 🌟
**Precio:** ${productoEncontrado.precio}
**Categoría:** ${productoEncontrado.categoria}
**Descripción:** ${productoEncontrado.descripcionLarga || productoEncontrado.descripcion}
**Modo de uso:** ${productoEncontrado.modoUso}

¿Quieres ver más detalles? Ve a "Nuestros Productos" en el menú.`;
  }

  // Respuesta por defecto
  return `No entendí bien tu pregunta 🤔. Escribe 'ayuda' para ver mis opciones o cuéntame qué necesitas.`;
}

// Función para enviar mensaje
function sendMessage() {
  const input = document.getElementById('chat-input');
  const mensaje = input.value.trim();

  if (!mensaje) return;

  // Agregar mensaje del usuario
  addMessage(mensaje, 'user');
  input.value = '';

  // Obtener respuesta del bot
  setTimeout(() => {
    const respuesta = obtenerRespuestaBot(mensaje);
    addMessage(respuesta, 'bot');
  }, 300);
}

// Función para agregar mensaje al chat
function addMessage(texto, tipo) {
  const messagesDiv = document.getElementById('chat-messages');
  const messageEl = document.createElement('div');
  messageEl.className = `message ${tipo}`;
  
  // Convertir markdown simple a HTML
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
    
    // Primer mensaje de bienvenida
    if (chatMessages.length === 0) {
      setTimeout(() => {
        addMessage(respuestasBot.bienvenida, 'bot');
        chatMessages.push({ tipo: 'bot', texto: respuestasBot.bienvenida });
      }, 200);
    }
  } else {
    chatbot.classList.add('hidden');
    chatbot.classList.remove('show');
  }
}

// Manejar Enter en el input
function handleChatInput(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

// Evento del documento listo
document.addEventListener('DOMContentLoaded', () => {
  // El chat se inicia cuando se abre
});
