
function guardarNombre(){
    let Nombre = {name:document.getElementById("inputNombre").value, edad:document.getElementById("inputEdad").value};
    localStorage.setItem("objeto", JSON.stringify(Nombre));
    document.getElementById("Nombre").textContent = `${Nombre.name} ${Nombre.edad}`;
    window.location.href = "Hola.html"
}

document.getElementById("Guardar").addEventListener("click", guardarNombre);



// localStorage.removeItem("objeto")