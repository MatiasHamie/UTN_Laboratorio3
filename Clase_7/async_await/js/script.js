/*
    Clase 7 JS
    Async - Await
*/

function cuadrado(a){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(isNaN(a)){
                reject("Error. Eso no es un numero");
            } else {
                resolve(a * a);
            }
        }, 2000);
    });
}

//Si no le pongo await, aparece ya el console log 
//en la consola del navegador, como PROMESA PENDIENTE

//Y si se lo pongo, espera a que termine la promesa de ejecutarse

//Con "async" estoy simulando crear un hilo nuevo, o sea
//esta funcion cualquierNombre NO se va a ejecutar en el
//hilo principal

//Siempre una llamada con await va en un try-catch
// y el await siempre va adentro de una funcion async
async function cualquierNombre(valor){
    try {
        //Saco el cuadrado de x
        let x = await cuadrado(valor);
        console.log(`Cuadrado: ${x}`);
        //Saco el cuadrado de x nuevamente
        x = await cuadrado(x);
        console.log(`Cuadrado: ${x}`);
    } catch (error) {
        console.log(error)
    }
}

cualquierNombre(2);