import { API_URL } from "../config.js";

async function cargarPredicciones() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Orden cronológico descendente

        let tabla = document.getElementById("tabla-predicciones");
        if (!tabla) return;

        tabla.innerHTML = "";
        data.forEach(prediccion => {
            let fila = `<tr>
                <td>${prediccion.alias}</td>
                <td>${prediccion.prediccion}</td>
                <td>${new Date(prediccion.fecha).toLocaleDateString()}</td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al cargar predicciones:", error);
    }
}

function filtrarPredicciones() {
    let input = document.getElementById("buscarAlias").value.toLowerCase();
    let filas = document.querySelectorAll("#tabla-predicciones tr");

    filas.forEach(fila => {
        let alias = fila.children[0].innerText.toLowerCase();
        fila.style.display = alias.includes(input) ? "" : "none";
    });
}

document.addEventListener("DOMContentLoaded", cargarPredicciones);
