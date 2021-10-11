//Constantes y variables

//Selectores
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puerta = document.querySelector('#puerta');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


const resultado = document.querySelector('#resultado');
const today = new Date();
const max = today.getFullYear();
const min = max - 11;

//Generar un objeto con la busqueda

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puerta: '',
    transmision: '',
    color: '',
}


//FUNCIONES

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //muestra los autos al cargar el documento


    llenarSelect(); //llena el selector de años automáticamente
});

//Filtros de datosBusqueda    
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();

})

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();

})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();

})

puerta.addEventListener('change', e => {
    datosBusqueda.puerta = e.target.value;

    filtrarAuto();

})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();

})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();

})

//FUNCIONES
//muestra los autos al cargar el documento
function mostrarAutos(autos) {

    limpiarHTML();


    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.innerHTML = `<ul class="lista">
        
        <li class="lista-item">${marca}, ${modelo} - Año: ${year} - ${puertas} puertas - 
        Transmision: ${transmision},
        Precio: $ ${precio},
        Color: ${color}</li>
        
        </ul>`

        //Agrega el parrafo en el div con id resultado

        resultado.appendChild(autoHTML);
    })
}

//Limpiar HTML

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


//llena el selector de años automáticamente
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//Funcion que filtra en base a la busqueda

function filtrarAuto() {
    const resultado = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo)
        .filter(filtrarPuerta)
        .filter(filtrarTransmision)
        .filter(filtrarColor)

    if (resultado.length) {
        mostrarAutos(resultado)
    } else {
        noResultado();
    }
}

function noResultado () {

    limpiarHTML();

    const noResultado = document.createElement('div');

    noResultado.innerHTML = `<p>No hay resultados que concuerden con su busqueda</p>`;

    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;

}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuerta(auto) {
    const { puerta } = datosBusqueda;
    if (puerta) {
        return auto.puertas === parseInt(puerta);
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}