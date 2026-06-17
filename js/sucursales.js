const sucursales = [
  {
    id: 1,
    nombre: "Sucursal Centro",
    ciudad: "Ciudad de México",
    direccion: "Avenida Paseo de la Reforma 505, Col. Cuauhtémoc",
    telefono: "555-1234-5678",
    horario: "Lun - Sab: 9:00 AM - 8:00 PM",
    email: "centro@rednatura.com"
  },
  {
    id: 2,
    nombre: "Sucursal Sur",
    ciudad: "Xochimilco",
    direccion: "Calle Allende 123, Col. Centro",
    telefono: "555-2345-6789",
    horario: "Lun - Sab: 10:00 AM - 7:00 PM",
    email: "sur@rednatura.com"
  },
  {
    id: 3,
    nombre: "Sucursal Norte",
    ciudad: "Ecatepec",
    direccion: "Boulevard Benito Juárez 456, Col. Metropólitan",
    telefono: "555-3456-7890",
    horario: "Lun - Sab: 9:30 AM - 8:30 PM",
    email: "norte@rednatura.com"
  },
  {
    id: 4,
    nombre: "Sucursal Oriente",
    ciudad: "Iztapalapa",
    direccion: "Calle 5 de Mayo 789, Col. Jardines de San Juan",
    telefono: "555-4567-8901",
    horario: "Lun - Sab: 9:00 AM - 7:00 PM",
    email: "oriente@rednatura.com"
  }
];

// Función para cargar sucursales
function cargarSucursales() {
  const grid = document.getElementById('sucursales-grid');
  if (!grid) return;
  
  grid.innerHTML = '';

  sucursales.forEach(sucursal => {
    const card = document.createElement('div');
    card.className = 'sucursal-card';

    card.innerHTML = `
      <h3>📍 ${sucursal.nombre}</h3>
      <p><strong>${sucursal.ciudad}</strong></p>
      <p>📮 ${sucursal.direccion}</p>
      <p>☎️ <a href="tel:${sucursal.telefono.replace(/[^0-9]/g, '')}">${sucursal.telefono}</a></p>
      <p>⏰ ${sucursal.horario}</p>
      <p>📧 <a href="mailto:${sucursal.email}">${sucursal.email}</a></p>
    `;

    grid.appendChild(card);
  });
}
