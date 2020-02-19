//variables globales
const propuesta = document.querySelector('#n9');
const factor = document.querySelector('#n10');
const ampliacion = document.querySelector('#n11');
const innovacion = document.querySelector('#n12');
const orientacion = document.querySelector('#n13');


const cPropuesta = document.querySelector('#c9');
const cFactor = document.querySelector('#c10');
const cAmpliacion = document.querySelector('#c11');
const cInnovacion = document.querySelector('#c12');
const cOrientacion = document.querySelector('#c13');

const guardar = document.querySelector('#guardar');

let rub1,rub2,rub3,rub4,rub5;

let arr = [];

//funciones

propuesta.addEventListener('click',()=>{
    console.log('9');
    
});


factor.addEventListener('click',()=>{
    console.log('10');
    
});

ampliacion.addEventListener('click',()=>{
    console.log('11');
    
});

innovacion.addEventListener('click',()=>{
    console.log('12');
    
});

orientacion.addEventListener('click',()=>{
    console.log('13');
    
});


cPropuesta.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
       rub1 = {
           idrub:9,
           nota:valor.value
       }
    }
})

cFactor.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas1"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
        rub2 = {
            idrub:10,
            nota:valor.value
        }
    }
})

cAmpliacion.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas2"]:checked');
    if(valor === null){
        alert('Seleccione una optcion')
    }else{
        console.log('seleccionado:',valor.value);
        rub3 = {
            idrub:11,
            nota:valor.value
        }
    }
})


cInnovacion.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas3"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
        rub4 = {
            idrub:12,
            nota:valor.value
        }
    }
})

cOrientacion.addEventListener('click',()=>{
    console.log('si');
    const valor = document.querySelector('input[name="estrellas4"]:checked');
    if(valor === null){
        alert('Seleccione una optcion');
    }else{
        console.log('seleccionado:',valor.value);
        rub5 = {
            idrub:13,
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
            localStorage.setItem('cal1', JSON.stringify(arr));
            arr.length = 0;
            location.href = './feria.html';
        }else{
            alert('Califique todas las opciones')
        }
    
});
