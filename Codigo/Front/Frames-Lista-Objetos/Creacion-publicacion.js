
let userNum = 0
function comentar(){

    //Hago que haya un h4 que tenga de nombre un número de usuario único y que se muestre arriba del comentario de quien lo creo, además de que no va a haber un user 0

    userNum++
    let user = document.createElement("h4");
    user.textContent = `Usuario ${userNum}:`
    document.getElementById("coment-box").appendChild(user);

    //Creo el comentario, lo guarda y los displayea

    let coment = document.createElement("div"); 
    coment.textContent = `${document.getElementById("InputComentario").value}`;
    coment.classList.add("ComentContent");
    document.getElementById("coment-box").appendChild(coment);
}
document.getElementById("boti").addEventListener("click", comentar);

