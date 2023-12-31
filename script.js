// Lista de personas
const personas = ['ale', 'dami', 'gero', 'gus', 'nacho', 'cave', 'juanma', 'juanpi', 'juli', 'lean', 'lucas', 'marce', 'marian', 'santi', 'tomi'];

// Función para seleccionar una persona aleatoria
function seleccionarPersona() {
    const indiceAleatorio = Math.floor(Math.random() * personas.length);
    return personas[indiceAleatorio];
}

// Función para manejar el clic en el botón
function handleClick() {
    const selectedPerson = seleccionarPersona();
    document.getElementById('selectedPerson').innerText = `Persona seleccionada: ${selectedPerson}`;
}

// Asociar la función al evento de clic en el botón
document.getElementById('selectButton').addEventListener('click', handleClick);
