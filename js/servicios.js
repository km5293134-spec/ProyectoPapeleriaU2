

const precios = {

    impresion: {
        color: 3,
        blancoNegro: 2
    },

    copia: {
        color: 2,
        blancoNegro: 1
    }

};




const formulario = document.querySelector("#formCalculadora");

const tipoServicio = document.querySelector("#tipoServicio");

const tipoColor = document.querySelector("#tipoColor");

const cantidadHojas = document.querySelector("#cantidadHojas");

const resultado = document.querySelector("#resultadoCalculadora");

const totalCalculado = document.querySelector("#totalCalculado");

const botonAgregar = document.querySelector("#agregarServicio");

const contadorCarrito = document.querySelector("#contadorCarrito");




let servicioCalculado = null;




function calcularPrecio(evento) {

    evento.preventDefault();

    const servicio = tipoServicio.value;

    const color = tipoColor.value;

    const cantidad = Number(cantidadHojas.value);


  

    if (
        !precios[servicio] ||
        precios[servicio][color] === undefined ||
        !Number.isSafeInteger(cantidad) ||
        cantidad <= 0
    ) {

        Swal.fire({
            icon: "warning",
            title: "Datos incorrectos",
            text: "Selecciona un servicio, tipo de impresión y cantidad válida."
        });

        return;
    }



    const precioUnitario = precios[servicio][color];



    const total = precioUnitario * cantidad;


 

    servicioCalculado = {

        id: "servicio-" + servicio + "-" + color,

        nombre:
            (servicio === "impresion" ? "Impresión" : "Copia") +
            " " +
            (color === "color" ? "a color" : "blanco y negro"),

        categoria: "servicios",

        precio: precioUnitario,

        cantidad: cantidad

    };


    

    totalCalculado.textContent = "$" + total.toFixed(2);

    resultado.classList.remove("d-none");

}




function agregarServicioCarrito() {

    if (!servicioCalculado) {
        return;
    }

    let carrito = JSON.parse(
        localStorage.getItem("carritoCopySchool")
    ) || [];



    const existente = carrito.find(function (item) {

        return item.id === servicioCalculado.id;

    });


    if (existente) {

        existente.cantidad += servicioCalculado.cantidad;

    } else {

        carrito.push({
            ...servicioCalculado
        });

    }




    localStorage.setItem(
        "carritoCopySchool",
        JSON.stringify(carrito)
    );




    actualizarContadorServicios();


  

    Swal.fire({

        icon: "success",

        title: "¡Servicio agregado!",

        text: servicioCalculado.nombre +
            " se agregó a tu cotización.",

        timer: 1800,

        showConfirmButton: false

    });

}



function actualizarContadorServicios() {

    const carrito = JSON.parse(
        localStorage.getItem("carritoCopySchool")
    ) || [];

    let cantidadTotal = 0;

    carrito.forEach(function (item) {

        cantidadTotal += item.cantidad;

    });

    contadorCarrito.textContent = cantidadTotal;

}




function limpiarResultado() {

    servicioCalculado = null;

    resultado.classList.add("d-none");

}




formulario.addEventListener("submit", calcularPrecio);




botonAgregar.addEventListener("click", agregarServicioCarrito);



tipoServicio.addEventListener("change", limpiarResultado);

tipoColor.addEventListener("change", limpiarResultado);

cantidadHojas.addEventListener("input", limpiarResultado);




actualizarContadorServicios();