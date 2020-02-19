// instancia
const cnxG = new Conexion();
// 270
// variables globales
let grupoV,
    idturV,
    idmodV,
    idaulaV,
    idsemV,
    inscritosV,
    iddocV,
    idmatV,
    observacionesV,
    contador = 0,
    json,
    persona = [],
    materias = [],
    bool = false;
let x = 15;
let y = 15;
let aux;
let contY = 65;
let imgY = 60;

const btnReport = document.querySelector('#generarRepor');


// funciones 


const programacion = () => {
    inicio();
    let url = cnxG.getUrl();
    url += 'mat-qr';
    materias = [];
    cnxG.get(url)
        .then(res => {
            console.log(res.mat);
            const matProg = res.mat;
            console.log('largo',matProg.length);
            if (matProg.length > 0) {
                for (let i = 0; i < matProg.length; i++) {
                    // debugger;
                    const {
                        grupo,
                        inscritos,
                        idsem,
                        idmod,
                        iddoc,
                        idmat,
                        idtur,
                        idaula,
                        observaciones
                    } = matProg[i];
                    const {
                        nombres,
                        apaterno,
                        amaterno,
                        registro,
                        credenciale: {
                            codigoQr
                        }
                    } = matProg[i].persona
                    // console.log(nombres, apaterno, amaterno, registro, 'qr', codigoQr);
                    // debugger;
                    if ( idmat != idmatV ||
                         idtur != idturV && grupo != grupoV) {
                        if (bool) {
                            json.personas = persona
                            materias.push(json);
                            json = {};
                            persona = [];
                        }
                        const {
                            nombre,
                            siglas
                        } = matProg[i].materia;
                        const {
                            nombres: doc,
                            apaterno : apdoc,
                            amaterno: amdoc,
                            id:docid
                        } = matProg[i].docente;
                        // console.log('materia', nombre, 'siglas', siglas);
                        // console.log('docente:', nombres, 'apaterno', apaterno);
                        contador++;
                        grupoV = grupo;
                        idsemV = idsem;
                        idmodV = idmod;
                        iddocV = iddoc;
                        idmatV = idmat;
                        idturV = idtur;
                        idaulaV = idaula;
                        inscritosV = inscritos;
                        json = {
                            grupoJ: grupoV,
                            inscritosJ: inscritosV,
                            semestreJ: idsemV,
                            idmodJ: idmodV,
                            docenteJ: doc,
                            apellidoP: apdoc,
                            apellidoM: amdoc,
                            turnoJ: idturV,
                            aulaJ: idaulaV,
                            materia: nombre,
                            sigla: siglas
                        }
                        persona.push({
                            nombreE: nombres,
                            apellidoP: apaterno,
                            apellidoM: amaterno,
                            registro: registro,
                            observacion: observaciones,
                            qr: codigoQr
                        });
                        // console.log(materias);
                        // console.log(grupoV, inscritosV, idsemV, idmodV, iddocV, idmatV, idturV, idaulaV);
                    } else {
                        persona.push({
                            nombreE: nombres,
                            apellidoP: apaterno,
                            apellidoM: amaterno,
                            registro: registro,
                            observacion: observaciones,
                            qr: codigoQr
                        });
                        bool = true;
                    }
                }
                if (bool) {
                    json.personas = persona
                    materias.push(json);
                    json = {};
                    persona = [];
                    bool = false;
                }

            } else {
                console.log('no hay datos');
            }
            console.log(matProg.length);
            console.log(materias);
            console.log('contador:', contador);
            generarPdf();
        })
        .catch(err => {
            console.log(err);
        });
}

const quitarEspacio = (str) => {
    let cadena = '';
    let arrayString = str.split(' ');
    for (let i = 0; i < arrayString.length; i++) {
        if (arrayString[i] != "") {
            cadena += arrayString[i];
        }
    }
    return cadena;
};

const generarPdf = () => {
    let doc = jsPDF('l', 'mm', 'A4');
    for (let i = 0; i < materias.length; i++) {
        // debugger
        const n = materias[i].docenteJ.split(' ');
        const nombres = formato(n);
        // const nombres = quitarEspacio(materias[i].docenteJ);
        const apellidoP = quitarEspacio(materias[i].apellidoP);
        const docente = `${nombres} ${apellidoP}`;
        const aula = materias[i].aulaJ;
        const grupo = materias[i].grupoJ;
        const inscritos = materias[i].inscritosJ;
        const materia = materias[i].materia;
        const semestre = materias[i].semestreJ;
        const sigla = materias[i].sigla;
        const turno = materias[i].turnoJ;
        const modulo = materias[i].idmodJ;
        console.log('docente:', docente, 'aula', aula, 'grupo', grupo, 'inscritos', inscritos, 'materia', materia, 'semestre', semestre, 'sigla', sigla, 'turno', turno);
        doc.setFontSize(10)
        doc.text(x, y, `GRUPO: ${grupo}`)
        doc.text(55, y, `MODULO: ${modulo}`)
        doc.text(95, y, `AULA: ${aula}`)
        doc.text(135, y, `TURNO: ${turno}`)
        doc.text(165, y, `SEMESTRE: ${semestre}`)
        doc.text(215, y, `DOCENTE: ${docente}`)
        doc.text(x, (y + 10), `MATERIA: ${materia}`)
        doc.text(x, (y + 20), `INSCRITOS: ${inscritos}`)
        let splitTitle = doc.splitTextToSize('Al firmar este documento, me comprometo a participar de las "Jornadas Empresariales Tecnológicas y Sociales - JETS 2019", a desarrollarse en el módulo 1 (del 19 al   23 de agosto), por lo tanto, AUTORIZO que se asigne a mi cuenta de la Universidad la suma de Bs. 150.-  por este concepto.', 140);
        doc.text(55, 30, splitTitle)
        doc.text(15, 55, 'OBSERVACIONES')
        doc.text(64, 55, 'REGISTRO')
        doc.text(95, 55, 'A.PATERNO')
        doc.text(125, 55, 'A.MATERNO')
        doc.text(155, 55, 'NOMBRES')
        doc.text(195, 55, 'FIRMA')
        doc.text(220, 55, 'TALLA')
        doc.text(245, 55, 'QR')
        for (let x = 0; x < materias[i].personas.length; x++) {
            // debugger;
            const persona = materias[i].personas[x];
            const estudiante = persona.nombreE;
            const estudianteAp = persona.apellidoP;
            const estudianteAm = persona.apellidoM;
            const registro = persona.registro;
            const observacion = persona.observacion;
            const qr = persona.qr.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
            const imgQr = create_qrcode(qr);
            console.log('estudiante', estudiante, 'apellidop', estudianteAp, 'apellidom', 
                        estudianteAm, 'registro', registro, 'observacion', observacion,'qr',qr);
            if(contY >= 190){
                doc.addPage();
                contY = 20;
                imgY = 8;
                doc.setFontSize(8.5)
                doc.text(15, contY, observacion)
                doc.text(65, contY, registro)
                doc.text(95, contY, estudianteAp)
                doc.text(125, contY, estudianteAm)
                doc.text(155, contY, estudiante)
                doc.text(195, contY, '.............')
                doc.text(220, contY, '.............')
                doc.addImage(imgQr, 'PNG', 245, imgY, 12, 12)
                contY += 11;
                imgY += 11;

            }else{
                doc.setFontSize(8.5)
                doc.text(15, contY, observacion)
                doc.text(65, contY, registro)
                doc.text(95, contY, estudianteAp)
                doc.text(125, contY, estudianteAm)
                doc.text(155, contY, estudiante)
                doc.text(195, contY, '.............')
                doc.text(220, contY, '.............')
                doc.addImage(imgQr, 'PNG', 245, imgY, 12, 12)
                contY += 11;
                imgY += 11;
            }
            


            // doc.addImage(imgData, 'JPEG', 165, 50, 10, 10)
        }
        // if( i >! materias.length){
        //     doc.addPage();
        // }
        doc.addPage();
        contY = 65;
        imgY = 60;

    }

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
        var filename = `QrGeneral${ramdonName()}.pdf`;
        savebase64AsPDF(folderpath, filename, realData, dataType);
        fin();
        Swal.fire(
            'Exito',
            'Guardado En Descargas',
            'success'
        )
        // document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        // alert('navegador')
        fin();
        window.open(doc.output('bloburl'));
    }
    // window.open(doc.output('bloburl'));
    // fin();

}

btnReport.addEventListener('click',()=>{
    programacion();
});



function inicio(){
    console.log("inicio");

    $(".loader-page").css({visibility:"visible",opacity:"10"})

}
function fin(){
    console.log("fin");

    $(".loader-page").css({visibility:"hidden",opacity:"0"})

}

const ramdonName = () => {
    const instancia = new Date();
    let numero = instancia.getMilliseconds().toString();
    for (let i = 0; i < 5; i++) {
        numero += (Math.floor(Math.random() * (9 - 1)) + 1).toString();
    }

    return numero;
}

const formatoG = (x) => {
    const [uno = '', dos = '', tres = '', cuatro = '', cinco = ''] = x;
    console.log(uno, dos, tres, cuatro, cinco);
    let nombres = '';
    if (uno !== '')
        nombres += uno
    if (dos !== '')
        nombres += ` ${dos}`
    if (tres !== '')
        nombres += ` ${tres}`;
    if (cuatro !== '')
        nombres += ` ${cuatro}`;
    if (cinco !== '')
        nombres += ` ${cinco}`;

    return nombres;
}




// var doc = new jsPDF()

// doc.setFontSize(10)
// doc.text(15, 25, 'GRUPO:AA')
// doc.setFontSize(10)
// doc.text(55, 25, 'MATERIA:INTRODUCCION A LA VIDA UNIVERSITARIA')
// doc.setFontSize(10)
// doc.text(165, 25, 'AULA:E-201')
// doc.setFontSize(10)
// doc.text(15, 35, 'TURNO:1')
// doc.setFontSize(10)
// doc.text(55, 35, 'SEMESTRE:2019-2')
// doc.setFontSize(10)
// doc.text(105, 35, 'DOCENTE:ROBERTO PEREZ')
// doc.setFontSize(10)
// doc.text(165, 35, 'MODULO:0')
// doc.setFontSize(10)
// doc.text(15, 45, 'OBSERVACIONES')
// doc.setFontSize(10)
// doc.text(55, 45, 'A.PATERNO')
// doc.setFontSize(10)
// doc.text(85, 45, 'A.MATERNO')
// doc.setFontSize(10)
// doc.text(115, 45, 'NOMBRES')
// doc.setFontSize(10)
// doc.text(145, 45, 'FIRMA')
// doc.setFontSize(10)
// doc.text(165, 45, 'QR')



// "nombres": "SEBASTIAN                               ",
// "apaterno": "                              ",
// "amaterno": "JUSTINIANO                    ",
// "ci": "6292502",
// "phone1": "77617780",
// "phone2": "3366309",
// "email": "SJUSTINIANO8.EST@UTEPSA.EDU",
// "registro": "431680",


// "id": 31,
// "inscritos": 29,
// "grupo": "B ",
// "observaciones": "MOVIDA DE GRUPO",
// "registro": "431680",
// "idsem": "2019-2",
// "idmod": 0,
// "iddoc": 23134,
// "idmat": 847,
// "idtur": 1,
// "idaula": "E-104",


// apellidoM: "NATUSCH                       "
// apellidoP: "ALFONSO                       "
// aulaJ: "E-104"
// docenteJ: "RICARDO                                 "
// grupoJ: "B "
// inscritosJ: 29
// materia: "PUBLICIDAD II                                                                                                           "
// personas: (29) 
// semestreJ: "2019-2"
// sigla: "PUB-230"
// turnoJ: 1