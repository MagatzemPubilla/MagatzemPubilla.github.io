let mostrador = document.getElementById("mostrador");
let seleccio = document.getElementById("seleccio");
let imgSeleccionada = document.getElementById("img");

function cargar(item){
    quitarBordes();
    mostrador.style.width = "60%";
    seleccio.style.width = "40%";
    seleccio.style.opacity = "1";
    item.style.border = "2px solid red";

    imgSeleccionada.src = item.getElementsByTagName("img")[0].src;
    modeloSeleccionado.innerHTML =  item.getElementsByTagName("p")[0].innerHTML;

}
function cerrar(){
    mostrador.style.width = "100%";
    seleccio.style.width = "0%";
    seleccio.style.opacity = "0";
    quitarBordes();
}
function quitarBordes(){
    var items = document.getElementsByClassName("item");
    for(i=0;i <items.length; i++){
        items[i].style.border = "none";
    }
}