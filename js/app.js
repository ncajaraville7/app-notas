const formulario = document.getElementById('formulario');
const notas = document.getElementById('lista-notas');
const divError = document.getElementById('error');
let listaNotas = [];


formulario.addEventListener('submit', agregarNota);

document.addEventListener('DOMContentLoaded', () => {
    listaNotas = JSON.parse(localStorage.getItem('notas')) || [];

    crearNota();
});


function agregarNota(e) {
    e.preventDefault();

    const nota = document.getElementById('nota').value;

    const notaObj = {
        id: Date.now(),
        texto: nota
    }

    if(!nota) {
        mostrarError('No ingresó ninguna nota');
    } else {
        listaNotas = [...listaNotas, notaObj];
        crearNota();
        divError.innerHTML = '';
    }

    formulario.reset();
}

function crearNota() {
    limpiarHTML();

    listaNotas.forEach( nota => {
        const anotacion = document.createElement('li');
        anotacion.textContent = nota.texto;
        anotacion.classList.add('anotacion');
        notas.appendChild(anotacion);

        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-nota');
        btnEliminar.textContent = '🗑️'
        anotacion.appendChild(btnEliminar);

        btnEliminar.onclick = () => {
            borrarNota(nota.id);
        }
    });

    guardarNota();
}

function mostrarError(mensaje) {
    divError.innerHTML = '';
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('error');
    divError.appendChild(error);

    setTimeout( () => {
        error.remove();
    },3000)
}

function limpiarHTML() {
    while(notas.firstChild) {
        notas.removeChild(notas.firstChild);
    }
}

function guardarNota() {
    localStorage.setItem('notas', JSON.stringify(listaNotas));
}

function borrarNota(id) {
    listaNotas = listaNotas.filter( nota => nota.id !== id);

    crearNota();
}