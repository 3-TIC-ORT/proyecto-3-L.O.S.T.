import {register, login} from "index.js";


test('Pepito2010', () =>{
    expect(register({name:"Pepito2010", password:"HolaCom311"})).toBe(!null)
});