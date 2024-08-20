/*
  =====================================================================================================
    UNER - PROGRAMACIÓN III - TP 1 - Repaso JS
    GRUPO: Luis Sanchez - José Battaglia - Cristian Seltenreich - Silvana Zalazar
  =====================================================================================================
    Ejercicio 2
    """""""""""
    1. Recuperar la información de todos los productos (products).
    2. Recuperar la información de un número limitado de productos (products).
    3. Agregar un nuevo producto (product).
    4. Retornar un producto (product) según un “id” como parámetro.
    5. Eliminar un producto (product)  
  =====================================================================================================
*/

const api = require('./api.js');

async function main(){

    // Punto 1
    console.log(await api.getAllProducts());

    // Punto 2
    console.log(await api.getLimitProducts(5));

    // Punto 3
    const nuevoProducto = {
        title: "Men Socks",
        price: 1.50,
        description: 'Featuring a stylish design that pairs effortlessly with everything from jeans to dress pants, these socks are the ultimate in comfort and versatility',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
        rating: { rate: 3.7, count: 150 }
    }
    const nuevoID = await api.createProduct(nuevoProducto);
    console.log(`Producto creado: ${nuevoID.id}`);

    // Punto 4
    console.log(await api.getByIDProducts(18));

    // Punto 5
    const idEliminar = 18
    console.log(`Eliminando ID ${idEliminar}...`)
    const response = await api.delByIdProducts(idEliminar);
    console.log(response.statusText);

}

main();