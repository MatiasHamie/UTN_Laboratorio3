//Ejemplo de manejo del dom
// document.getElementById(); es mas rapido que querySelector();
// document.getElementsByName();

//Estas dos fueron reemplazadas por ->
//(devuelven un HTML Collection)
// document.getElementsByTagName();
// document.getElementsByClassName();
//-> estas
//(devuelven un nodeList (array))
// document.querySelector();
// document.querySelectorAll();

//Me traigo una lista
// const listaEspecificaDelHtml = document.getElementById('lista');
// console.log(listaEspecificaDelHtml);

// const parrafosDelHtml = document.getElementsByTagName('p');
//Todos los parrafos
// console.log(parrafosDelHtml);

//Un parrafo especifico
// console.log(parrafosDelHtml[0]);

//Un div con enlaces
// const divEspecificoConEnlaces = document.getElementsByClassName('Navegacion');
// console.log(divEspecificoConEnlaces);


// let nombre = document.getElementsByName('nombre'); 
// <form action=""><input type="text" name="nombre" id="txtNombre" placeholder="Ingrese Nombre"></form> */}
//Esto devuelve un nodeList parecido a un array y != a HTML collection
// console.log(nombre);

// console.log("---------------------");

//Nos trae un elemento pero se pone como en CSS
//Por Id
// const listaEspecificaDelHtml2 = document.querySelector('#lista');
// console.log(listaEspecificaDelHtml2);
//Por Clase
// const todosLosDiv = document.querySelectorAll('div');
// console.log(todosLosDiv);

//Ahora voy a recorrer con un forEach que YA TIENE 
//el nodeList
//Esto es lo mismo que ->
// todosLosDiv.forEach(elemento => console.log(elemento));


//Ejemplo del forEach
//Creo un array cualquiera
//El tercer parametro aunq no lo usemos se pone
//Esto va a agarrar el 22 al elemento
//despues el 0 al indice (opcional)
//y por ultimo el array entero como tercer parametro (opc)
// [22,45,43,67].forEach(function(elemento){
//     console.log(`Elemento: ${elemento}`);
// })

//Esto seria parametro => lo que quiero q haga la funcion
// [22,45,43,67].forEach(elemento => console.log(elemento));

//Traeme los li que esten dentro de uls 
//Lo mismo que en css
// const todosLosDiv = document.querySelectorAll('ul li');
// todosLosDiv.forEach(elemento => console.log(elemento));


//Si dice elemento le da importancia a los nodos del tipo elemento
//y si no, le da bola hasta a los ENTER que hayan

//Hay elementos q se llaman thruly y falsy
//sibling = "hermano"
//Obtengo el elemento lista que deseo
// const lista = document.querySelector('#lista');

//Obtengo los hijos de esa lista, lo q esta adentro seria
// let hijosDeLaLista = lista.children;
//Primer hijo
// let primerElementoHijo = lista.firstElementChild;
//Hermano del primer elemento
// let segundoElementoHijo = primerElementoHijo.nextElementSibling;
//Ultimo hijo
// let ultimoElementoHijo = lista.lastElementChild;

//Recorro los elementos hijos
// while(primerElementoHijo){
//     console.log(primerElementoHijo);
//     //Ahora lo piso por el hermano.. es como un contador++
//     primerElementoHijo = primerElementoHijo.nextElementSibling;
// }

//si estoy parado en el ultimo hijo
//hay una opcion que se llama closest
//la cual recibe un selector(etiqueta)
//  ultimoElementoHijo.closest('div');
//Ahi tengo una referencia al div mas cercano
//yendo a buscar de padre en padre

/*
    Creando un elemento nuevo
    Etiqueta "figure" en html habla de la imagen
    que se tiene ahi insertada, es lo ideal
    para darle un sentido semantico a una imagen,
    meterla en una etiqueta figure

    figcaption es un titulo para el contenido 
    de la etiqueta figure
*/

//Me traigo el div q contiene la imagen
let contenedorImagen = document.querySelector('#contenedorImagen');
//creo una etiqueta html figure
let figure = document.createElement('figure');
//Creo una etiqueta img
let imagen = document.createElement('img');
//creo una etiqueta html figcaption (titulo de la imagen)
let caption = document.createElement('figcaption');
//Creo un nodo texto para ponerselo a la etiqueta caption
//Esta es la manera correcta y larga
let textCaption = document.createTextNode('Tecnologia');
//Agrego un atributo a la imagen
imagen.setAttribute('src', 'https://placeimg.com/480/320/tech');
imagen.setAttribute('alt', 'imagen de tecnologia');

if (imagen.hasAttribute('src')) {
    console.log(`Src de la imagen: ${imagen.getAttribute('src')}`);
} else {
    console.log("No tiene src");
}
figure.appendChild(imagen);
caption.appendChild(textCaption);
// --- Estilo por css --- 
// caption.setAttribute('style', 'text-align: center;')
// --- Estilo por property ---
caption.style.textAlign = "center";
figure.appendChild(caption);
//con elemento.appendChild le agrego un hijo
contenedorImagen.appendChild(figure);

//Agrego una clase a un elemento
// let parrafos = document.querySelectorAll('p');
// parrafos[1].classList.add('fondoVerde');
// console.log(parrafos[1]);
console.log(contenedorImagen);

//Ejemplo con info de mockaroo
//agrego el let animales = y el ; al final
let animales = [{"animal":"Booby, blue-faced"},
{"animal":"Yellow-billed hornbill"},
{"animal":"Dragon, asian water"},
{"animal":"Currasow (unidentified)"},
{"animal":"Cuis"},
{"animal":"Goose, egyptian"},
{"animal":"Caiman, spectacled"},
{"animal":"Goose, knob-nosed"},
{"animal":"Australian magpie"},
{"animal":"Hawk, ferruginous"}];

const titular = document.getElementById('titular');
let ul = document.createElement('ul');

animales.forEach(animalLeido => {
    let item = document.createElement('li');
    let textNode = document.createTextNode(animalLeido.animal);
    item.appendChild(textNode);
    ul.appendChild(item);
});

titular.appendChild(ul);

console.log(ul);

let x = ['Juan', 'Lucia', 'Jose', 'Ana'];

//Con forOn iteramos sobre el indice
for (let key in x){
    console.log(key);
}

//Con forIn iteramos sobre los elementos
for (let valor of x){
    console.log(valor);
}

let x2 = { id: 1224, nombre: 'Juan', edad: 21 };

//Un objeto solamente se recorre con forIn
for (let key in x2){
    console.log(`${key}: ${x2[key]}`);
}
