document.addEventListener("DOMContentLoaded", function () {
    const loginSection = document.getElementById("login-section");
    const registroSection = document.getElementById("registro-section");
    const accesoPrediccion = document.getElementById("acceso-prediccion");

    const mostrarRegistro = document.getElementById("mostrar-registro");
    const loginForm = document.getElementById("login-form");
    const registroForm = document.getElementById("registro-form");

    // Mostrar formulario de registro
    mostrarRegistro.addEventListener("click", function (event) {
        event.preventDefault();
        loginSection.style.display = "none";
        registroSection.style.display = "block";
    });

    // Registro de usuario
    registroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const alias = document.getElementById("alias").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Guardar datos en localStorage
        localStorage.setItem("alias", alias);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
        location.reload();
    });

    // Inicio de sesión
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (email === storedEmail && password === storedPassword) {
            alert("Inicio de sesión exitoso.");
            loginSection.style.display = "none";
            accesoPrediccion.style.display = "block";
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
});
