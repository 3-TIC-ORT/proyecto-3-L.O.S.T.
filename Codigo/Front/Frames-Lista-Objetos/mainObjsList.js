// La función create post lo que hace es repasar por toda la lista de publicaciones, y mostrar todas las que haya en el html.
function LoadPosts(postList) {
    localStorage.removeItem("publicacionId");   
    if(JSON.parse(localStorage.getItem("tipo")) === "encontrado") {
        document.getElementById("title").textContent = "Objetos Perdidos"
    } else {
        document.getElementById("title").textContent = "Objetos Encontrados"
    }
    for(i = 0; i < postList.length; i++) {
        let nuevoBox = document.createElement("article");
        nuevoBox.id = `${postList[i].id}`;
        nuevoBox.classList.add("post");
        let nuevoUp = document.createElement("img");
        nuevoUp.classList.add("up");
        let nuevoDown = document.createElement("div");
        nuevoDown.classList.add("down");
        let Downtxt = document.createElement("h3");
        nuevoUp.src = `../../data/imgs/${postList[i].id}.${postList[i].tipoImg}`;
        Downtxt.textContent = postList[i].titulo;
        document.getElementById("ObjectsList").appendChild(nuevoBox);
        document.getElementById(`${postList[i].id}`).appendChild(nuevoUp);
        document.getElementById(`${postList[i].id}`).appendChild(nuevoDown);
        nuevoDown.appendChild(Downtxt);
        
    }
    //Una vez cargadas las publicaciones, le agrego el EventListener a cada publicación.
    document.querySelectorAll("article").forEach(article => {
        article.addEventListener("click", Enter);
    })
    localStorage.setItem("publicaciones", JSON.stringify(postList));
}
postData("cargarPublicaciones", JSON.parse(localStorage.getItem("tipo")), LoadPosts);

// Para agregar publicación
function Add() {
    window.location.href = "indexCreacionPublicacion.html";
 } document.getElementById("create").addEventListener("click", Add)

//Ir para atrás
function Back() {
    window.location.href = "../Frames-Inicio/indexHome.html";
    localStorage.removeItem("publicaciones");
} document.getElementById("Flecha").addEventListener("click", Back);

//Te permite entrar a cada publicación
function Enter(publicacion) {
    //publicacion.target.parentNode.id agarra el id del "article", osea la publicacion
    localStorage.setItem("publicacionId", publicacion.target.parentNode.id);
    window.location.href = "indexPublicacion.html";
} 
