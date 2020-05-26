import Persona from './entidades.js';

let btnTraer = document.getElementById('btnTraer');
let btnTraerF = document.getElementById('btnTraerF');
let btnBaja = document.getElementById('btnBaja');
let info = document.getElementById('divInfo');
// document.forms nos trae un array de forms del index.html
// asi como tmb .links, etc
let formulario = document.forms[0];
// Imagen del loader
let img = document.createElement('img');
img.setAttribute('src', './images/25.gif');
img.setAttribute('alt', 'spinner');

formulario.onsubmit = (e) => {
    // e es lo mismo q event
    // Cancelo el submit
    e.preventDefault();
    // console.log("Submit Cancelado");
    // Obtengo los datos
    let nombre = document.getElementsByName('nombre')[0].value;
    let apellido = document.getElementsByName('apellido')[0].value;
    let edad = parseInt(document.getElementsByName('edad')[0].value);
    // creo la persona
    let nuevaPersona = new Persona(null, nombre, apellido, edad);
    // altaPersona(nuevaPersona);
    altaPersonaFetch(nuevaPersona);
} 

//Ajax de forma antigua
btnTraer.addEventListener('click', traerPersonas);
function traerPersonas(){
    // Este obj se usa para hacer
    // peticiones asincronas
    // Cuando recibe la informacion
    // genera un evento, hay que agregarle
    // manejadores
    let xhr = new XMLHttpRequest();



    // Agregamos manejador de eventos al
    // onreadystatechange
    // readystate tiene 5 estados
    // asi q se ejecutara 5 veces
    xhr.onreadystatechange = () =>{
        // si.. finalizo todo
        if (xhr.readyState == 4) {
            // dejo de mostrar el loader
            info.removeChild(img);
            // Si termino y esta todo bien
            if (xhr.status == 200) {
                let listaPersonas = JSON.parse(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
                info.innerHTML = `<p>Id = ${listaPersonas[0].id}</p> <p>Nombre = ${listaPersonas[0].nombre}</p> <p>Apellido = ${listaPersonas[0].apellido}</p> <p>Edad = ${listaPersonas[0].edad}</p>`
            } else {
                console.log(`${xhr.status}: ${xhr.statusText}`);
            }
        } else {
            // agrego el loader al div
            // por ende se va a mostrar
            info.appendChild(img);
        }
    };

    // El http:// lo escribo cuando no esta adentro de la carpeta
    // public del node
    xhr.open('GET', 'http://localhost:3000/traerPersonas');
    // En el metodo get va () vacio
    xhr.send();
}

// Ajax de forma moderna
btnTraerF.addEventListener('click', async () => {
    try {
        let datos = await fetch("http://localhost:3000/traerPersonas");
        let data = await datos.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }

})

function altaPersona(persona){
    // hacemos el post al servidor
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            info.removeChild(img);
            if (xhr.status == 200) {
                // ResponseText son los objetos q devuelve
                console.log(JSON.parse(xhr.responseText).todoOk);
            } else {
                console.log(`${xhr.status}: ${xhr.statusText}`);
            }
        } else {
            info.appendChild(img);
        }
    }
    xhr.open('POST', 'http://localhost:3000/altaPersona');
    // Cuando pasamos un dato por post
    // aclaramos que va a ser un json lo que se envia
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(persona));
}

function altaPersonaFetch(persona){
    fetch('http://localhost:3000/altaPersona', {
        method:'POST',
        headers:{ 'content-type' : 'application/json' },
        body: JSON.stringify(persona)
    })
    .then(respuesta => respuesta.json)
    .then(respuesta => console.log(respuesta.todoOk))
    .catch(error => console.log(error));
}

btnBaja.addEventListener('click', () => {
    let id = parseInt(document.getElementById('txtId').value);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () =>{
        if (xhr.readyState == 4) {
            info.removeChild(img);
            if (xhr.status == 200) {
                // ResponseText son los objetos q devuelve
                console.log(JSON.parse(xhr.responseText).todoOk);
            } else {
                console.log(`${xhr.status}: ${xhr.statusText}`);
            }
        } else {
            info.appendChild(img);
        }
    }
    xhr.open('POST', 'http://localhost:3000/bajaPersona');
    // le estamos pasando un tipo de dato como extraido directamente del form
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // Ojo los espacios
    xhr.send(`id=${id}`);
    // Si tengo q mandar mas de una variable
    // xhr.send(`id = ${id}&nombre=blabla`);
})
