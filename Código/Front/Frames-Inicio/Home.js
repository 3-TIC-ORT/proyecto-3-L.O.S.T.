let userFrame = document.getElementById("user-frame");  

function LS () {
    userFrame.style.display = "grid";
} document.getElementById("LS-SU").addEventListener("click", LS);

function found () {
    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
} document.getElementById("found").addEventListener("click", found);

function lost () {
    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
} document.getElementById("lost").addEventListener("click", found);

function BackHome () {
    userFrame.style.display = "none";
    console.log("hola")
} 
document.getElementsByClassName("a")[0].addEventListener("click", BackHome);
document.getElementsByClassName("b")[0].addEventListener("click", BackHome);
document.getElementsByClassName("c")[0].addEventListener("click", BackHome);
document.getElementsByClassName("d")[0].addEventListener("click", BackHome);