import { API_URL } from "../config.js";

async function cargarResultados() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        let tabla = document.getElementById("tabla-resultados");
        if (!tabla) return;

        tabla.innerHTML = "";
        data.forEach(resultado => {
            let fila = `<tr>
                <td>${resultado.alias}</td>
                <td>${resultado.puntos}</td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al cargar resultados:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarResultados);
