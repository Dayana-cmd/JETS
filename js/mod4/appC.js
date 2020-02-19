//instancias

const cnxC = new Conexion();
const ioC = new InterfaceC();

//variables globlaes

const btnScan = document.querySelector('#scan');
const nameGrup = document.querySelector('#grupoName');
const contenidoGrupo = document.querySelector('#nameGrup');
const contenidoRubrica = document.querySelector('#rubrica');
const btnGuardar = document.querySelector('#guardar');
const logOut = document.querySelector('#logOut');
const codigo = document.querySelector('#codigo');
const verificar = document.querySelector('#verificar');

const propuesta = document.querySelector('#propuesta');
const emprendimiento = document.querySelector('#emprendimiento');
const presentacion = document.querySelector('#presentacion');

let c1,c2,c3;
let dt1,dt2,dt3;
let arr = [];
let bool = false;

// funciones


btnScan.addEventListener('click',()=>{
        ioC.scan();
});

logOut.addEventListener('click',desconectarse);

// document.addEventListener('DOMContentLoaded',function(){
//     propuesta.classList.remove('reg');
//     propuesta.classList.remove('card-button');
//     propuesta.classList.remove('bg-secondary');

   
//     propuesta.classList.add('card-verde');

//     document.addEventListener('click', function(){
//         propuesta.classList.remove('card-verde');

       
//         propuesta.classList.add('reg');
//         propuesta.classList.add('card-button');
//         propuesta.classList.add('bg-secondary');
//     })
// })

function qrText(result){
    ioC.getProyect(result);
}

function desconectarse() {
    localStorage.clear();
    location.href = '../index.html'
}


verificar.addEventListener('click',()=>{
    const cod = codigo.value;
    if(cod !== ''){
        ioC.getProyect(cod);
    }else{
        alert('Ingrese el Codigo');
    }

});

document.addEventListener('DOMContentLoaded', () => {
     const codigo = localStorage.getItem('codigoQr');
     c1 = localStorage.getItem('cal1');
     c2 = localStorage.getItem('cal2');
     c3 = localStorage.getItem('cal3');

     if(codigo !== null){
        ioC.getProyect(codigo);
     }

    if(c1 === null ){
        propuesta.classList.add('reg');
        propuesta.classList.add('card-button');
        propuesta.classList.add('bg-secondary');    
    }else{
        dt1 = JSON.parse(c1);
        console.log(dt1);
        propuesta.classList.remove('reg');
        propuesta.classList.remove('card-button');
        propuesta.classList.remove('bg-secondary');
        propuesta.classList.add('card-verde');
    }

    if(c2 === null ){
        emprendimiento.classList.add('reg');
        emprendimiento.classList.add('card-button');
        emprendimiento.classList.add('bg-secondary');    
    }else{
         dt2 = JSON.parse(c2);
        console.log(dt2);
        emprendimiento.classList.remove('reg');
        emprendimiento.classList.remove('card-button');
        emprendimiento.classList.remove('bg-secondary');
        emprendimiento.classList.add('card-verde');
    }

    if(c3 === null ){
        presentacion.classList.add('reg');
        presentacion.classList.add('card-button');
        presentacion.classList.add('bg-secondary');    
    }else{
        dt3 = JSON.parse(c3);
        console.log(dt3);
        presentacion.classList.remove('reg');
        presentacion.classList.remove('card-button');
        presentacion.classList.remove('bg-secondary');
        presentacion.classList.add('card-verde');
    }
});

btnGuardar.addEventListener('click',async ()=> {
   
   if(dt1 !== undefined && dt2 !== undefined && dt3 !== undefined){
            arr = arr.concat(dt1,dt2,dt3);
            console.log(arr);
            const idpro = ioC.getIdpro();
            const reg = localStorage.getItem('registro');
            let url = cnxC.getUrl();
            url += 'calificacion' 
            for (let i = 0; i < arr.length; i++) {
                    const x = await arr[i];
                    let json  = {
                        nota:x.nota,
                        idrub:x.idrub,
                        idpro: idpro,
                        reg:reg,
                    }
                    console.log(json);
               await cnxC.post(json,url)
                .then(res => {
                    console.log(res);
                    bool = true;
                })
                .catch(err => {
                    bool = false;
                    console.log(err);
                })
            }
            // debugger;
            if(bool){
                alert('Exito...');
                localStorage.removeItem('cal1');
                localStorage.removeItem('cal2');
                localStorage.removeItem('cal3');
                localStorage.removeItem('codigoQr');
                bool = false;
                arr.length = 0;
                dt1.length = 0;
                dt2.length = 0;
                dt3.length = 0;
                c1 = '';
                c2 = '';
                c3 = '';
                location.reload();
            }
            
            
   }else{
       alert('Complete Las Rubricas');
   }
});