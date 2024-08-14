let userFrame = document.getElementById("user-frame");  
let LoggedOut = document.getElementById("log-stuff");
let LogIn = document.getElementById("LS-SU");
function LS () {
    userFrame.style.display = "grid";
} document.getElementById("LS-SU").addEventListener("click", LS);

function found () {

    //Por seguir

    const home = document.querySelector(`home-frame`);
    const data = Object.fromEntries(UD);
    const json = JSON.stringify(data);
    sessionStorage.setItem(`info`, json)


    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
    //Faltaría que cambie el textcontent del título de la lista así se distingue cual es cual, hay dos maneras que veo posibles: La primera es que se importe una clase o algo por el estilo del otro css. La otra que se me hace más fácil es que linkear el html con el css para que javascript tenga acceso a las otras clases, aunque deberíamos tener cuidado con el conflicto entre clases entre ambos css.
} document.getElementById("found").addEventListener("click", found);

function lost () {
    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
    //Lo mismo que dije arriba
} document.getElementById("lost").addEventListener("click", found);

function BackHome () {
    userFrame.style.display = "none";
    console.log("hola")
} 
document.getElementsByClassName("a")[0].addEventListener("click", BackHome);
document.getElementsByClassName("b")[0].addEventListener("click", BackHome);
document.getElementsByClassName("c")[0].addEventListener("click", BackHome);
document.getElementsByClassName("d")[0].addEventListener("click", BackHome);

function BackHomeLogged(event) {
    let UserName = document.getElementById("user-data").value;
    let UserPassword = document.getElementById("password-data").value
    let UserShown = document.getElementById("user-nameShown");
    if (event.target.id === "anonymus") {
        UserShown.textContent = `Anónimo`;
        userFrame.style.display = "none";
        LoggedOut.style.display = "flex"
        LogIn.style.display = "none";
    } else if (UserName === "" || UserPassword === ""){
        alert(`Es obligatorio indicar un nombre de usuario y una contraseña para avanzar. Sí aún así desea continuar, aprete el botón "Anónimo"`)  
    } else {
        UserShown.textContent = `${UserName}`;
        userFrame.style.display = "none";
        LoggedOut.style.display = "flex"
        LogIn.style.display = "none";
    }
} document.getElementById("FinalLog").addEventListener("click", BackHomeLogged);
document.getElementById("FinalSign").addEventListener("click", BackHomeLogged);
document.getElementById("anonymus").addEventListener("click", BackHomeLogged);

function BackHomeLoggedOut() {
    LoggedOut.style.display = "none";
    LogIn.style.display = "flex";
    document.getElementById("user-data").value = "";
    document.getElementById("password-data").value = "";
} document.getElementById("CS").addEventListener("click", BackHomeLoggedOut);
LOCA