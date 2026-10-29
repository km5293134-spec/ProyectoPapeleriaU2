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

    return "$" + Number(cantidad).toFixed(2);

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

        const precio = Number(item.precio) || 0;

        const cantidad = Number(item.cantidad) || 1;

        const subtotal = precio * cantidad;

        total += subtotal;

        cantidadTotal += cantidad;


        const articulo = document.createElement("article");

        articulo.className = "articulo-carrito articulo-carrito-mejorado";


        const imagenContenedor = document.createElement("div");

        imagenContenedor.className = "carrito-imagen-contenedor";


        const imagen = document.createElement("img");

        imagen.src = item.imagen || "img/logo/logo.jpeg";

        imagen.alt = item.nombre;

        imagen.className = "carrito-imagen-producto";

        imagen.loading = "lazy";

        imagen.onerror = function () {

            if (!imagen.src.endsWith("/img/logo/logo.jpeg")) {

                imagen.src = "img/logo/logo.jpeg";

            }

        };

        imagenContenedor.appendChild(imagen);


        const informacion = document.createElement("div");

        informacion.className = "carrito-informacion-producto";


        const etiqueta = document.createElement("span");

        etiqueta.className = "carrito-etiqueta";

        etiqueta.textContent = "PRODUCTO SELECCIONADO";


        const nombre = document.createElement("h3");

        nombre.className = "carrito-nombre-producto";

        nombre.textContent = item.nombre;


        const precioTexto = document.createElement("p");

        precioTexto.className = "carrito-precio-unitario";

        precioTexto.textContent =
            formatoPrecio(precio) + " por unidad";


        const subtotalTexto = document.createElement("p");

        subtotalTexto.className = "carrito-subtotal-producto";

        subtotalTexto.textContent =
            "Subtotal: " + formatoPrecio(subtotal);


        informacion.appendChild(etiqueta);

        informacion.appendChild(nombre);

        informacion.appendChild(precioTexto);

        informacion.appendChild(subtotalTexto);


        const controles = document.createElement("div");

        controles.className = "controles-carrito controles-carrito-mejorados";


        const controlesCantidad = document.createElement("div");

        controlesCantidad.className = "carrito-controles-cantidad";


        const botonMenos = document.createElement("button");

        botonMenos.type = "button";

        botonMenos.className = "carrito-boton-cantidad";

        botonMenos.innerHTML =
            '<i class="fa-solid fa-minus"></i>';

        botonMenos.dataset.accion = "restar";

        botonMenos.dataset.indice = indice;

        botonMenos.disabled = cantidad <= 1;

        botonMenos.setAttribute(
            "aria-label",
            "Disminuir cantidad de " + item.nombre
        );


        const cantidadTexto = document.createElement("span");

        cantidadTexto.className = "cantidad-carrito";

        cantidadTexto.textContent = cantidad;

        cantidadTexto.setAttribute(
            "aria-label",
            "Cantidad: " + cantidad
        );


        const botonMas = document.createElement("button");

        botonMas.type = "button";

        botonMas.className = "carrito-boton-cantidad";

        botonMas.innerHTML =
            '<i class="fa-solid fa-plus"></i>';

        botonMas.dataset.accion = "sumar";

        botonMas.dataset.indice = indice;

        botonMas.setAttribute(
            "aria-label",
            "Aumentar cantidad de " + item.nombre
        );


        controlesCantidad.appendChild(botonMenos);

        controlesCantidad.appendChild(cantidadTexto);

        controlesCantidad.appendChild(botonMas);


        const botonEliminar = document.createElement("button");

        botonEliminar.type = "button";

        botonEliminar.className = "carrito-boton-eliminar";

        botonEliminar.innerHTML =
            '<i class="fa-solid fa-trash-can"></i>';

        botonEliminar.dataset.accion = "eliminar";

        botonEliminar.dataset.indice = indice;

        botonEliminar.setAttribute(
            "aria-label",
            "Eliminar " + item.nombre
        );


        controles.appendChild(controlesCantidad);

        controles.appendChild(botonEliminar);


        articulo.appendChild(imagenContenedor);

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

    const nombreProducto = carrito[indice].nombre;

    carrito.splice(indice, 1);

    guardarCarrito();

    mostrarCarrito();

    if (typeof Swal !== "undefined") {

        Swal.fire({

            icon: "success",

            title: "Producto eliminado",

            text: nombreProducto + " se eliminó del carrito.",

            timer: 1500,

            showConfirmButton: false

        });

    }

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

                text: "Se eliminaron todos los productos.",

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

    let mensaje =
        "Hola, Copy-School. Quiero solicitar una cotización:\n\n";

    let total = 0;


    carrito.forEach(function (item) {

        const subtotal =
            Number(item.precio) * Number(item.cantidad);

        total += subtotal;

        mensaje +=
            "• " + item.nombre +
            "\nCantidad: " + item.cantidad +
            "\nPrecio unitario: " + formatoPrecio(item.precio) +
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