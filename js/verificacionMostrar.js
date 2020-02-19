//variable
const user = JSON.parse(localStorage.getItem('user'));
const cards = document.querySelectorAll('.card');

//Event  Listeners
cargarEventListeners();

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', VerificarRol);
}


//funciones
function VerificarRol() {
    switch (user.idrol) {
        case 8:
            // Swal.fire({
            //     type: 'success',
            //     title: 'Bienvenido Administrador =.D',
            //     showConfirmButton: false,
            //     timer: 2500
            //   })
            break;
        case 4:
            cards.forEach((e, index) => {
                if (index === 4 || index === 5 || index === 6 || index === 2) {
                    e.style.display = 'none'
                } else if (index > 0) {
                    cards[index].parentElement.classList.remove('col-4')
                    cards[index].parentElement.classList.add('col-12')
                }
            })
            break;
        case 9:
            cards.forEach((e, index) => {
                if (index === 5 || index === 6) {
                    e.style.display = 'none'
                } else if (index > 0) {
                    cards[index].parentElement.classList.remove('col-4')
                    cards[index].parentElement.classList.add('col-6')
                    if(index === 3 || index === 4) {
                        cards[index].parentElement.classList.remove('col-6')
                    cards[index].parentElement.classList.add('col-12')
                    }
                }
            })
            break;
        case 3:
            location.href = './html/feria.html'
            break;
        default:
            cards.forEach((e, index) => {
                if (index != 0 && index != 3) {
                    e.style.display = 'none'
                } else if (index === 3) {
                    cards[index].parentElement.classList.remove('col-4')
                    cards[index].parentElement.classList.add('col-12')
                }
            })
            break;
    }
}
