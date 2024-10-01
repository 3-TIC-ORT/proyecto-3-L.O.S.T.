let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.

//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back.

//Falta función de relleno de datos de la publicación que queres editar.
 
function getData () {
    let params = new URLSearchParams(document.location.search);
    if (params.get( "editado")){
        JSON.parse(localStorage.getItem("publicaciones")).forEach((p)=>{
            if (p.id === JSON.parse(localStorage.getItem("publicacionId"))){
                publicacion = p;
                const form = document.querySelector(`form`)
                //falta que hacer con la imagen
                form.category.value = p.categoria;
                form.title.value = p.titulo;
                form.location.value = p.ubicacion;
                form.description.value = p.descripcion;
                form.placeLeft.value = p.dejado;
                form.time.value = p.hora;
                const foto = document.createElement("img")
                foto.src = p.imagen
                document.querySelector("body").appendChild(foto);
                //quizá usar URL params también
                localStorage.setItem("tipo", JSON.stringify(p.tipo));
                localStorage.setItem("userId", JSON.stringify(p.creador));
            }
        })
    }
}

getData();

const form = document.querySelector(`form`)
form.addEventListener(`submit`, (e) => {
    let params = new URLSearchParams(document.location.search);
    e.preventDefault();
    formulario = e.target;
    //Que haya imagen predeterminada
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
    if (params.get("editado")) {
        postData("editarPublicacion", publicacion);
    } else {
        postData("crearPublicacion", publicacion, (retorno) => {
            if (!retorno) {
                alert("Debes estar logeado para poder crear una publicación")
            }
        });
    window.location.href = "indexObjsList.html";
    }
    localStorage.removeItem("editado");
})
