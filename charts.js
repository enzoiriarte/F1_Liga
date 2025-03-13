// Archivo: charts.js
export function generarGrafico(datos) {
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
