import { onEvent, startServer } from "soquetic";
import fs from 'fs';


// Funciones

export function register(user){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/users.json", 'utf-8'));
    if(user.name.length > 32){
        console.log("Su usuario no puede tener más de 32 caracteres")
        return {id:null, inf:"Invalid"}
    } else{
    for(let i = 0; i < lista.length; i++){
        if(user.name == lista[i].name){
            return {id:null, inf:"Existente"}
        }
    } 
    if(user.password.length > 32 || user.password.length < 8 || user.password.match(/[a-z]/) == null && user.password.includes("ñ") === false || user.password.match(/[A-Z]/) == null && user.password.includes("Ñ") === false || user.password.match(/[0-9]/) == null){
        return {id:null, inf:"Invalid"}
    }
    user.id = lista.length;
    user.admin = false;
    lista.push({...user});
    fs.writeFileSync("Codigo/data/users.json", JSON.stringify(lista, null, 2));
    return {id:user.id, admin:user.admin};
    }
}

export function login(user){
    let usuarios = JSON.parse(fs.readFileSync("Codigo/data/users.json", 'utf-8'));
    for(let i = 0; i < usuarios.length; i++){
        if(user.name === usuarios[i].name){
            user.id = usuarios[i].id
        }
    }
    if (user.id === null || user.id === undefined){
        return {id:null, inf:"Invalid"};
    } else {
        if(user.password === usuarios[user.id].password){
            return {id:user.id, admin:usuarios[user.id].admin};
        } else{
            return {id:null, inf:"Invalid"};
        }
    }
}

function crearPublicacion(publicacion){
    if(publicacion.creador === null){
        return false;
    }
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
    publicacion.id = lista.length;
    publicacion.comentarios = [];
    publicacion.cumplio = false;
    lista.push({...publicacion});
    fs.writeFileSync("Codigo/data/publicaciones.json", JSON.stringify(lista, null, 2));
    return true;
}

function editarPublicacion(data){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
    let usuarios = JSON.parse(fs.readFileSync("Codigo/data/users.json", 'utf-8'));
    if((data.user.id === lista[data.publicacion.id].creador || usuarios[data.user.id].admin === true) && lista[data.publicacion.id] != null){
        lista[data.publicacion.id] = ({...(data.publicacion)});
        fs.writeFileSync("Codigo/data/publicaciones.json", JSON.stringify(lista, null, 2));
        return true;
    } else{
        return false;
    } 
}

function terminarPublicacion(propuesta){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json"));
    let usuarios = JSON.parse(fs.readFileSync("Codigo/data/users.json"));
    if(lista[propuesta.id].creador === propuesta.user || usuarios[propuesta.user].admin === true){
        lista[propuesta.id].cumplio = true;
        fs.writeFileSync("Codigo/data/publicaciones.json", JSON.stringify(lista, null, 2))
        return true;
    } else{
        return false;
    }
}

function cargarPublicaciones(data){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
    let van = [];
    if(data === "perdido"){
        for(let i = 0; i < lista.length; i++){
            if(lista[i].tipo === "encontrado" && lista[i].cumplio === false){
                van.push({...lista[i]})
            }
        }
    } else {
        for(let i = 0; i < lista.length; i++){
            if(lista[i].tipo === "perdido" && lista[i].cumplio === false){
                van.push({...lista[i]})
            }
            
        }
    }
    return van;
}

function comentar(data){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
    let notificaciones = JSON.parse(fs.readFileSync("Codigo/data/notificaciones.json"));
    let comentario = {user:data.user, comm:data.comm};
    lista[data.id].comentarios.push({...comentario});
    fs.writeFileSync("Codigo/data/publicaciones.json", JSON.stringify(lista, null, 2));
    let usuarios = JSON.parse(fs.readFileSync("Codigo/data/users.json"));
    let notificacion = {id:lista[data.id].creador, text: `${usuarios[data.user].name} ha comentado ${comentario.comm}`};
    notificaciones.push({...notificacion});
    fs.writeFileSync("Codigo/data/notificaciones.json", JSON.stringify(notificaciones, null, 2))
    return true;
}

function mostrarNotificaciones(user){
    let notificaciones = JSON.parse(fs.readFileSync("Codigo/data/notificaciones.json", 'utf-8'));
    let listita = [];
    notificaciones.forEach(element => {
        if(element.id === user){
            listita.push(element.text);
        }
    });
    return listita;
}


// On Events
onEvent("register", register);
onEvent("login", login);
onEvent("crearPublicacion", crearPublicacion);
onEvent("editarPublicacion", editarPublicacion);
onEvent("terminarPublicacion", terminarPublicacion);
onEvent("cargarPublicaciones", cargarPublicaciones);
onEvent("comentar", comentar);
onEvent("mostrarNotificaciones", mostrarNotificaciones);


import * as url from 'node:url';

if(import.meta.url.startsWith('file:')){
    const modulePath = url.fileURLToPath(import.meta.url);
    if(process.argv[1] === modulePath){
        startServer();
    }
}


