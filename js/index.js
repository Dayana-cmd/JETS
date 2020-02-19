$("#speaker").click(function () {
  location.href = "html/speaker.html";
});

$("#feria").click(function () {
  location.href = "html/feria.html";
});


$("#cronograma").click(function () {
  location.href = "html/cronograma.html";
});


$('#datepicker').datepicker({
  uiLibrary: 'bootstrap',
   format: 'dd-mm-yyyy' 
});

$("#reportes").click(function () {
  location.href = "html/reportes.html";
});

$("#propuesta").click(function () {
  location.href = "../html/feria1.html";
});
$("#emprendimiento").click(function () {
  location.href = "../html/feria2.html";
});
$("#presentacion").click(function () {
  location.href = "../html/feria3.html";
});

$("#ganadores").click(function () {
  location.href = "../html/ganadores.html";
});

$("#tipo").click(function () {
  const usuario = $("#tipoUsuario");
  let tipo = $("#tipo").val()
  if (tipo == "1") {
    $('#noParticipante').collapse('hide');
    $('#participante').collapse('show');
    
  }
  else {
    if(tipo == null){
      $('#noParticipante').collapse('hide');
      $('#participante').collapse('hide');

    }
    else {
      $('#participante').collapse('hide');
      $('#noParticipante').collapse('show');
    }
  }
})