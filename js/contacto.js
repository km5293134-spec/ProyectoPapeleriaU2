

const telefonoWhatsApp = "527731218939";




const formulario = document.querySelector("#formContacto");

const nombre = document.querySelector("#nombreCliente");

const correo = document.querySelector("#correoCliente");

const telefono = document.querySelector("#telefonoCliente");

const asunto = document.querySelector("#asuntoCliente");

const mensaje = document.querySelector("#mensajeCliente");

const contador = document.querySelector("#contadorCaracteres");



mensaje.addEventListener("input", function () {

    const cantidad = mensaje.value.length;

    contador.textContent = cantidad + " / 500 caracteres";

});



function validarFormulario() {

    const nombreValor = nombre.value.trim();

    const correoValor = correo.value.trim();

    const telefonoValor = telefono.value.trim();

    const asuntoValor = asunto.value;

    const mensajeValor = mensaje.value.trim();


    

    if (nombreValor.length < 3) {

        Swal.fire({
            icon: "warning",
            title: "Nombre incorrecto",
            text: "Escribe un nombre de al menos 3 caracteres."
        });

        nombre.focus();

        return false;

    }


    

    const expresionCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correoValor)) {

        Swal.fire({
            icon: "warning",
            title: "Correo incorrecto",
            text: "Escribe un correo electrónico válido."
        });

        correo.focus();

        return false;

    }


   

    const expresionTelefono = /^[0-9]{10}$/;

    if (!expresionTelefono.test(telefonoValor)) {

        Swal.fire({
            icon: "warning",
            title: "Teléfono incorrecto",
            text: "El teléfono debe contener exactamente 10 números."
        });

        telefono.focus();

        return false;

    }


    

    if (asuntoValor === "") {

        Swal.fire({
            icon: "warning",
            title: "Selecciona un asunto",
            text: "Indica el motivo de tu mensaje."
        });

        asunto.focus();

        return false;

    }


    

    if (mensajeValor.length < 10) {

        Swal.fire({
            icon: "warning",
            title: "Mensaje muy corto",
            text: "Escribe un mensaje de al menos 10 caracteres."
        });

        mensaje.focus();

        return false;

    }


    return true;

}



function prepararMensaje(evento) {

    evento.preventDefault();



    if (!validarFormulario()) {

        return;

    }




    const nombreValor = nombre.value.trim();

    const correoValor = correo.value.trim();

    const telefonoValor = telefono.value.trim();

    const asuntoValor = asunto.value;

    const mensajeValor = mensaje.value.trim();


   

    const textoWhatsApp =

        "Hola, Copy-School. Quiero comunicarme con ustedes.\n\n" +

        "Nombre: " + nombreValor + "\n" +

        "Correo: " + correoValor + "\n" +

        "Teléfono: " + telefonoValor + "\n" +

        "Asunto: " + asuntoValor + "\n\n" +

        "Mensaje:\n" + mensajeValor;


   

    const url =

        "https://wa.me/" +

        telefonoWhatsApp +

        "?text=" +

        encodeURIComponent(textoWhatsApp);


    

    Swal.fire({

        icon: "success",

        title: "¡Mensaje preparado!",

        text: "Presiona continuar para abrir WhatsApp y enviar tu mensaje.",

        showCancelButton: true,

        confirmButtonText: "Continuar a WhatsApp",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#198754"

    }).then(function (resultado) {

        if (resultado.isConfirmed) {

         

            window.location.href = url;

        }

    });

}




formulario.addEventListener("submit", prepararMensaje);