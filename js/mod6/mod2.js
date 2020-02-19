//variables globales
const emprendimientos = document.querySelector('#n14');
const costo = document.querySelector('#n15');
const soluciones = document.querySelector('#n16');
const conpentencia = document.querySelector('#n17');
const negocio = document.querySelector('#n18');

const cEmprendimientos = document.querySelector('#c14');
const cCosto = document.querySelector('#c15');
const cSoluciones = document.querySelector('#c16');
const cCompetencia = document.querySelector('#c17');
const cNegocio = document.querySelector('#c18');

const guardar = document.querySelector('#guardar');

let rub1,rub2,rub3,rub4,rub5;

let arr = [];


emprendimientos.addEventListener('click',()=>{
    console.log('14');
    
});

costo.addEventListener('click',()=>{
    console.log('15');
    
});

soluciones.addEventListener('click',()=>{
    console.log('16');
    
});

conpentencia.addEventListener('click',()=>{
    console.log('17');
    
});

negocio.addEventListener('click',()=>{
    console.log('18');
    
});


cEmprendimientos.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub1 = {
           idrub:14,
           nota:valor.value
       }
    }
    
});

cCosto.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas1"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub2 = {
           idrub:15,
           nota:valor.value
       }
    }
    
});

cSoluciones.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas2"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub3 = {
           idrub:16,
           nota:valor.value
       }
    }
    
});

cCompetencia.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas3"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub4 = {
           idrub:17,
           nota:valor.value
       }
    }
    
});

cNegocio.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas4"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub5 = {
           idrub:18,
           nota:valor.value
       }
    }
    
});

guardar.addEventListener('click',()=>{
    console.log('Guardado');
    console.log(rub1,rub2,rub3,rub4,rub5);
    if(rub1 !== undefined &&  rub2 !== undefined && rub3 !== undefined && rub4 !== undefined &&
        rub5 !== undefined){
            arr.push(rub1);
            arr.push(rub2);
            arr.push(rub3);
            arr.push(rub4);
            arr.push(rub5);
            console.log(arr);
            localStorage.setItem('cal2', JSON.stringify(arr));
            arr.length = 0;
            location.href = './feria.html';
        }else{
            alert('Califique todas las opciones')
        }
    
});