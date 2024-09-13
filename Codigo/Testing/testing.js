let userlogged = null;

postData("cargarPublicaciones", "encontrado", cargarPublicaciones)

function userUpdate(data){
    if(data.id === null){
        userlogged = data.id;
        document.getElementById("resultado").innerHTML = userlogged
        console.log(userlogged);
    } else{
        userlogged = data.id;
        document.getElementById("resultado").innerHTML = userlogged
        console.log(userlogged);
    }
    
}

function register(){
    postData("register", {name:document.getElementById("username").value, password:document.getElementById("password").value}, userUpdate)
}

function login(){
    postData("login", {name:document.getElementById("username").value, password:document.getElementById("password").value}, userUpdate)
}

function cargarPublicaciones(data){
    data.forEach(publicacion => {
        let titulo = document.createElement("p");
        let descripcion = document.createElement("p");
        titulo.innerHTML = publicacion.titulo;
        descripcion.innerHTML = publicacion.descripcion
        document.getElementById("publicaciones").appendChild(titulo);
        document.getElementById("publicaciones").appendChild(descripcion);
    });
}

