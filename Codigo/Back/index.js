import { onEvent, startServer } from "soquetic";
import fs from 'fs';
import * as jose from "jose";

const claveSecreta = new TextEncoder().encode(jose.base64url.encode("Felipe Daniel Doval Ferrari"));

// Funciones


// Intento registro con JWT
async function register(user){
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
    const mensaje = await new jose.SignJWT({id:user.id, admin:user.admin}).setProtectedHeader({alg:"HS256"}).sign(claveSecreta);
    return {JWT:mensaje, id:user.id, admin:user.admin};
    }
}



// Intento Login JWT
async function login(user){
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
            const mensaje = await new jose.SignJWT({id:user.id, admin:usuarios[user.id].admin}).setProtectedHeader({alg:"HS256"}).sign(claveSecreta);
            return {JWT:mensaje, id:user.id, admin:usuarios[user.id].admin};
            
        } else{
            return {id:null, inf:"Invalid"};
        }
    }
}

async function crearPublicacion({publicacion, JWT}){
    if(publicacion.creador === null || JWT === undefined){
        return false;
    }
    let tipoImg = publicacion.tipoImg.split("/").pop();
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
    publicacion.id = lista.length;
    publicacion.tipoImg = tipoImg;
    const { payload, protectedHeader } = await jose.jwtVerify(JWT, claveSecreta)
    publicacion.creador = payload.id;
    fs.writeFileSync(`Codigo/data/imgs/${publicacion.id}.${tipoImg}`, publicacion.imagen)
    publicacion.comentarios = [];
    publicacion.cumplio = false;
    delete publicacion.imagen;
    lista.push({...publicacion});
    fs.writeFileSync("Codigo/data/publicaciones.json", JSON.stringify(lista, null, 2));
    return true;
}

async function editarPublicacion({publicacion, JWT}){
    console.log(publicacion.imagen != false)
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
    const { payload, protectedHeader } = await jose.jwtVerify(JWT, claveSecreta);
    if((payload.id === lista[publicacion.id].creador || payload.admin === true) && lista[publicacion.id] != null){
        if(publicacion.imagen != false){
            console.log("Hola")
            let tipoImg = publicacion.tipoImg.split("/").pop();
            publicacion.tipoImg = tipoImg;
            console.log
            fs.writeFileSync(`Codigo/data/imgs/${publicacion.id}.${tipoImg}`, publicacion.imagen)
        } else{
            publicacion.tipoImg = lista[publicacion.id].tipoImg
        }
        delete publicacion.imagen;
        lista[publicacion.id] = ({...publicacion});
        fs.writeFileSync("Codigo/data/publicaciones.json", JSON.stringify(lista, null, 2));
        console.log("SI");
        return true;
    } else{
        console.log("NO");
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
    } else if(data === "encontrado"){
        for(let i = 0; i < lista.length; i++){
            if(lista[i].tipo === "perdido" && lista[i].cumplio === false){
                van.push({...lista[i]})
            }
            
        }
    } else {
        van = lista;
    }
    return van;
}

async function comentar(data){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
    let notificaciones = JSON.parse(fs.readFileSync("Codigo/data/notificaciones.json", "utf-8"));
    let usuarios = JSON.parse(fs.readFileSync("Codigo/data/users.json", "utf-8"));
    const { payload, protectedHeader } = await jose.jwtVerify(data.JWT, claveSecreta);
    let comentario = {user:payload.id, comm:data.comm, userName:usuarios[payload.id].name};
    lista[data.id].comentarios.push({...comentario});
    fs.writeFileSync("Codigo/data/publicaciones.json", JSON.stringify(lista, null, 2));
    let notificacion = {type: "comentario", id:lista[data.id].creador, commenter:usuarios[payload.id].name, text:comentario.comm, publicacion:data.id, leido: false};
    notificaciones.push({...notificacion});
    fs.writeFileSync("Codigo/data/notificaciones.json", JSON.stringify(notificaciones, null, 2))
    return true;
}

async function botonEncontre({JWT, publicacionId, text}){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/publicaciones.json", 'utf-8'));
    let notificaciones = JSON.parse(fs.readFileSync("Codigo/data/notificaciones.json", "utf-8"));
    let usuarios = JSON.parse(fs.readFileSync("Codigo/data/users.json", "utf-8"));
    const { payload, protectedHeader } = await jose.jwtVerify(JWT, claveSecreta);
    let notificacion = {type: lista[publicacionId].tipo, id:lista[publicacionId].creador, commenter:usuarios[payload.id].name, text:text, publicacion:publicacionId};
    notificaciones.push({...notificacion});
    fs.writeFileSync("Codigo/data/notificaciones.json", JSON.stringify(notificaciones, null, 2))
    return true;
}

async function mostrarNotificaciones(JWT){
    let notificaciones = JSON.parse(fs.readFileSync("Codigo/data/notificaciones.json", 'utf-8'));
    let listita = [];
    const { payload, protectedHeader } = await jose.jwtVerify(JWT, claveSecreta);
    notificaciones.forEach(element => {
        if(element.id === payload.id){
            listita.push(element);
        }
    });
    return listita;
}

async function notificacionesLeidas(JWT){
    let notificaciones = JSON.parse(fs.readFileSync("Codigo/data/notificaciones.json", 'utf-8'));
    const { payload, protectedHeader } = await jose.jwtVerify(JWT, claveSecreta);
    for(let i = 0; i<notificaciones.length; i++){
        if(payload.id === notificaciones[i].id){
            notificaciones[i].leido = true;
        }
    }
    fs.writeFileSync("Codigo/data/notificaciones.json", JSON.stringify(notificaciones))
}


// On Events
onEvent("register", register);
onEvent("login", login);
onEvent("crearPublicacion", crearPublicacion);
onEvent("editarPublicacion", editarPublicacion);
onEvent("terminarPublicacion", terminarPublicacion);
onEvent("cargarPublicaciones", cargarPublicaciones);
onEvent("comentar", comentar);
onEvent("botonEncontre", botonEncontre);
onEvent("mostrarNotificaciones", mostrarNotificaciones);
onEvent("notificacionesLeidas", notificacionesLeidas)


import * as url from 'node:url';

if(import.meta.url.startsWith('file:')){
    const modulePath = url.fileURLToPath(import.meta.url);
    if(process.argv[1] === modulePath){
        startServer();
    }
}

