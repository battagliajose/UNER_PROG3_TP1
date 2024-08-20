const urlAPI = 'https://fakestoreapi.com/';

// Devuelve un JSON con todos los registros
async function get(endpoint) {
    try {
        const response = await fetch (urlAPI + endpoint);
        if (!response.ok) {
            throw new Error('Error', response.status);
        }
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

async function create(endpoint, objeto) {
    try {
        const response = await fetch (urlAPI + endpoint, {
            method:"POST",
            body: objeto
        });
        if (!response.ok) {
            throw new Error('Error', response.status);
        }
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

// Elimina un registro
async function del(endpoint) {
    try {
        const response = await fetch (urlAPI + endpoint, {
            method:"DELETE"
        });
        if (!response.ok) {
            throw new Error('Error', response.status);
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Devuelve todos los productos
async function getAllProducts() {
    return await get('products');
}

// Devuelve todos los productos con una cantidad limite
async function getLimitProducts(limit) {
    return await get('products?limit=' + limit);
}

// Devuelve un producto por ID
async function getByIDProducts(id) {
    return await get('products/' + id);
}

// Elimina un producto por ID
async function delByIdProducts(id) {
    return await del('products/' + id);
}

async function createProduct(producto) {
    return await create('products/', producto)
}

module.exports = {
    getAllProducts,
    getLimitProducts,
    getByIDProducts,
    delByIdProducts,
    createProduct
};