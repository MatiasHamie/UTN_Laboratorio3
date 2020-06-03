let btnDesordenar = document.querySelector('#btnDesordenar');
btnDesordenar.addEventListener('click', () =>{
    // console.log('hola');
    let columnas = document.querySelectorAll('.container-fluid>div:first-child>div.col');
    columnas[0].classList.add("order-3");//Columna 1
    columnas[1].classList.add("order-1");//Columna 2
    columnas[2].classList.add("order-2");//Columna 3
    console.log(columnas);
})