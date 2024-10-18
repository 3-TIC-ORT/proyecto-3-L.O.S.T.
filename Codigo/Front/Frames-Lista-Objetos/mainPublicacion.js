

//Hace que se muestre todo en pantallas: imagen, comentarios, descripcion, titulo, entre mas cosas.

function DataLoader () {
    let params = new URLSearchParams(document.location.search);
    let publicacionId = Number(params.get("pId"));
    let publicaciones = JSON.parse(localStorage.getItem("publicaciones"));
    for (let i = 0; i < publicaciones.length; i++) {
        if(publicaciones[i].id === publicacionId) {
            document.getElementById("titulo").textContent = publicaciones[i].titulo;
            document.getElementById("descripcion").textContent = publicaciones[i].descripcion;
            document.getElementById("fecha").textContent = publicaciones[i].hora;
            document.getElementById("lugar").textContent = publicaciones[i].ubicacion;
            document.getElementById("dejado").textContent = publicaciones[i].dejado;
            document.getElementById("foto").src = `../../data/imgs/${publicaciones[i].id}.${publicaciones[i].tipoImg}`
            for (let a = 0; a < publicaciones[i].comentarios.length; a++) {
                const comentario = 
                `<article>
                    <h4>${publicaciones[i].comentarios[a].userName}</h4>
                    <p>${publicaciones[i].comentarios[a].comm}</p>
                </article>`;
                document.getElementById("coment-box").innerHTML += comentario;
            }
            let propuesta = {
                JWT: JSON.parse(localStorage.getItem("JWT")),
                id: Number(params.get("pId"))
            }
            if (JSON.parse(localStorage.getItem("userId")) === publicaciones[i].creador || JSON.parse(localStorage.getItem("admin")) === true) {
                let editar = document.createElement("button");
                editar.id = "editar";
                editar.textContent = "Editar";
                document.querySelector("header").appendChild(editar);
                document.getElementById("quitPublicacion").addEventListener("click", () => {
                    window.location.href = "indexObjsList.html"
                })
                let terminar = document.createElement("button")
                document.getElementById("propuesta").appendChild(terminar)
                terminar.id = "terminar";
                terminar.textContent = `Terminar publicación`
                terminar.addEventListener("click", () => {
                    postData("terminarPublicacion", propuesta, (e) => {
                        if (e === false) {
                            alert("No tienes permiso para realizar esta acciónn")
                        } else if (e === "expirado") {
                            alert("Has tardado mucho tiempo, debes volver a logearte")
                                localStorage.removeItem("admin")
                                localStorage.removeItem("userId");
                                localStorage.removeItem("userName");
                                localStorage.removeItem("JWT");
                                window.location.href = "../Frames-Inicio/indexHome.html";
                        } else if (e === true) {
                            window.location.href = "indexObjsList.html";
                        } else {
                            alert("Hubo un error")
                            console.log(e);
                        }
                    })
                })
            } else {
                let encontrado = document.createElement("button");
                document.getElementById("propuesta").appendChild(encontrado)
                encontrado.id = "encontrado";
                encontrado.textContent = "Fue encontrado"
                encontrado.addEventListener("click", () => {
                    let dialog = document.createElement("dialog");
                    //falta dialog que te aparezca y te permita escribir las cosas que quieras decirle al creador
                    postData("botonEncontrar", propuesta)
                })

            }
        }
    }
}

DataLoader();

//Creo el comentario, lo guarda, lo displayea y despues le manda el comentario al back.
function Comentar(){
    let comentario = {}
    if(JSON.parse(localStorage.getItem("userId")) === null) {
        alert("Para hacer un comentario necesita haberse iniciado sesión o registrado anteriormente")
    } else {
        const container =
            `<article>
                <h4>${JSON.parse(localStorage.getItem("userName"))}</h4>
                <p>${document.getElementById("InputComentario").value}</p>
            </article>`;
        document.getElementById("coment-box").innerHTML += container;
        comentario.comm = document.getElementById("InputComentario").value;
        comentario.id = Number(new URLSearchParams(document.location.search).get("pId"));
        comentario.JWT = JSON.parse(localStorage.getItem("JWT"));
        console.log(`1` , comentario)
        postData("comentar", comentario, (retorno)=>{
            if(retorno === true){
                document.getElementById("InputComentario").value = "";
                console.log(`2` , comentario)
            } else if(retorno === "expirado"){
                alert("Has tardado mucho tiempo, debes volver a logearte")
                localStorage.removeItem("admin")
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                localStorage.removeItem("JWT");
                window.location.href = "../Frames-Inicio/indexHome.html";
            } else{
                console.log(retorno);
            }
        });
        
    }
} document.getElementById("enviar").addEventListener("click", Comentar);


function Editar () {
    window.location.href = `indexCreacionPublicacion.html?pId=${new URLSearchParams(document.location.search).get("pId")}&editado=true`
} document.getElementById("editar").addEventListener("click", Editar);
