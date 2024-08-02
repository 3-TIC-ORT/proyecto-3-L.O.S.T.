
function guardarNombre(){
    let Nombre = {name:document.getElementById("inputNombre").value, edad:document.getElementById("inputEdad").value};
    localStorage.setItem("objeto", JSON.stringify(Nombre));
    document.getElementById("Nombre").textContent = `${Nombre.name} ${Nombre.edad}`;
}

document.getElementById("Guardar").addEventListener("click", guardarNombre);

function ponerNombre(){
    let Nombre = JSON.parse(localStorage.getItem("objeto"));
    if (Nombre){
        document.getElementById("Nombre").textContent = `${Nombre.name} ${Nombre.edad}`;
    } else {
        document.getElementById("Nombre").textContent = "No se encontró nada guardado";
        
    }

}

ponerNombre();

// localStorage.removeItem("objeto")