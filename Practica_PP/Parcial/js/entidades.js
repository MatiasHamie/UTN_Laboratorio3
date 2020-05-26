export class Anuncio {
    id;
    titulo;
    transaccion;
    descripcion;
    precio;
    num_wc;
    num_estacionamiento;
    num_dormitorio;
    // cantBanios;
    // cantAutos;
    // cantDormitorios;

    constructor(id, titulo, transaccion, descripcion, precio, cantBanios, cantAutos, cantDormitorios){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.num_wc = cantBanios;
        this.num_estacionamiento = cantAutos;
        this.num_dormitorio = cantDormitorios;
        // this.cantBanios = cantBanios;
        // this.cantAutos = cantAutos;
        // this.cantDormitorios = cantDormitorios;
    }
}