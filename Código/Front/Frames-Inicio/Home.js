let userFrame = document.getElementById("user-frame");  
let LoggedOut = document.getElementById("log-stuff");
let LogIn = document.getElementById("LS-SU");

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

function BackHomeLogged() {
    userFrame.style.display = "none";
    LoggedOut.style.display = "flex"
    LogIn.style.display = "none"
} document.getElementById("FinalLog").addEventListener("click", BackHomeLogged);
document.getElementById("FinalSign").addEventListener("click", BackHomeLogged);

function BackHomeLoggedOut() {
    LoggedOut.style.display = "none"
    LogIn.style.display = "flex"
} document.getElementById("CS").addEventListener("click", BackHomeLoggedOut)