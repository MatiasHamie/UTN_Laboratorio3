let listaPersonas;

window.addEventListener("load", function() {
  document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault();
    console.log(recuperarPersona());
    enviarPersona(recuperarPersona());
  });

  document.getElementById("btnTraer").addEventListener("click", function() {
    traerPersonas();
  });
});

function Persona(nombre, apellido, edad) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.edad = edad;
}

function enviarPersona(persona) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let per = JSON.parse(xhr.responseText);
      document.getElementById(
        "info"
      ).innerText = `Id: ${per.id} Nombre: ${per.nombre} ${per.apellido} Edad: ${per.edad}`;
    }
  };
  xhr.open("POST", "altaPersona", true);
  xhr.setRequestHeader("Content-Type", "Application/JSON");
  console.log(JSON.stringify(persona));
  console.log(persona);
  xhr.send(JSON.stringify(persona));
}

function crearFormulario(persona) {
  let formulario = document.createElement("form");
  let lblNombre = document.createElement("lbl");
  let txtNombre = document.createElement(input);
}

function crearInput(tipo, id, name) {
  let input = document.createElement(tipo);
  input.setAttribute("id", id);
  input.setAttribute("name", name);
}

function cargarPersona(persona) {
  document.getElementById("txtNombre").value = persona.nombre;
  document.getElementById("txtApellido").value = persona.apellido;
  document.getElementById("txtEdad").value = persona.edad;
}
function recuperarPersona(persona) {
  let nombre = document.getElementById("txtNombre").value;
  let apellido = document.getElementById("txtApellido").value;
  let edad = document.getElementById("txtEdad").value;
  return new Persona(nombre, apellido, edad);
}

function traerPersonas() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
       listaPersonas = JSON.parse(xhr.responseText);      
    }
  };
  xhr.open("GET", "traerPersonas", true);
  xhr.send();
}

function generarTabla(array) {
  let tabla = document.createElement("table");
  tabla.setAttribute('style', 'border:1px solid black; border-collapse: collapse ');
 
  let tr = document.createElement("tr");
  for (prop in array[0]) {
    let th = document.createElement("th");
    th.setAttribute('style', 'border:1px solid black');
    let encabezado = document.createTextNode(prop);
    th.appendChild(encabezado);
    tr.appendChild(th);
  }
  tabla.appendChild(tr);
  for (persona of array) {
    let fila = document.createElement("tr");
    for (dato in persona) {
      let celda = document.createElement("td");      
      celda.setAttribute('style', 'border:1px solid black');
      celda.addEventListener('click', cargarFormulario);      
      let texto = document.createTextNode(persona[dato]);
      celda.appendChild(texto);
      fila.appendChild(celda);

      
    }
    tabla.appendChild(fila);
    
  }

  return tabla;
}

function cargarFormulario(e){

  let celda = e.target;
  let fila = celda.parentNode;
  let primerCelda = fila.firstElementChild;
  let id = primerCelda.textContent;
  console.log(id);

}

