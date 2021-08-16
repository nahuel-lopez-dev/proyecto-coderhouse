/***** Variables y selectores *****/

/** Selectores para el modal oculto del cliente interesado: **/
const modalOculto = document.querySelector(".modalOculto");
const btnCloseModal = document.querySelector(".closeModal");
const btnServicioWeb = document.querySelector("#servicioWeb");
const btnServicioSoporte = document.querySelector("#servicioSoporte");
const btnServicioSoftware = document.querySelector("#servicioSoftware");
const btnServicioMarketing = document.querySelector("#servicioMarketing");

/***** Funciones *****/

/** Función flecha para desocultar el modal oculto del cliente interesado: **/
const openService = () => {
    modalOculto.classList.remove("oculto");
}
/** Función flecha para volver a ocultar el modal del cliente interesado: **/
const closeModal = () => {
    modalOculto.classList.add("oculto");
}

/***** Eventos *****/
/** Eventos para abrir el modal oculto del cliente interesado **/
btnServicioWeb.addEventListener("click", openService);
btnServicioSoporte.addEventListener("click", openService);
btnServicioSoftware.addEventListener("click", openService);
btnServicioMarketing.addEventListener("click", openService);
/** Evento para ocultar el modal del cliente interesado con el botón de cruz **/
btnCloseModal.addEventListener("click", closeModal);
/** Evento para ocultar el modal del cliente interesado con la tecla "Escape": **/
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalOculto.classList.contains("oculto")) {
        closeModal();
    }
});

/** Evento en el botón de enviar, del modal de datos del cliente interesado (Oculto por defecto) **/
/** Con este evento se muestran los datos ingresados del cliente por consola
 ** a la vez que se guardan en el localStorage **/
$("#modalCliente").click(function(){
    let nombre = $("#nombre").val();
    let tel = $("#tel").val();
    let email = $("#email").val();
    console.log("Datos del cliente a contactar:");
    console.log(nombre);
    console.log(tel);
    console.log(email);
    let clienteInteresado = [nombre, tel, email];
    localStorage.setItem("cliente interesado", JSON.stringify(clienteInteresado));
    $("#modalFormulario")[0].reset();
})