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
        this.nombreCliente  = nombreCliente;
        this.telCliente     = telCliente;
        this.emailCliente   = emailCliente;
        this.motivosCliente = motivosCliente;
        this.id             = id;
    }
    toString(){
        return `Cliente agendado:\nNombre: ${this.nombreCliente}\nTel: ${this.telCliente}\nEmail: ${this.emailCliente}\nMotivo: ${this.motivosCliente}\nID: ${this.id}`;
    }    
}

/***** Variables y selectores *****/

/** Selectores para el modal oculto del cliente interesado: **/
const modalOculto       = document.querySelector(".modalOculto");
const btnCloseModal     = document.querySelector(".closeModal");
const btnSoftwareUno    = document.querySelector("#softwareUno"); //la agenda de clientes
const btnSoftwareDos    = document.querySelector("#softwareDos"); //la API
const btnSoftwareTres   = document.querySelector("#softwareTres");
const btnSoftwareCuatro = document.querySelector("#softwareCuatro");
/** Selectores para la agenda oculta: **/
const abrirAgenda       = document.querySelector("#abrirAgenda");
const formularioCliente = document.querySelector("#formularioCliente");
const btnBorrarTodo     = document.querySelector("#borrarTodo");
const btnBorrarCliente  = document.querySelector("#borrarCliente");

/***** Funciones *****/

/** Función flecha para desocultar el modal oculto del cliente interesado: **/
const openModal = () => {
    modalOculto.classList.remove("oculto");
}
/** Función flecha para volver a ocultar el modal del cliente interesado: **/
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
    let nombreCliente  = document.querySelector("#nombreCliente").value;
    let telCliente     = document.querySelector("#telCliente").value;
    let emailCliente   = document.querySelector("#emailCliente").value;
    let motivosCliente = document.querySelector("#motivosCliente").value;
    let id             = document.querySelector("#id").value;

    const listaClientes = cargarLista();

    let clienteNuevo = new Cliente(nombreCliente, telCliente, emailCliente, motivosCliente, id);

    listaClientes.push(clienteNuevo);

    guardarLista(listaClientes);

    console.log(clienteNuevo.toString());

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
    listaClientes     = listaClientes.filter(cliente => cliente.id != id);
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

    const idDelCliente = document.createElement("div");
    idDelCliente.textContent = `ID: ${elemento.id}`;
    presentacion.appendChild(idDelCliente);

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
/** Eventos para abrir el modal oculto del cliente interesado **/
btnSoftwareUno.addEventListener("click", openModal);
btnSoftwareDos.addEventListener("click", openModal);
btnSoftwareTres.addEventListener("click", openModal);
btnSoftwareCuatro.addEventListener("click", openModal);
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


/***** Lógica *****/
mostrarLista(cargarLista());

/********** jQuery agregado al proyecto **********/

/***** Selectores y eventos con jQuery *****/
/** Cambia el puntero tradicional del mouse, por una cruz **/
$("html, body").css("cursor", "crosshair");
/** Para mostrar y ocultar la información acerca de lo que contiene la sección **/
$("#btnAbrirInfo").click(function () {
    $(".infOculta").toggle(1000);
})
/** Creando contenedores y un botón con clases de bootstrap y del css **/
$("#irArriba").append(`<div class="container">
                        <div class="parrafoServicio m-5">
                            <a id="sube" class="btn btn-lg btn-dark m-3">Volver arriba</a>
                        </div>
                   </div>`);
/** Se asocia la animación al click, en el botón que le puse id="sube" **/ 
$('#sube').click(function (e) {
    e.preventDefault();
    //Animación con animate concatenada para el desafío complementario
    $("html, body").animate({scrollTop: $("#inicio").offset().top}, 1500
    , () => { console.log("Te vas... te vas, te vas, te vas... para arriba!!!") });
    $("#sube").slideUp(1250);
    $("#sube").slideDown("fast");
});
/** Evento en el botón de enviar, del modal de datos del cliente interesado (Oculto por defecto) **/
/** Con este evento se muestran los datos ingresados del cliente por consola
 ** a la vez que se guardan en el localStorage **/
$("#modalCliente").click(function(){
    let nombre = $("#nombre").val();
    let tel    = $("#tel").val();
    let email  = $("#email").val();
    console.log("Datos del cliente a contactar:");
    console.log(nombre);
    console.log(tel);
    console.log(email);
    let clienteInteresado = [nombre, tel, email];
    localStorage.setItem("cliente interesado", JSON.stringify(clienteInteresado));
    $("#modalFormulario")[0].reset();
})

/********** Peticiones con jQuery **********/
/********** Generador de UUID **********/
const url = "https://www.uuidtools.com/api/generate/timestamp-first"

/** Agregamos un botón con jQuery **/
$("#api").append(`<button id="btnApi" class="btn btn-danger btn-lg m-3">Generar UUID</button>`);
/** Escuchamos el evento click del botón agregado **/
$("#btnApi").click(()=>{
    
    $.get(url, function(respuesta, estado) {
        if (estado === "success") {
            // console.log(respuesta[0]);
            $("#respuestaApi").append(`
            <div class="col-12 bg-dark text-white text-center m-2">
                <h2 class="p-2">${respuesta[0]}</h2>
            </div>`);
        }
    })
});

