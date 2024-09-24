import {register, login} from "./index.js";
import jest from "jest";

let Rusers = ["Pepito2020","Holahello", "Holahel lodwad", "Holad\\dhaw","\\'´¨*~+{[^{`_°¬", "¿¡!\"#$%&/()=;>><", "Hola", "Holahello"];
let Rpass = ["HolaCom311", "Holacomo123", "Holacomo123132", "123HolaASDF", "SodaStereo2007", "SodaStereo2007", "As12", "Pudriendo123"];

for(let i = 0; i < Rusers.length - 2; i++){
    jest.fn().mockName('fs.writeFileSync')
    test(`${Rusers[i]}`, () =>{
        expect(register({name:`${Rusers[i]}`, password:`${Rpass[i]}`}).inf).not.toBeTruthy();
        // expect(2+2).not.toBeTruthy();
    });
}
test(`${Rusers[7]}`, () =>{
    expect(register({name:`${Rusers[7]}`, password:`${Rpass[7]}`}).id).toBe(null);
});

test(`${Rusers[8]}`, () =>{
    expect(register({name:`${Rusers[8]}`, password:`${Rpass[8]}`}).id).toBe(null);
});

