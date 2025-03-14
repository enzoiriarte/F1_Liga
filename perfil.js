document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const perfilForm = document.getElementById("perfil-form");
    const accesoPrediccion = document.getElementById("acceso-prediccion");
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
        accesoPrediccion.style.display = "block";  // Muestra el acceso si el usuario está logueado
    }
});

    // Función para manejar el inicio de sesión
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();  // Evitar que el formulario recargue la página
            
            // Obtener valores del formulario
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            // Verificar si hay una cuenta guardada en localStorage
            const userData = JSON.parse(localStorage.getItem(email));

            if (userData && userData.password === password) {
                localStorage.setItem("loggedUser", email); // Guardar sesión del usuario
                window.location.href = "perfil.html"; // Redirigir al perfil
            } else {
                alert("⚠️ Correo o contraseña incorrectos. Intenta de nuevo.");
            }
        });
    }

    // Cargar perfil al entrar en perfil.html
    if (window.location.pathname.includes("perfil.html")) {
        const loggedUser = localStorage.getItem("loggedUser");

        if (loggedUser) {
            const userData = JSON.parse(localStorage.getItem(loggedUser));
            document.getElementById("alias").value = userData.alias;
            document.getElementById("email").value = userData.email;
            document.getElementById("escuderia").value = userData.escuderia;
            document.getElementById("piloto").value = userData.piloto;
            document.getElementById("pais").value = userData.pais;

            // Mostrar botón de acceso al formulario de predicciones
            accesoPrediccion.style.display = "block";
        }
    }

    // Manejar registro de usuario
    if (perfilForm) {
        perfilForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Obtener valores del formulario
            const alias = document.getElementById("alias").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;  // Nuevo campo
            const escuderia = document.getElementById("escuderia").value;
            const piloto = document.getElementById("piloto").value;
            const pais = document.getElementById("pais").value;

            // Guardar datos en localStorage
            localStorage.setItem(email, JSON.stringify({
                alias, email, password, escuderia, piloto, pais
            }));

            alert("✅ Cuenta creada con éxito. Ahora puedes iniciar sesión.");
            window.location.href = "perfil.html";  // Redirigir a perfil
        });
    }
});
