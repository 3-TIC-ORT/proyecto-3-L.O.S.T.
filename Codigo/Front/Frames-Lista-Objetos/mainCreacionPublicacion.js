let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.

//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back.

//Falta función de relleno de datos de la publicación que queres editar.
 
function getData () {
    if (JSON.parse(localStorage.getItem("editado"))) {
        JSON.parse(localStorage.getItem("publicaciones")).forEach((p)=>{
            if (p.id === JSON.parse(localStorage.getItem("publicacionId"))){
                publicacion = p;
                const form = document.querySelector(`form`)
                console.log(form.img)
                // Voy a usar URL Params
            }
        })
    }
}

getData();

const form = document.querySelector(`form`)
form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    formulario = e.target;
    publicacion.imagen = formulario.img.files[0];
    publicacion.tipoImg = formulario.img.files[0].type;
    publicacion.categoria = formulario.category.value;
    publicacion.titulo = formulario.title.value;
    publicacion.ubicacion = formulario.location.value;
    publicacion.descripcion = formulario.description.value;
    publicacion.dejado = formulario.placeLeft.value;
    publicacion.hora = formulario.time.value;
    publicacion.tipo = JSON.parse(localStorage.getItem("tipo"));
    let usuario = JSON.parse(localStorage.getItem("userId"));
    publicacion.creador = usuario;
    window.location.href = "indexObjsList.html";
    if (JSON.parse(localStorage.getItem("editado"))) {
        postData("editarPublicacion", publicacion);
    } else {
        postData("crearPublicacion", publicacion, (retorno) => {
            if (!retorno) {
                alert("Debes estar logeado para poder crear una publicación")
            }
        });
    }
    localStorage.removeItem("editado");
})
