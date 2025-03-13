// Archivo: menu.js
import { gps } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu-carreras");

    if (menu) {
        gps.forEach(gp => {
            let link = document.createElement("a");
            link.href = gp.url;
            link.innerText = gp.nombre;
            menu.appendChild(link);
        });
    }
});
