

//Hace que se muestre todo en pantallas: imagen, comentarios, descripcion, titulo, entre mas cosas.

const error = document.getElementById("error");

function cerrarError (e) {
    const dialogDimensions = error.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom 
    ) {
        if (document.getElementById("h2Error").textContent === "Sesión expirada") {
            window.location.href = "../Frames-Inicio/indexHome.html";
            localStorage.removeItem("admin");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("JWT");
        }
        error.close()
        document.getElementById("darker").classList.remove("darker")
    }
} error.addEventListener ("click", cerrarError);

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
            let dejadoTitle = document.querySelector("#dejado-title");
            let fechaTitle = document.querySelector("#fecha-title");
            let lugarTitle = document.querySelector("#lugar-title")
            if (publicaciones[i].tipo === "encontrado") {
                fechaTitle.textContent = "Fecha y hora"
                lugarTitle.textContent = "Lugar donde se encontró"
                dejadoTitle.textContent = "Lugar donde se dejó"
            } else if (publicaciones[i].tipo === "perdido") {
                fechaTitle.textContent = "Hora aproximada en la que se perdió"
                lugarTitle.textContent = "Información de contacto"
                dejadoTitle.textContent = "Ultima vez visto"
            }
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
                id: publicacionId
            }
            if (propuesta.JWT === undefined || propuesta.JWT === null) {
                propuesta.JWT = false;
            }
            if (JSON.parse(localStorage.getItem("userId")) === publicaciones[i].creador || JSON.parse(localStorage.getItem("admin")) === true) {
                let editar = document.createElement("button");
                editar.id = "editar";
                editar.textContent = "Editar";
                document.querySelector("#access-nav").appendChild(editar);
                document.getElementById("editar").addEventListener("click", () => {
                    window.location.href = `indexCreacionPublicacion.html?pId=${new URLSearchParams(document.location.search).get("pId")}&editado=true` 
                });
                let terminar = document.createElement("button")
                document.getElementById("propuesta").appendChild(terminar)
                terminar.id = "terminar";
                terminar.textContent = `Terminar publicación`
                terminar.addEventListener("click", () => {
                    postData("terminarPublicacion", propuesta, (e) => {
                        if (e === false) {
                            document.getElementById("headerError").style.backgroundColor = "#0783C8"
                            document.getElementById("h2Error").textContent = "Falta de Permisos"
                            document.getElementById("pError").textContent = "No tienes permiso para hacer esta acción"
                            document.getElementById("darker").classList.add("darker")
                            error.showModal();
                            cerrarError()
                        } else if (e === "expirado") {
                            document.getElementById("headerError").style.backgroundColor = "#0783C8"
                            document.getElementById("h2Error").textContent = "Sesión expirada"
                            document.getElementById("pError").textContent = "Has tardado mucho, debes volver a logearte"
                            document.getElementById("darker").classList.add("darker")
                            error.showModal();
                            cerrarError()
                        } else if (e === true) {
                            window.location.href = "indexObjsList.html";
                        } else {
                            console.log(retorno);
                            document.getElementById("h2Error").textContent = "Ocurrió un error"
                            document.getElementById("pError").textContent = "Para más información fijese en la consola"
                            document.getElementById("darker").classList.add("darker")
                            error.showModal();
                            cerrarError()
                        }
                    })
                })
            }  else {
                let dialog = document.createElement("dialog");
                dialog.classList.add("propuestaDialog")
                const h2 = document.createElement("h2");
                h2.textContent = "Envia un comentario al creador de la publicacion sobre el paradero del objeto"
                let form = document.createElement("form")
                let input = document.createElement("textarea");
                input.type = "text"
                input.required = true;
                input.name = "text"
                let submit = document.createElement("input")
                submit.type = "submit"
                submit.name = "submit"
                submit.value = "Enviar"
                document.querySelector("body").appendChild(dialog)
                dialog.appendChild(form)
                form.appendChild(h2)
                form.appendChild(input)
                form.appendChild(submit)
                form.addEventListener("submit", (e) => {
                    e.preventDefault()
                    propuesta.text = input.value
                    postData("botonEncontre", propuesta, (retorno)=>{
                        if(retorno === true){
                            dialog.close()
                        } else if (retorno === "expirado"){
                            document.getElementById("headerError").style.backgroundColor = "#0783C8"
                            document.getElementById("h2Error").textContent = "Sesión expirada"
                            document.getElementById("pError").textContent = "Has tardado mucho, debes volver a logearte"
                            document.getElementById("darker").classList.add("darker")
                            error.showModal();
                            cerrarError()
                        } else{
                            console.log(retorno);
                            document.getElementById("h2Error").textContent = "Ocurrió un error"
                            document.getElementById("pError").textContent = "Para más información fijese en la consola"
                            document.getElementById("darker").classList.add("darker")
                            error.showModal();
                            cerrarError()
                        }
                    });
                })
                dialog.addEventListener ("click", (e) => {
                    const dialogDimensions = dialog.getBoundingClientRect()
                    if (
                        e.clientX < dialogDimensions.left ||
                        e.clientX > dialogDimensions.right ||
                        e.clientY < dialogDimensions.top ||
                        e.clientY > dialogDimensions.bottom 
                    ) {
                        dialog.close()
                    }
                })
                let encontrado = document.createElement("button");
                document.getElementById("propuesta").appendChild(encontrado)
                encontrado.id = "encontrado";
                if (publicaciones[i].tipo === "encontrado") {
                    encontrado.textContent = "Es mío"
                } else {
                    encontrado.textContent = "Lo encontré"
                }
                encontrado.addEventListener("click", () => {
                    dialog.showModal();
                    }) 
            }
        }
    }
}

DataLoader();

//Creo el comentario, lo guarda, lo displayea y despues le manda el comentario al back.
function Comentar(){
    let comentario = {}
    if(JSON.parse(localStorage.getItem("JWT")) === null) {
        document.getElementById("headerError").style.backgroundColor = "#0783C8"
        document.getElementById("h2Error").textContent = "Falta de Permisos"
        document.getElementById("pError").textContent = "Para hacer un comentario necesita haberse iniciado sesión o registrado anteriormente"
        document.getElementById("darker").classList.add("darker")
        error.showModal();
        cerrarError()
    } else {
        if(document.getElementById("InputComentario").value === ""){
            document.getElementById("alerta").style.display = "flex"
        } else{
            document.getElementById("alerta").style.display = "none"
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
                    document.getElementById("headerError").style.backgroundColor = "#0783C8"
                    document.getElementById("h2Error").textContent = "Sesión expirada"
                    document.getElementById("pError").textContent = "Has tardado mucho, debes volver a logearte"
                    document.getElementById("darker").classList.add("darker")
                    error.showModal();
                    cerrarError()
                } else{
                    console.log(retorno);
                    document.getElementById("h2Error").textContent = "Ocurrió un error"
                    document.getElementById("pError").textContent = "Para más información fijese en la consola"
                    document.getElementById("darker").classList.add("darker")
                    error.showModal();
                    cerrarError()
                }
            });
        }
        
        
    }
} document.getElementById("enviar").addEventListener("click", Comentar); 

document.getElementById("quitPublicacion").addEventListener("click", () => {
    window.location.href = "indexObjsList.html"
})