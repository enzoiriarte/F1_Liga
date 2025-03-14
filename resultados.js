document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://script.google.com/macros/s/AKfycbw6xDkqFcYxGWvM3SyLSJLdO_6bR7D-zCEwu5ipEHZSRTWM3WIATYA9NxMuPtbxn70a/exec"; // Reemplaza con tu Google Apps Script URL

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            cargarResultados(data);
        })
        .catch(error => console.error("Error al cargar datos:", error));
});

function cargarResultados(datos) {
    let tbody = document.getElementById("tabla-resultados");
    tbody.innerHTML = "";

    datos.forEach(item => {
        let fila = `<tr>
            <td>${item.alias}</td>
            <td>${item.puntos}</td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}
