// La función create po t lo que hace es repasar por toda la lista de publicaciones, y mostrar todas las que haya en el html.
function LoadPosts(postList) {
    localStorage.setItem("publicaciones", postList);
    console.log(postList)
    if(JSON.parse(localStorage.getItem("Dupla")) === "encontrado") {
        document.getElementById("title").textContent = "Objetos Perdidos"
    } else {
        document.getElementById("title").textContent = "Objetos Encontrados"
    }
    for(i = 0; i < postList.length; i++) {
        // let file = postList.imagen;
        // let reader = new FileReader();
    
        // reader.onloadend = function() {
        //     console.log('RESULT', reader.result)
        // }
        // reader.readAsDataURL(file);
        let nuevoBox = document.createElement("article");
        nuevoBox.id = `${postList[i].id}`;
        nuevoBox.classList.add("post");
        let nuevoUp = document.createElement("img");
        nuevoUp.id = "nuevoUp" + i;
        nuevoUp.classList.add("up");
        let nuevoDown = document.createElement("div");
        nuevoDown.id = "nuevoDown" + i;
        nuevoDown.classList.add("down");
        let Downtxt = document.createElement("h3");
        console.log(postList[i].imagen)
        nuevoUp.src = postList[i].imagen;
        Downtxt.textContent = postList[i].titulo;
        document.getElementById("ObjectsList").appendChild(nuevoBox);
        document.getElementById(`${postList[i].id}`).appendChild(nuevoUp);
        document.getElementById(`${postList[i].id}`).appendChild(nuevoDown);
        document.getElementById("nuevoDown" + i).appendChild(Downtxt);
    }
}
postData("cargarPublicaciones", JSON.parse(localStorage.getItem("Dupla")), LoadPosts);


function Add() {
    window.location.href = "indexCreacionPublicacion.html";
 } document.getElementById("create").addEventListener("click", Add)

function Back() {
    console.log("hola")
    window.location.href = "../Frames-Inicio/indexHome.html";
} document.getElementById("Flecha").addEventListener("click", Back);

function Enter(publicacion) {
    localStorage.setItem("publicacionId", publicacion.id);
    window.location.href = "indexPublicacion.html";
} document.querySelectorAll("article").forEach(article => {
    article.addEventListener("click", Enter);
})
