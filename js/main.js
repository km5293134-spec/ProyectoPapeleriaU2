


document.addEventListener("DOMContentLoaded", function () {

    const anio = document.querySelector("#anio");

    const fecha = new Date();

    if (anio) {
        anio.textContent = fecha.getFullYear();
    }

});