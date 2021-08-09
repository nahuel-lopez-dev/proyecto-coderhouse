/***************************************************************/
/******************** proyecto-coderhouse  ********************/
/** Forma de organización del proyecto **/
/***** 1. Entidades *****/
/***** 2. Variables y selectores *****/
/***** 3. Funciones *****/
/***** 4. Eventos *****/
/***** 5. Lógica *****/

/***** Entidades *****/
class Cliente {
    constructor(nombreCliente, telCliente, emailCliente, motivosCliente, id) {
        this.nombreCliente = nombreCliente;
        this.telCliente = telCliente;
        this.emailCliente = emailCliente;
        this.motivosCliente = motivosCliente;
        this.id = id;
    }
}

/***** Variables y selectores *****/

/** Selectores para el modal servicio oculto: **/
const modalOculto = document.querySelector(".modalOculto");
const btnCloseModal = document.querySelector(".closeModal");
const btnServicioWeb = document.querySelector("#servicioWeb");
const btnServicioSoporte = document.querySelector("#servicioSoporte");
const btnServicioSoftware = document.querySelector("#servicioSoftware");
const btnServicioMarketing = document.querySelector("#servicioMarketing");
/** Selectores para la agenda oculta: **/
const abrirAgenda = document.querySelector("#abrirAgenda");
const formularioCliente = document.querySelector("#formularioCliente");
const btnBorrarTodo = document.querySelector("#borrarTodo");
const btnBorrarCliente = document.querySelector("#borrarCliente");

/***** Funciones *****/

/** Función flecha para desocultar el modal de servicios (oculto por defecto): **/
const openService = () => {
    modalOculto.classList.remove("oculto");
}
/** Función flecha para volver a ocultar el modal de servicios: **/
const closeModal = () => {
    modalOculto.classList.add("oculto");
}

/***** Funciones para "agenda oculta" *****/
/** Función flecha para desocultar agenda y mostrar clientes. A su vez, sirve para ocultarla.
 ** Tiene incluida una animación con jQuery para que la agenda aparezca y desaparezca con más gracia **/
const mostrarClientes = () => {
    $("#agregarCliente").animate({
        opacity: "toggle",
        height: "toggle"
    }, 2500);
    document.querySelector("#agregarCliente").classList.toggle("agendaOculta");
    mostrarLista(cargarLista());
}
/** Función flecha para cargar el listado de clientes del localStorage o iniciarlo si no hay **/
const cargarLista = () => {
    let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    if (listaClientes == null) {
        return [];
    }
    return listaClientes;
}
/** Función para guardar en localStorage la lista de clientes **/
const guardarLista = (listaClientes) => {
    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
    mostrarLista(listaClientes);
}
/** Función tradicional para guardar los datos de un cliente **/
function guardarCliente(e) {
    e.preventDefault();
    let nombreCliente = document.querySelector("#nombreCliente").value;
    let telCliente = document.querySelector("#telCliente").value;
    let emailCliente = document.querySelector("#emailCliente").value;
    let motivosCliente = document.querySelector("#motivosCliente").value;
    let id = document.querySelector("#id").value;

    const listaClientes = cargarLista();

    listaClientes.push(new Cliente(nombreCliente, telCliente, emailCliente, motivosCliente, id));

    guardarLista(listaClientes);

    document.querySelector("#formularioCliente").reset();
}

/** Función flecha para borrar todos los clientes **/
const borrarTodo = () => {
    localStorage.clear();
    mostrarLista(cargarLista());
}
/** Función flecha para borrar un cliente específico **/
const borrarCliente = (id) => {
    let listaClientes = cargarLista();
    listaClientes = listaClientes.filter(cliente => cliente.id != id);
    guardarLista(listaClientes);
}
/** Función tradicional para armar una presentación para cada cliente */
function armarPresentacion(elemento) {
    const presentacion = document.createElement("div");
    presentacion.classList.add("presentacion");

    const btnBorrarCliente = document.createElement("div");
    btnBorrarCliente.textContent = "Borrar Cliente";
    btnBorrarCliente.classList.add("btn", "btn-danger", "float-end", "m-3");
    btnBorrarCliente.setAttribute("id", elemento.id);
    btnBorrarCliente.setAttribute("onclick", `borrarCliente(${elemento.id})`);
    presentacion.appendChild(btnBorrarCliente);

    const nombreDelCliente = document.createElement("h3");
    nombreDelCliente.textContent = `${elemento.nombreCliente}`;
    presentacion.appendChild(nombreDelCliente);

    const telDelCliente = document.createElement("div");
    telDelCliente.textContent = `Tel/Cel: ${elemento.telCliente}`;
    presentacion.appendChild(telDelCliente);

    const emailDelCliente = document.createElement("div");
    emailDelCliente.textContent = `Email: ${elemento.emailCliente}`;
    presentacion.appendChild(emailDelCliente);

    const motivosDelCliente = document.createElement("div");
    motivosDelCliente.textContent = `Motivo: ${elemento.motivosCliente}`;
    presentacion.appendChild(motivosDelCliente);

    return presentacion;
}
/** Función flecha para mostrar la lista de clientes */
const mostrarLista = (listaClientes) => {
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
/** Evento para ocultar el modal de servicios con el botón de cruz **/
btnCloseModal.addEventListener("click", closeModal);
/** Evento para ocultar el modal de servicios con la tecla "Escape": **/
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalOculto.classList.contains("oculto")) {
        closeModal();
    }
});
/** Eventos para la agenda oculta **/
/** Evento para mostrar el menú que ingresa los clientes **/
abrirAgenda.addEventListener("click", mostrarClientes);
/** Evento para guardar un cliente **/
formularioCliente.addEventListener("submit", guardarCliente);
/** Evento para borrar todos los clientes **/
btnBorrarTodo.addEventListener("click", borrarTodo);

/****************** Desafío 12 entregable y 13 complementario  ******************/

/***** Selectores y eventos con jQuery *****/
/** Cambia el puntero tradicional del mouse, por una cruz **/
$("html, body").css("cursor", "crosshair");
/** Para mostrar y ocultar la información acerca de lo que contiene la sección **/
$("#btnAbrirInfo").click(function () {
    $(".infOculta").toggle(1000);
})
//creando contenedores y un botón con clases de bootstrap y del css
$("#irArriba").append(`<div class="container">
                        <div class="parrafoServicio m-5">
                            <a id="sube" class="btn btn-lg btn-dark m-3">Volver arriba</a>
                        </div>
                   </div>`);
// Se asocia la animación al click, en el botón que le puse id="sube"
$('#sube').click(function (e) {
    e.preventDefault();
    //Animación con animate concatenada
    $('html, body').animate({
        scrollTop: $("#inicio").offset().top}, 1500);
    $("#sube").slideUp(1250);
    $("#sube").slideDown("fast");
});

/******************** Fin Desafíos 12 entregable y 13 complementario *********************/

/***** Lógica *****/
mostrarLista(cargarLista());

/*****************************************************************************/
/*****************************************************************************/