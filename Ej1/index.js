/*
  =====================================================================================================
    UNER - PROGRAMACIÓN III - TP 1 - Repaso JS
    GRUPO: Luis Sanchez - José Battaglia - Cristian Seltenreich - Silvana Zalazar
  =====================================================================================================
    Ejercicio 1
    """""""""""
        1. Realizar una función que permita recuperar la información del personaje “Ned Stark”.
        2. Realizar una función que permita recuperar todos los personajes disponibles.
        3. Persistr el resultado de la segunda consulta localmente en un archivo JSON.
        4. Leer el archivo local de personajes
            a) Mostrar por consola los personajes de la familia Stark. Es decir: “family” = “House
               Stark”.
            b) Agregar un nuevo personaje y sobrescribir el archivo original.
            c) Eliminar los personajes cuyo ID sean mayores a 25 y sobrescribir el archivo original
  =====================================================================================================
 */

const fs = require('fs');
const api = require('./api.js');

const localFile = './GOT.json'

async function main() {
    
    // Punto 1
    console.log(await api.getByName('Ned Stark')); 

    // Punto 2
    const datos = await api.getAll(); 

    // Punto 3
    fs.writeFileSync(localFile, JSON.stringify(datos, null, 2), 'utf-8'); 

    // Punto 4
    let datos4 = JSON.parse(fs.readFileSync(localFile, 'utf-8'));

    // Punto 4.a
    console.log(datos4.filter((registro) => registro.family == "House Stark" )); 

    // Punto 4.b
    const nuevoId = datos4[datos4.length -1].id + 1 
    const nuevoPersonaje = {
        "id": nuevoId,
        "firstName": "Rick",
        "lastName": "Sánchez",
        "fullName": "Rick Sánchez",
        "title": "Dr",
        "family": "House Sánchez",
        "image": "70555635e5b537ff14c3ef530c0551ebed1f9ab3r1-848-1080v2_hq.jpg",
        "imageUrl": "https://pm1.aminoapps.com/7050/70555635e5b537ff14c3ef530c0551ebed1f9ab3r1-848-1080v2_hq.jpg"
    }
    datos4.push(nuevoPersonaje);
    fs.writeFileSync(localFile, JSON.stringify(datos4, null, 2), 'utf-8');

    // Punto 4.c
    datos4 = datos4.filter((registro) => registro.id  <= 25 );
    fs.writeFileSync(localFile, JSON.stringify(datos4, null, 2), 'utf-8');
    
}

main();
