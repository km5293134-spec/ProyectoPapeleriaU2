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
const filtrosRapidos = document.querySelector("#filtrosRapidos");

const nombresCategorias = {
    escolar: "Útiles escolares",
    tecnologia: "Tecnología",
    fiesta: "Artículos para fiestas"
};

function mostrarProductos(lista) {

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        sinResultados.classList.remove("d-none");
        return;
    }

    sinResultados.classList.add("d-none");

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
                        ${nombresCategorias[producto.categoria]}
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

function actualizarFiltrosRapidos() {

    if (!filtrosRapidos) {
        return;
    }

    const categoriaSeleccionada = filtro.value;

    const botones = filtrosRapidos.querySelectorAll(".filtro-rapido");

    botones.forEach(function (boton) {

        const seleccionado =
            boton.dataset.categoria === categoriaSeleccionada;

        boton.classList.toggle("activo", seleccionado);

        boton.setAttribute(
            "aria-pressed",
            seleccionado ? "true" : "false"
        );

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

    if (contadorResultados) {

        contadorResultados.textContent =
            `Mostrando ${cantidad} ${cantidad === 1 ? "producto" : "productos"}`;

    }

    const hayFiltros = texto !== "" || categoria !== "todos";

    if (limpiarBusqueda) {
        limpiarBusqueda.hidden = buscador.value.length === 0;
    }

    if (restablecerFiltros) {
        restablecerFiltros.hidden = !hayFiltros;
    }

    actualizarFiltrosRapidos();

}

function limpiarFiltros() {

    buscador.value = "";

    filtro.value = "todos";

    filtrarProductos();

    buscador.focus();

}

function obtenerCarrito() {

    try {

        const carritoGuardado = JSON.parse(
            localStorage.getItem("carritoCopySchool")
        );

        return Array.isArray(carritoGuardado) ? carritoGuardado : [];

    } catch (error) {

        return [];

    }

}

function agregarAlCarrito(id) {

    const productoSeleccionado = productos.find(function (producto) {
        return producto.id === id;
    });

    if (!productoSeleccionado) {
        return;
    }

    const carrito = obtenerCarrito();

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

    if (typeof Swal !== "undefined") {

        Swal.fire({
            icon: "success",
            title: "¡Producto agregado!",
            text: productoSeleccionado.nombre + " se agregó a tu carrito.",
            timer: 1700,
            showConfirmButton: false
        });

    }

}

function actualizarContador() {

    const carrito = obtenerCarrito();

    let cantidadTotal = 0;

    carrito.forEach(function (producto) {

        cantidadTotal += Number(producto.cantidad) || 0;

    });

    if (contadorCarrito) {
        contadorCarrito.textContent = cantidadTotal;
    }

}

if (buscador) {

    buscador.addEventListener("input", filtrarProductos);

}

if (filtro) {

    filtro.addEventListener("change", filtrarProductos);

}

if (limpiarBusqueda) {

    limpiarBusqueda.addEventListener("click", function () {

        buscador.value = "";

        filtrarProductos();

        buscador.focus();

    });

}

if (restablecerFiltros) {

    restablecerFiltros.addEventListener("click", limpiarFiltros);

}

if (reiniciarBusqueda) {

    reiniciarBusqueda.addEventListener("click", limpiarFiltros);

}

if (filtrosRapidos) {

    filtrosRapidos.addEventListener("click", function (evento) {

        const boton = evento.target.closest(".filtro-rapido");

        if (!boton || !filtrosRapidos.contains(boton)) {
            return;
        }

        const categoriaSeleccionada = boton.dataset.categoria;

        const categoriasValidas = [
            "todos",
            "escolar",
            "tecnologia",
            "fiesta"
        ];

        if (!categoriasValidas.includes(categoriaSeleccionada)) {
            return;
        }

        filtro.value = categoriaSeleccionada;

        filtrarProductos();

    });

}

if (contenedor) {

    contenedor.addEventListener("click", function (evento) {

        const boton = evento.target.closest(".btn-agregar");

        if (!boton) {
            return;
        }

        const id = Number(boton.dataset.id);

        agregarAlCarrito(id);

    });

}

if (contenedor && buscador && filtro && sinResultados) {

    filtrarProductos();

}

actualizarContador();