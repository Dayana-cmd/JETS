// instancias 

const cnx = new Conexion();
const io = new Interface();


//variables globales

const digito = document.querySelector('#digitos');
const verificar = document.querySelector('#verificar');
const registrar = document.querySelector('#reg');
const registroTotal = document.querySelector('#totalreg');
const scan = document.querySelector('#scan');
const credencial = document.querySelector('#credencial');
const textoReg = document.querySelector('#txtRegistro');
const close = document.querySelector('#salir');
const cancel = document.querySelector('#cancel');




//funciones

verificar.addEventListener('click',() => {
    console.log(digito.value);
    const valor = digito.value;
    io.datosPersona(valor);
});

registrar.addEventListener('click', () => {
    const estado = io.getEstado();
    if (estado === 'N') {
        const id = io.getId();
        io.registrarPersona(id);
    } else if (estado === 'R') {
        alert('Ya se Encuentra Registrado');
    } else {
        alert('No hay datos');
    }
});

scan.addEventListener('click', () => {
    io.scan();
});

credencial.addEventListener('click',()=>{
    const qr = io.getQr();
    const nombre = io.getNombre();
    const tipo = io.getTipo();
    if(qr !== null && nombre !== null && tipo !== null){
        io.credencialPdf(qr,nombre,tipo);
    }else{
        alert('No hay datos');
    }
});

close.addEventListener('click',()=>{
    io.limpiar();
    digito.value = '';
});

cancel.addEventListener('click',() => {
    io.limpiar();
    digito.value = '';
})



function textQr(texto) {
    io.datosQr(texto);
}

