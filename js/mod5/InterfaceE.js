class InterfacE{


    constructor(id, estado, qr, nombre, tipo,registro) {
        this.estado = estado;
        this.id = id;
        this.qr = qr;
        this.nombre = nombre;
        this.tipo = tipo;
        this.registro = registro;
        this.init();
    }

    init() {
        // this.totalRegistro();
        this.limpiar();
    }

    getEstado() {
        return this.estado;
    }
    getId() {
        return this.id;
    }
    getQr() {
        return this.qr;
    }
    getNombre() {
        return this.nombre;
    }
    getTipo() {
        return this.tipo;
    }
    getRegistro() {
        return this.registro;
    }



    datosPersona(digito) {
        // debugger
        let url = cnxE.getUrl();
        url += `persona-digito/${digito}`;
        cnxE.get(url)
            .then(res => {
                console.log(res);
                const datos = res.persona;
                if (datos.length > 0) {
                    const {
                        nombres,
                        apaterno,
                        amaterno,
                        ci,
                        id,
                        estado,
                        registro,
                        credenciale: {
                            codigoQr
                        },
                        role: {
                            rol
                        }
                    } = datos[0];
                    console.log(datos);
                    console.log(nombres);
                    console.log(codigoQr);
                    console.log(rol);

                    const campos = document.querySelectorAll('#datos .form-control');
                    campos[0].value = nombres;
                    campos[1].value = apaterno;
                    campos[2].value = amaterno;
                    campos[3].value = ci;
                    const n = this.quitEspacio(nombres);
                    const ap = apaterno;
                    const am = amaterno;
                    const nomCompleto = `${n} ${ap} ${am}`;
                    this.nombre = nomCompleto;
                    this.qr = codigoQr;
                    this.tipo = rol;
                    this.id = id;
                    this.estado = estado;
                    this.registro = registro;
                    this.contenidoText();
                } else {
                    this.limpiar();
                    this.contenidoText();
                    this.mensaje();

                    console.log('no existe la persona');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    scan() {
        cordova.plugins.barcodeScanner.scan(this.succes, this.error);
    }

    succes(result) {
        // this.qr = result.text;
        // localStorage.setItem('scan', result.text);
        // alert("We got a barcode\n" +
        //     "Result: " + result.text + "\n" +
        //     "Format: " + result.format + "\n" +
        //     "Cancelled: " + result.cancelled);
        
        textQr(result.text);
    }

    error(err) {
        alert("Scanning failed: " + err);
    }

    datosQr(qr) {
        let url = cnxE.getUrl();
        url += `persona-cre/${qr}`;
        cnxE.get(url)
            .then(res => {
                console.log(res);
                const datos = res.persona;
                if (datos.length > 0) {
                    const {
                        nombres,
                        apaterno,
                        amaterno,
                        ci,
                        id,
                        estado,
                        registro,
                        credenciale: {
                            codigoQr
                        },
                        role: {
                            rol
                        }
                    } = datos[0];
                    console.log(datos);
                    console.log(nombres);
                    const campos = document.querySelectorAll('#datos .form-control');
                    campos[0].value = nombres;
                    campos[1].value = apaterno;
                    campos[2].value = amaterno;
                    campos[3].value = ci;
                    const n = this.quitEspacio(nombres);
                    const ap = apaterno;
                    const am = amaterno;
                    const nomCompleto = `${n} ${ap} ${am}`;
                    this.nombre = nomCompleto;
                    this.qr = codigoQr;
                    this.tipo = rol;
                    this.id = id;
                    this.estado = estado;
                    this.registro = registro;
                    this.contenidoText();
                } else {
                    this.limpiar();
                    this.contenidoText();
                    this.mensaje();

                    console.log('no existe la persona');
                }
            })
            .catch(err => {
                console.log(err);
            })

    }


    quitEspacio(str) {
        let cadena = '';
        let arrayString = str.split(' ');
        for (let i = 0; i < arrayString.length; i++) {
            if (arrayString[i] != "") {
                cadena += arrayString[i];
            }
        }
        return cadena;
    }


    contenidoText() {
            
        const texto = this.getEstado();
        if (texto === 'N' || texto === null) {
            textoReg.textContent = 'Registrado: No';
        } else {
            textoReg.textContent = 'Registrado: Si';
        }
    }

    limpiar() {
        const campos = document.querySelectorAll('#datos .form-control');
        for (let i = 0; i < campos.length; i++) {
            campos[i].value = '';
        }
        this.id = null;
        this.estado = null;
        this.qr = null;
        this.nombre = null;
        this.tipo = null;
    }

    mensaje(){
        const campos = document.querySelectorAll('#datos .form-control');
        for (let i = 0; i < campos.length; i++) {
            campos[i].value = 'No Existe';
        }
    }



}