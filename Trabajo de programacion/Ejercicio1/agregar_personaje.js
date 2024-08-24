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

function agregarPersonaje(personaje) {
    try {
        let personajes = cargarArchivo(); 
        personajes.push(personaje); 
        fs.writeFileSync('./personajes.json', JSON.stringify(personajes, null, 2)); 
        console.log('Personaje agregado con éxito');
    } catch (err) {
        console.log('Error al escribir el archivo:', err);
    }
}

let personaje = {
    id: 100,
    firstName: 'Luis',
    lastName: 'Sanchez Stark',
    fullName: 'Luis Sanchez Stark',
    title: 'Lord of Ushuaia Winterest',
    family: 'Homeless',
    image: 'robb-stark.jpg',
    imageUrl: 'https://thronesapi.com/assets/images/robb-stark.jpg'
};


agregarPersonaje(personaje);
