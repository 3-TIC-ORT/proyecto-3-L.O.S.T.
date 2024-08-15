let userFrame = document.getElementById("user-frame");  
let UserShwon = document.getElementById("user-nameShown")
let LogIn = document.getElementById("LS-SU");
let LogOut = document.getElementById("log-stuff")
let bell = document.getElementById("bell")
let CS = document.getElementById("CS")
function LS () {
    userFrame.style.display = "grid";
} document.getElementById("LS-SU").addEventListener("click", LS);

function found () {

    //Por seguir

    // const home = document.querySelector(`home-frame`);
    // const data = Object.fromEntries(UD);
    // const json = JSON.stringify(data);
    // sessionStorage.setItem(`info`, json)


    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
    //Faltaría que cambie el textcontent del título de la lista así se distingue cual es cual, hay dos maneras que veo posibles: La primera es que se importe una clase o algo por el estilo del otro css. La otra que se me hace más fácil es que linkear el html con el css para que javascript tenga acceso a las otras clases, aunque deberíamos tener cuidado con el conflicto entre clases entre ambos css.
} document.getElementById("found").addEventListener("click", found);

function lost () {
    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
    //Lo mismo que dije arriba
} document.getElementById("lost").addEventListener("click", found);

function BackHome () {
    userFrame.style.display = "none";
} 
document.getElementsByClassName("a")[0].addEventListener("click", BackHome);
document.getElementsByClassName("b")[0].addEventListener("click", BackHome);
document.getElementsByClassName("c")[0].addEventListener("click", BackHome);
document.getElementsByClassName("d")[0].addEventListener("click", BackHome);

function BackHomeLogged(event) {
    let UserName = document.getElementById("user-data").value;
    let UserPassword = document.getElementById("password-data").value
    let UserShown = document.getElementById("user-nameShown");
    if (UserName === "" || UserPassword === ""){
        alert(`Es obligatorio indicar un nombre de usuario y una contraseña para avanzar. Sí aún así desea continuar, aprete el botón "Anónimo"`)  
    } else {
        UserShown.textContent = `${UserName}`;
        userFrame.style.display = "none";
        LogIn.style.display = "none";
        CS.style.display = "flex"
        bell.style.display = "flex"

    }
} document.getElementById("FinalLog").addEventListener("click", BackHomeLogged);
document.getElementById("FinalSign").addEventListener("click", BackHomeLogged);

function BackHomeLoggedOut() {
    bell.style.display = "none";
    CS.style.display = "none"
    LogIn.style.display = "flex";
    document.getElementById("user-data").value = "";
    document.getElementById("password-data").value = "";
    UserShwon.textContent = "Anónimo"
} document.getElementById("CS").addEventListener("click", BackHomeLoggedOut);
LOCA