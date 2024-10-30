let userFrame = document.getElementById("user-frame");  
let UserShown = document.getElementById("user-nameShown")
let logIn = document.getElementById("log-in");
let signUp = document.getElementById("sign-up");
let logOut = document.getElementById("log-stuff");
let bell = document.getElementById("bell");
let CS = document.getElementById("CS");

//Si ya estas logeado y venís de otro frame que se te ponga el nombre de usuario y que aparezca como si siguieses logueado.

function iSettings() {
    localStorage.removeItem("publicaciones");
    //para hacer notificaciones le mando a santi que quiero todas las publicacioness
    postData("cargarPublicaciones", "all", (data) => {
        localStorage.setItem("publicaciones", JSON.stringify(data))
    })
    localStorage.removeItem("tipo");
    if (JSON.parse(localStorage.getItem("JWT")) !== null) {
        UserShown.textContent = `${JSON.parse(localStorage.getItem("userName"))}`;
        userFrame.style.display = "none";
        logIn.style.display = "none";
        signUp.style.display = "none";
        CS.style.display = "flex";
        bell.style.display = "flex";
        postData("mostrarNotificaciones", JSON.parse(localStorage.getItem("JWT")), (lista => {
            document.getElementById("notification-box").innerHTML = ``;
            if(lista === "expirado"){
                alert("Has tardado mucho tiempo, debes volver a logearte")
                localStorage.removeItem("admin");
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                localStorage.removeItem("JWT");
                window.location.href = "../Frames-Inicio/indexHome.html";
            } else if(lista === false){
                alert("Hubo un error")
            } else if(lista.length === 0) {
                let notificationBox = document.getElementById("notification-box")
                notificationBox.style.justifyContent = "center"
                bell.src = `../Imgs/bell-false.png`
                const bellNone = document.createElement("img")
                bellNone.src = "../Imgs/no-notifications.png"
                bellNone.classList.add("bellNone")
                const h5 = document.createElement("h5")
                h5.textContent = "Aquí se guardan tus notificaciones"
                const h6 = document.createElement("h6");
                h6.textContent = "No tenes ninguna notificación hasta el momento"
                notificationBox.appendChild(h6);
                notificationBox.appendChild(h5);
                notificationBox.appendChild(bellNone);
            }
            else {
                let bellringing = false
                let notificationBox = document.getElementById("notification-box")
                notificationBox.style.justifyContent = ""
                for (let i = 0; i < lista.length; i++) {
                    if (lista[i].commenter !== localStorage.getItem("userName").replace(`"`, ``).replace(`"`, ``)) {
                        const markup =     
                        ` <div id="pub${i}-${lista[i].publicacion}"> 
                              <h5 id="h5${i}-${lista[i].publicacion}"></h5>                                                         
                              <small>${lista[i].text}</small>
                          </div>`;
                          document.getElementById("notification-box").innerHTML += markup;
                          let tituloPublicacion;
                          JSON.parse(localStorage.getItem("publicaciones")).forEach(publicacion => {
                              if (publicacion.id === lista[i].publicacion) {
                                  tituloPublicacion = publicacion.titulo
                              }
                          })
                          if(lista[i].type === "encontrado") {
                            document.getElementById(`h5${i}-${lista[i].publicacion}`).textContent = `${lista[i].commenter} es el dueño de "${tituloPublicacion}":`
                          } else if (lista[i].type === "perdido") {
                            document.getElementById(`h5${i}-${lista[i].publicacion}`).textContent = `${lista[i].commenter} ha encontrado "${tituloPublicacion}":`
                          } else {
                            document.getElementById(`h5${i}-${lista[i].publicacion}`).textContent = `${lista[i].commenter} ha comentado "${tituloPublicacion}":`
                          }
                    document.getElementById(`pub${i}-${lista[i].publicacion}`).classList.remove("newNotification");
                    if (lista[i].leido === false) {
                        //Hace que las notificaciones que no son leidas aparezcan con un fondo amarillo
                        document.getElementById(`pub${i}-${lista[i].publicacion}`).classList.add("newNotification");
                        bellringing = true
                    }
                    }
                }
                if (bellringing === true){
                    bell.src = `../Imgs/bell-true.png`
                } else{
                    bell.src = `../Imgs/bell-false.png`
                }
                for (let a = 0; a < lista.length ; a++) {
                    //Por como funciona querySelector le tuve que agregar un cacho de string extra, ya que querySelector no puede agarrar números sueltos.
                    if (lista[a].commenter !== localStorage.getItem("userName") && lista[a].eliminado === false) {
                        document.querySelectorAll(`#pub${a}-${lista[a].publicacion}`).forEach(noti => {
                            noti.addEventListener("click", reDirect);
                    }) 
                    }
                }
                if (document.getElementById("notification-box").innerHTML === ``) {
                    let notificationBox = document.getElementById("notification-box")
                    notificationBox.style.justifyContent = "center"
                    bell.src = `../Imgs/bell-false.png`
                    const bellNone = document.createElement("img")
                    bellNone.src = "../Imgs/no-notifications.png"
                    bellNone.classList.add("bellNone")
                    const h5 = document.createElement("h5")
                    h5.textContent = "Aquí se guardan tus notificaciones"
                    const h6 = document.createElement("h6");
                    h6.textContent = "No tenes ninguna notificación hasta el momento"
                    notificationBox.appendChild(h6);
                    notificationBox.appendChild(h5);
                    notificationBox.appendChild(bellNone);
                }
            }
        })
    )
    }
}

iSettings();

//Te mueve a la lista de objetos encontrados o perdidos

function Found () {
    window.location.href = "../Frames-Lista-Objetos/indexObjsList.html"
    localStorage.setItem("tipo", JSON.stringify("encontrado"));
} document.getElementById("found").addEventListener("click", Found);

function Lost () {
    window.location.href = "../Frames-Lista-Objetos/indexObjsList.html"
    localStorage.setItem("tipo", JSON.stringify("perdido"))
} document.getElementById("lost").addEventListener("click", Lost);

//La función de dataBox va a la par que la siguiente función, ya que al hacer que userFrame sea un grid, permite el uso de la función BackHome.

function dataBox (event) {
    let button = event.target
    let dataReciever = document.getElementsByClassName("LS")[0];
    let containerReceiver = document.getElementById("LSs")
    let h1 = document.getElementById("status");
    document.getElementById("alerta").innerHTML = ""
    document.getElementById("alerta").style.display = "none"
    if (button.id === "log-in") {
        dataReciever.id = "FinalLog"
        h1.textContent = "‎‎ Inicia sesión"
        document.getElementById("FinalLog").textContent = "Iniciar Sesión"
        containerReceiver.addEventListener("click", Login)
    } else {
        dataReciever.id = "FinalSign"
        h1.textContent = "‎‎ Crea tu cuenta"
        document.getElementById("FinalSign").textContent = "Registrarse"
        containerReceiver.addEventListener("click", Register)

    }
    userFrame.style.display = "grid";
} document.getElementById("log-in").addEventListener("click", dataBox);
document.getElementById("sign-up").addEventListener("click", dataBox)


//La función BackHome hace que cuando apretes afuera de la caja "main", se muestre el frame de inicio devuelta.

function BackHome () {
    document.getElementById("alerta").innerHTML = ""
    document.getElementById("alerta").style.display = "none"
    userFrame.style.display = "none";
    document.getElementById("name-data").value = "";
    document.getElementById("password-data").value = "";
} 
document.getElementsByClassName("a")[0].addEventListener("click", BackHome);
document.getElementsByClassName("b")[0].addEventListener("click", BackHome);
document.getElementsByClassName("c")[0].addEventListener("click", BackHome);
document.getElementsByClassName("d")[0].addEventListener("click", BackHome);


function Login(e) {
    e.preventDefault();
    let UserName = document.getElementById("name-data").value;
    let UserPassword = document.getElementById("password-data").value;
    let alerta = document.getElementById("alerta");
    if(e.target.id === "FinalLog") {
        if (UserName === "" || UserPassword === ""){
            alerta.textContent = "Es obligatorio indicar un nombre de usuario y una contraseña para continuar"
            alerta.style.display = "flex"
        } else {
            alerta.innerHTML = ""
            postData("login", {name:UserName, password: UserPassword}, (data) => {
                console.log(data);
                if(data.id !== null){
                    UserShown.textContent = `${UserName}`;
                    userFrame.style.display = "none";
                    logIn.style.display = "none";
                    CS.style.display = "flex"
                    bell.style.display = "flex"
                    SetId({id:data.id, name:UserName, admin:data.admin, JWT:data.JWT})
                    console.log("hola")
                } else{
                    alerta.textContent = `${data.inf}`
                    alerta.style.display = "flex"
                }
            })
        }
    }
}



function Register(e) {
    e.preventDefault();
    let UserName = document.getElementById("name-data").value;
    let UserPassword = document.getElementById("password-data").value;
    let alerta = document.getElementById("alerta");
    if (e.target.id === "FinalSign") {
        if (UserName === "" || UserPassword === ""){
            alerta.textContent = "Es obligatorio indicar un nombre de usuario y una contraseña para continuar"
            alerta.style.display = "flex"
        } else if ((UserName.length > 32||UserPassword.length  > 32 || UserPassword.length < 8 || UserPassword.match(/[a-z]/) == null && UserPassword.includes("ñ") === false || UserPassword.match(/[A-Z]/) == null && UserPassword.includes("Ñ") === false || UserPassword.match(/[0-9]/) == null)) {
            alerta.textContent = "La contraseña del usuario no debe contener una cantidad mayor de 32 carácteres, al igual que el nombre de usuario, y la contraseña no puede tener una cantidad menor de 8. Además, debe contener letras en minúscula, mayúscula y números"
            alerta.style.display = "flex"
        } else {
            alerta.innerHTML = ""
            postData("register", {name:UserName, password: UserPassword}, (data) => {
                if(data.id !== null){
                    UserShown.textContent = `${UserName}`;
                    userFrame.style.display = "none";
                    logIn.style.display = "none";
                    CS.style.display = "flex"
                    bell.style.display = "flex";
                    SetId({id:data.id, name:UserName, admin: data.admin, JWT:data.JWT})
                } else{
                    alerta.textContent = `${data.inf}`
                    alerta.style.display = "flex"
                }
            })
        }
    }
}

function SetId({id, name, admin, JWT}) {
    localStorage.setItem("userId", JSON.stringify(id));
    localStorage.setItem("userName", JSON.stringify(name));
    localStorage.setItem("admin", JSON.stringify(admin));
    localStorage.setItem("JWT", JSON.stringify(JWT));
    iSettings()
}

function Focus (e) {
    let input = e.target
    if (input.id !== "password-data") {
        let padre = input.parentNode
        console.log(padre)
    }

} document.getElementById("password-data").addEventListener("click", Focus);
document.getElementById("name-data").addEventListener("click", Focus);

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
} hide.addEventListener("click", HideShow);
show.addEventListener("click", HideShow);

//Te deslogea de la cuenta y te vuelve al anónimo

function LogOut() {
    localStorage.removeItem("admin")
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("JWT");
    bell.style.display = "none";
    CS.style.display = "none"
    logIn.style.display = "flex";
    signUp.style.display = "flex"
    document.getElementById("name-data").value = "";
    document.getElementById("password-data").value = "";
    UserShown.textContent = "";
    document.getElementById("notification-box").innerHTML = "";
} document.getElementById("CS").addEventListener("click", LogOut);

//La función de notificaciones debería hacer que cuando apretas la campanita se te abra una caja con las notificaciones.

const modal= document.querySelector("[data-modal]")
const overlay= document.querySelector("[data-overlay]")


    document.querySelector("[data-open-modal]").addEventListener("click", () =>{ 
        modal.showModal();
        bell.src = `../Imgs/bell-open.png`
        postData("notificacionesLeidas", JSON.parse(localStorage.getItem("JWT")), (retorno)=>{
            if(retorno === true){
            } else if (retorno === "expirado"){
                alert("Has tardado mucho tiempo, debes volver a logearte")
                localStorage.removeItem("admin")
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                localStorage.removeItem("JWT");
                window.location.href = "../Frames-Inicio/indexHome.html";
            } else{
                alert("Hubo un error");
                console.log(retorno);
            }
        });
})

    modal.addEventListener ("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom 
        ) {
            modal.close()
            bell.src = `../Imgs/bell-false.png`
            iSettings()
        }
    }) 

function reDirect(event) {
    let clickedDiv = event.target.parentNode;
    if (clickedDiv.id === "notification-box") {
        clickedDiv = event.target
    }
    console.log(clickedDiv);
    console.log(event)
    JSON.parse(localStorage.getItem("publicaciones")).forEach(publicacion => {
        if (clickedDiv.id.split("-").pop() == publicacion.id) {
            if (publicacion.tipo === "encontrado") {
                localStorage.setItem("tipo", JSON.stringify("perdido"))
            } else {
                localStorage.setItem("tipo", JSON.stringify("encontrado"))
            }
        }
    })
    window.location.href = `../Frames-Lista-Objetos/indexPublicacion.html?pId=${clickedDiv.id.split("-").pop()}`
}