
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
        }
        error.close()
        document.getElementById("darker").classList.remove("darker")
    }
} error.addEventListener ("click", cerrarError);

// La función create post lo que hace es repasar por toda la lista de publicaciones, y mostrar todas las que haya en el html.

const colores = {
    vestimenta: "#3AD304",
    paraguas: "#0214BE",
    accesorios: "#D8D00D",
    mochilas: "#FF6200",
    "cuaderno/carpeta": "#A80384",
    "útiles escolares": "#893A01",
    "productos electrónicos": "#3BABBF",
    otros: "#FF0000"
}

let filtro = {
    vestimenta: true,
    paraguas: true,
    accesorios: true,
    mochilas: true,
    "cuaderno/carpeta": true,
    "útiles escolares": true,
    "productos electrónicos": true,
    otros: true
}
function LoadPosts(listaCompleta) {
    document.getElementById("ObjectsList").innerHTML = "";
    let addNav = document.createElement("nav");
    addNav.classList.add("create");
    addNav.id = "create";
    let addH1 = document.createElement("h1");
    addH1.textContent = "+";
    addH1.classList.add("add")
    let addSpan = document.createElement("span");
    addSpan.classList.add("addtxt");
    addSpan.textContent = "Crear publicación";
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
        let nuevoUp = document.createElement("div");
        nuevoUp.classList.add("up");
        let nuevaImg = document.createElement("img");
        nuevoUp.appendChild(nuevaImg);
        let nuevoFondo = document.createElement("img");
        nuevoUp.appendChild(nuevoFondo);
        nuevaImg.classList.add("nuevaImg");
        nuevaImg.src = `../../data/imgs/${postList[i].id}.${postList[i].tipoImg}`;
        nuevoFondo.src = `../../data/imgs/${postList[i].id}.${postList[i].tipoImg}`;
        nuevoFondo.classList.add("nuevoFondo")
        // nuevoUp.crossOrigin = "anonymous";
        // nuevoUp.onload = () => {
        //     const canvas = document.createElement('canvas');
        //     const ctx = canvas.getContext('2d');
        //     canvas.width = nuevoUp.width;
        //     canvas.height = nuevoUp.height;
        //     ctx.drawImage(nuevoUp, 0, 0, canvas.width, canvas.height);
        //     const imageData = ctx.getImageData(0, 0, nuevoUp.width, nuevoUp.height);
        //     const data = imageData.data;
        //     let r = 0, g = 0, b = 0;
        //     for (let i = 0; i < data.length; i += 4) {
        //         r += data[i];
        //         g += data[i + 1];
        //         b += data[i + 2];
        //     }
        //     const pixelCount = data.length / 4;
        //     r = Math.floor(r / pixelCount);
        //     g = Math.floor(g / pixelCount);
        //     b = Math.floor(b / pixelCount);
        //     nuevoUp.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        //     console.log(`Promedio del color: rgb(${r}, ${g}, ${b})`);
        // }
        let nuevoDown = document.createElement("div");
        nuevoDown.classList.add("down");
        let Downtxt = document.createElement("h3");
        Downtxt.textContent = postList[i].titulo;
        document.getElementById("ObjectsList").appendChild(nuevoBox);
        document.getElementById(`${postList[i].id}`).appendChild(nuevoUp);
        document.getElementById(`${postList[i].id}`).appendChild(nuevoDown);
        nuevoDown.appendChild(Downtxt);
        nuevoBox.style = `box-shadow: 0rem 0rem 1rem ${colores[postList[i].categoria]};`
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
    if (JSON.parse(localStorage.getItem("JWT")) === null) {
        document.getElementById("headerError").style.backgroundColor = "#0783C8"
        document.getElementById("h2Error").textContent = "Falta de Permisos"
        document.getElementById("pError").textContent = "Para hacer un comentario necesita haberse iniciado sesión o registrado anteriormente"
        document.getElementById("darker").classList.add("darker")
        error.showModal();
        cerrarError()
    } else {
        window.location.href = "indexCreacionPublicacion.html";
    }
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

function Filtrar(event){
    filtro[event.target.textContent.toLowerCase()] = !filtro[event.target.textContent.toLowerCase()]
    if(event.target.style.opacity == 0.5){
        event.target.style.opacity = 1
    } else if (event.target.id !== "filtros"){
        event.target.style.opacity = 0.5
    }
    fetchData("cargarPublicaciones", LoadPosts);
} document.getElementById("filtros").addEventListener("click", Filtrar)

let aside = document.querySelector("aside");
let filtroAbierto = false;

function showFilter () {
    if (!filtroAbierto) {
        aside.style.display = "flex"
        setTimeout(filtroAbierto = true, 100)
    } else {
        aside.style.display = "none" 
        setTimeout(filtroAbierto = false, 100)
    }
} document.getElementById("filtroImg").addEventListener("click", showFilter);

function closeFilter (e) {
    if (filtroAbierto && e.target !== document.getElementById("filtroImg")) {
        const dimensiones = aside.getBoundingClientRect()
        if (e.clientX < dimensiones.left || e.clientX > dimensiones.right || e.clientY < dimensiones.top ||e.clientY > dimensiones.bottom ) {
            aside.style.display = "none";
            filtroAbierto = false;
        }
    }
} document.addEventListener("click", closeFilter)