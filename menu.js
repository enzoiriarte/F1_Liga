// Archivo: menu.js
import { gps } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    const menuCarreras = document.getElementById("menu-carreras");

    if (menuCarreras) {
        gps.forEach(gp => {
            let link = document.createElement("a");
            link.href = gp.url;
            link.innerText = gp.nombre;
            menuCarreras.appendChild(link);
        });

        // Agregar funcionalidad de dropdown
        const dropdown = document.querySelector(".dropdown");
        dropdown.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }
});
