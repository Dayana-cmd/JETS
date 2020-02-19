$(document).ready(function() {
  setTimeout(function()  {
    $(".loader-page").css({visibility:"hidden",opacity:"0"})
  }, 500);   
});


function initLoader(){
  console.log("inicio");

  $(".loader-page").css({visibility:"visible",opacity:"10"})

}
function endLoader(){
  console.log("fin");

  $(".loader-page").css({visibility:"hidden",opacity:"0"})

}
