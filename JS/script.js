// Simulando una "base de datos" de usuarios registrados
let usuariosRegistrados = [];

// Función para verificar si el nombre de usuario ya está registrado
function esUsuarioRegistrado(usuario) {
    return usuariosRegistrados.some(user => user.usuario === usuario);
}

// Función para validar si la contraseña es adecuada (al menos 6 caracteres y un carácter especial)
function esContraseñaValida(contraseña) {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;  // Verifica si tiene un carácter especial
    return contraseña.length >= 6 && regex.test(contraseña);
}

// Función para manejar el registro de un nuevo usuario
document.getElementById("formulario-registrarse").addEventListener("submit", function(evento) {
    evento.preventDefault();  // Evita el envío tradicional del formulario

    // Obtiene los valores ingresados en el formulario
    const nombre = document.getElementById("nombre").value;
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const divMensaje = document.getElementById("mensaje");

    // Verifica que todos los campos estén completos
    if (!nombre || !usuario || !contraseña) {
        divMensaje.textContent = "Por favor, completa todos los campos.";
        divMensaje.style.color = "red";
        return;
    }

    // Verifica si el usuario ya está registrado
    if (esUsuarioRegistrado(usuario)) {
        divMensaje.textContent = "El nombre de usuario ya está registrado.";
        divMensaje.style.color = "red";
        return;
    }

    // Verifica si la contraseña es válida
    if (!esContraseñaValida(contraseña)) {
        divMensaje.textContent = "La contraseña debe tener al menos 6 caracteres e incluir un carácter especial.";
        divMensaje.style.color = "red";
        return;
    }

    // Si todo es válido, registra el nuevo usuario
    usuariosRegistrados.push({ nombre, usuario, contraseña });
    divMensaje.textContent = "¡Registro exitoso! Ahora puedes iniciar sesión.";
    divMensaje.style.color = "green";

    // Reinicia el formulario de registro
    document.getElementById("formulario-registrarse").reset();
});

// Función para manejar el inicio de sesión
document.getElementById("formulario-login").addEventListener("submit", function(evento) {
    evento.preventDefault();  // Evita el envío tradicional del formulario

    // Obtiene los valores ingresados en el formulario
    const usuario = document.getElementById("login-usuario").value;
    const contraseña = document.getElementById("login-contraseña").value;
    const divMensaje = document.getElementById("mensaje");

    // Busca el usuario registrado con las credenciales ingresadas
    const usuarioEncontrado = usuariosRegistrados.find(user => user.usuario === usuario && user.contraseña === contraseña);

    // Si no se encuentra el usuario, muestra un mensaje de error
    if (!usuarioEncontrado) {
        divMensaje.textContent = "Credenciales incorrectas. Intenta nuevamente.";
        divMensaje.style.color = "red";
        return;
    }

    // Si las credenciales son correctas, muestra un mensaje de bienvenida
    divMensaje.textContent = `¡Bienvenido, ${usuarioEncontrado.nombre}!`;
    divMensaje.style.color = "green";
});

// Mostrar formulario de registro al hacer clic en "Regístrate"
document.getElementById("mostrar-registrarse").addEventListener("click", function() {
    document.getElementById("seccion-login").style.display = "none";
    document.getElementById("seccion-registrarse").style.display = "block";
    document.getElementById("mensaje").textContent = ""; // Limpiar mensajes
});

// Mostrar formulario de inicio de sesión al hacer clic en "Inicia sesión"
document.getElementById("mostrar-login").addEventListener("click", function() {
    document.getElementById("seccion-registrarse").style.display = "none";
    document.getElementById("seccion-login").style.display = "block";
    document.getElementById("mensaje").textContent = ""; // Limpiar mensajes
});