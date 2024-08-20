const urlAPI = 'https://thronesapi.com/api/v2/Characters';

// Devuelve un JSON con todos los registros
async function getAll() {
    try {
        const response = await fetch (urlAPI);
        if (!response.ok) {
            throw new Error('Error', response.status);
        }
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

// Devuelve un JSON con el primer registro coincidente con el nombre recibido
async function getByName(nombre) {
    const datos = await getAll()
    const registro = datos.find((registro) => registro.fullName == nombre);

    return registro || null;
}

module.exports = {
    getAll,
    getByName,
};