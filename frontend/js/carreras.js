import { gps } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    const listaGPs = document.getElementById("lista-gps");

    gps.forEach(gp => {
        let item = document.createElement("li");
        let link = document.createElement("a");
        link.href = gp.url;
        link.innerText = gp.nombre;
        item.appendChild(link);
        listaGPs.appendChild(item);
    });
});
