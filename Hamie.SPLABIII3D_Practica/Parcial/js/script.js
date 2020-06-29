/* -----------------------------------
 *   Primer parcial Hamie Matias
 *   UTN - TSP - Laboratorio 3
  -----------------------------------*/

//------ Importo la clase anuncio ---------
import { Anuncio_Auto } from "./entidades.js";

//------ formulario ---------
let form = document.forms[0];

//------ botones ---------
let btnGuardar = document.getElementById('btnGuardar');
let btnEliminar = document.getElementById('btnEliminar');
let btnModificar = document.getElementById('btnModificar');
let btnCancelar = document.getElementById('btnCancelar');
// let btnTraer = document.getElementById('btnTraer');
// let transaccion = cmbTransaccion.optionts(cmbTransaccion.selectedIndex).value;


//------ spinner / loader ---------
let divSpinner = document.getElementById('divSpinner');
const img = document.createElement('img');
img.setAttribute('src', './img/rueda.gif');
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
btnGuardar.addEventListener('click', altaAnuncio);
btnEliminar.addEventListener('click', bajaAnuncio);
btnModificar.addEventListener('click', modificarAnuncio);
// btnTraer.addEventListener('click', traerDatos);
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
                refrescarTabla(divTabla, crearTabla(anunciosGuardados));
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
let divTabla = document.getElementById('tablaInfoAnuncios');
/**
 * Crea una tabla dinamica y la agrega al section del html
 * en el caso de que ya haya una tabla creada, pisa ese 
 * innerHTML para eliminarla y actualizarla
*/
function crearTabla(arrObjetos){
    let tabla = document.createElement('table');
    tabla.appendChild(crearHeaderTabla(arrObjetos[0]));
    tabla.appendChild(crearBodyTabla(arrObjetos));
    tabla.classList.add('table');
    tabla.classList.add('table-bordered');
    tabla.classList.add('table-hover');
    tabla.classList.add('mt-5');
    return tabla;
}

function crearHeaderTabla(unObjeto){
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    for (const key in unObjeto) {
        let th = document.createElement('th');
        let thTitulo = document.createTextNode(key);
        th.appendChild(thTitulo);
        tr.appendChild(th);
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
            let td = document.createElement('td');
                    let text = document.createTextNode(e[key]);
                    td.appendChild(text);
                    td.addEventListener('click', getIdFromTable)
                    td.classList.add('align-middle');//Alineo dentro del td con BS4
            tr.appendChild(td);
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
}

/**
 * Resetea todos los valores de los elementos del form
 */
function cancelar(){
    document.getElementById('txtTitulo').value = '';
    let cmbTransaccion = document.getElementById('cmbTransaccion');
    cmbTransaccion.value = '';
    document.getElementById('txtDescripcion').value = '';
    document.getElementById('txtPrecio').value = '';
    document.getElementById('txtCantPuertas').value = '';
    document.getElementById('txtCantKms').value = '';
    document.getElementById('txtPotencia').value = '';
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
    let cmbTransaccion = document.getElementById('cmbTransaccion');
    let txtDescripcion = document.getElementById('txtDescripcion');
    let txtPrecio = document.getElementById('txtPrecio');
    let txtNum_puertas = document.getElementById('txtCantPuertas');
    let txtNum_KMs = document.getElementById('txtCantKms');
    let txtPotencia = document.getElementById('txtPotencia');

    txtTitulo.value = anuncio.titulo;
    txtDescripcion.value = anuncio.descripcion;
    cmbTransaccion.value = anuncio.transaccion;
    txtPrecio.value = parseInt(anuncio.precio);
    txtNum_puertas.value = parseInt(anuncio.num_puertas);
    txtNum_KMs.value = parseInt(anuncio.num_KMs);
    txtPotencia.value = parseInt(anuncio.potencia);
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
    let cmbTransaccion = document.getElementById('cmbTransaccion');

    if(cmbTransaccion.options[cmbTransaccion.selectedIndex].innerHTML != '-'){
        transaccion = cmbTransaccion.options[cmbTransaccion.selectedIndex].innerHTML;
    }

    let descripcion = document.getElementById('txtDescripcion');
    let precio = document.getElementById('txtPrecio');
    let num_puertas = document.getElementById('txtCantPuertas');
    let num_KMs = document.getElementById('txtCantKms');
    let potencia = document.getElementById('txtPotencia');

    //Verifico los datos ingresados en el formulario
    if( !(titulo.value == '') || 
        !(transaccion.value == '') || 
        !(descripcion.value == '') || 
        !((precio.value == '') || isNaN(precio.value)) || 
        !((num_puertas.value == '') || isNaN(num_puertas.value)) ||
        !((num_KMs.value == '') || isNaN(num_KMs.value)) || 
        !((potencia.value == '') || isNaN(potencia.value)))
    {
            console.log('entro al if');
            // console.log('entro al if');
            //Creo anuncio
            anuncioNuevo = new Anuncio_Auto(
                null,
                titulo.value,
                transaccion,
                descripcion.value,
                precio.value,
                num_puertas.value,
                num_KMs.value,
                potencia.value
            )
    } else {
        console.log('entro al else');
    }
}