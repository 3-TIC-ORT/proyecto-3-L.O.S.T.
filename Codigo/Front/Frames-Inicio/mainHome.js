let userFrame = document.getElementById("user-frame");  
let UserShown = document.getElementById("user-nameShown")
let logIn = document.getElementById("LS-SU");
let logOut = document.getElementById("log-stuff");
let bell = document.getElementById("bell");
let CS = document.getElementById("CS");

//Si ya estas logeado y venís de otro frame que se te ponga el nombre de usuario y que aparezca como si siguieses logueado.

function ShowUsername() {
    localStorage.removeItem("tipo");
    if (JSON.parse(localStorage.getItem("userName")) !== null) {
        UserShown.textContent = `${JSON.parse(localStorage.getItem("userName"))}`;
        userFrame.style.display = "none";
        logIn.style.display = "none";
        CS.style.display = "flex"
        bell.style.display = "flex"
    }
    else{
        UserShown.textContent = "Anónimo"
    }
}

ShowUsername();

//Te mueve a la lista de objetos encontrados o perdidos

function Found () {
    window.location.href = "../Frames-Lista-Objetos/indexObjsList.html"
    localStorage.setItem("tipo", JSON.stringify("encontrado"));
} document.getElementById("found").addEventListener("click", Found);

function Lost () {
    window.location.href = "../Frames-Lista-Objetos/indexObjsList.html"
    localStorage.setItem("tipo", JSON.stringify("perdido"))
} document.getElementById("lost").addEventListener("click", Lost);

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


function Login() {
    let UserName = document.getElementById("user-data").value;
    let UserPassword = document.getElementById("password-data").value
    UserShown = document.getElementById("user-nameShown");
    if (UserName === "" || UserPassword === ""){
        alert(`"Es obligatorio indicar un nombre de usuario y una contraseña para continuar"`);
    } else {
        postData("login", {name:UserName, password: UserPassword}, (data) => {
            if(data.id !== null){
                UserShown.textContent = `${UserName}`;
                userFrame.style.display = "none";
                logIn.style.display = "none";
                CS.style.display = "flex"
                bell.style.display = "flex"
                SetId({id:data.id, name:UserName})
            } else{
                alert(data.inf);
            }
        })
    }
} document.getElementById("FinalLog").addEventListener("click", Login);



function Register() {
    let UserName = document.getElementById("user-data").value;
    let UserPassword = document.getElementById("password-data").value
    UserShown = document.getElementById("user-nameShown");
    if (UserName === "" || UserPassword === ""){
        alert(`"Es obligatorio indicar un nombre de usuario y una contraseña para continuar"`);
    } else if ((UserName.length > 32||UserPassword.length  > 32 || UserPassword.length < 8 || UserPassword.match(/[a-z]/) == null && UserPassword.includes("ñ") === false || UserPassword.match(/[A-Z]/) == null && UserPassword.includes("Ñ") === false || UserPassword.match(/[0-9]/) == null)) {
        alert(`"La contraseña del usuario no debe contener una cantidad mayor de 32 carácteres, al igual que el nombre de usuario, y la contraseña no puede tener una cantidad menor de 8. Además, debe contener letras en minúscula, mayúscula y números"`)
    } else {
        postData("register", {name:UserName, password: UserPassword}, (data) => {
            console.log(data);
            if(data.id !== null){
                UserShown.textContent = `${UserName}`;
                userFrame.style.display = "none";
                logIn.style.display = "none";
                CS.style.display = "flex"
                bell.style.display = "flex"
                SetId({id:data.id, name:UserName, admin: data.admin})
            } else{
                alert(data.inf);
            }
        })
    }
}
document.getElementById("FinalSign").addEventListener("click", Register);

function SetId({id, name, admin}) {
    localStorage.setItem("userId", JSON.stringify(id));
    localStorage.setItem("userName", JSON.stringify(name));
    localStorage.setItem("admin", JSON.stringify(admin))
}

//La función HideShow lo que hace es que cuando se clickea uno de los dos ojos, por ejemplo el "hide"", proximamente el type del texto de la contraseña se verá como el nombre del id lo indica

let show = document.getElementById("show");
let hide = document.getElementById("hide");

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

function LogOut() {
    localStorage.removeItem("admin")
    localStorage.removeItem("userId");
    localStorage.removeItem("userName")
    bell.style.display = "none";
    CS.style.display = "none"
    logIn.style.display = "flex";
    document.getElementById("user-data").value = "";
    document.getElementById("password-data").value = "";
    UserShown.textContent = "Anónimo"
} document.getElementById("CS").addEventListener("click", LogOut);

//La función de notificaciones debería hacer que cuando apretas la campanita se te abra una caja con las notificaciones.

const modal= document.querySelector("[data-modal]")
const overlay= document.querySelector("[data-overlay]")


    document.querySelector("[data-open-modal]").addEventListener("click", () =>{ 
        modal.showModal();
        postData("mostrarNotificaciones", JSON.parse(localStorage.getItem("userId")), (lista => {
            if(lista.length === 0) {
                const h1 = `<h1>Sin notificaciones</h1>`;
                document.querySelector("dialog").innerHTML += h1;
            } else {
                lista.forEach(noti => {
                    const markup =     
                    ` <div id=${noti.publicacion}> 
                          <h5>${noti.commenter}:</h5>
                          <small>Ha comentado "${noti.text}"</small>
                      </div>`;
                    // document.getElementById(noti.publicacion).addEventListener("click", reDirect)
                    document.querySelector("dialog").innerHTML += markup;
                });
            }
        })
    )})

    modal.addEventListener ("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom 
        ) {
            modal.close()
            document.querySelector("dialog").innerHTML = ``;
        }
    }) 

function reDirect(publicacionId) {
    console.log(publicacionId)
}
 
