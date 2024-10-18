// La función create post lo que hace es repasar por toda la lista de publicaciones, y mostrar todas las que haya en el html.
let filtro = {
    vestimenta: true,
    paraguas: true,
    accesorios: true,
    mochilas: true,
    cuaderno_carpeta: true,
    utiles_escolares: true,
    productos_electronicos: true,
    otros: true
}
function LoadPosts(listaCompleta) {
    // document.getElementById("ObjectsList").innerHTML = "";
    let addNav = document.createElement("nav");
    addNav.classList.add("create");
    addNav.id = "create";
    let addH1 = document.createElement("h1");
    addH1.textContent = "+";
    let addSpan = document.createElement("span");
    addSpan.classList.add("addtxt");
    addSpan.textContent = "Agregar Objeto";
    addNav.appendChild(addH1)   
    addNav.appendChild(addSpan)
    document.getElementById("ObjectsList").appendChild(addNav)
    addNav.addEventListener("click", Add)
    let postList = [];
    for(let i = 0; i < listaCompleta.length; i++){
        if(listaCompleta[i].tipo !== JSON.parse(localStorage.getItem("tipo")) && filtro[listaCompleta[i].categoria]){
            postList.push(listaCompleta[i]);
        }
    }
    
    localStorage.removeItem("publicaciones"); 
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
fetchData("cargarPublicaciones", LoadPosts);

// Para agregar publicación
function Add() {
    window.location.href = "indexCreacionPublicacion.html";
} 

//Ir para atrás
function Back() {
    window.location.href = "../Frames-Inicio/indexHome.html";
} document.getElementById("Flecha").addEventListener("click", Back);

//Te permite entrar a cada publicación
function Enter(publicacion) {
    //publicacion.target.parentNode.id agarra el id del "article", osea la publicacion
    if(publicacion.target.parentNode.id === "") {
        window.location.href = `indexPublicacion.html?pId=${publicacion.target.parentNode.parentNode.id}`;
    } else {
        window.location.href = `indexPublicacion.html?pId=${publicacion.target.parentNode.id}`;
    }
} 
