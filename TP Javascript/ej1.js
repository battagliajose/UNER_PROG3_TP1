/*
=======================================================================================
    UNER - PROGRAMACIÓN III - TP 1 - Repaso JS
    GRUPO: Luis Sanchez - José Battaglia - Cristian Seltenreich - Silvana Zalazar
=======================================================================================
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
=======================================================================================
*/

const axios = require('axios');
const fs = require('fs');

// API
const API_URL = 'https://thronesapi.com/api/v2/Characters';

async function getNedStark() {
    try {
        const response = await axios.get(API_URL);
        const characters = response.data;
        const nedStark = characters.find(char => char.fullName === 'Ned Stark');
        console.log(nedStark);
        return nedStark;
    } catch (error) {
        console.error('Error al recuperar la información de Ned Stark:', error);
    }
}

async function getAllCharacters() {
    try {
        const response = await axios.get(API_URL);
        const characters = response.data;
        console.log(characters);
        return characters;
    } catch (error) {
        console.error('Error al recuperar todos los personajes:', error);
    }
}

async function saveCharactersToFile() {
    const characters = await getAllCharacters();
    fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2));
    console.log('Personajes guardados en characters.json');
}

// 4
function readCharactersFromFile() {
    const data = fs.readFileSync('characters.json', 'utf8');
    const characters = JSON.parse(data);
    return characters;
}

function showStarkCharacters() {
    const characters = readCharactersFromFile();
    const starkCharacters = characters.filter(char => char.family === 'House Stark');
    console.log('Personajes de la familia Stark:', starkCharacters);
}

function addNewCharacter(newCharacter) {
    let characters = readCharactersFromFile();
    characters.push(newCharacter);
    fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2));
    console.log('Nuevo personaje agregado y archivo sobrescrito.');
}

function deleteCharactersWithIdGreaterThan25() {
    let characters = readCharactersFromFile();
    characters = characters.filter(char => char.id <= 25);
    fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2));
    console.log('Personajes con ID mayor a 25 eliminados y archivo sobrescrito.');
}

// Ejecución de las funciones:

async function main() {
    // 1. Recuperar información de Ned Stark
    await getNedStark();

    // 2. Recupera todos los personajes
    await saveCharactersToFile();

    // 4-a. Mostra personajes de la familia Stark
    showStarkCharacters();

    // 4-b. Agrega un nuevo personaje
    const newCharacter = {
        id: 52,
        fullName: 'New Stark',
        title: 'New Lord',
        family: 'House Stark',
        imageUrl: 'https://example.com/newstark.jpg'
    };
    addNewCharacter(newCharacter);

    // 4-c. Eliminar personajes con ID mayor a 25
    deleteCharactersWithIdGreaterThan25();
}

// Llama la función principal
main();
