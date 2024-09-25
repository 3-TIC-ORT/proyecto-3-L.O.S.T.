

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
            document.getElementById("foto").src = `../../data/imgs/${publicaciones[i].id}.${publicaciones[i].tipoImg}`;
            for (a = 0; a < publicaciones[i].comentarios.length; a++) {
                let articulo = document.createElement("article");
                document.getElementById("coment-box").appendChild(articulo);
                let name =  document.createElement("h4");
                name.textContent = publicaciones[i].comentario[a].user;
                article.appendChild(name);
                let coment =  document.createElement("p");
                coment.textContent = publicaciones[i].comentario[a].comm;
                article.appendChild(coment);
            }
        }
    }
}

DataLoader();

//Creo el comentario, lo guarda, lo displayea y despues le manda el comentario al back.
function Comentar(){
    let comentario = {}
    if(localStorage.getItem("userId") === null) {
        alert("Para hacer un comentario necesita haber iniciado sesión o registrado anteriormente")
    } else {
        console.log("hola")
        let user = document.createElement("h4");
        user.textContent = JSON.parse(localStorage.getItem("userName"));
        let coment = document.createElement("p"); 
        coment.textContent = `${document.getElementById("InputComentario").value}`;
        let container = document.createElement("article");
        document.getElementById("coment-box").appendChild(container);
        container.appendChild(user)
        container.appendChild(coment)
        comentario.comm = document.getElementById("InputComentario").value
        comentario.id = JSON.parse(localStorage.getItem("userId"));
        comentario.user = JSON.parse(localStorage.getItem("userName"));
        postData("comentar", comentario);
    }
} document.getElementById("enviar").addEventListener("click", Comentar);



