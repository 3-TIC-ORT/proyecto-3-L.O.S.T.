
let userNum = 0
function comentar(){



    userNum++
    let user = document.createElement("h4");
    user.textContent = `Usuario ${userNum}:`
    document.getElementById("coment-box").appendChild(user);

    let coment = document.createElement("div"); 
    coment.textContent = `${document.getElementById("InputComentario").value}`;
    coment.classList.add("ComentContent");
    document.getElementById("coment-box").appendChild(coment);
}
document.getElementById("boti").addEventListener("click", comentar);