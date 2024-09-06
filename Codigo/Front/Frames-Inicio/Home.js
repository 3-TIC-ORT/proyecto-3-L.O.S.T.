let userFrame = document.getElementById("user-frame");  
let UserShwon = document.getElementById("user-nameShown")
let LogIn = document.getElementById("LS-SU");
let LogOut = document.getElementById("log-stuff")
let bell = document.getElementById("bell")
let CS = document.getElementById("CS")
let comentNotis = document.getElementById("comentNotis")

function found () {
    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
    //Faltaría que cambie el textcontent del título de la lista así se distingue cual es cual, hay dos maneras que veo posibles: La primera es que se importe una clase o algo por el estilo del otro css. La otra que se me hace más fácil es que linkear el html con el css para que javascript tenga acceso a las otras clases, aunque deberíamos tener cuidado con el conflicto entre clases entre ambos css.
} document.getElementById("found").addEventListener("click", found);

function lost () {
    window.location.href = "../Frames-Lista-Objetos/ListaObjs.html"
    //Lo mismo que dije arriba
} document.getElementById("lost").addEventListener("click", found);

//La función Noti debería hacer que cuando apretas la campanita se te abra una caja con las notificaciones.

//Pedir opinión a Santi

function Notifications () {
let comentNotis = document.getElementById("comentNotis");

if (comentNotis.style.display === "") {
    comentNotis.style.display = "flex"
} else if (comentNotis.style.display === "none"){
    comentNotis.style.display = "flex"
} else {
    comentNotis.style.display = "none"
}
} document.getElementById("bell").addEventListener("click", Notifications);

//La función de LS va a la par que la siguiente función, ya que al hacer que userFrame sea un grid, permite el uso de la función BackHome.

function LS () {
    userFrame.style.display = "grid";
} document.getElementById("LS-SU").addEventListener("click", LS);


//La función BackHome hace que cuando apretes afuera de la caja "main", se muestre el frame de inicio devuelta.

function BackHome () {
    userFrame.style.display = "none";
} 
document.getElementsByClassName("a")[0].addEventListener("click", BackHome);
document.getElementsByClassName("b")[0].addEventListener("click", BackHome);
document.getElementsByClassName("c")[0].addEventListener("click", BackHome);
document.getElementsByClassName("d")[0].addEventListener("click", BackHome);

//La función BackHomeLogged simula lo que es cuando te loggeas, displayeando tu nombre de usuario arriba a la derecha, aunque esta función es útil, a la larga con base de datos hay una posibilidad de que se saque o modifique

function BackHomeLogged() {
    let UserName = document.getElementById("user-data").value;
    let UserPassword = document.getElementById("password-data").value
    let UserShown = document.getElementById("user-nameShown");
    if (UserName === "" || UserPassword === ""){
        alert(`"Es obligatorio indicar un nombre de usuario y una contraseña para continuar"`);
    } else {
        UserShown.textContent = `${UserName}`;
        userFrame.style.display = "none";
        LogIn.style.display = "none";
        CS.style.display = "flex"
        bell.style.display = "flex"

    }
} document.getElementById("FinalLog").addEventListener("click", BackHomeLogged);



function Register() {
    let UserName = document.getElementById("user-data").value;
    let UserPassword = document.getElementById("password-data").value
    let UserShown = document.getElementById("user-nameShown");
    if (UserName === "" || UserPassword === ""){
        alert(`"Es obligatorio indicar un nombre de usuario y una contraseña para continuar"`);
    } else if ((UserName.length > 32||UserPassword.length  > 32 || UserPassword.length < 8 || UserPassword.match(/[a-z]/) == null && UserPassword.includes("ñ") === false || UserPassword.match(/[A-Z]/) == null && UserPassword.includes("Ñ") === false || UserPassword.match(/[0-9]/) == null)) {
        alert(`"La contraseña del usuario no debe contener una cantidad mayor de 32 carácteres, al igual que el nombre de usuario, y la contraseña no puede tener una cantidad menor de 8. Además, debe contener letras en minúscula, mayúscula y números"`)
    } else {
        postData("register", {name:UserName, password: UserPassword}, (data) => {
            if(data === true){
                UserShown.textContent = `${UserName}`;
                userFrame.style.display = "none";
                LogIn.style.display = "none";
                CS.style.display = "flex"
                bell.style.display = "flex"
            } else{
                alert("Hubo un error");
            }
        })
    }

}
document.getElementById("FinalSign").addEventListener("click", Register);

let show = document.getElementById("show");
let hide = document.getElementById("hide");

//La función HideShow lo que hace es que cuando se clickea uno de los dos ojos, por ejemplo el "hide"", proximamente el type del texto de la contraseña se verá como el nombre del id lo indica

function HideShow (event) {
    if (event.target.id === "hide") {
        document.getElementById(`password-data`).type = `text`;
        show.style.display = "block";
        hide.style.display = "none";
    } else if (event.target.id === "show"){
        document.getElementById(`password-data`).type = `password`;
        show.style.display = "none";
        hide.style.display = "block";
    }
} document.getElementById("hide").addEventListener("click", HideShow);
document.getElementById("show").addEventListener("click", HideShow);

//Te deslogea de la cuenta y te vuelve al anónimo

function BackHomeLoggedOut() {

    //comentNotis está por ver

    comentNotis.style.display = "none"
    bell.style.display = "none";
    CS.style.display = "none"
    LogIn.style.display = "flex";
    document.getElementById("user-data").value = "";
    document.getElementById("password-data").value = "";
    UserShwon.textContent = "Anónimo"
} document.getElementById("CS").addEventListener("click", BackHomeLoggedOut);

