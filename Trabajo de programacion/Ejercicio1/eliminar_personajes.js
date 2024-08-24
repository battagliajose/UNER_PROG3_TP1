const fs = require('fs');

function cargarArchivo() {
    try {
        const jsonString = fs.readFileSync('./personajes.json', 'utf8'); 
        const personajes = JSON.parse(jsonString); 
        return personajes; 
    } catch (err) {
        console.log('Error al leer o parsear el archivo:', err);
        return []; 
    }
}

async function guardarArchivo(personajes) {
    try {       
        fs.writeFileSync('./personajes.json', JSON.stringify(personajes, null, 2)); // el 2 es el margen de espacio dentro del json
        console.log('Personaje agregado con éxito');
    } catch (err) {
        console.log('Error al escribir el archivo:', err);
    }
  
}

async function eliminarPersonajes(valor) {
    try {
        let personajes = await cargarArchivo(); 
        // Filtrar personajes cuyo id sea menor o igual al valor        
        personajes = personajes.filter(personaje => personaje.id <= valor);
        await guardarArchivo(personajes);
    } catch (err) {
        console.log('Error al procesar el archivo:', err);
    }
}

eliminarPersonajes(25);
