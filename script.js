const usuariosDB = [
    { id: "1", nombre: "Ana García", email: "ana@email.com", edad: 28 },
    { id: "2", nombre: "Carlos López", email: "carlos@email.com", edad: 34 },
    { id: "3", nombre: "María Rodríguez", email: "maria@email.com", edad: 25 },
    { id: "4", nombre: "Juan Pérez", email: "juan@email.com", edad: 41 },
    { id: "5", nombre: "Laura Martínez", email: "laura@email.com", edad: 29 }
];

function buscarUsuario(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuario = usuariosDB.find(u => u.id === id);
            
            if (usuario) {
                resolve(usuario);
            } else {
                reject(new Error(`No se encontró ningún usuario con ID: ${id}`));
            }
        }, 2000);
    });
}

function mostrarCargando() {
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'loading';
    resultDiv.innerHTML = '⏳ Buscando usuario...';
}

function mostrarExito(usuario) {
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'success';
    resultDiv.innerHTML = `
        <div class="user-card">
            <h3>✅ Usuario Encontrado</h3>
            <p><strong>Nombre:</strong> ${usuario.nombre}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Edad:</strong> ${usuario.edad} años</p>
        </div>
    `;
}

function mostrarError(mensaje) {
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'error';
    resultDiv.innerHTML = `
        <p>❌ <strong>Error:</strong> ${mensaje}</p>
    `;
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const userId = document.getElementById('userId').value.trim();
    const resultDiv = document.getElementById('result');
    const btn = document.getElementById('searchBtn');
    
    if (!userId) {
        mostrarError('Por favor ingresa un ID de usuario');
        return;
    }
    
    mostrarCargando();
    btn.disabled = true; 
    
    buscarUsuario(userId)
        .then(usuario => {
            mostrarExito(usuario);
        })
        .catch(error => {
            mostrarError(error.message);
        })
        .finally(() => {
            btn.disabled = false;
            console.log('Búsqueda finalizada');
        });
});