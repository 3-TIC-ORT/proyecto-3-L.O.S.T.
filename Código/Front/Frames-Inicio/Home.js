function LS () {
    let home = document.getElementById("home-frame");
    let userFrame = document.getElementById("user-frame");
    console.log("funcion")
    userFrame.style.display = "flex";
} document.getElementById("LS-SU").addEventListener("click", LS);

function found () {
    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
} document.getElementById("found").addEventListener("click", found);

function lost () {
    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
} document.getElementById("lost").addEventListener("click", found);