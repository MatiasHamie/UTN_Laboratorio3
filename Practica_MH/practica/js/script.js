//Importo entidades
//Ojo no olvidarme la extension .js
import { Persona } from "./entidades/persona.js";

// Cantidad de datos de la tabla
// En este caso son 3 porque tenemos
// nombre, apellido y edad
const columnasTabla = 3;

let botonConfirmarUsuario = document.getElementById('btnConfirmarUsuario');
//Cuando el boton sea pulsado, me guardo los nombres
botonConfirmarUsuario.addEventListener('click', () => {

    //Obtengo datos
    let nombreIngresado = document.getElementById('txtNombreInput');
    let apellidoIngresado = document.getElementById('txtApellidoInput');
    let edadIngresada = document.getElementById('txtEdadInput');
    let persona;
    
    //Los valido
    if(isNaN(nombreIngresado.value) && isNaN(apellidoIngresado.value) && !isNaN(edadIngresada.value) && edadIngresada.value > 0){
        persona = new Persona(nombreIngresado.value, apellidoIngresado.value, edadIngresada.value);
        alert("Usuario ingresado ok");
    }

    //Obtengo la tabla que existe en el index.html
    let tablaDatos = document.getElementById('tablaDatos');
    
    // ---- Creacion de la fila nueva ----
    //Creo una fila (tr) y columnas (td);
    let tableRow = document.createElement('tr');
    let tdNombre = document.createElement('td');
    let tdApellido = document.createElement('td');
    let tdEdad = document.createElement('td');

    //Creo los datos de cada td
    let textNodeNombre = document.createTextNode(persona.nombre);
    let textNodeApellido = document.createTextNode(persona.apellido);
    let textNodeEdad = document.createTextNode(persona.edad);

    //Los agrego a cada td
    tdNombre.appendChild(textNodeNombre);
    tdApellido.appendChild(textNodeApellido);
    tdEdad.appendChild(textNodeEdad);

    //Agrego los td a la tr
    tableRow.appendChild(tdNombre);
    tableRow.appendChild(tdApellido);
    tableRow.appendChild(tdEdad);

    //los agrego finalmente a la tabla
    tablaDatos.appendChild(tableRow);

    // --- En el caso de que se tenga un objeto json, lo leo y hago una tabla con ellos ---
    let personasJson = [{
        "nombre": "Lynelle",
        "apellido": "Castleman",
        "edad": 88
      }, {
        "nombre": "Willey",
        "apellido": "Fortman",
        "edad": 30
      }, {
        "nombre": "Geordie",
        "apellido": "Spark",
        "edad": 51
      }, {
        "nombre": "Genna",
        "apellido": "Clarkin",
        "edad": 9
      }, {
        "nombre": "Josie",
        "apellido": "Grainge",
        "edad": 73
      }, {
        "nombre": "Sioux",
        "apellido": "Shanklin",
        "edad": 56
      }, {
        "nombre": "Ahmed",
        "apellido": "Greader",
        "edad": 56
      }, {
        "nombre": "Lauritz",
        "apellido": "Labrow",
        "edad": 51
      }, {
        "nombre": "Scarlett",
        "apellido": "Mustoo",
        "edad": 22
      }, {
        "nombre": "Fionnula",
        "apellido": "Braden",
        "edad": 38
      }]
    
    for (const persona of personasJson) {
    
        // ---- Creacion de la fila nueva ----
        //Creo una fila (tr) y columnas (td);
        let tableRow = document.createElement('tr');
        let tdNombre = document.createElement('td');
        let tdApellido = document.createElement('td');
        let tdEdad = document.createElement('td');
    
        //Creo los datos de cada td
        let textNodeNombre = document.createTextNode(persona.nombre);
        let textNodeApellido = document.createTextNode(persona.apellido);
        let textNodeEdad = document.createTextNode(persona.edad);
    
        //Los agrego a cada td
        tdNombre.appendChild(textNodeNombre);
        tdApellido.appendChild(textNodeApellido);
        tdEdad.appendChild(textNodeEdad);
    
        //Agrego los td a la tr
        tableRow.appendChild(tdNombre);
        tableRow.appendChild(tdApellido);
        tableRow.appendChild(tdEdad);
    
        //los agrego finalmente a la tabla
        tablaDatos.appendChild(tableRow);
    }
    //--------------------------------------
})

let filas = document.querySelectorAll('tr');
let persona;
filas.forEach(fila => {
    fila.addEventListener('click', () =>{
        // console.log(fila.innerText.split(/\s/));
        persona = new Persona(fila.innerText.split(/\s/)[0],fila.innerText.split(/\s/)[1],fila.innerText.split(/\s/)[2])
        document.getElementById('txtNombreOutput').value = persona.nombre;
        document.getElementById('txtApellidoOutput').value = persona.apellido;
        document.getElementById('txtEdadOutput').value = persona.edad;
    });
});

