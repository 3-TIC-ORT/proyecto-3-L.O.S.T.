
//publicacion guarda todos los inputs que pone el creador.

let publicacion = {}

function getData () {
    let params = new URLSearchParams(document.location.search);
    let fileContainer = document.getElementById("filecontainer");
    if (params.get("editado")){
        document.querySelector("h1").textContent = "Edición de Publicación";
        document.querySelector("#submit").value = "Aplicar cambios";
        let editImg = document.createElement("img");
        editImg.classList.add("editImg")
        fileContainer.appendChild(editImg)
        editImg.src = "../Imgs/change-image.png"
        JSON.parse(localStorage.getItem("publicaciones")).forEach((p)=>{
            if (p.id === Number(params.get("pId"))){
                publicacion = p;
                const form = document.querySelector(`form`)
                form.category.value = p.categoria;
                form.title.value = p.titulo;
                form.location.value = p.ubicacion;
                form.description.value = p.descripcion;
                form.placeLeft.value = p.dejado;
                form.time.value = p.hora;
                document.getElementById("imagen").src = `../../data/imgs/${p.id}.${p.tipoImg}`
            }
        })
    } else {
        let editImg = document.createElement("img");
        editImg.classList.add("editImg")
        fileContainer.appendChild(editImg)
        editImg.src = "../Imgs/change-image.png"
        fileContainer.style.backgroundImage = "url(../Imgs/Upload-img.png)"
        fileContainer.style.backgroundSize = "cover"
    }
    if(JSON.parse(localStorage.getItem("tipo")) === "perdido") {
        const form = document.querySelector(`form`);
        form.location.placeholder = "Información de contacto";
        form.placeLeft.placeholder = "Último lugar donde se vió";
        form.time.placeholder = "Hora aproximada en la que se perdió"
    }   
}

getData();


//Falta poner límite de size en imagen
//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back

const form = document.querySelector(`form`)
form.addEventListener(`submit`, (e) => {
    let params = new URLSearchParams(document.location.search);
    e.preventDefault();
    formulario = e.target;
    if (formulario.img.files[0] === undefined && !params.get("editado")) {
        publicacion.imagen = false;
        publicacion.tipoImg = "image/png"
    } else if(!params.get("editado")) {
        publicacion.imagen = formulario.img.files[0];
        publicacion.tipoImg = formulario.img.files[0].type;
    }
    publicacion.categoria = formulario.category.value;
    publicacion.titulo = formulario.title.value;
    publicacion.ubicacion = formulario.location.value;
    publicacion.descripcion = formulario.description.value;
    publicacion.dejado = formulario.placeLeft.value;
    publicacion.hora = formulario.time.value;
    if (params.get("editado")) { 
        console.log(publicacion)
        if (formulario.img.files[0] === undefined) {
            publicacion.imagen = false;
            publicacion.tipoImg = false;
        } else{
            publicacion.imagen = formulario.img.files[0];
            publicacion.tipoImg = formulario.img.files[0].type;
        }
// (Hecho por Santi porque no me deja actualizar el código con JWT, y porque es un ansioso de mierda) La siguientes funciones es lo que comprueba con el back si es que el usuario precisa re-loggearse a su cuenta
        postData("editarPublicacion", {publicacion: publicacion, JWT: JSON.parse(localStorage.getItem("JWT"))},(retorno)=>{
            console.log(publicacion)
            if (retorno === false) {
                alert("No eres el dueño de esta publicación")
            } else if(retorno === "expirado"){
                alert("Has tardado mucho tiempo, debes volver a logearte")
                localStorage.removeItem("admin")
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                localStorage.removeItem("JWT");
                window.location.href = "../Frames-Inicio/indexHome.html";
            } else if(retorno === true){
                fetchData("cargarPublicaciones", (data) => {
                    localStorage.removeItem("publicaciones");
                    localStorage.setItem("publicaciones", JSON.stringify(data));
                })
                window.location.href = `indexPublicacion.html?pId=${params.get("pId")}`;
            } else{
                console.log(retorno);
            }
        });
    } else {
        publicacion.tipo = JSON.parse(localStorage.getItem("tipo"));
        postData("crearPublicacion", {publicacion:publicacion, JWT: JSON.parse(localStorage.getItem("JWT"))}, (retorno) => {
            if (retorno === false) {
                alert("Debes estar logeado para poder crear una publicación")
            } else if(retorno === "expirado"){
                alert("Has tardado mucho tiempo, debes volver a logearte")
                localStorage.removeItem("admin")
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                localStorage.removeItem("JWT");
                window.location.href = "../Frames-Inicio/indexHome.html";
            } else if(retorno === true){
                window.location.href = "indexObjsList.html";
            } else{
                console.log(retorno);
            }
        });
    } 
})

document.getElementById("quitPublicacion").addEventListener("click", () => {
    window.location.href = `indexObjsList.html`
})

document.getElementById('fileUploader').addEventListener('change', function(event) {
    const image = event.target.files[0];
    if (image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagen');
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(image);
    }
});