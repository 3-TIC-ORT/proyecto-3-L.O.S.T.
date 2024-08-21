import readlineSync from "readline-sync";
import fs, { writeFileSync } from 'fs'

let usuarios = JSON.parse(fs.readFileSync("users.json"))
function registro(){
    let usuario = {};
    while(usuario.user === undefined || usuario.user === null || usuario.user.length > 32){
        usuario.user = readlineSync.question("Ingrese usuario: ");
        if(usuario.user.length > 32){
            console.log("Su usuario no puede tener más de 32 caracteres")
        }
    }
    while(usuario.password === undefined || usuario.password === null || usuario.password.length > 32 || usuario.password.length < 8){
        usuario.password = readlineSync.question("Ingrese contraseña: ");
        if(usuario.password.length > 32 || usuario.password.length < 8){
            console.log("La contraseña debe tener entre 8 y 32 caracteres")
        }
    }
    usuario.id = usuarios.length;
    usuarios.push(usuario);
    writeFileSync("users.json", JSON.stringify(usuarios,null, 2));
}
registro();