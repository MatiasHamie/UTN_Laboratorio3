/* -----------------------------------
 *   Practica de parcial Hamie Matias
 *   UTN - TSP - Laboratorio 3
  -----------------------------------*/

//------ Importo la clase anuncio ---------
import { Anuncio } from "./entidades.js";

//------ formulario ---------
let form = document.forms[0];

//------ botones ---------
let btnGuardar = document.getElementById('btnGuardar');
let btnEliminar = document.getElementById('btnEliminar');
let btnModificar = document.getElementById('btnModificar');
let btnCancelar = document.getElementById('btnCancelar');
// let btnTraer = document.getElementById('btnTraer');

//------ spinner / loader ---------
let divSpinner = document.getElementById('divSpinner');
const img = document.createElement('img');
img.setAttribute('src', '../img/loader.gif');
img.setAttribute('alt', 'Gif del Loader');

//------ anuncios ---------
let anuncioNuevo;//Anuncio creado cuando se hace el submit
let anuncioClickeado;//Este objeto va a ir cambiando a medida q hago click en un td
let anunciosGuardados;//Array de datos

//------ handlers ---------
window.addEventListener('load', traerDatos);//Cada vez que se cargue la pag html actualiza la tabla
form.addEventListener('submit', (e) => {
    //Cancelo el submit del boton
    e.preventDefault();
});
btnGuardar.addEventListener('click', altaAnuncioFetch);
btnEliminar.addEventListener('click', bajaAnuncioFetch);
btnModificar.addEventListener('click', modificarAnuncio);
// btnTraer.addEventListener('click', traerDatosFetch);
btnCancelar.addEventListener('click', () => {
    cancelar();
    btnModificar.style.display = 'none';
    btnEliminar.style.display = 'none';
    btnCancelar.style.display = 'none';
});

/**
 * Pide los anuncios guardados en el servidor, y
 * crea una tabla dinámica con ellos
 */
function traerDatos(){
    //Creo instancia ajax
    let xhr = new XMLHttpRequest();

    //Agrego handler para el evento onreadystatechange
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            divSpinner.removeChild(img);
            //si recibo status 200 todo ok
            if(xhr.status === 200){
                console.log('se comunico ok');
                anunciosGuardados = JSON.parse(xhr.responseText).data;
                // console.log(anunciosGuardados);
                crearTabla();
            } else {
                console.log('todo mal');
            }
        } else {
            divSpinner.appendChild(img);
        }
    }
    //Abro la conexion con el sevidor
    xhr.open('GET', 'http://localhost:3000/traer');
    //envio la solicitud
    xhr.send();
}

/**
 * --- Ajax "Forma moderna" utilizando metodo FETCH ---
 * Pide los anuncios guardados en el servidor, y
 * crea una tabla dinámica con ellos
 */
function traerDatosFetch(){
    // divSpinner.appendChild(img);//Muestro Spinner
    fetch('http://localhost:3000/traer',{ method : 'GET'})
    .then(rtaDelServidor => rtaDelServidor.json()) //A la respuesta la parseo a json
    .then(responseText => {
        //Esa respuesta parseada uso los valores dentro de la key 'data'
        anunciosGuardados = responseText.data;
        crearTabla();
    })
    .catch(error => console.log(error));
}

/**
 * Llama a crear anuncio, el cual modifica
 * una variable anuncioNuevo que se cuentra creada al inicio de este .js
 */
function altaAnuncio(){
    //Crear anuncio devuelve null si algo no le gustó
    //Caso contrario, asigna un objeto anuncio al anuncioNuevo
    crearAnuncio();
    if(anuncioNuevo != null){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                divSpinner.removeChild(img);
                if(xhr.status === 200){
                    console.log(JSON.parse(xhr.responseText));
                    traerDatos();
                } else {
                    console.log(`${xhr.status}: ${xhr.statusText}`);
                }
            } else {
                divSpinner.appendChild(img);
            }
        }
        xhr.open('POST', 'http://localhost:3000/alta');
        xhr.setRequestHeader('content-type', 'application/json');
        console.log(anuncioNuevo);
        xhr.send(JSON.stringify(anuncioNuevo));
    }
    else{
        alert('No se pudo crear el anuncio');
    } 
}

/**
 * --- Ajax "Forma moderna" utilizando metodo FETCH ---
 * Llama a crear anuncio, el cual modifica
 * una variable anuncioNuevo que se cuentra creada al inicio de este .js
 */
function altaAnuncioFetch(){
    crearAnuncio();//Si puede crea un anuncio, si no, devuelve null
    if (anuncioNuevo != null) {
        divSpinner.appendChild(img);
        fetch('http://localhost:3000/alta',{
            method : 'POST',
            headers: { 'content-type' : 'application/json' },
            body : JSON.stringify(anuncioNuevo)
        })
        .then(rtaDelServidor => {
            console.log(rtaDelServidor.json());
            traerDatosFetch();
            divSpinner.removeChild(img);
        })
        .catch(error => console.log(error));
    } else {
        alert('No se pudo crear el anuncio');
    }
}

/**
 * Envia al servidor el ID del anuncio clickeado
 * el cual es devuelto por getIdFromTable
 */
function bajaAnuncio(){
    if (anuncioClickeado.id != null){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                divSpinner.removeChild(img);
                if(xhr.status === 200){
                    console.log(JSON.parse(xhr.responseText));
                    traerDatos();
                } else {
                    console.log(`${xhr.status}: ${xhr.statusText}`);
                }
            } else {
                divSpinner.appendChild(img);
            }
        }
        xhr.open('POST', 'http://localhost:3000/baja');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(`id=${anuncioClickeado.id}`);
    } else {
        alert('Anuncio no seleccionado');
    }
}

/**
 * Envia al servidor el ID del anuncio clickeado
 * el cual es devuelto por getIdFromTable
 */
function bajaAnuncioFetch(){
    //Me fijo si se clickeo/selecciono un anuncio (td)
    if (anuncioClickeado.id != null){
        divSpinner.appendChild(img);
        fetch('http://localhost:3000/baja',{
            method : 'POST',
            headers: { 'content-type' : 'application/x-www-form-urlencoded' },
            body : `id=${anuncioClickeado.id}`
        })
        .then(rtaDelServidor => {
            console.log(rtaDelServidor.json());
            traerDatosFetch();
            divSpinner.removeChild(img);
        })
        .catch(error => console.log(error));
    } else {
        alert('Anuncio no seleccionado');
    }
}

/**
 * Llama a crear anuncio, y le asigna el id
 * del anuncio que se selecciono, ya que el id es generado
 * por el servidor automaticamente de forma incremental
 * y no se puede modificar desde la pagina html
 */
function modificarAnuncio(){
    // console.log('entro a modificar anuncio');
    //Creo un anuncio con lo ingresado en el form
    crearAnuncio();
    // console.log(anuncioNuevo);
    //Si el anuncio nuevo != null
    if(anuncioNuevo != null){
        //Le asigno el ID del anuncio que se clickeo
        anuncioNuevo.id = anuncioClickeado.id;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                divSpinner.removeChild(img);
                if(xhr.status === 200){
                    console.log(JSON.parse(xhr.responseText));
                    traerDatos();//Traer datos ya modifica una variable anunciosGuardados
                } else {
                    console.log(`${xhr.status}: ${xhr.statusText}`);
                }
            } else {
                divSpinner.appendChild(img);
            }
        }
        xhr.open('POST', 'http://localhost:3000/modificar');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(anuncioNuevo));
    } else {
        alert('No se pudo crear el anuncio');
    }
}

/**
 * --- Ajax "Forma moderna" utilizando metodo FETCH ---
 * Llama a crear anuncio, y le asigna el id
 * del anuncio que se selecciono, ya que el id es generado
 * por el servidor automaticamente de forma incremental
 * y no se puede modificar desde la pagina html
 */
function modificarAnuncioFetch(){
    crearAnuncio();
    if (anuncioNuevo.id != null){
        divSpinner.appendChild(img);
        anuncioNuevo.id = anuncioClickeado.id;
        fetch('http://localhost:3000/modificar',{
            method : 'POST',
            headers: { 'content-type' : 'application/json' },
            body : JSON.stringify(anuncioNuevo)
        })
        .then(rtaDelServidor => {
            console.log(rtaDelServidor.json());
            traerDatosFetch();
            divSpinner.removeChild(img);
        })
        .catch(error => console.log(error));
    } else {
        alert('Anuncio no seleccionado');
    }
}

/**
 * Crea una tabla dinamica y la agrega al section del html
 * en el caso de que ya haya una tabla creada, pisa ese 
 * innerHTML para eliminarla y actualizarla
 */
function crearTabla(){
    //Me traigo la section del html donde va a estar incluida la tabla
    let section = document.getElementById('tablaInfoAnuncios');
    
    // Borro la tabla con id "tablaDatos" si es q hay
    if (document.getElementById('tablaDatos')){
        section.innerHTML = '';
    }

    //Creo una nueva
    let table = document.createElement('table');
    table.setAttribute('id', 'tablaDatos');

    //Me traigo los anuncios del servidor
    // console.log(anunciosGuardados);

    //Creo la fila donde van a ir los titulos
    let tr = document.createElement('tr');
    
    //Creo los TH recorriendo un item del array
    for (const key in anunciosGuardados[0]) {
        //Creo el th que contendra el titulo
        let th = document.createElement('th');
        //El "key" es el titulo, lo creo como textNode
        let tituloColumna = document.createTextNode(key);
        //Agrego el titulo a la "th"
        th.appendChild(tituloColumna);
        //Agrego los titulos a la fila
        tr.appendChild(th);
    }

    //Agrego esa fila con los titulos a la tabla
    table.appendChild(tr);

    //itero la lista de anuncios -> data
    // Con for-of recorro cada anuncio
    for (const item of anunciosGuardados) {
        // Creo la fila
        let tr = document.createElement('tr');
        //ahora recorro cada atributo de cada anuncio
        for (const property in item) {
            //Creo el td y su dato
            let td = document.createElement('td');
            let dato = document.createTextNode(item[property]);
            //Agrego dato al td
            td.appendChild(dato);
            td.addEventListener('click', getIdFromTable)
            //Agrego td al tr
            tr.appendChild(td);
        }
        //Agrego la fila ya terminada
        table.appendChild(tr);
    }

    //Fin, agrego la tabla a la section
    section.appendChild(table);
}

/**
 * Resetea todos los valores de los elementos del form
 */
function cancelar(){
    document.getElementById('txtTitulo').value = '';
    document.getElementById('chkVenta').checked == false;
    document.getElementById('chkAlquiler').checked == false;
    document.getElementById('txtDescripcion').value = '';
    document.getElementById('txtPrecio').value = '';
    document.getElementById('txtCantBanios').value = '';
    document.getElementById('txtCantAutos').value = '';
    document.getElementById('txtCantDormitorios').value = '';
}

/**
 * Modifica una variable ya creada en el inicio de este js
 * Segun que TD se clickee
 */
function getIdFromTable(){
    // console.log(event.target);
    //El target es la td que se clickeo
    let tdClickeada = event.target;
    //La tr es el padre de la td clickeada
    let tr = tdClickeada.parentNode;
    // tr.firstElementChild es el primer td, en este
    // caso es el id y textContent es el valor del td
    let id = tr.firstElementChild.textContent;
    // console.log(tr);
    let tituloFormulario = document.getElementById('tituloFormulario');
    // console.log(tituloFormulario.innerHTML);
    tituloFormulario.innerHTML = 'Baja / Modificacion de Anuncio';

    //Busco un anuncio que tenga el mismo ID que el que clickee de la tabla dentro de los anuncios guardados
    //los cuales son array de objetos anuncio que se modifican cada vez que se llama a traerDatos();
    let anuncioEncontrado = anunciosGuardados.find(anuncioRecorrido => parseInt(anuncioRecorrido.id) == parseInt(id));
    fillFormWithData(anuncioEncontrado);
    //Muestro botones
    btnModificar.style.display = true;
    btnEliminar.style.display = true;
    btnCancelar.style.display = true;
}

/**
 * @param {Objeto} anuncio 
 * Llena el formulario con informacion segun la TD clickeada
 */
function fillFormWithData(anuncio){
    let txtTitulo = document.getElementById('txtTitulo');
    let txtDescripcion = document.getElementById('txtDescripcion');
    let txtPrecio = document.getElementById('txtPrecio');
    let txtCantBanios = document.getElementById('txtCantBanios');
    let txtCantAutos = document.getElementById('txtCantAutos');
    let txtCantDormitorios = document.getElementById('txtCantDormitorios');
    if (anuncio.transaccion == 'venta'){
        let venta = document.getElementById('chkVenta');
        venta.checked = true;
    } else if(anuncio.transaccion == 'alquiler') {
        let alquiler = document.getElementById('chkAlquiler');
        alquiler.checked = true;
    }

    txtTitulo.value = anuncio.titulo;
    txtDescripcion.value = anuncio.descripcion;
    //Le saco el simbolo $, parto en un array de numeros con split, y los uno con join
    txtPrecio.value = parseInt(anuncio.precio.replace('$','').split(",").join(""));
    txtCantBanios.value = parseInt(anuncio.num_wc);
    txtCantAutos.value = parseInt(anuncio.num_estacionamiento);
    txtCantDormitorios.value = parseInt(anuncio.num_dormitorio);
    //Me guardo el anuncio que encontre
    anuncioClickeado = anuncio;
    //Muestro los botones
    btnModificar.style.display = 'inline';
    btnEliminar.style.display = 'inline';
    btnCancelar.style.display = 'inline';
    
}

/**
 * Crea un anuncio verificando que 
 * - Los campos q sean texto sean != ''
 * - Los campos numericos sean != '' y !Nan()
 * Si esta todo ok, creo un anuncio
 * el cual esta creado al inicio de este js
 */
function crearAnuncio(){
    let titulo = document.getElementById('txtTitulo');
    let transaccion;
    if (document.getElementById('chkVenta').checked == true) transaccion = 'venta';
    else if (document.getElementById('chkAlquiler').checked == true) transaccion = 'alquiler';
    else transaccion = '';

    let descripcion = document.getElementById('txtDescripcion');
    let precio = document.getElementById('txtPrecio');
    let cantBanios = document.getElementById('txtCantBanios');
    let cantAutos = document.getElementById('txtCantAutos');
    let cantDormitorios = document.getElementById('txtCantDormitorios');

    //Verifico los datos ingresados en el formulario
    if( !(titulo.value == '') || 
        !(transaccion.value ==  '') || 
        !(descripcion.value == '') || 
        !((precio.value == '') || isNaN(precio.value)) || 
        !((cantBanios.value == '') || isNaN(cantBanios.value)) ||
        !((cantAutos.value == '') || isNaN(cantAutos.value)) || 
        !((cantDormitorios.value == '') || isNaN(cantDormitorios.value)))
        {
            // console.log('entro al if');
            //Creo anuncio
            anuncioNuevo = new Anuncio(
                null,
                titulo.value,
                transaccion,
                descripcion.value,
                precio.value,
                cantBanios.value,
                cantAutos.value,
                cantDormitorios.value
            )
        }
}