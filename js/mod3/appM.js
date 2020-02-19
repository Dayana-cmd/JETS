// instancias 
const cnxM = new Conexion();
const ioM = new InterfaceM();

//variables globalse

const verificarM = document.querySelector('#verificarM');
const digitoM = document.querySelector('#digitosM');
const entregas = document.querySelector('#Entregas');
const regMat = document.querySelector('#regM');
const btnScanM = document.querySelector('#scanM');
const concepto = document.querySelector('#conceptos');
const cancelM = document.querySelector('#cancelM');
const closeM = document.querySelector('#closeM');
const talla = document.querySelector('#talla');


let fecEntregadas = 'No Hay Datos';
let bool = true;

//funciones

verificarM.addEventListener('click', () => {
  if (digitoM.value !== '') {
    ioM.personaReg(digitoM.value);
  } else {
    alert('no hay datos');
    ioM.limpiar();
  }
});

entregas.addEventListener('click', () => {
  // debugger
  if (!bool) {
    let fec = '';
    if (fecEntregadas !== 'No Hay Datos') {
      for (let i = 0; i < fecEntregadas.length; i++) {
        fec += `<li>Fecha Entregada: ${fecEntregadas[i].createdAt}
                <ul>
                ${fecEntregadas[i].material}
                </ul></li>`;
      }
      console.log(fec);
      fecEntregadas = fec;
    } else {
      fecEntregadas = 'No Hay Datos'
    }
    bool = true;
  }
  Swal.fire({
    title: '<strong>Fechas Entregadas</strong>',
    type: 'info',
    html: fecEntregadas,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok',
    // confirmButtonAriaLabel: 'Thumbs up, great!',
    // cancelButtonText:
    //   '<i class="fa fa-thumbs-down"></i>',
    // cancelButtonAriaLabel: 'Thumbs down',
  })
});

regMat.addEventListener('click', () => {
  // debugger;
  const material = concepto.value;
  const tl = talla.value; 
  const reg = ioM.getReg();
  if ((reg !== null) && (reg !== undefined))
    if(material !== '')
      if(tl !== '')
      ioM.entregaMat(reg,material,tl);
      else 
      alert('Seleccione la talla');
    else
    alert('Seleccione la entrega');
  else
    alert('No Valido');
});

btnScanM.addEventListener('click',() => { 
    ioM.scan();
});

cancelM.addEventListener('click',()=>{
  ioM.limpiar();
  digitoM.value = '';
});

closeM.addEventListener('click',()=>{
  ioM.limpiar();
  digitoM.value = '';
})

function qrTextM(result){
  ioM.personQr(result);
}