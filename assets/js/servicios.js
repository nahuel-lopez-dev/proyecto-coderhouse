//Inicialización de las variables globales:
let trabajoWeb          = 28000;   //Precio por la creación de una página web con 5 secciones.
let mantenimientoWeb    =  1000;   //Precio de mantenimiento mensual. El primer mes se incluye obligatoriamente con la creación de la página.
let precioWebFinal      = 35090;   //Precio de la página web (5 secciones y mantenimiento 1 mes). Incluye el IVA.
let trabajoSoporte      = 30000;   //Precio plan básico de soporte IT. Seguridad informática y redes. 
let mantenimientoSop    =  2000;   //Precio de mantenimiento mensual. El primer mes se incluye obligatoriamente, para consultas comunes.
let soporteItFinal      = 38720;   //Precio del plan básico de soporte IT y el mantenimiento mensual. Incluye el IVA.
let trabajoSoftware     = 40000;   //Precio por la creación de un software específico. Puede cambiar acorde a las necesidades del cliente.
let mantenimientoSoft   =  2000;   //Precio de mantenimiento mensual. El primer mes se incluye obligatoriamente, para acordar revisiones.
let desarrolloSoftFinal = 50820;   //Precio por la creación del software y el mantenimiento mensual del mismo. Incluye el IVA.
let trabajoMarketing    = 20000;   //Precio por el servicio de marketing, plan básico. Campaña de marketing y atención de redes sociales.
let mantenimientoMark   =  2000;   //Precio por el mantenimiento de las redes sociales, y algún otro servicio acordado.
let marketingFinal      = 26620;   //Precio por el servicio básico de marketing y el mantenimiento mensual. Incluye el IVA.
let precioFinal ;                  //variable sin inicializar, va a tomar el valor que se origine en el método vender() de la clase Servicio

//Funciones flecha
const suma = (a, b) => a + b;           //Para sumar dos servicios.
const iva = x => x * 0.21;              //Para agregarle el IVA a un determinado valor.
const recargoTarjeta = x => x * 1.15;   //Para recargo del 15%
const descTrans = x => x * 0.9;         //Para descuento del 10%

/** Clase con constructor y métodos */
class Servicio {   // Clase Servicio
    constructor(nombre, precio, mantenimiento) {   //Constructor con parámetros nombre, precio y mantenimiento de los servicios que se creen   
        this.nombre = nombre;   //
        this.precio = precio;   //
        this.mantenimiento = mantenimiento;   // 
    }
    vender() {
        let formaPago = parseInt(prompt("Ingrese la forma en que desea pagar su servicio siendo: 1 = transferencia bancaria o efectivo (dto: 10%) ; 2 = tarjeta de crédito (1 pago) ; 3 = tarjeta de crédito en cuotas (rgo:15%)"));
        switch (formaPago) {
            case 1:
                //Pago por transferencia bancaria o efectivo
                console.log("%c Precio final del servicio:", "color:white");
                precioFinal = descTrans(suma(iva(suma(this.precio, this.mantenimiento)), suma(this.precio, this.mantenimiento)));
                console.log("El precio final con el descuento incluido es de " + precioFinal + " pesos argentinos");
                alert("El precio final con el descuento incluido es de " + precioFinal + " pesos argentinos");
                break;
            case 2:
                //Pago con tarjeta de crédito (En 1 pago)
                console.log("%c Precio final del servicio:", "color:yellow");
                precioFinal = suma(iva(suma(this.precio, this.mantenimiento)), suma(this.precio, this.mantenimiento));
                console.log("El precio final con tarjeta en un pago es de " + precioFinal + " pesos argentinos");
                alert("El precio final con tarjeta en un pago es de " + precioFinal + " pesos argentinos");
                break;
            case 3:
                //Pago con tarjeta de crédito (3, 6 o 12 cuotas. Más adelante se trabajará el tema de las cuotas)
                console.log("%c Precio final del servicio:", "color:red");
                precioFinal = recargoTarjeta(suma(iva(suma(this.precio, this.mantenimiento)), suma(this.precio, this.mantenimiento)));
                console.log("El precio final con tarjeta en cuotas es de " + precioFinal + " pesos argentinos");
                alert("El precio final con tarjeta en cuotas es de " + precioFinal + " pesos argentinos");
                break;
            default:
                alert("No ingresaste ni 1 ni 2 ni 3... Muchas gracias, vuelvas prontos... Apu.");
                break;
        }
        return console.log("Servicio vendido");
    }
    cobrar() {
        return "Se le cobrará el siguiente monto " + precioFinal;
    }
    info() {
        return `${this.nombre} es uno de los servicios que ofrecemos\nTiene un precio aproximado de: ${this.precio} con un mantenimiento mensual de ${this.mantenimiento}\nLos precios no incluyen el IVA`;
    }
}

const paginasWeb     = new Servicio("Páginas Web", trabajoWeb, mantenimientoWeb);                  //Creando el objeto paginasWeb
const soporteIt      = new Servicio("Soporte IT", trabajoSoporte, mantenimientoSop);               //Creando el objeto soporteIt
const desarrolloSoft = new Servicio("Desarrollo de software", trabajoSoftware, mantenimientoSoft); //Creando el objeto desarrolloSoft
const marketing      = new Servicio("Marketing digital", trabajoMarketing, mantenimientoMark);     //Creando el objeto marketing

//Se va a saludar al usuario y posteriormente darle información sobre los servicios. Más adelante se modificará la forma de presentar este mensaje.
let informacion = parseInt(prompt(`¡¡Bienvenid@!! ¿Te gustaría algo de informacion, como los precios aproximados de nuestros servicios?\n1:SI ; 2:NO`));
switch(informacion) {
    case 1:
        alert(paginasWeb.info());       //Anuncio sobre el nombre del servicio que se ofrece y su precio corriente
        alert(soporteIt.info());        //Idem ant.
        alert(desarrolloSoft.info());   //Idem ant.
        alert(marketing.info());        //Idem ant.
        //Anuncio sobre la variación de los precios de los servicios
        alert("Los precios pueden modificarse por descuentos por transferencia, recargos por pagos en cuotas, o trabajos específicos. No dude en consultarnos.");
        break;
    case 2:
        alert("Cualquier consulta podés comunicarte con nosotros en la sección contactanos. ¡Estamos para ayudarte!");
        break;
    default:
        alert("No ingresaste 1 ni 2. Si querés comunicarte con nosotros, podés encontrarnos en la sección contactanos. ¡Estamos para ayudarte!");
}

console.log(paginasWeb);      //mostrando por consola la información del objeto paginasWeb
console.log(soporteIt);       //mostrando por consola la información del objeto soporteIt
console.log(desarrolloSoft);  //mostrando por consola la información del objeto desarrolloSoft
console.log(marketing);       //mostrando por consola la información del objeto marketing


let ofrecimiento = parseInt(prompt("¿Desea contratar algún servicio? 1:SI ; 2:NO"));

switch(ofrecimiento) {
    case 1:
        let elegir = parseInt(prompt(`Ingrese el número del servicio que desea contratar siendo\n1:Páginas Web\n2:Soporte IT\n3:Desarrollo de software\n4:Marketing digital`));
        switch(elegir) {
            case 1:
                paginasWeb.vender();
                break;
            case 2:
                soporteIt.vender();
                break;
            case 3:
                desarrolloSoft.vender();
                break;
            case 4:
                marketing.vender();
                break;
            default:
                alert("No ingresaste ningúno de los números de los servicios");
                break;
        }
    case 2:
        alert("¡No dude en consultarnos! Estamos para ayudarle.");
        break;
    default:
        alert("No ingresaste ni 1 ni 2");
        break;
}