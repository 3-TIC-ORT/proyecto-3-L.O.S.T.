    function Redirect() {
    window.location.href =  "Creacion-publicacion.html"
 } document.getElementById("create").addEventListener("click", Redirect);

let i = 0;
function CreatePost() {
    let nuevoBox = document.createElement("div");
    nuevoBox.id = "nuevoBox" + i;
    nuevoBox.classList.add("post");
    let nuevoUp = document.createElement("div");
    nuevoUp.id = "nuevoUp" + i;
    nuevoUp.classList.add("up");
    let Uptxt = document.createElement("h1");
    Uptxt.textContent = "Imagen"
    let nuevoDown = document.createElement("div");
    nuevoDown.id = "nuevoDown" + i;
    nuevoDown.classList.add("down");
    let Downtxt = document.createElement("h3");
    Downtxt.textContent = "Título"
    document.getElementById("ObjectsList").appendChild(nuevoBox);
    document.getElementById("nuevoBox" + i).appendChild(nuevoUp);
    document.getElementById("nuevoBox" + i).appendChild(nuevoDown);
    document.getElementById("nuevoUp" + i).appendChild(Uptxt);
    document.getElementById("nuevoDown" + i).appendChild(Downtxt);
    i++;
} document.getElementById("create").addEventListener("click", CreatePost);