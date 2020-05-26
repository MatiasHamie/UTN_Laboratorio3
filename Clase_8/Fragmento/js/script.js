let imagenes = [
    {
        title: "Tecnologia",
        origen: "https://placeimg.com/200/200/tech"
    },
    {
        title: "Animales",
        origen: "https://placeimg.com/200/200/animals"
    },
    {
        title: "Naturaleza",
        origen: "https://placeimg.com/200/200/nature"
    },
    {
        title: "Personas",
        origen: "https://placeimg.com/200/200/peope"
    }
]

// Me traigo el template
let plantilla = document.getElementsByTagName('template')[0].content;
let fragmento = document.createDocumentFragment();
let divImagenes = document.getElementById('divImagenes');

imagenes.forEach(element => {
    plantilla.querySelector('img').setAttribute('src', element.origen);
    plantilla.querySelector('img').setAttribute('alt', element.title);
    plantilla.querySelector('figcaption').textContent = elemento.title;

    //Me traigo un nodo del html, en este caso es el nodo plantilla y true
    //porque me traigo la plantilla y todos sus hijos
    let copia = document.importNode(plantilla, true);

    //Es como q te haces un array de etiquetas figure y bla bla
    //Cada vez que itera el foreach
    fragmento.appendChild(copia);
});

//El div ahora va a tener todas las imagenes
divImagenes.appendChild(fragmento);