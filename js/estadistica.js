//Variables Globales
const carreras = document.getElementById('grafica_Carreras');
const genero = document.getElementById('grafica_Genero');
const genero1 = document.getElementById('grafica_Genero1');

let titulos = '';
let datos = '';
let subTitulos = '';
let coloresFondo = '';
let coloresBorde = '';

//Event Listener 
cargarEventListeners();

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', cargarGraficas);
}

//Funciones
function cargarGraficas(e) {
    graficaBarraCarreras();
    graficaDonalGenero();

}

function graficaBarraCarreras() {
    datos = [12, 19, 3, 5, 2, 3];
    subTitulos = 'Cantidad de Estudiantes';
    coloresFondo = ['rgba(255, 99, 132, .8)', 'rgba(54, 162, 235, .8)', 'rgba(255, 206, 86, .8)', 'rgba(75, 192, 192, .8)', 'rgba(153, 102, 255, .8)', 'rgba(255, 159, 64, .8)'];
    coloresBorde = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'];
    titulos = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    let barraCarrera = new Chart(carreras, {
        type: 'bar',
        data: {
            labels: titulos,
            datasets: [{
                label: subTitulos,
                data: datos,
                backgroundColor: coloresFondo,
                borderColor: coloresBorde,
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

function graficaDonalGenero() {
    datos = [12, 19]
    titulos = ['Reds', 'Blue'];
    coloresFondo = ['rgba(255, 99, 132, .8)','rgba(54, 162, 235, .8)'];
    coloresBorde = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'];
    donalGenero = new Chart(genero, {
        type: 'doughnut',
        data: {
            labels: titulos,
            datasets: [{
                label: 'sas',
                data: datos,
                backgroundColor: coloresFondo,
                borderColor: coloresBorde,
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },      
        }
    });

    donalGenero = new Chart(genero1, {
        type: 'doughnut',
        data: {
            labels: titulos,
            datasets: [{
                label: 'sas',
                data: datos,
                backgroundColor: coloresFondo,
                borderColor: coloresBorde,
                borderWidth: 1
            }]
        },
        options: {
           legend: {
                display: false
            },
        }
    });
}