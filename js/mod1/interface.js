class Interface {

    constructor(id, estado, qr, nombre, tipo) {
        this.estado = estado;
        this.id = id;
        this.qr = qr;
        this.nombre = nombre;
        this.tipo = tipo;
        this.init();
    }

    init() {
        this.totalRegistro();
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

    ramdonNombre() {
        const instancia = new Date();
        let numero = instancia.getMilliseconds().toString();
        for (let i = 0; i < 5; i++) {
            numero += (Math.floor(Math.random() * (9 - 1)) + 1).toString();
        }

        return numero;
    }

    datosPersona(digito) {
        // debugger
        let url = cnx.getUrl();
        url += `persona-digito/${digito}`;
        cnx.get(url)
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

    registrarPersona(id) {
        let url = cnx.getUrl();
        url += `persona/${id}`;
        let json = {
            estado: 'R'
        }
        cnx.put(json, url)
            .then(res => {
                const per = [res.persona];
                console.log(per);
                if (per.length > 0) {
                    alert('Registro Exitoso');
                    this.limpiar();
                    digito.value = '';
                    this.totalRegistro();
                }
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    totalRegistro() {
        let url = cnx.getUrl();
        url += 'persona-reg';
        cnx.get(url)
            .then(res => {
                console.log(res.persona);
                const datos = res.persona;
                if (datos.length > 0) {
                    const {
                        Total
                    } = datos[0];
                    registroTotal.textContent = Total;
                } else {
                    console.log('no hay datos');
                }
            })
            .catch(err => {
                console.log(err);
            });
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
        document.getElementById('digitos').value = result.text;
        textQr(result.text);
    }

    error(err) {
        alert("Scanning failed: " + err);
    }

    datosQr(qr) {
        let url = cnx.getUrl();
        url += `persona-cre/${qr}`;
        cnx.get(url)
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

    credencialPdf(codigo, nom, tipo) {
        initLoader();
        const qr = codigo.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
        const imgQr = create_qrcode(qr);
        let doc = new jsPDF('');
        let logo = new Image();
        let width = doc.internal.pageSize.getWidth();
        let height = doc.internal.pageSize.getHeight();
        logo.src = './img/credencialjets.png';
        doc.addImage(logo, 'PNG', ((width - 90) / 2), 50, 90, 130);
        console.log((width / 90) / 2);
        doc.setFontSize(10);
        this.centrar(doc, tipo, 103);
        this.centrar(doc, nom, 145);
        doc.addImage(imgQr, 'PNG', 87.5, 105, 35, 35);
        console.log('aqui');
        window.isphone = false;
        if (document.URL.indexOf("http://") === -1 &&
            document.URL.indexOf("https://") === -1) {
            window.isphone = true;
        }

        if (window.isphone) {

            let out = doc.output();
            let url = "data:application/pdf;base64," + btoa(out);
            // Split the base64 string in data and contentType
            var block = url.split(";");
            // Get the content type
            var dataType = block[0].split(":")[1]; // In this case "application/pdf"
            // get the real base64 content of the file
            var realData = block[1].split(",")[1]; // In this case "JVBERi0xLjcKCjE...."

            // The path where the file will be created
            var folderpath = "file:///storage/emulated/0/Download";
            // The name of the PDF
            var filename = `Credencial${this.ramdonNombre()}.pdf`;
            savebase64AsPDF(folderpath, filename, realData, dataType);
            endLoader();
            //alert(filename);
            //alert(folderpath);
            Swal.fire(
                'Exito',
                'Guardado En Descargas',
                'success'
            )
            // document.addEventListener("deviceready", onDeviceReady, false);
        } else {
            // alert('navegador')
            endLoader();
            window.open(doc.output('bloburl'));
        }

        // window.open(doc.output('bloburl'));

    }

    centrar(doc, text, y) {
        let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        let textOffset = (doc.internal.pageSize.width - textWidth) / 2;
        doc.text(textOffset, y, text);
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

    credencialesGeneral(id){
        let cont = 1;
        let url =  cnx.getUrl();
        url += `persona-rol/${id}`;
        cnx.get(url)
        .then(res => {
            console.log(res);
            const datos = res.persona;
            if(datos.length > 0){
                let doc = new jsPDF();
                let logo = new Image();
                logo.src = './img/credencialjets.png';
                console.log(datos);
                for (let i = 0; i < datos.length; i++) {

                    const {nombres,apaterno ,credenciale : {codigoQr}, role: {rol}}  = datos[i];
                    console.log(nombres,apaterno,codigoQr,rol);
                    const nom = `${nombres} ${apaterno}`;
                    const oculto = `${codigoQr} - ${nombres} ${apaterno}`;
                    const qr = oculto.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
                    const imgQr = create_qrcode(qr);
                    let width = doc.internal.pageSize.getWidth();
                    let height = doc.internal.pageSize.getHeight();
                    if(i === cont){
                        doc.addImage(logo, 'PNG', ((width - 90) / 2), 145, 90, 130);
                        console.log((width / 90) / 2);
                        doc.setFontSize(10);
                        this.centrar(doc, rol, 197);
                        this.centrar(doc, nom, 240);
                        doc.addImage(imgQr, 'PNG', 87.5, 200, 35, 35);
                        doc.addPage();
                        cont += 2 
                    }else{

                    doc.addImage(logo, 'PNG', ((width - 90) / 2), 10, 90, 130);
                    console.log((width / 90) / 2);
                    doc.setFontSize(10);
                    this.centrar(doc, rol, 62);
                    this.centrar(doc, nom, 105);
                    doc.addImage(imgQr, 'PNG', 87.5, 65, 35, 35);

                    }  
                }
                window.open(doc.output('bloburl'));
                
            }else{
                console.log('no hay datos');
            }
        })
        .catch(err =>{
            console.log(err);
            
        })
    }


    grupoJets(){
        let aux = 3;
        let url = cnx.getUrl();
        url += 'proyecto-all';
        let x = 25;
        let y = 40;
        let z = 37;
        cnx.get(url)
        .then(res => {
            console.log(res);
            const datos = res.proyecto;
            if(datos.length > 0){
                let doc = new jsPDF();
                let width = doc.internal.pageSize.getWidth();
                doc.setFontSize(30)
                for (let i = 0; i < datos.length; i++) {
                        const {proyecqr:{ codigo } , proyecto} = datos[i];
                        const nombre = proyecto;
                        const qr = codigo;
                        const cod = qr.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
                        const imgQr = create_qrcode(cod);
                        // debugger
                        if(i === aux){
                            doc.addPage();
                            x = 25;
                            y = 40;
                            z = 37;
                            this.centrar(doc, nombre, x);
                            this.centrar(doc, codigo, z);
                            doc.addImage(imgQr, 'PNG', 80, y, 50, 50);
                            x += 85;
                            z +=85; 
                            y += 90;
                            aux += 3; 
                        }else{
                            this.centrar(doc, nombre, x);
                            this.centrar(doc, codigo, z);
                            doc.addImage(imgQr, 'PNG', 80, y, 50, 50);
                            x += 85;
                            z +=85; 
                            y += 90;
                        }

                }
                window.open(doc.output('bloburl'));

                    console.log(datos);
                    
            }else{
                console.log('No hay datos');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}


// createdAt: null
// descripcion: "ARBOL ARTIFICIAL"
// id: 1
// proyecqr:
// codigo: "81171"
// createdAt: null
// id: 1
// idpro: 1
// updatedAt: null
// __proto__: Object
// proyecto: "ARBOL ARTIFICIAL"


// amaterno: "SARMIENTO                     "
// apaterno: "                              "
// ci: "7270427"
// createdAt: null
// email: "LMSARMIENTO.EST@UTEPSA.EDU"
// estado: "N"
// fechanaci: "1989-12-20 00:00:00.000"
// id: 1
// idcarr: 8
// idrol: 1
// nombres: "LISETH MABEL                            "
// phone1: "70101020"
// phone2: "65417479"
// registro: "486123"
// sexo: "F"
// updatedAt: 