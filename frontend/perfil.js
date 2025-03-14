document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("perfil-form");

    // Cargar datos previos si existen
    document.getElementById("alias").value = localStorage.getItem("alias") || "";
    document.getElementById("email").value = localStorage.getItem("email") || "";
    document.getElementById("escuderia").value = localStorage.getItem("escuderia") || "";
    document.getElementById("piloto").value = localStorage.getItem("piloto") || "";
    document.getElementById("pais").value = localStorage.getItem("pais") || "";

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        localStorage.setItem("alias", document.getElementById("alias").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("escuderia", document.getElementById("escuderia").value);
        localStorage.setItem("piloto", document.getElementById("piloto").value);
        localStorage.setItem("pais", document.getElementById("pais").value);

        alert("¡Perfil guardado correctamente!");
    });
});
