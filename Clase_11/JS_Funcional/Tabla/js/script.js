let datos;
let divTabla = document.getElementById('divTabla');
let btnGenero = document.querySelector('#btnGenero');
let btnMap = document.querySelector('#btnMap');

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        // Guardo los datos de mockaroo en datos
        datos = JSON.parse(this.responseText);
        console.log(datos);
        refrescarDivTabla(divTabla,crearTabla(datos));
    }
}
xhr.open('get', './js/data.json');
xhr.send();

function crearTabla(arrayDatos){
    let tabla = document.createElement('table');
    // Le paso el primer objeto para que me genere una row con los titulos
    tabla.appendChild(crearCabeceraTabla(arrayDatos[0]));
    tabla.appendChild(crearCuerpoTabla(arrayDatos));
    tabla.classList.add('table-striped');//TR distinto color
    tabla.classList.add('table-hover');//Sombrea cuando se sombrea
    tabla.classList.add('table-bordered');//Sombrea cuando se sombrea
    return tabla;
}

function crearCabeceraTabla(objeto){
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');

    for (const key in objeto) {
        let th = document.createElement('th');
        let texto = document.createTextNode(key);
        th.appendChild(texto);
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    thead.classList.add('text-capitalize');
    thead.classList.add('thead-dark');
    thead.classList.add('text-center');
    return thead;
}

function crearCuerpoTabla(arrayObjetos){
    let tbody = document.createElement('tbody');

    arrayObjetos.forEach(element => {
        let tr = document.createElement('tr');
 
        /*Ojo aca, por default me pone object y
        lo que yo quiero recorrer es el element*/
        for (const key in element) {
            let td = document.createElement('td');
            let texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    });

    return tbody;
}

/* Suele pasar que cuando quiero poner div.Has bla bla
no me aparezca el intellisense, lo q puedo hacer es
ir a una funcion donde tenga un nodo y pruebo
por ejemplo en la funcion crearCabeceraTabla pongo
th.has y ya te salta el "hasChildNodes" */
function refrescarDivTabla(div, tabla){
    // Mientras tenga hijos el divTabla, los borro de a 1
    while(div.hasChildNodes()){
        div.removeChild(div.firstElementChild);
    }

    div.appendChild(tabla);
}

/* 
    Boton y funcion para filtrar
    Nota: El filter es como el WHERE del SQL
*/
btnGenero.addEventListener('click', () =>{
    refrescarDivTabla(divTabla, crearTabla(filtrarGenero(datos, 'Male')));
})

// p = persona
function filtrarGenero(arr, genero){
    return arr.filter(p => p.genero === genero);
}

/* 
    Boton y funcion para mapear
    Nota: El Map es como un SELECT nombre,apellido as bla bla
    Estamos diciendo cuales son las columnas que quiero que aparezca

    Del array original que tengo en memoria, me hago una tabla temporal
    de lo que voy a mostrar, pero sigo con el array de datos total
*/
btnMap.addEventListener('click', () =>{
    console.log(mapearEmails(datos));
    refrescarDivTabla(divTabla, crearTabla(mapearEmails(datos)));
})

function mapearEmails(arr){
    return arr.map(e => ({email: e.email, sueldo: e.sueldo}));
}