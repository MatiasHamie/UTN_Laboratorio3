"use strict";
// PARA INICIALIZAR EL TS PONER tsc -init y se nos crea el tsconfig
var Auto = /** @class */ (function () {
    function Auto(marca) {
        this.marca = marca;
    }
    Auto.prototype.acelerar = function () {
        console.log('Estoy acelerando');
    };
    Auto.prototype.frenar = function (tiempo) {
        return "Piso el pedal de freno por " + tiempo + " segundos";
    };
    Auto.prototype.informarMarca = function () {
        console.log("Marca: " + this.marca);
    };
    return Auto;
}());
var Moto = /** @class */ (function () {
    function Moto(color) {
        this.color = color;
    }
    Moto.prototype.acelerar = function () {
        console.log('Estoy girando el acelerador');
    };
    Moto.prototype.frenar = function (tiempo) {
        return "Presiono la manilla de freno por " + tiempo + " segundos";
    };
    Moto.prototype.informarColor = function () {
        console.log("Color: " + this.color);
    };
    return Moto;
}());
var moto1 = new Moto('azul');
var auto1 = new Auto('Renault');
function mover(x, tiempo) {
    x.acelerar();
    console.log(x.frenar(200));
}
mover(moto1, 5);
mover(auto1, 2);
