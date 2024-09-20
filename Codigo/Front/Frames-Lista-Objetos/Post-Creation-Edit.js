let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.

//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back.
const form = document.querySelector(`form`)
form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    formulario = e.target
    publicacion.imagen = formulario.img.files[0];
    publicacion.categoria = formulario.category.value;
    publicacion.titulo = formulario.title.value;
    publicacion.ubicacion = formulario.location.value;
    publicacion.descripcion = formulario.description.value;
    publicacion.dejado = formulario.placeLeft.value;
    publicacion.hora = formulario.time.value;
    publicacion.tipo = JSON.parse(localStorage.getItem("Dupla"));
    console.log(publicacion)
    let usuario = JSON.parse(localStorage.getItem("userId"))
    publicacion.creador = usuario;
    //window.location.href = "ListaObjs.html";
    postData("crearPublicacion", publicacion);
})

