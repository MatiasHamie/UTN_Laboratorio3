//Si usamos esto asi nomas, no funciona, te tira 
//el navegador Uncaught SyntaxError: Cannot use import statement outside a module
//Para solucionar eso ->
//El HTML tiene que darle permiso al script.js
//Para que pida algo al servidor, con el type
//<script src="./js/script.js" type="module"></script>
//Ojo si llamamos desde este modulo a varios *.js que 
//tengan varias variables q se llamen igual,
//Para eso uso el "as" que le pone un alias a esa variable
import {Persona, numeroCualquiera as nroCualq} from './entidades.js';

//Si queremos importar algo x default, solo se puede UNA sola cosa
//Y se pone import Persona, {numeroCualquiera} por ejemplo..

const persona1 = new Persona(1234, 'Juan', 30);
console.log(nroCualq);
persona1.Saludar();