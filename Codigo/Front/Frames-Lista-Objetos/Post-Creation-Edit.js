let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.

//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back.

document.getElementById("imagen").addEventListener( `submit`, TransferData(e)); {
    e.preventDefault();
    postData("img", e.img)
}