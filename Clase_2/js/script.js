
/**Cuando uso document. estoy haciendo referencia 
 * al archivo
 * No recomienda usar "var" para declarar una variable,
 * porque si se declara una variable igual a otra, a partir
 * de ese renglon, la otra variable no existe mas
 * con let definimos una variable en un scope especifico
 * 
 * cuando hay algo que no va a cambiar, DEBO usar const para
 * declarar una variable, lo usamos cuando obtenemos una referencia
 * para un boton por ejemplo, o lo que sea que llame a este script js
 * 
 */

 /**Lo que se hace es escribir este manejador del evento de que se cargo la pagina web
  * la pagina es "window", esto se denomina asincronismo
  * 
  * primero va un string del evento que estamos escuchando
  * segundo va el nombre de una funcion que queres que se ejecute SIN LOS PARENTESIS
  * 
  * callback es pasarle como parametro una funcion a otra funcion
  */


    // window.addEventListener('load',asignarManejadores);

    // Esto es una funcion nombrada (porque tiene nombre)
    // function asignarManejadores(){
    //     clave = document.getElementById('txtClave');
    //     console.log(txtClave);
    // }   

//   /**Usando una funcion anonima, ya que no la voy a usar esta funcion
//    * en ningun otro lado
//    */
//     let clave;
//     window.addEventListener('load',function(){
//         document.getElementById('txtClave');
//         console.log(txtClave);
//     });

  /**Usando una funcion de flecha gorda
   */
    let txtClave;
    window.addEventListener('load',()=>{
        txtClave = document.getElementById('txtClave');

        txtClave.addEventListener('keyup', e =>{ 
        console.log(e.target.value)});
    });

    // Si tenemos un solo parametro de entrada, se pone sin parentesis
    // y lo siguiente es el return
    // window.addEventListener('load',e=>{
    //     document.getElementById('txtClave');
    //     console.log(txtClave);
    // });