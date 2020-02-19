//variable
const user = JSON.parse(localStorage.getItem('user'));
const inscribir = document.querySelectorAll('.inscribir');
const encuesta = document.querySelectorAll('.encuesta');
const logOut = document.querySelector('#logOut');

//Event  Listeners
cargarEventListeners();

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', VerificarRol);

    logOut.addEventListener('click',desconectarse);
}


//funciones
function VerificarRol() {
    if (user.idrol === 1) {
        inscribir.forEach((e,index) => {
            e.style.display = 'none'
        })

        encuesta.forEach((e,index) => {
            encuesta[index].parentElement.classList.remove('col-6')
            encuesta[index].parentElement.classList.add('col-12')
        })
    }
}

function desconectarse() {
    localStorage.clear();
    location.href = '../index.html'
}


