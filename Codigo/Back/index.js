import { onEvent, startServer } from "soquetic";
import fs from 'fs';


let usuarioLogged;
// Funciones



function register(user){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/users.json", 'utf-8'));
    if(user.name.length > 32){
        console.log("Su usuario no puede tener más de 32 caracteres")
        return false;
    } else{
    for(let i = 0; i < lista.length; i++){
        if(user.name == lista[i].name){
            return false;
        }
    } 
    if(user.password.length > 32 || user.password.length < 8 || user.password.match(/[a-z]/) == null && user.password.includes("ñ") === false || user.password.match(/[A-Z]/) == null && user.password.includes("Ñ") === false || user.password.match(/[0-9]/) == null){
        return false;
    }
    user.id = lista.length;
    user.admin = false;
    lista.push({...user});
    fs.writeFileSync("Codigo/data/users.json", JSON.stringify(lista, null, 2));
    usuarioLogged = user.id;
    return true;
    }
}

function login(user){
    let usuarios = JSON.parse(fs.readFileSync("Codigo/data/users.json", 'utf-8'));
    for(let i = 0; i < usuarios.length; i++){
        if(user.name === usuarios[i].name){
            user.id = usuarios[i].id
        }
    }
    if (user.id === null || user.id === undefined){
        return false;
    } else {
        if(user.password === usuarios[user.id].password){
            usuarioLogged = user.id;
            return true;
        } else{
            return false;
        }
    }
}

function cerrarSesion(){
    usuarioLogged = null;
}

function mostrarNombre(){
    if (usuarioLogged === null || usuarioLogged === undefined){
        return "Anónimo";
    } else{
        let usuarios = JSON.parse(fs.readFileSync("Codigo/data/users.json", 'utf-8'))
        return usuarios[usuarioLogged].name;
    }
}

function crearPublicacion(publicacion){
    if(usuarioLogged === null || usuarioLogged === undefined){
        return false;
    } else{
        publicacion.creador = usuarioLogged;
        let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
        publicacion.id = lista.length;
        publicacion.cumplio = false;
        lista.push({...publicacion});
        fs.writeFileSync("Codigo/data/publicaciones.json", JSON.stringify(lista, null, 2));
        return true;
    }
}

function terminarPublicacion(propuesta){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json"));
    let usuarios  = JSON.parse(fs.readFileSync("Codigo/data/users.json"));
    if(lista[propuesta.id].creador === propuesta.user || usuarioLogged[propuesta.user].admin === true){
        lista[propuesta.id].cumplio = true;
        fs.writeFileSync("Codigo/data/users.json", JSON.stringify(lista, null, 2))
        return true;
    } else{
        return false;
    }
}


// On Events
onEvent("register", register);
onEvent("login", login);
onEvent("cerrarSesion", cerrarSesion);
onEvent("mostrarNombre", mostrarNombre);
onEvent("crearPublicacion", crearPublicacion)
onEvent("terminarPublicacion", terminarPublicacion)

startServer();