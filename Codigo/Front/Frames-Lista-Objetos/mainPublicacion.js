let userNum = 0
let comentario = {};

//Hace que se muestre todo en pantallas: imagen, comentarios, descripcion, titulo, entre mas cosas.

function DataLoader () {
let publicaciones = localStorage.getItem("publicaciones");
}

// DataLoader();

//Creo el comentario, lo guarda, lo displayea y despues le manda el comentario al back.
function Comentar(){z
    if(localStorage.getItem("userId") === null) {
        alert("Para hacer un comentario necesita haber iniciado sesión anteriormente")
    } else {
        let user = document.createElement("h4");
        user.textContent = JSON.parse(localStorage.getItem("userName"));
        let coment = document.createElement("p"); 
        coment.textContent = `${document.getElementById("InputComentario").value}`;
        let container = document.createElement("article");
        document.getElementById("coment-box").appendChild(container);
        container.appendChild(user)
        container.appendChild(coment)
        comentario.comm = document.getElementById("InputComentario").value
        comentario.id = localStorage.getItem("userId");
        comentario.user = localStorage.getItem("userName");
        postData("comentar", comentario);
    }
} document.getElementById("enviar").addEventListener("click", Comentar);



