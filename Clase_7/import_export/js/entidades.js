/*
    Esto no es visible en Script.js,
    AUNQUE VSCode te reconozca el codigo como
    que ya existe
     Para eso necesitamos poner "export"
     a lo que querramos q sea public
     por ej.. 

     export class Personas {...}
     export const numeroCualquiera;

     o algo global
     export{Persona, numeroCualquiera};

     O desde el archivo script.js

     import {Persona, numeroCualquiera} from './entidades.js'

     Si no pongo import en el script.js como corresponde
     NO toma todos lo q exporte, solo lo que necesito

     tambien se puede hacer el
     export default Persona;
*/

export {Persona, numeroCualquiera};

class Persona{
    id;
    nombre;
    edad;

    constructor(id, nombre, edad){
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
    }

    Saludar(){
        console.log(`Hola soy ${this.nombre} y tengo ${this.edad} años`)
    }
}

const numeroCualquiera = 9;