// PARA INICIALIZAR EL TS PONER tsc -init y se nos crea el tsconfig

// Ts no sabe que el $ hace referencia a jquery
// Necesita un archivo de definiciones el cual tengo que incorporarlo
// al proyecto poniendo en terminal npm install @types/jquery

// Cualquier cosa ponemos el path de abajo, a veces se necesita
// / <reference path ="./node_modules/@types/jquery/JQuery.d.ts"/>

// Recordar hacer tsc en la consola para ir compilando cada vez que hay un cambio

// hago de ejemplo el manejador del handler del load en jquery
// $(document).ready(() => {
//     $("#btnSaludar").click(()=>{
//         alert("Hola mundo");
//     })
// })

// Por default la visibilidad es publica
// Como regla de estilo a lo privado le pongo el _
/*class Animal{
    private _edad: number;

    constructor(edad: number){
        this._edad = edad;
    }

    // Como esta adentro de una clase no hace falta ponerle function
    // setEdad(edad:number):void{
    //     this._edad = edad;
    // }

    // getEdad():number{
    //     return this._edad;
    // }

    // Usarlo como property
    set edad(edad:number){
        this._edad = edad;
    }

    get edad():number{
        return this._edad;
    }

}

let unAnimal:Animal = new Animal(3);
// Como metodos get y set
// unAnimal.setEdad(4);
// console.log(`Edad: ${unAnimal.getEdad()}`);
// Como properties
unAnimal.edad = 4;
console.log(`Edad: ${unAnimal.edad}`);

abstract class Persona{
    private _edad: number;
    private _nombre: string;
    private _apellido: string;
    static nacionalidad: string = 'Argentina';

    constructor(nombre:string, apellido:string, edad: number){
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
    }

    // Usarlo como property
    set edad(edad:number){
        this._edad = edad;
    }

    get edad():number{
        return this._edad;
    }

    set nombreCompleto(fullname:string){
        [this._nombre, this._apellido] = fullname.split(' ');
    }

    get nombreCompleto():string{
        return `Nombre completo: ${this._apellido}, ${this._nombre}`;
    }

    informarNacionalidad():void{
        console.log('Soy de nacionalidad ' + Persona.nacionalidad);
    }

    abstract saludar():void;

}

// Un enumerado se hace cuando queremos hacer una funcionalidad
// parecida a los define en prog 1, q poniamos tam 5 etc..
// Por default si no pongo nada, le pone indices del 0 en adelante
enum Sector{
    RRHH,
    Sistemas,
    Contable,
    Ventas
}

class Empleado extends Persona{
    sueldo:number;
    private _sector:Sector;

    constructor(nombre:string, apellido:string, edad: number, sueldo:number, sector:Sector){
        super(nombre, apellido, edad);
        this.sueldo = sueldo;
        this._sector = sector;
    }

    saludar():void{
        console.log('Hola soy ' + Persona.nacionalidad);
    }

    get sector():string{
        return Sector[this._sector];
    }
}

// let persona1:Persona = new Persona('Juan','Perez',3);
// console.log(persona1.nombreCompleto);

// persona1.nombreCompleto = 'Joaquin Gomez';
// console.log(persona1.nombreCompleto);

// persona1.informarNacionalidad();

let empleado1:Empleado = new Empleado('pepe','martinez', 18, 20000, Sector.Sistemas);
empleado1.informarNacionalidad();

console.log(empleado1.sector);*/
interface iConducir{
    acelerar():void;
    frenar(tiempo:number):string;
}

class Auto implements iConducir{
    marca:string;

    constructor(marca:string) {
        this.marca = marca;
    }

    acelerar() {
        console.log('Estoy acelerando');
    }

    frenar(tiempo:number):string{
        return `Piso el pedal de freno por ${tiempo} segundos`;
    }

    informarMarca():void{
        console.log(`Marca: ${this.marca}`);
    }
}
class Moto implements iConducir{
    color:string;

    constructor(color:string) {
        this.color = color;
    }

    acelerar() {
        console.log('Estoy girando el acelerador');
    }

    frenar(tiempo:number):string{
        return `Presiono la manilla de freno por ${tiempo} segundos`;
    }

    informarColor():void{
        console.log(`Color: ${this.color}`);
    }
}

let moto1: Moto = new Moto('azul');
let auto1: Auto = new Auto('Renault');

function mover(x:iConducir, tiempo:number){
    x.acelerar();
    console.log(x.frenar(200));
}

mover(moto1, 5);
mover(auto1, 2);