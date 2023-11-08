let eventos = [];
let arr = [];
// el segundo arreglo lo guarda en json  los mantenga en el localhost

const nombreEvento = document.querySelector("#nombreEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const agregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");

const json = cargar();
try {
    arr = JSON.parse(json);
} catch (error) {
    arr = []
}
eventos = arr ? [...arr] : [];
mostrarEventos();

//se hace un queryselectorpara que escuche todo el formulario
document.querySelector("form").addEventListener("submit", e => {
    // cuando se haga click se limpiara la caja
    e.preventDefault();
    //muestra los eventos 
    agregarEvento();
});

function agregarEvento() {
    if (nombreEvento.value === "" || fechaEvento.value === "") {
        return;
    }
    // se retorna vacia si hay elementos inferiores a la fecha actual retorna vacia
    if (diferenciaFecha(fechaEvento.value) < 0) {
        return;
    }
    const nuevoEvento = {
        id: (Math.random() * 100).toString(36).slice(3),
        nombre: nombreEvento.value,
        fecha: fechaEvento.value,

    };
    //envia los nuevos eventos para guardarlo en el arreglo
    eventos.unshift(nuevoEvento);
    guardar(JSON.stringify(eventos));
    //coloca el evento vacio para crear el siguiente
    nombreEvento.value = "";

    mostrarEventos();
}
function diferenciaFecha(destino) {
    //el usuario ingresa al sistema los datos
    let fechaDestino = new Date(destino);
    let fechaActual = new Date();
    //mostrata la fecha actual y la compara con la de destino 
    // get time muestra la fecha
    let diferencia = fechaDestino.getTime() - fechaActual.getTime();
    // devuelve los dias
    let dias = Math.ceil(diferencia / (100 * 3600 * 24));
    return dias;
}
function mostrarEventos() {
    const eventosHTML = eventos.map((evento) => {
        return `
            <div class="evento">
                <div class="dias">
                    <span class="diasFaltantes">${diferenciaFecha(evento.fecha)}</span>
                    <span class="texto"> dias para</span>
                </div>
                    <div class="nombreEvento">${evento.nombre} </div>
                    <div class="nombreEvento">${evento.fecha} </div>

                <div class="acciones"> 
                    <button data-id="${evento.id}" class="eliminar">Eliminar <button>
                </div>
           
            </div>`;
    });

    listaEventos.innerHTML = eventosHTML.join("");
    //elimina solo los elementos a los cuales les de click
    document.querySelectorAll(".eliminar").forEach(button => {
        button.addEventListener("click", e => {
            const id = button.getAttribute('data-id');
            eventos = eventos.filter(evento => evento.id !== id);

            mostrarEventos();
        });
    });
}
function guardar(datos) {
    localStorage.setItem("lista", datos);

}
function guardar(datos) {
    //queda guardado en el localhost
    localStorage.setItem("lista", datos);
}
function cargar() {
    //al agregarse hace un retorno  obtine la lista y lo devuelve
    return localStorage.getItem("lista")
}

