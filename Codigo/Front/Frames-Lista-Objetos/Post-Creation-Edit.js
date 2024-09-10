let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.

//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back.

const form = document.querySelector(`form`)

form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    formulario = e.target
    publicacion.imagen = formulario.img;
    publicacion.categoria = formulario.category;
    publicacion.titulo = formulario.title;
    publicacion.ubicacion = formulario.location;
    publicacion.descripcion = formulario.description;
    publicacion.dejado = formulario.placeLeft
    publicacion.hora = formulario.time
    let userName = localStorage.getItem(`userName`)
    let userPassword = localStorage.getItem(`userPassword`)
    let usuario = [JSON.parse(userPassword), JSON.parse(userName)]
    publicacion.creador = usuario;
    console.log(publicacion);
    // window.location.href = "ListaObjs.html"
    postData(`crearPublicacion`, publicacion)
})

