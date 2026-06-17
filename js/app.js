// Función para filtrar productos
function filtrarProductos(categoria, btn) {
    const productosFiltrados = categoria === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === categoria);

    mostrarProductos(productosFiltrados);

    // Actualizar botón activo
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Función para mostrar productos en grid
function mostrarProductos(lista) {
    const grid = document.getElementById('productos-grid');
    grid.innerHTML = '';

    lista.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        
        // Generar nombre de imagen basado en el nombre del producto
        const imagenSrc = `img/${producto.nombre.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}.jpg`;
        
        // Determinar si aplica descuento (productos > $350)
        const precio = parseInt(producto.precio.replace(/[^0-9]/g, ''));
        const tieneDescuento = precio > 350;
        const precioDescuento = tieneDescuento ? Math.round(precio * 0.7) : null;

        const emojiCategoria = obtenerEmojiCategoria(producto.categoria);

        card.innerHTML = `
            <div class="producto-imagen-container">
                <span class="emoji">${emojiCategoria}</span>
            </div>
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcionCorta}</p>
            <div class="producto-info">
                <p class="precio">$${producto.precio}</p>
                ${tieneDescuento ? `<p class="precio-descuento">Con descuento: $${precioDescuento} (30% OFF)</p>` : ''}
            </div>
            <button class="btn-producto" onclick="irAlDetalle(${producto.id})">Ver Detalles</button>
        `;
        
        grid.appendChild(card);
    });
}

// Función para obtener emoji según categoría
function obtenerEmojiCategoria(categoria) {
    const emojis = {
        'Digestión': '🌿',
        'Mental': '🧘',
        'Mujeres': '🌸',
        'Hombres': '💪',
        'Niños': '👶',
        'Belleza': '✨',
        'Inmunológico': '🛡️',
        'Desintoxicación': '🌱',
        'Control de Peso': '🔥',
        'Energía': '⚡',
        'Glucosa': '💙',
        'Urinario': '💧',
        'Circulación': '❤️',
        'Antioxidantes': '🍇',
        'Articulaciones': '🏃'
    };
    return emojis[categoria] || '🌿';
}

// Función para ir al detalle del producto
function irAlDetalle(productoId) {
    window.location.href = `producto.html?id=${productoId}`;
}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
    cargarSucursales();
});
