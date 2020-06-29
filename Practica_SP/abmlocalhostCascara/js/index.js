import { Auto } from "./entidades/auto.js";
// Recordar que para que funcione tengo q ponerle type = "module" en el script
// -- Creacion del auto --
let auto;
window.addEventListener('load', () => {
    // -- Creo el Auto --
    auto = new Auto(
            txtPatente.value, 
            marcaElegida, 
            txtModelo.value, 
            colorElegido.value, 
            'Nafta',
            extrasElegidos
            )
})
// Cancelo el submit del boton alta
document.forms[0].addEventListener('submit', e => {
    e.preventDefault();
});

// -- Patente --
let txtPatente = document.getElementById('txtPatente');
txtPatente.addEventListener('change', () =>{
    auto.patente = txtPatente.value
})
// -- Marca / Logo --
let cmbMarca   = document.getElementById('cmbMarca');
let imgLogo = document.getElementById('imgLogo');
let marcaElegida = cmbMarca.value;
imgLogo.setAttribute('src', showLogo(marcaElegida));
// Si hay un cambio, lo modifica
cmbMarca.addEventListener('change', () => {
    marcaElegida = cmbMarca.value;
    auto.marca = marcaElegida;
    imgLogo.setAttribute('src', showLogo(marcaElegida));
})

function showLogo(logo){
    let src;
    switch (logo) {
        case 'citroen':
            src = "./images/citroen.png"
            break;
        case 'fiat':
            src = "./images/fiat.png"
            break;
        case 'ford':
            src = "./images/ford.png"
            break;
        case 'renault':
            src = "./images/renault.png"
            break;
        case 'peugeot':
            src = "./images/peugeot.png"
            break;
        default:
            break;
    }

    return src;
    
}

// -- Modelo --
let txtModelo  = document.getElementById('txtModelo');
txtModelo.addEventListener('change', () => {
    auto.modelo = txtModelo.value
})

// -- Color del auto --
let colorElegido  = document.getElementById('ctrlColor');
let iAuto = document.getElementById('iconoAuto');
// Si hay un cambio de color, actualiza el iAuto
colorElegido.addEventListener('change', () => {
    iAuto.style.setProperty('color', colorElegido.value);
    auto.color = colorElegido.value;
    console.log(colorElegido.value);
})

// -- Combustible --
let rdoNafta  = document.getElementById('rdoNafta')
let rdoDiesel = document.getElementById('rdoDiesel')
rdoNafta.addEventListener('change', () => {
    auto.combustible = 'Nafta';
})
rdoDiesel.addEventListener('change', () => {
    auto.combustible = 'Diesel';
})

// -- Extras --
let chks = document.querySelectorAll('#extras  input');
let extrasElegidos = [];
chks.forEach(e => {
    e.addEventListener('change', () => {
        if(e.checked) extrasElegidos.push(e.getAttribute('value'));
        else extrasElegidos.pop(e.getAttribute('value'));
        auto.extra = extrasElegidos;
        console.log(auto);
    })
});

// -- Fin creacion del auto --


// -- Comienzo creacion de tabla --
let divTabla = document.getElementById('divTabla');

function crearTabla(arrObjetos){
    let tabla = document.createElement('table');
    tabla.appendChild(crearHeaderTabla(arrObjetos[0]));
    tabla.appendChild(crearBodyTabla(arrObjetos));
    tabla.classList.add('table');
    // divTabla.appendChild(tabla);
    return tabla;
}

function crearHeaderTabla(unObjeto){
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    for (const key in unObjeto) {
        if (!(key === 'active')) {
            let th = document.createElement('th');
            let thTitulo = document.createTextNode(key);
            th.appendChild(thTitulo);
            tr.appendChild(th);
        }
    }
    thead.appendChild(tr);
    thead.classList.add('thead-dark');
    thead.classList.add('text-capitalize');
    thead.classList.add('text-center');
    return thead;
}

function crearBodyTabla(arrObjetos){
    let tbody = document.createElement('tbody');
    
    arrObjetos.forEach(e => {
        let tr = document.createElement('tr');
        for (const key in e) {
            if(key != 'active'){
                let td = document.createElement('td');
                if(key != 'color'){
                    if(key == 'marca'){
                        let tdImg = document.createElement('img');
                        tdImg.setAttribute('src', showLogo(e[key]));
                        td.appendChild(tdImg);
                    } else {
                        let text = document.createTextNode(e[key]);
                        td.appendChild(text);
                        td.classList.add('align-middle');//Alineo dentro del td con BS4
                    }
                } else {
                    td.style.setProperty('background-color', e[key]);
                }
                tr.appendChild(td);
            }
        }

        tbody.appendChild(tr);
        tbody.classList.add('text-center');
        tbody.classList.add('align-items-cente');
        tbody.classList.add('text-capitalize');
    });
    return tbody;
}

function refrescarTabla(divTabla, tablaCreada){
    while(divTabla.hasChildNodes()){
        divTabla.removeChild(divTabla.firstElementChild);
    }
    divTabla.appendChild(tablaCreada);
    divTabla.classList.add('table-bordered');
    divTabla.classList.add('table-hover');
}

// -------------- AJAX -----------------
// Obtencion de datos
obtenerDatosXHR();
function obtenerDatosXHR(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function(){
        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText).data;
            refrescarTabla(divTabla, crearTabla(datos));
            actualizarLocalStorage(JSON.parse(this.responseText).data);
            // eliminarUnoLocalStorage('0');
            // console.log(JSON.parse(localStorage.getItem('autos'))[0]);
        }
    } );
    xhr.open('GET', 'http://localhost:3000/traer');
    xhr.send();
}

let btnAlta = document.getElementById('btnAlta');

btnAlta.addEventListener('click', () => {
    altaObjetoXHR();
})

function altaObjetoXHR(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(JSON.parse(this.responseText));
        } else {
            console.log(`${this.status}: ${this.statusText}`);
        }
    })

    xhr.open('POST', 'http://localhost:3000/alta');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(auto));
}

function actualizarLocalStorage(datos, nuevoObj){
    let arrayDatos = JSON.parse(localStorage.getItem('autos'));
    let datosAGuardar;
    if(arrayDatos == null){
        datosAGuardar = datos;
    } else {
        arrayDatos.push(nuevoObj);
        datosAGuardar = arrayDatos;
    }

    localStorage.setItem('autos',JSON.stringify(datosAGuardar));
}

function eliminarUnoLocalStorage(dato){
    localStorage.removeItem(dato);
}