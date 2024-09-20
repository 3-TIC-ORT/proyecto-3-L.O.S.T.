let userNum = 0
let comentario = {};

let Postdatear = postData("comentar", comentario)
//Hago que haya un h4 que tenga de nombre un número de usuario único y que se muestre arriba del comentario de quien lo creo, además de que no va a haber un user 0
function comentar(){
    userNum++
    let user = document.createElement("h4");
    user.textContent = `Usuario ${userNum}:`
    document.getElementById("coment-box").appendChild(user);
    //Creo el comentario, lo guarda y los displayea
    comentario.comm = document.getElementById("InputComentario").value
    comentario.id = localStorage.getItem("");
    comentario.user = localStorage.getItem("");


    let coment = document.createElement("article"); 
    coment.textContent = `${document.getElementById("InputComentario").value}`;
    coment.classList.add("ComentContent");
    document.getElementById("coment-box").appendChild(coment);
 
    postData("comentar", comentario)
}document.getElementById("enviar").addEventListener("click", comentar);

//mostrarComent//


 