
export class Auto{
    id;
    patente;
    marca;
    modelo;
    color;
    combustible
    extra;

    constructor(patente, marca, modelo, color, combustible, extra){
        this.id = '';
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.combustible = combustible;
        this.extra = extra;
    }

    MostrarAuto(){
        for (const iterator of this) {
            console.log(iterator);
        }
    }
}