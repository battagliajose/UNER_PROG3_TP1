let url="https://thronesapi.com/api/v2";

async function obtenerPersonajes(){
    try {
        const response = await fetch(`${url}/characters`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Hubo un error:", error);
    }
}

obtenerPersonajes();