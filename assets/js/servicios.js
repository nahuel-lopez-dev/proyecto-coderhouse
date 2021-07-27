/******************** proyecto-coderhouse  ********************/
/** Forma de organización del proyecto. Consultar ¿Las variables globales no deben ir al principio, antes de las entidades, para evitar errores de código?**/

/***** 1. Entidades *****/
/***** 2. Variables y selectores *****/
/***** 3. Funciones *****/
/***** 4. Eventos *****/
/***** 5. Lógica *****/

/******************* Desafíos 8, 9, y 9 complementario. Ver sección demos.html, botón demo "Agenda"  ********************/
/******************* Ver demo Agenda. Cumple los desafíos, pero está sin terminar  ********************/
/******************* Modal de servicios, a terminar para que adquiera funcionalidad ***********/

/***** Entidades *****/
class Cliente {
    constructor(nombreCliente, emailCliente, motivosCliente) {
        this.nombreCliente  = nombreCliente;
        this.emailCliente   = emailCliente;
        this.motivosCliente = motivosCliente;
    }
}

/***** Variables y selectores *****/
//Selectores para el modal servicio oculto:
const modalOculto = document.querySelector(".modalOculto");
const btnCloseModal = document.querySelector(".closeModal");
const btnServicioWeb = document.querySelector("#servicioWeb");
const btnServicioSoporte = document.querySelector("#servicioSoporte");
const btnServicioSoftware = document.querySelector("#servicioSoftware");
const btnServicioMarketing = document.querySelector("#servicioMarketing");

/***** Funciones *****/
//Función para desocultar el modal de servicios (oculto por defecto):
const openService = () => {
    modalOculto.classList.remove("oculto");    
}
//Función para volver a ocultar el modal de servicios:
const closeModal = () => {
    modalOculto.classList.add("oculto");
}
//Funciones para agenda oculta
/**Función para mostrar clientes */
// function mostrarClientes() {
//     document.querySelector("#agregarCliente").classList.toggle("agendaOculta");
// }
/** Función flecha para mostrar clientes */
const mostrarClientes = () => document.querySelector("#agregarCliente").classList.toggle("agendaOculta");

/**Función para cargar el listado de clientes del localStorage o iniciarlo si no hay*/
function cargarLista() {
    let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    if (listaClientes == null) {
        return[];
    } 
    return listaClientes;
} 
/**Función para guardar en localStorage la lista de clientes*/
function guardarLista(listaClientes) {
    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
    mostrarLista(listaClientes);
}
/**Función para guardar los datos de un cliente*/
function guardarCliente(e) {
    e.preventDefault();
    let nombreCliente = document.querySelector("#nombreCliente").value;
    let emailCliente = document.querySelector("#emailCliente").value;
    let motivosCliente = document.querySelector("#motivosCliente").value;

    let listaClientes = cargarLista();

    listaClientes.push(new Cliente(nombreCliente, emailCliente, motivosCliente));

    guardarLista(listaClientes);

    document.querySelector("#formularioCliente").reset();
}
/** Función para armar una presentación para cada cliente */
function armarPresentacion(elemento){
    const presentacion = document.createElement("div");
    presentacion.classList.add("presentacion");
    
    const nombreDelCliente = document.createElement("h3");
    nombreDelCliente.textContent = `${elemento.nombreCliente}`;
    presentacion.appendChild(nombreDelCliente);
    
    const emailDelCliente = document.createElement("div");
    emailDelCliente.textContent = `Email: ${elemento.emailCliente}`;
    presentacion.appendChild(emailDelCliente);
    
    const motivosDelCliente = document.createElement("div");
    motivosDelCliente.textContent = `Motivo: ${elemento.motivosCliente}`;
    presentacion.appendChild(motivosDelCliente);
    return presentacion;
}
/** Función para mostrar la lista de clientes */
function mostrarLista(listaClientes) {
    let lista = document.querySelector("#lista");
    lista.textContent = "";
    listaClientes.map(elemento => {
        lista.appendChild(armarPresentacion(elemento));
    })
}

/***** Eventos *****/
/** Eventos para abrir el modal de servicios **/
btnServicioWeb.addEventListener("click", openService);
btnServicioSoporte.addEventListener("click", openService);
btnServicioSoftware.addEventListener("click", openService);
btnServicioMarketing.addEventListener("click", openService);
btnCloseModal.addEventListener("click", closeModal);
//Evento para ocultar el modal de servicios con la tecla "Escape":
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalOculto.classList.contains("oculto")) {
        closeModal();
    }
});
/** Selectores para la agenda oculta. Después los voy a ubicar junto al resto de los selectores **/
let abrirAgenda = document.querySelector("#abrirAgenda");
let formularioCliente = document.querySelector("#formularioCliente");
/** Eventos para la agenda oculta **/
/**Evento para mostrar el menú que ingresa los clientes*/
abrirAgenda.addEventListener("click", mostrarClientes);
/**Evento para guardar un cliente **/
formularioCliente.addEventListener("submit", guardarCliente);

/***** Lógica *****/
mostrarLista(cargarLista());

/*****************************************************************************/
/*****************************************************************************/
