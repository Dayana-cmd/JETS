//instancias 
const cnxE = new Conexion();
const ioE = new InterfacE();
 
//variables globales
let idcon = 0;
let confirmar = 0;
const horario = document.querySelector('#horario');
const digito = document.querySelector('#digitos');
const verificar = document.querySelector('#verificar');
const registrar = document.querySelector('#reg');
// const registroTotal = document.querySelector('#totalreg');
const scan = document.querySelector('#scan');
// const credencial = document.querySelector('#credencial');
const textoReg = document.querySelector('#txtRegistro');
const close = document.querySelector('#salir');
const cancel = document.querySelector('#cancel');

// const inscribir1 = document.querySelector('#1');
// const inscribir2 = document.querySelector('#2');
const inscribir3 = document.querySelector('#ins3');
// const inscribir4 = document.querySelector('#4');
const inscribir5 = document.querySelector('#ins5');

const inscribir7 = document.querySelector('#ins7');
const inscribir8 = document.querySelector('#ins8');


const encuesta1 = document.querySelector('#encuesta1');
const encuesta2 = document.querySelector('#encuesta2');
const encuesta3 = document.querySelector('#encuesta3');
const encuesta4 = document.querySelector('#encuesta4');
const encuesta5 = document.querySelector('#encuesta5');

const rol = Number(localStorage.getItem('rol'));

// funciones


verificar.addEventListener('click',() => {
     
    console.log(digito.value);
    const valor = digito.value;
    ioE.datosPersona(valor);
    
});


scan.addEventListener('click', () => {
    ioE.scan();
});


registrar.addEventListener('click', () => {
    // alert('si');
    const r = ioE.getRegistro();
    console.log(r);
    if(r === undefined || r === null){
        alert('no hay datos');

    }else{
        const tur = document.querySelector('#horario').value;
        if(tur !== ''){
            let json = {
                reg:r,
                idcon:idcon,
                turno:tur
            };
         let url = cnxE.getUrl();
          url += 'registro';   
         cnxE.post(json,url)
         .then(res => {
             console.log(res);
             ioE.limpiar();
             alert('exito');
         })
         .catch(err => {
             console.log(err);
         })
        }else{
            alert('Seleccione un horario');
        }
   
    }
});

close.addEventListener('click',()=>{
    ioE.limpiar();
    digito.value = '';
    horario.value = '';
});

cancel.addEventListener('click',() => {
    ioE.limpiar();
    digito.value = '';
    horario.value = '';
});


inscribir3.addEventListener('click',()=>{
    console.log('3'); 
    idcon = 3;
   
   
});


inscribir5.addEventListener('click',()=>{
    console.log('5'); 
    idcon = 5;
   
});

inscribir7.addEventListener('click',()=>{
    console.log('7'); 
    idcon = 7;
   
});

inscribir8.addEventListener('click',()=>{
    console.log('8'); 
    idcon = 8;
   
});

encuesta1.addEventListener('click',()=>{
    datos();
    if(rol !==1){
        location.href = "./encuestas.html";
        localStorage.setItem('con',7);
    }else{
        if(confirmar === 7){
            location.href = "./encuestas.html";
            localStorage.setItem('con',7);
        }else{
            alert('NO HABILITADA')
        }
    }
    
});

encuesta2.addEventListener('click',()=>{
    datos();
    if(rol !==1){
        location.href = "./encuestas.html";
        localStorage.setItem('con',3);
    }else{
        if(confirmar === 3){
            location.href = "./encuestas.html";
            localStorage.setItem('con',3);
        }else{
            alert('NO HABILITADA')
        }
    }
});

encuesta3.addEventListener('click',()=>{
    datos();
    if(rol !==1){
        location.href = "./encuestas.html";
        localStorage.setItem('con',5);
    }else{
        if(confirmar === 5){
            location.href = "./encuestas.html";
        localStorage.setItem('con',5);
        }else{
            alert('NO HABILITADA')
        }
    }
});

encuesta4.addEventListener('click',()=>{
    datos();
    if(rol !==1){
        location.href = "./encuestas.html";
        localStorage.setItem('con',8);
    }else{
        if(confirmar === 8){
            location.href = "./encuestas.html";
        localStorage.setItem('con',8);
        }else{
            alert('NO HABILITADA')
        }
    }
});

encuesta5.addEventListener('click',()=>{
    if(rol !==1){
        location.href = "./encuestas.html";
    }else{
        alert('NO HABILITADA')
    }
});


const datos = ()=>{
    // debugger
    const reg = Number(localStorage.getItem('registro'));
    let url = cnxE.getUrl();
    url+= `registro-con/${reg}`;
    cnxE.get(url)
     .then(res => {
         console.log(res);
         const datos = res.registro;
         if(datos.length > 0) {
             for (let i = 0; i < datos.length; i++) {
                 const {id ,conferencia:{estado}, conferencia:{ id: confe }} = datos[i];
                     if(estado === 'H'){
                         localStorage.setItem('habilitado',id);
                         confirmar = confe;
                         console.log(confirmar);
                         
                     }
             }
         }else{
             alert('Registrese con el staff')
         }
     })
     .catch(err => {
         console.log(err);
     })
 };

 datos();

 function textQr(texto) {
    //  alert(texto);
    const datos = texto.split('-');
    const text = datos[0];
    document.getElementById('digitos').value = text;
    ioE.datosQr(text);
}

