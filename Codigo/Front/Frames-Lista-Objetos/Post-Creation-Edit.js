let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.

//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back.

const form = document.querySelector(`form`);

form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    publicacion.image = e.img;
    publicacion.category = e.category;
    publicacion.title = e.title;
    publicacion.location = e.location;
    publicacion.description = e.description;
    let userName = localStorage.getItem(`userName`)
    let userPassword = localStorage.getItem(`userPassword`)
    let user = [JSON.parse(userPassword), JSON.parse(userName)]
    publicacion.owner = user;
    console.log(publicacion);
    // window.location.href = "ListaObjs.html"
    // postData(`publicacion`, publicacion)
})