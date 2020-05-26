//Ejemplos de la clase 6 de Lab 3

//Da un delay del tiempo "timeout" hasta que se ejecute la funcion
// setTimeout(() => {}, timeout);
//Idem timeout pero se repite cada ese tiempo interval
// setInterval(() => {}, interval);

/*
    LLamo a la funcion operar y les paso parametros
*/
// operar(4, 5, (x, y)=>{
//     console.log(x+y);
// });

// function operar (a, b, callback){
//     setTimeout(() => {
//         callback(a, b);
//     }, 3000);
//     return rta;
// }

// function sumar (x, y){
//     return x+y;
// }

// console.log(operar(4, 5, sumar));

/*
    Ejemplo de encadenamiento de funciones
    programación asincronica

    1-> Sumar dos numeros
    2-> al resultado lo elevo al cuadrado
    3-> al cuadrado lo divido por 2
    4-> a la division le resto 50
    5-> a la resta valido si es mayor a cero
*/

//Ejemplo sincronico
// var x;
// x = sumar(a, b);
// x = cuadrado(x);
// x = dividir(x);
// x = restar(x);
// console.log(validar(x));

//Ejemplo Asincronico

function operar(a, b, callback) {
  setTimeout(() => {
    return callback(a, b);
  }, 3000);
}

function potenciar(a, callback) {
  setTimeout(() => {
    return callback(a);
  }, 2000);
}

function validar(a, callback) {
  setTimeout(() => {
    return callback(a);
  }, 2000);
}

// 1-> Sumar dos numeros
// 2-> al resultado lo elevo al cuadrado
// 3-> al cuadrado lo divido por 2
// 4-> a la division le resto 50
// 5-> a la resta valido si es mayor a cero

// //Ejemplo de un callback hell
// operar(4, 5, (x, y)=>{
//     let rta = x + y;
//     console.log("Suma: " + rta);

//     potenciar(rta, (a) =>{
//         let cuadrado = Math.pow(a,2);
//         console.log("Cuadrado: " + cuadrado);

//         operar(cuadrado, 2, (a, b) =>{
//             let cociente = a / b;
//             console.log("Cociente: " + cociente);

//             operar(cociente, 50, (a , b) =>{
//                 let resta = a - b;
//                 console.log("Resta: " + resta);

//                 validar(resta, (a) => {
//                     let rta = (a>0) ? "Positivo" : "Negativo";
//                     console.log("Validacion: " + rta);
//                     return rta;
//                 })
//             })
//         })
//     })
// });

// console.log("esto esta al final del codigo");
/*
    El resolve es un valor como un return exitoso y el reject
    lo opuesto, salio todo mal
    El resolve es como un mini callback, lo q hacen es
    retornar lo q le pasamos entre el parentesis
*/

// function sumarPromesa(a, b){
//     if(isNaN(a) || isNaN(b)){
//         return Promise.reject({error: "No pasaste numeros\n"});
//     }
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             //en el caso exitoso, que resolve
//             //me devuelva a+b
//             resolve(a + b);
//         }, 2000);
//     })
// }

// function cuadradoPromesa(a){
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             //en el caso exitoso, que resolve
//             //me devuelva a+b
//             resolve(a * a);
//         }, 1000);
//     })
// }

// function dividirPromesa(a, b){
//     if(b == 0){
//         return Promise.reject({error: "No se admite la division por cero\n"});
//     }
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             //en el caso exitoso, que resolve
//             //me devuelva a+b
//             resolve(a / b);
//         }, 1000);
//     })
// }

// function restarPromesa(a, b){
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             //en el caso exitoso, que resolve
//             //me devuelva a+b
//             resolve(a - b);
//         }, 1000);
//     })
// }

// function validarPromesa(a){
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             //en el caso exitoso, que resolve
//             //me devuelva a+b
//             resolve(a >= 0 ? "Positivo" : "Negativo");
//         }, 1500);
//     })
// }

// 1-> Sumar dos numeros
// 2-> al resultado lo elevo al cuadrado
// 3-> al cuadrado lo divido por 2
// 4-> a la division le resto 50
// 5-> a la resta valido si es mayor a cero

sumarPromesa(4, 5)
  .then((retornoDeSumar) => {
    console.log("Suma: " + retornoDeSumar);
    return cuadradoPromesa(retornoDeSumar);
  })
  .then((retornoDeCuadrado) => {
    console.log("Resta: " + retornoDeCuadrado);
    return dividirPromesa(retornoDeCuadrado, 0);
  })
  .then((retornoDividir) => {
    console.log("Division: " + retornoDividir);
    return restarPromesa(retornoDividir, 50);
  })
  .then((retornoRestar) => {
    console.log("Resta: " + retornoRestar);
    return validarPromesa(retornoRestar);
  })
  .then((retornoValidacion) => {
    console.log("Validacion: " + retornoValidacion);
  })
  .catch((e) => {
    console.log(e.error);
  });

/*
    Con un solo catch seria suficiente en este caso,
    cualquier problema que hay, ese catch recibe el 
    Promise.reject (no hace falta crear objeto, mando
        el metodo estatico, ojo ahi)
    y como es clave => valor, entra al objeto, y como
    lo pusimos arriba (objeto anonimo)
    {
        error:"mensaje"
    }

    entramos a error con e.error
*/

// Practica JSON

//Como texto
console.log("[]");
console.log("{}");

//Objeto
console.log([]);
console.log({});

var foo;

//JSON
//JSON.stringify pasa de objeto JSON a string
console.log(JSON.stringify({}));
//JSON.parse convierte un objeto a objeto JSON
console.log(JSON.parse("{}"));

let persona = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 30,
  lenguajes: ["C", "Java", "Javascript"],
  nadar: true,
  redesSociales: {
    twitter: "@juanperez",
    instagram: "sarasa",
  },
};

console.log(persona);
console.log(JSON.stringify(persona));

let texto =
  '{"nombre":"Juan","apellido":"Perez","edad":30,"lenguajes":["C","Java","Javascript"],"nadar":true,"redesSociales":{"twitter":"@juanperez","instagram":"sarasa"}}';

console.log(JSON.parse(texto));
