class InterfaceC {

    constructor(idpro){
        this.idpro = idpro;
    }

    getIdpro(){
        return this.idpro;
    }

    getProyect(qr){
        let bool = false;
        let grupo = '';
        let url = cnxC.getUrl();
        url += `proyectoqr/${qr}`;
        cnxC.get(url)
        .then(res => {
            console.log(res);
            const datos = res.proyecto;
            if(datos.length >  0){
                 const {proyecto,id,calificaciones, proyecqr : { codigo }  } = datos[0];
                 console.log('cal',calificaciones.length);
                 if(calificaciones.length > 0){
                    //  debugger
                     const registro = localStorage.getItem('registro');
                     for (let i = 0; i < calificaciones.length; i++) {
                            const x = calificaciones[i].reg;
                            console.log(x);
                            if(x === registro){
                                grupo = `<center><h4>GRUPO: YA CALIFICADO</h4></center>`; 
                                this.idpro = null;
                                contenidoRubrica.style.display = 'none';
                                btnGuardar.style.display = 'none';
                                localStorage.removeItem('codigoQr');
                                bool = true;
                                break;
                            }
                     }
                     if(!bool){
                        grupo = `<center><h4>GRUPO: ${proyecto}</h4></center>`;
                        this.idpro = id;
                        console.log(proyecto,id);
                        localStorage.setItem('codigoQr',codigo);
                        contenidoRubrica.style.display = 'block';
                        btnGuardar.style.display = 'block';          
                     }
                 }else{
                    grupo = `<center><h4>GRUPO: ${proyecto}</h4></center>`;
                    this.idpro = id;
                    console.log(proyecto,id);
                    localStorage.setItem('codigoQr',codigo);
                    contenidoRubrica.style.display = 'block';
                    btnGuardar.style.display = 'block';          
                 }
                    

            }else{
                grupo = `<h4>NO HAY DATOS</h4>`;
                this.idpro = null;
                contenidoRubrica.style.display = 'none';
                btnGuardar.style.display = 'none';
                localStorage.removeItem('codigoQr');   
                console.log('No Hay Datos');
            }
            nameGrup.innerHTML = grupo;
        })
        .catch(err => {
            console.log(err);
        })
    }


    scan() {
        cordova.plugins.barcodeScanner.scan(this.succes, this.error);
    }

    succes(result) {
        // document.getElementById('digitos').value = result.text;
         qrText(result.text);
    }

    error(err) {
        alert("Scanning failed: " + err);
    }

}


// createdAt: null
// descripcion: "INTER VLAN, FTP"
// id: 1
// proyecqr:
// codigo: "104411"
// createdAt: null
// id: 1
// idpro: 1
// updatedAt: null
// __proto__: Object
// proyecto: "INSTITUTO JON"
// updatedAt: null