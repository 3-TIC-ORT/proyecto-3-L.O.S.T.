

//Hace que se muestre todo en pantallas: imagen, comentarios, descripcion, titulo, entre mas cosas.

function DataLoader () {
    let publicacionId = JSON.parse(localStorage.getItem("publicacionId"));
    let publicaciones = JSON.parse(localStorage.getItem("publicaciones"));
    for (i = 0; i < publicaciones.length; i++) {
        if(publicaciones[i].id === publicacionId) {
            document.getElementById("titulo").textContent = publicaciones[i].titulo
            document.getElementById("descripcion").textContent = publicaciones[i].descripcion
            document.getElementById("fecha").textContent = publicaciones[i].hora;
            document.getElementById("lugar").textContent = publicaciones[i].ubicacion;
            document.getElementById("dejado").textContent = publicaciones[i].dejado;
            document.getElementById("foto").src = `../../data/imgs/${publicaciones[i].id}.${publicaciones[i].tipoImg}`
            for (a = 0; a < publicaciones[i].comentarios.length; a++) {
                const comentario = 
                `<article>
                    <h4>${publicaciones[i].comentarios[a].userName}</h4>
                    <p>${publicaciones[i].comentarios[a].comm}</p>
                </article>`;
                document.getElementById("coment-box").innerHTML += comentario;
            }
            // Falta poner admin
            if (JSON.parse(localStorage.getItem("userId")) === publicaciones[i].creador || JSON.parse(localStorage.getItem("admin")) === true) {
                let editar = document.createElement("button");
                editar.id = "editar"
                editar.textContent = "Editar";
                document.getElementById("titulo").appendChild(editar);
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
        comentario.id = JSON.parse(localStorage.getItem("publicacionId"));
        comentario.user = JSON.parse(localStorage.getItem("userId"));
        postData("comentar", comentario);
    }
} document.getElementById("enviar").addEventListener("click", Comentar);


function Editar () {
    // NO ENTIENDO NADA 
    // const params = new URLSearchParams(window.location.search);
    // console.log(params.get("editado"))
    // let params = new URLSearchParams(window.location.search)
    // params.set("editado", true);
    // params.get("editado")   
    // params.set(`indexCreacionPublicacion?editado=pene`)
    // window.location.href = new URLSearchParams(`indexCreacionPublicacion.html?editado=true`)
    window.location.href = `indexCreacionPublicacion.html?editado=true`
} document.getElementById("editar").addEventListener("click", Editar);
