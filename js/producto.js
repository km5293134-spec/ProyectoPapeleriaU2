const productos = [
    {
        id: 1,
        nombre: "Cuadernos escolares",
        categoria: "escolar",
        precio: 35,
        imagen: "img/producto/cuadernos.jpeg"
    },
    {
        id: 2,
        nombre: "Colores Norma",
        categoria: "escolar",
        precio: 65,
        imagen: "img/producto/colores-norma.jpeg"
    },
    {
        id: 3,
        nombre: "Lápices escolares",
        categoria: "escolar",
        precio: 8,
        imagen: "img/producto/lapices.jpeg"
    },
    {
        id: 4,
        nombre: "Accesorios tecnológicos",
        categoria: "tecnologia",
        precio: 80,
        imagen: "img/producto/tecnologia.jpeg"
    },
    {
        id: 5,
        nombre: "Globos para fiestas",
        categoria: "fiesta",
        precio: 25,
        imagen: "img/producto/globos.jpeg"
    }
];

const contenedor = document.querySelector("#contenedorProductos");
const buscador = document.querySelector("#buscarProducto");
const filtro = document.querySelector("#filtroCategoria");
const sinResultados = document.querySelector("#sinResultados");
const contadorCarrito = document.querySelector("#contadorCarrito");

const contadorResultados = document.querySelector("#contadorResultados");
const limpiarBusqueda = document.querySelector("#limpiarBusqueda");
const restablecerFiltros = document.querySelector("#restablecerFiltros");
const reiniciarBusqueda = document.querySelector("#reiniciarBusqueda");

function mostrarProductos(lista) {

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        sinResultados.classList.remove("d-none");
        return;
    }

    sinResultados.classList.add("d-none");

    const nombresCategorias = {
        escolar: "Útiles escolares",
        tecnologia: "Tecnología",
        fiesta: "Artículos para fiestas"
    };

    lista.forEach(function (producto) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "col-12 col-sm-6 col-lg-4";

        tarjeta.innerHTML = `
            <article class="card tarjeta-producto producto-card-mejorada h-100">

                <div class="producto-imagen-contenedor">

                    <img
                        src="${producto.imagen}"
                        class="card-img-top producto-imagen"
                        alt="${producto.nombre}"
                        loading="lazy">

                </div>

                <div class="card-body">

                    <span class="categoria-producto producto-etiqueta">
                        <i class="fa-solid fa-tag"></i>
                        ${nombresCategorias[producto.categoria] || producto.categoria}
                    </span>

                    <h3 class="h5 mt-3 producto-nombre">
                        ${producto.nombre}
                    </h3>

                    <p class="producto-precio-texto">
                        Precio por unidad
                    </p>

                    <p class="precio-producto producto-precio">
                        $${producto.precio.toFixed(2)}
                    </p>

                    <button
                        type="button"
                        class="btn btn-primary w-100 btn-agregar producto-boton"
                        data-id="${producto.id}">

                        <i class="fa-solid fa-cart-plus"></i>
                        Agregar al carrito

                    </button>

                </div>

            </article>
        `;

        contenedor.appendChild(tarjeta);

    });

}

function filtrarProductos() {

    const texto = buscador.value.toLowerCase().trim();
    const categoria = filtro.value;

    const resultado = productos.filter(function (producto) {

        const coincideNombre =
            producto.nombre.toLowerCase().includes(texto);

        const coincideCategoria =
            categoria === "todos" ||
            producto.categoria === categoria;

        return coincideNombre && coincideCategoria;

    });

    mostrarProductos(resultado);

    const cantidad = resultado.length;

    contadorResultados.textContent =
        `Mostrando ${cantidad} ${cantidad === 1 ? "producto" : "productos"}`;

    const hayFiltros = texto !== "" || categoria !== "todos";

    limpiarBusqueda.hidden = buscador.value.length === 0;
    restablecerFiltros.hidden = !hayFiltros;

}

function limpiarFiltros() {

    buscador.value = "";
    filtro.value = "todos";

    filtrarProductos();
    buscador.focus();

}

function agregarAlCarrito(id) {

    const productoSeleccionado = productos.find(function (producto) {
        return producto.id === id;
    });

    if (!productoSeleccionado) {
        return;
    }

    let carrito;

    try {
        const carritoGuardado = JSON.parse(
            localStorage.getItem("carritoCopySchool")
        );

        carrito = Array.isArray(carritoGuardado) ? carritoGuardado : [];

    } catch (error) {
        carrito = [];
    }

    const existente = carrito.find(function (item) {
        return item.id === id;
    });

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            ...productoSeleccionado,
            cantidad: 1
        });

    }

    localStorage.setItem(
        "carritoCopySchool",
        JSON.stringify(carrito)
    );

    actualizarContador();

    Swal.fire({
        icon: "success",
        title: "¡Producto agregado!",
        text: productoSeleccionado.nombre + " se agregó a tu carrito.",
        timer: 1700,
        showConfirmButton: false
    });

}

function actualizarContador() {

    let carrito;

    try {
        const carritoGuardado = JSON.parse(
            localStorage.getItem("carritoCopySchool")
        );

        carrito = Array.isArray(carritoGuardado) ? carritoGuardado : [];

    } catch (error) {
        carrito = [];
    }

    let cantidadTotal = 0;

    carrito.forEach(function (producto) {

        cantidadTotal += Number(producto.cantidad) || 0;

    });

    contadorCarrito.textContent = cantidadTotal;

}

buscador.addEventListener("input", filtrarProductos);

filtro.addEventListener("change", filtrarProductos);

limpiarBusqueda.addEventListener("click", function () {

    buscador.value = "";

    filtrarProductos();
    buscador.focus();

});

restablecerFiltros.addEventListener("click", limpiarFiltros);

reiniciarBusqueda.addEventListener("click", limpiarFiltros);

contenedor.addEventListener("click", function (evento) {

    const boton = evento.target.closest(".btn-agregar");

    if (boton) {

        const id = Number(boton.dataset.id);

        agregarAlCarrito(id);

    }

});

filtrarProductos();
actualizarContador();