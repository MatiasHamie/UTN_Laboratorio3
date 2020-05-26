//-------------------------------------------------
//--------------- Resumen clase JS-----------------
//-------------------------------------------------

/**
 * Todos los objetos van a heredar un prototipo
 */

//Equivalentes
const persona = new Object();
const persona2 = {};//Esto se usa "Objeto literal"

/** --------------------------------------------
 * Otra forma de declarar un objeto literal
 * Usando una forma clave : valor
 */
const persona3 = {
    nombre : "Pepe",
    edad : 25,
    saludar : function(){
        console.log(`Hola soy ${this.nombre}`)
    },//Ojo con esta coma, no la olvidemos
};
//Accedo
persona3.edad; 
//o tambien
persona3['edad'];
/**
 * Pero no puedo hacer
 * persona3[0];
 * Porque no es un array comun
 * es un array clave : valor
 */
//Accedo a la funcion
persona3['saludar']();
//---------------------------------------------
// Probando generador de objeto similar a un
// Constructor
let nombre = "Carlitos";
let edad = 21;

function saludar(){
    console.log(`Hola soy ${this.nombre}`);
}

const per1 = {
    nombre : nombre,
    //Si la clave = variable q quiero asignar
    //puedo hacer nombre, y listo
    edad : edad,
}

console.log(per1);
per1.saludar();

//---------------------------------------------

const array = new Array();
const array2 = [];//Esto se usa "Array Literal"

//Probando y jugando con un objeto
persona.nombre = "Juan";
persona.saludar = function(){
    console.log(`Hola soy ${this.nombre}`);
}

/**
 * Aca no funciona el this, ya que el this de
 * una arrow function va a ser el padre, el explorador
 * donde se ejecute, esto se llama window.. y 
 * como en window no hay una variable nombre,
 * va a tirar error, esa es su principal diferencia 
 * con una funcion anonima, OJO
 */
persona.saludar2 = ()=>{
    console.log(`Hola soy ${this.nombre}`);
}

//Llamo a la funcion saludar
persona.saludar();

// Funcion anónima
// function(){
//     console.log("Estoy en x");
// }


/** ----------------------------------------------
 * Funcion constructora
 * asi es como se debe hacer
 * 
 * Prototype de un objeto:
 * Es aquello que es comun entre
 * todos los objetos de un tipo determinado
 * por eso la funcion no la debo declarar en la
 * funcion constructora
 * si no en un protipo
 */
function Persona(nombre, apellido, edad){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;

    // this.saludar = function(){
    //     console.log(`Hola soy ${this.nombre}`);
    // }
}

/**
 * Con esto, lo que estoy haciendo es que todas
 * las instancias de la "clase" persona
 * tengan disponible esta funcion, 
 * en lugar de cargarla cada vez
 * que instancio un objeto
 */
Persona.prototype.saludar = function(){
    console.log(`Hola soy ${this.nombre}`);
}

Persona.prototype.presentarse = function(){
    console.log(`Hola soy ${this.nombre} ${this.apellido} y tengo ${this.edad}`);
}

//Ojo con llamar a la funcion sin el new
//ya que si bien es una funcion, se usa el new
const unaPersona = new Persona("Juan","Perez",45);
const otraPersona = new Persona("Andrea","Garcia",59);
//Si no le pasamos un valor no pasa nada
//te lo deja undefined pero no se rompe
//Se instancia igual
// const otraPersonaMas = new Persona("Matias","Sarasa");
const otraPersonaMas = new Persona("Matias","Sarasa",21);

unaPersona.saludar();
otraPersona.saludar();
otraPersonaMas.saludar();

let string1 = "Hola mundo"; //Esto ya es un objeto como new String();
String.prototype.puntuar = function(){
    return this + '.';
}

/**
 * Me fijo que ya al poner un literal
 * ya es como un objeto, le doy punto y listo
 * ya tengo todo lo de un string heredado
 */
console.log("Juan".length);

/**
 * Puedo acceder a la funcion que acabo de inventar
 * Eso es lo loco del prototype, es como que automaticamente
 * todos heredan de ahi
 */
console.log("Pepe".puntuar());

//-------------------------------------------------
//-------- Herencia y Herencia Prototipica --------
//-------------------------------------------------

/*
    Hereda los atributos con super del padre, pero
    no hereda las propiedades del prototipo como si
    comparten los objetos Persona.

    Recordar que el prototipo es de CLASE
    no puedo poner adentro del constructor 
    un this.prototype
 */
function Profesor(nombre, apellido, edad, materia){
    this.super = Persona; //Aca le digo que el padre es Persona
    this.super(nombre, apellido, edad);//Aca le paso al constructor
    this.materia = materia;
}

/*
    Aca estoy heredando los prototipos
    Estoy heredando todo lo del prototype 
    de persona
    y para no perder el constructor de profesor
    tengo q ponerle que su constructor es el de
    profesor
 */
Profesor.prototype = new Persona;
Profesor.prototype.constructor = Profesor;

/*
    Sobreescribiendo metodos por herencia
 */
Profesor.prototype.presentarse = function(){
    console.log(`Hola soy ${this.nombre} ${this.apellido} y doy ${this.materia}`);
}

//Agrego un metodo a los prototipe de los profesores
Profesor.prototype.calificar = function(){
    console.log("Desaprobaste");
}


const profesor1 = new Profesor("Mariano", "Mutti", 23, "Programación");
profesor1.presentarse();
profesor1.calificar();


//-------------------------------------------------
//----------------- Usando Clases -----------------
//--------------- Azucar sintáctica ---------------
//-------------------------------------------------
class Persona{
    constructor(nombre, apellido, edad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    saludar(){
        console.log(`Hola soy ${this.nombre}`);
    }

    presentarse(){
        console.log(`Hola soy ${this.nombre} ${this.apellido} y tengo ${this.edad}`);
    }
}

class Profesor extends Persona{
    constructor(nombre, apellido, edad, materia){
        super(nombre, apellido, edad);
        this.materia = materia;
    }

    presentarse(){
        console.log(`Hola soy ${this.nombre} ${this.apellido} y doy ${this.materia}`);
    }

    calificar(){
        console.log("Desaprobaste");
    }

    set setMateria(materia){
        this.materia = materia;
    }

    get getMateria(){
        return this.materia;
    }

    static metodoEstatico(){
        console.log("Soy un metodo de clase");
    }
}