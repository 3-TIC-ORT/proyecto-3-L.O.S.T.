import {register, login} from "./index.js";

let Rusers = ["Pepito2020","Holahello", "Holahellodwad", "Holad\\dhaw","\\'´¨*~+{[^{`_°¬", "¿¡!\"#$%&/()=;>><", "Hola", "Holahello"];
let Rpass = ["HolaCom311", "Holacomo123", "Holacomo123132", "123HolaASDF", "SodaStereo2007", "SodaStereo2007", "As12", "Pudriendo123"];

for(let i = 0; i < Rusers.length - 2; i++){
    test(`${Rusers[i]}`, () =>{
        expect(register({name:`${Rusers[i]}`, password:`${Rusers[i]}`}).inf).not.toBeTruthy();
        // expect(2+2).not.toBeTruthy();
    });
}
test(`${Rusers[7]}`, () =>{
    expect(register({name:`${Rusers[7]}`, password:`${Rusers[7]}`}).inf).not.toBeTruthy();
});

test(`${Rusers[8]}`, () =>{
    expect(register({name:`${Rusers[8]}`, password:`${Rusers[8]}`}).inf).not.toBeTruthy();
});

