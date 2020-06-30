class Anuncio {
    public id:number;
    public titulo:string;
    public transaccion:string;
    public descripcion:string;
    public precio:string;

    constructor(id:number, titulo:string, transaccion:string, descripcion:string, precio:string){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export class Anuncio_Auto extends Anuncio {
    public num_puertas:number;
    public num_KMs:number;
    public potencia:number;

    constructor(id:number, titulo:string, transaccion:string, descripcion:string, precio:string, num_puertas:number, num_KMs:number, potencia:number){
        super(id, titulo, transaccion, descripcion, precio);
        this.num_puertas = num_puertas;
        this.num_KMs = num_KMs;
        this.potencia = potencia;
    }
}