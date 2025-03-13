document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "TU_URL_DEL_GOOGLE_SCRIPT_AQUÍ"; // Reemplaza con tu URL

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.puntos - a.puntos);
            cargarTabla(data);
            generarGrafico(data);
        })
        .catch(error => console.error("Error al cargar datos:", error));
});

function cargarTabla(datos) {
    let tbody = document.getElementById("tabla-body");
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

function generarGrafico(datos) {
    const ctx = document.getElementById("chart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: datos.map(item => item.alias),
            datasets: [{
                label: "Puntos",
                data: datos.map(item => item.puntos),
                backgroundColor: "rgba(255, 30, 0, 0.7)"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
