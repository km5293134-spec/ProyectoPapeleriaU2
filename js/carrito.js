
let carrito = [];

try {
    const datosGuardados = JSON.parse(
        localStorage.getItem("carritoCopySchool")
    );

    carrito = Array.isArray(datosGuardados)
        ? datosGuardados
        : [];

} catch (error) {
    carrito = [];
}



const listaCarrito = document.querySelector("#listaCarrito");

const carritoVacio = document.querySelector("#carritoVacio");

const cantidadArticulos = document.querySelector("#cantidadArticulos");

const totalCarrito = document.querySelector("#totalCarrito");

const contadorCarrito = document.querySelector("#contadorCarrito");

const btnVaciar = document.querySelector("#btnVaciar");

const btnWhatsApp = document.querySelector("#btnWhatsApp");



function guardarCarrito() {

    localStorage.setItem(
        "carritoCopySchool",
        JSON.stringify(carrito)
    );

}



function formatoPrecio(cantidad) {

    return "$" + cantidad.toFixed(2);

}




function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;


    if (carrito.length === 0) {

        carritoVacio.classList.remove("d-none");

        btnVaciar.disabled = true;
        btnWhatsApp.disabled = true;

    } else {

        carritoVacio.classList.add("d-none");

        btnVaciar.disabled = false;
        btnWhatsApp.disabled = false;

    }


    carrito.forEach(function (item, indice) {

        const precio = Number(item.precio);
        const cantidad = Number(item.cantidad);

        const subtotal = precio * cantidad;

        total += subtotal;
        cantidadTotal += cantidad;


        const articulo = document.createElement("div");

        articulo.className = "articulo-carrito";


       

        const informacion = document.createElement("div");

        informacion.className = "flex-grow-1";


        const nombre = document.createElement("h3");

        nombre.className = "h6 fw-bold mb-2";
        nombre.textContent = item.nombre;


        const precioTexto = document.createElement("p");

        precioTexto.className = "text-muted mb-2";
        precioTexto.textContent =
            formatoPrecio(precio) + " por unidad";


        const subtotalTexto = document.createElement("p");

        subtotalTexto.className = "fw-bold mb-0";

        subtotalTexto.textContent =
            "Subtotal: " + formatoPrecio(subtotal);


        informacion.appendChild(nombre);
        informacion.appendChild(precioTexto);
        informacion.appendChild(subtotalTexto);


       

        const controles = document.createElement("div");

        controles.className = "controles-carrito";


        const botonMenos = document.createElement("button");

        botonMenos.className = "btn btn-outline-secondary btn-sm";

        botonMenos.textContent = "−";

        botonMenos.dataset.accion = "restar";
        botonMenos.dataset.indice = indice;
        botonMenos.setAttribute(
            "aria-label",
            "Disminuir cantidad de " + item.nombre
        );


        const cantidadTexto = document.createElement("span");

        cantidadTexto.className = "cantidad-carrito";

        cantidadTexto.textContent = cantidad;


        const botonMas = document.createElement("button");

        botonMas.className = "btn btn-outline-secondary btn-sm";

        botonMas.textContent = "+";

        botonMas.dataset.accion = "sumar";
        botonMas.dataset.indice = indice;
        botonMas.setAttribute(
            "aria-label",
            "Aumentar cantidad de " + item.nombre
        );


        const botonEliminar = document.createElement("button");

        botonEliminar.className = "btn btn-outline-danger btn-sm";

        botonEliminar.innerHTML =
            '<i class="fa-solid fa-trash"></i>';

        botonEliminar.dataset.accion = "eliminar";
        botonEliminar.dataset.indice = indice;
        botonEliminar.setAttribute(
            "aria-label",
            "Eliminar " + item.nombre
        );


        controles.appendChild(botonMenos);
        controles.appendChild(cantidadTexto);
        controles.appendChild(botonMas);
        controles.appendChild(botonEliminar);


        articulo.appendChild(informacion);
        articulo.appendChild(controles);

        listaCarrito.appendChild(articulo);

    });


    

    cantidadArticulos.textContent = cantidadTotal;

    contadorCarrito.textContent = cantidadTotal;

    totalCarrito.textContent = formatoPrecio(total);

}


function modificarCantidad(indice, cambio) {

    if (!carrito[indice]) {
        return;
    }

    const nuevaCantidad =
        Number(carrito[indice].cantidad) + cambio;

    if (nuevaCantidad < 1) {
        return;
    }

    carrito[indice].cantidad = nuevaCantidad;

    guardarCarrito();

    mostrarCarrito();

}




function eliminarArticulo(indice) {

    if (!carrito[indice]) {
        return;
    }

    carrito.splice(indice, 1);

    guardarCarrito();

    mostrarCarrito();

}



function vaciarCarrito() {

    if (carrito.length === 0) {
        return;
    }

    Swal.fire({

        title: "¿Vaciar carrito?",

        text: "Se eliminarán todos los artículos seleccionados.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Sí, vaciar",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#d33"

    }).then(function (resultado) {

        if (resultado.isConfirmed) {

            carrito = [];

            guardarCarrito();

            mostrarCarrito();

            Swal.fire({
                icon: "success",
                title: "Carrito vacío",
                timer: 1500,
                showConfirmButton: false
            });

        }

    });

}




function solicitarWhatsApp() {

    if (carrito.length === 0) {

        Swal.fire({
            icon: "warning",
            title: "Tu carrito está vacío",
            text: "Agrega productos antes de solicitar tu cotización."
        });

        return;

    }

    let mensaje = "Hola, Copy-School. Quiero solicitar una cotización:\n\n";

    let total = 0;


    carrito.forEach(function (item) {

        const subtotal =
            Number(item.precio) * Number(item.cantidad);

        total += subtotal;

        mensaje +=
            "• " + item.nombre +
            "\nCantidad: " + item.cantidad +
            "\nSubtotal: " + formatoPrecio(subtotal) +
            "\n\n";

    });


    mensaje +=
        "Total estimado: " + formatoPrecio(total) +
        "\n\n¿Me pueden confirmar disponibilidad y precio final?";



    const telefonoWhatsApp = "527731218939";

const url =
    "https://wa.me/" +
    telefonoWhatsApp +
    "?text=" +
    encodeURIComponent(mensaje);
    window.open(url, "_blank", "noopener,noreferrer");

}



listaCarrito.addEventListener("click", function (evento) {

    const boton = evento.target.closest("button[data-accion]");

    if (!boton) {
        return;
    }

    const indice = Number(boton.dataset.indice);

    const accion = boton.dataset.accion;


    if (accion === "sumar") {

        modificarCantidad(indice, 1);

    } else if (accion === "restar") {

        modificarCantidad(indice, -1);

    } else if (accion === "eliminar") {

        eliminarArticulo(indice);

    }

});


btnVaciar.addEventListener("click", vaciarCarrito);

btnWhatsApp.addEventListener("click", solicitarWhatsApp);



mostrarCarrito();