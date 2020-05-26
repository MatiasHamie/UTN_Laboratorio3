window.addEventListener('load',()=>{
    let boton = document.getElementById('btnEnviar');
    
    boton.addEventListener('click',()=>{
        let nombre = document.getElementById('txtNombre').value;
        let apellido = document.getElementById('txtApellido').value;
        let edad = document.getElementById('txtEdad').value;
        let genMasc = document.getElementById('chkMasculino');
        let genFem = document.getElementById('chkFemenino');
        
        if (nombre == '' || apellido == '' || edad == '') {
            alert("Faltan datos\n");
        } else {
            //Creo persona
            console.log(`Nombre: ${nombre}\nApellido: ${apellido}\nEdad: ${edad}\nGenMasc: ${genMasc}\nGenFem: ${genFem}`);
            persona = new Persona(nombre, apellido, edad, (genMasc.checked == true) ? "Masculino" : "Femenino");
        }

        document.getElementById('txtNombreRecibido').value = persona.getNombre();
        document.getElementById('txtApellidoRecibido').value = persona.getApellido();
        document.getElementById('txtEdadRecibido').value = persona.getEdad();
        document.getElementById('txtGeneroRecibido').value = persona.getGenero();
    });
});

class Persona{
    //Se pone directamente asi, constructor de una
    constructor(nombre, apellido, edad, genero){
        this.setNombre(nombre);
        this.setApellido(apellido) = apellido;
        this.setEdad(edad) = edad;
        this.setGenero(genero) = genero;
    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

    getApellido(){
        return this.apellido;
    }

    setApellido(apellido){
        this.apellido = apellido;
    }

    getEdad(){
        return this.edad;
    }

    setEdad(edad){
        this.edad = edad;
    }

    getGenero(){
        return this.genero;
    }

    setGenero(genero){
        this.genero = genero;
    }
}