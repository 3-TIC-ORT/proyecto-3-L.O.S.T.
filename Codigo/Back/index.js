import { onEvent, startServer } from "soquetic";
import fs from 'fs';

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
    user.id = lista.length;
    lista.push({...user});
    fs.writeFileSync("Codigo/data/users.json", JSON.stringify(lista, null, 2));
    return true;
    }
}



// On Events
onEvent("register", register);

startServer();