const claridad = document.querySelector('#n19');
const idioma = document.querySelector('#n20');
const prototipo = document.querySelector('#n21');
const informe = document.querySelector('#n22');

const cClaridad = document.querySelector('#c19');
const cIdioma = document.querySelector('#c20');
const cPrototipo = document.querySelector('#c21');
const cInforme = document.querySelector('#c22');

const guardar = document.querySelector('#guardar');

let rub1,rub2,rub3,rub4;

let arr = [];

claridad.addEventListener('click',()=>{
    console.log('19');
    
});

idioma.addEventListener('click',()=>{
    console.log('20');
    
});

prototipo.addEventListener('click',()=>{
    console.log('21');
    
});

informe.addEventListener('click',()=>{
    console.log('22');
    
});


cClaridad.addEventListener('click',()=>{
    const valor = document.querySelector('input[name="estrellas"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub1 = {
           idrub:19,
           nota:valor.value
       }
    }
    
});

cIdioma.addEventListener('click',()=>{
    const valor = document.querySelector('input[name="estrellas1"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub2 = {
           idrub:20,
           nota:valor.value
       }
    }
    
});

cPrototipo.addEventListener('click',()=>{
    const valor = document.querySelector('input[name="estrellas2"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub3 = {
           idrub:21,
           nota:valor.value
       }
    }
    
});

cInforme.addEventListener('click',()=>{
    const valor = document.querySelector('input[name="estrellas3"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub4 = {
           idrub:22,
           nota:valor.value
       }
    }
    
});


guardar.addEventListener('click',()=>{
    console.log('Guardado');
    console.log(rub1,rub2,rub3,rub4);
    if(rub1 !== undefined &&  rub2 !== undefined && rub3 !== undefined && rub4 !== undefined){
            arr.push(rub1);
            arr.push(rub2);
            arr.push(rub3);
            arr.push(rub4);
            console.log(arr);
            localStorage.setItem('cal3', JSON.stringify(arr));
            arr.length = 0;
            location.href = './feria.html';
        }else{
            alert('Califique todas las opciones')
        }
    
});

