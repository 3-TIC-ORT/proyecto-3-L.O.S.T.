function ponerNombre(){
    let Nombre = JSON.parse(localStorage.getItem("objeto"));
    if (Nombre){
        document.getElementById("Hola").textContent = `${Nombre.name} ${Nombre.edad}`;
    } else {
        document.getElementById("Hola").textContent = "No se encontró nada guardado";
        
    }

}

ponerNombre();