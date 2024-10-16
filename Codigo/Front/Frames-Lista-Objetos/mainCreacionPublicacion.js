//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back

function getData () {
    let params = new URLSearchParams(document.location.search);
    if (params.get("editado")){
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
                const foto = document.createElement("img");
                foto.src = `../../data/imgs/${p.id}.${p.tipoImg}`
                document.querySelector("body").appendChild(foto);
                localStorage.setItem("tipo", JSON.stringify(p.tipo));
                localStorage.setItem("userId", JSON.stringify(p.creador));
            }
        })
    }
}

getData();

let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.
//Falta poner límite de size en imagen y hacer de que si no mandas imagen, que te deje enviar igual.

const form = document.querySelector(`form`)
console.log("hola")
form.addEventListener(`submit`, (e) => {
    let params = new URLSearchParams(document.location.search);
    e.preventDefault();
    formulario = e.target;
    //Que haya imagen predeterminada
    //Hacer de que haya también la opción de no mandar imagen y que no se crashee
    if (formulario.img.files[0] === undefined && !params.get("editado")) {
        //Tengo que encontrar alguna manera de que el submit ignore el campo del input img, para que así me deje submittear
        // formulario.img.files[0] = ``
        publicacion.imagen = false;
        console.log(formulario.img.files[0])
        publicacion.tipoImg = "image/png"
    } else {
        publicacion.imagen = formulario.img.files[0];
        publicacion.tipoImg = formulario.img.files[0].type;
    }
    publicacion.categoria = formulario.category.value;
    publicacion.titulo = formulario.title.value;
    publicacion.ubicacion = formulario.location.value;
    publicacion.descripcion = formulario.description.value;
    publicacion.dejado = formulario.placeLeft.value;
    publicacion.hora = formulario.time.value;
    publicacion.tipo = JSON.parse(localStorage.getItem("tipo"));
    let usuario = JSON.parse(localStorage.getItem("userId"));
    publicacion.creador = usuario;
    if (params.get("editado") ) {
        if (publicacion.imagen === undefined) {
            publicacion.imagen = false;
            publicacion.tipoImg = false;
        }
// (Hecho por Santi porque no me deja actualizar el código con JWT, y porque es un ansioso de mierda) La siguientes funciones es lo que comprueba con el back si es que el usuario precisa re-loggearse a su cuenta
        postData("editarPublicacion", {publicacion: publicacion, JWT: JSON.parse(localStorage.getItem("JWT"))},(retorno)=>{
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
                window.location.href = "indexObjsList.html";
            } else{
                console.log(retorno);
            }
        });
    } else {
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
