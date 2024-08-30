import { onEvent, startServer } from "soquetic";
import fs from 'fs';

// Funciones

function register(user){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/users.json", 'utf-8'));
    user.id = lista.length;
    lista.push({...user});
    fs.writeFileSync("Codigo/data/users.json", JSON.stringify(lista, null, 2));
}



// On Events
onEvent("register", register);


startServer();