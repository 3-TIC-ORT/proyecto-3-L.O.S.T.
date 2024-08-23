import readlineSync from "readline-sync";
import fs from 'fs'

let usuarios = JSON.parse(fs.readFileSync("users.json"))
function registroConsola(){
    let usuario = {};
    let usuarioExistente = false;
    while(usuario.user === undefined || usuario.user === null || usuario.user.length > 32 || usuarioExistente){
        usuarioExistente = false
        usuario.user = readlineSync.question("Ingrese usuario: ");
        if(usuario.user.length > 32){
            console.log("Su usuario no puede tener más de 32 caracteres")
        }
        for(let i = 0; i < usuarios.length; i++){
            if(usuario.user == usuarios[i].user){
                console.log("Nombre de usuario en uso")
                usuarioExistente = true;
            }
        }
    }
    while(usuario.password === undefined || usuario.password === null || usuario.password.length > 32 || usuario.password.length < 8 || usuario.password.match(/[a-z]/) == null || usuario.password.match(/[A-Z]/) == null || usuario.password.match(/[0-9]/) == null){
        usuario.password = readlineSync.question("Ingrese contraseña: ");
        if(usuario.password.length > 32 || usuario.password.length < 8 || usuario.password.match(/[a-z]/) == null || usuario.password.match(/[A-Z]/) == null || usuario.password.match(/[0-9]/) == null){
            console.log("La contraseña debe tener entre 8 y 32 caracteres, al menos una minúscul, una mayúscula y un número")
        }
    }
    usuario.id = usuarios.length;
    usuarios.push(usuario);
    fs.writeFileSync("users.json", JSON.stringify(usuarios,null, 2));
}

function registroJson(){
    let usuario = {};
    let input = JSON.parse(fs.readFileSync('Input.Json'))
    let usuarioCon = true;
    usuario.user = input.user;
    if(usuario.user.length > 32){
        console.log("Su usuario no puede tener más de 32 caracteres")
        usuarioCon = false;
    }
    for(let i = 0; i < usuarios.length; i++){
        if(usuario.user == usuarios[i].user){
            console.log("Nombre de usuario en uso")
            usuarioCon = false;
        }
    }
    usuario.password = input.password;
    if(usuario.password.length > 32 || usuario.password.length < 8 || usuario.password.match(/[a-z]/) == null && usuario.password.includes("ñ") === false || usuario.password.match(/[A-Z]/) == null && usuario.password.includes("Ñ") === false || usuario.password.match(/[0-9]/) == null){
        console.log("La contraseña debe tener entre 8 y 32 caracteres, al menos una minúscul, una mayúscula y un número")
        usuarioCon = false;
    }
    if(usuarioCon){
        usuario.id = usuarios.length;
        usuarios.push(usuario);
        fs.writeFileSync("users.json", JSON.stringify(usuarios,null, 2));
    }
    else{
        console.log("Hubo un error, así que no se guardó en la base de Datos")
    }
    
}
registroJson();
// LoginJson(){

// }