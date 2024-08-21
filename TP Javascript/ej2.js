/*
  =======================================================================================
    UNER - PROGRAMACIÓN III - TP 1 - Repaso JS
    GRUPO: Luis Sanchez - José Battaglia - Cristian Seltenreich - Silvana Zalazar
  =======================================================================================
    Ejercicio 2
    """""""""""
    1. Recuperar la información de todos los productos (products).
    2. Recuperar la información de un número limitado de productos (products).
    3. Agregar un nuevo producto (product).
    4. Retornar un producto (product) según un “id” como parámetro.
    5. Eliminar un producto (product)  
  ======================================================================================
*/

const axios = require("axios");

const API_URL = "https://fakestoreapi.com/products";

//1)
async function getAllProducts() {
  try {
    const response = await axios.get(API_URL);
    console.log("Todos los productos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al recuperar todos los productos:", error);
  }
}

// 2)
async function getLimitedProducts(limit) {
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}`);
    console.log(`Los primeros ${limit} productos:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al recuperar los primeros ${limit} productos:`, error);
  }
}

// 3)
async function addNewProduct(newProduct) {
  try {
    const response = await axios.post(API_URL, newProduct);
    console.log("Producto agregado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el nuevo producto:", error);
  }
}

// 4)
async function getProductById(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(`Producto con ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al recuperar el producto con ID ${id}:`, error);
  }
}

// 5)
async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log(`Producto con ID ${id} eliminado:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
  }
}

// Ejecución de las funciones:
async function main() {
  // 1. Recupera todos los productos
  await getAllProducts();

  // 2. Recupera un número limitado de productos (ej. 5)
  await getLimitedProducts(5);

  // 3. Agrega un nuevo producto
  const newProduct = {
    title: "New Product",
    price: 29.99,
    description: "A description of the new product",
    image: "https://example.com/new-product.jpg",
    category: "electronics",
  };
  await addNewProduct(newProduct);

  // 4. Recupera un producto por ID
  await getProductById(1);

  // 5. Elimina un producto por ID
  await deleteProduct(1);
}

main();
