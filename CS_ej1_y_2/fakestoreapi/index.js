//importo fileSystem
//const fs = require('fs');

//guardo la URL de la API a consultar 
const urlApi = ('https://fakestoreapi.com/products');


//1. Recuperar la información de todos los productos (products)

async function recuperarDatosProductos() {
    try {
        const respuesta = await fetch(urlApi)
        if (!respuesta.ok) {
            throw new Error("Error", respuesta.status)
            // Si no fue exitosa, lanzo un error con el estado de la              
            //respuesta y sale del then, pasando el control al catch
        }
        const datos = await respuesta.json();
        console.log(datos)
        return datos
    }
    catch (error) {
        console.log(error)
    }
};

//2. Recuperar la información de un número limitado de productos (products)
//guardo la URL de la API a consultar correspondiente al endpoint de 
//un nro limitado de productos
const urlApiLimitResults = ('https://fakestoreapi.com/products?limit=');

// declaro la función asicrona
async function limitResults(cant) {
    try {
        // espero el resultado de la promesa
        const response = await fetch(`${urlApiLimitResults}${cant}`);
        if (!response.ok) {
            throw new Error('Error ' + response.status)
        }

        const datosLimitados = await response.json();
        console.log(datosLimitados);
    }
    catch (error) {
        console.log(error)
    }
};


//3. Agregar un nuevo producto (product)
async function agregarNuevoProducto(producto) {
    try {
        const response = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // especifico que el cuerpo de la solicitud es JSON
            },
            body: JSON.stringify(producto) // convierto el objeto JavaScript a una cadena de texto JSON
        })
        if (!response.ok) {
            throw new Error('Error ' + response.status)
        }

        const datos = await response.json();
        console.log("Producto 'agregado':", datos); // Imprime el producto simulado como agregado
    }
        
    catch (error) {
        console.log(error)
    }
};


// 4. Retornar un producto (product) según un “id” como parámetro.
// declaro la función asicrona
async function buscarUnProducto(id) {
    try {
        // espero el resultado de la promesa
        const response = await fetch(`${urlApi}/${id}`);
        if (!response.ok) {
            throw new Error('Error ' + response.status)
        }

        const datos = await response.json();
        console.log(datos);
    } catch (error) {
        console.log('error ', error);
    }
}

//  5. Eliminar un producto (product).
/*
Delete a product
fetch('https://fakestoreapi.com/products/6',{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))*/

async function eliminarProducto(idProd) {
    try {

        // Realizo la solicitud DELETE a la API
        const response = await fetch(`${urlApi}/${idProd}`, {
            method: 'DELETE'
        });


        if (!response.ok) {
            throw new Error('Error ' + response.status)
        }

        // Espera la respuesta en formato JSON
        const datos = await response.json();
        console.log("Producto 'eliminado':", datos); // Imprime el producto simulado como eliminado
    }
    catch (error) {
        console.log(error)
    }
};



//LLamada a funciones 

// la información de todos los productos (products)
//recuperarDatosProductos();

//para rrecuperar un número dado de productos
//limitResults(5); 

//agragar nuevo producto
//declaro producto y llamo a la función con ese parámetro
let prodN = {
    title: 'producto de mentirita',
    price: 13.5,
    description: 'macanas',
    image: 'https://importadodeUSA.yankieimperialista.com',
    category: 'electronica barata'
};

agregarNuevoProducto(prodN); 



//buscar producto por id 
//buscarUnProducto(3);

//elimnar producto por id
eliminarProducto(3);
