let btnTraerF = document.getElementById("btnTraerF");
let info = document.querySelector('#info');

// Imagen del loader
let img = document.createElement('img');
img.setAttribute('src', './images/25.gif');
img.setAttribute('alt', 'spinner');

btnTraerF.addEventListener('click', traerPersonasFetch);
function traerPersonasFetch() {

    info.appendChild(img);
    //Fetch es una funcion q nos devuelve una promesa
    //estilo moderno
    //Por default hace un GET a la url q le pasemos
    //fetch("./js/datos.json").then((respuesta)=> respuesta.text())
    fetch("./js/datos.json")
        .then((respuesta)=> respuesta.json())
        .then(data => {
            info.removeChild(img);
            console.log(data)
        })
        .catch(error => console.log(error));
}
