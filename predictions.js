// Archivo: predictions.js
import { API_URL } from "./config.js";
import { generarGrafico } from "./charts.js";

async function cargarDatos() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Ordenar por puntuación
        data.sort((a, b) => b.puntos - a.puntos);

        // Mostrar datos
        cargarTabla(data);
        generarGrafico(data);
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
}

function cargarTabla(datos) {
    let tbody = document.getElementById("tabla-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    datos.forEach((item, index) => {
        let fila = `<tr>
            <td>${index + 1}</td>
            <td>${item.alias}</td>
            <td>${item.puntos}</td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

export function filtrarTabla() {
    let input = document.getElementById("buscarAlias").value.toLowerCase();
    let filas = document.querySelectorAll("#tabla-body tr");

    filas.forEach(fila => {
        let alias = fila.children[1].innerText.toLowerCase();
        fila.style.display = alias.includes(input) ? "" : "none";
    });
}

// Ejecutar la carga de datos al iniciar
document.addEventListener("DOMContentLoaded", cargarDatos);
