document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://script.google.com/macros/s/AKfycbw6xDkqFcYxGWvM3SyLSJLdO_6bR7D-zCEwu5ipEHZSRTWM3WIATYA9NxMuPtbxn70a/exec"; // Reemplaza con tu Google Apps Script URL

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha descendente
            cargarPredicciones(data);
        })
        .catch(error => console.error("Error al cargar datos:", error));
});

function cargarPredicciones(datos) {
    let tbody = document.getElementById("tabla-predicciones");
    tbody.innerHTML = "";

    datos.forEach(item => {
        let fila = `<tr>
            <td>${item.alias}</td>
            <td>${item.prediccion}</td>
            <td>${item.fecha}</td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

function filtrarPredicciones() {
    let input = document.getElementById("buscarAlias").value.toLowerCase();
    let filas = document.querySelectorAll("#tabla-predicciones tr");

    filas.forEach(fila => {
        let alias = fila.children[0].innerText.toLowerCase();
        fila.style.display = alias.includes(input) ? "" : "none";
    });
}
