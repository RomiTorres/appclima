const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
   formulario.addEventListener('submit', buscarClima);     
})

function buscarClima(e) {
    e.preventDefault();
    
    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        mostrarError( 'Ambos campos son obligatorios');

        return;
    }
    // Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje, tipo) {
    const alerta = document.querySelector('.bg-red-100');
    
    if(!alerta) {
        const alerta = document.createElement('div'); 

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 
        'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = ` 
        <strong class="font-bold">Error</strong>
        <span class="block">${mensaje}<span/>
        `;

        container.appendChild(alerta);

        // Se elimine el alerta
        setTimeout(() => {
           alerta.remove()     
        },3000);
    }
}

function consultarAPI(ciudad, pais) {

    const appId = 'f06a90d1056e902c9a22d207ce5a63f7';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId} `;

    spinner(); // Muestra un spinner de carga
   
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {

            console.log(datos);

            limpiarHTML();      // Limpiar el HTML previo
            if(datos.cod === '404') {
                mostrarError('Ciudad no encontrada')
                return;
            }

            // Imprime la respuesta en el HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    const {name, main: {temp, temp_max, temp_min}} = datos;

    // const centigrados = Math.round(temp - 273.15); REDONDEA 
    const centigrados = kelvinACentrigrados(temp);
    const centigradosMax = kelvinACentrigrados(temp_max);
    const centigradosMin = kelvinACentrigrados(temp_min);

    const nomreCiudad = document.createElement('p');
    nomreCiudad.textContent = `Clima en ${name}`;
    nomreCiudad.classList.add('font-bold', 'text-2xl', 'text-center');


    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const temMax = document.createElement('p');
    temMax.innerHTML = `Max: ${centigradosMax} &#8451;`;
    temMax.classList.add('text-xl');

    const temMin = document.createElement('p');
    temMin.innerHTML = `Min: ${centigradosMin} &#8451;`;
    temMin.classList.add('text-xl');


    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(actual);

    const resultadoDivMax = document.createElement('div');
    resultadoDivMax.classList.add('text-center', 'text-white');
    resultadoDivMax.appendChild(temMax);

    const resultadoDivMin = document.createElement('div');
    resultadoDivMin.classList.add('text-center', 'text-white');
    resultadoDivMin.appendChild(temMin);

    resultado.appendChild(nomreCiudad);
    resultado.appendChild(resultadoDiv);
    resultado.appendChild(resultadoDivMax);
    resultado.appendChild(resultadoDivMin);
}

const kelvinACentrigrados = grados => parseInt(grados - 273.15);


function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner( ) {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}