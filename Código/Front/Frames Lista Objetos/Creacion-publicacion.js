

function comentar(){
    let lista = document.createElement("div");
    lista.textContent = `${document.getElementById("input").value}`;
    document.getElementById("comenta").appendChild(lista);
    console.log("hola");
}
document.getElementById("boti").addEventListener("click", comentar);