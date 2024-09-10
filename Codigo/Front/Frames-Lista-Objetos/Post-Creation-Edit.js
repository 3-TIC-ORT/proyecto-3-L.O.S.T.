let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.

//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back.

const form = document.querySelector(`form`)

form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    formulario = e.target
    publicacion.image = formulario.img;
    publicacion.category = formulario.category;
    publicacion.title = formulario.title;
    publicacion.location = formulario.location;
    publicacion.description = formulario.description;
    let userName = localStorage.getItem(`userName`)
    let userPassword = localStorage.getItem(`userPassword`)
    let user = [JSON.parse(userPassword), JSON.parse(userName)]
    publicacion.owner = user;
    console.log(publicacion);
    // window.location.href = "ListaObjs.html"
    postData(`crearPublicacion`, publicacion)
})