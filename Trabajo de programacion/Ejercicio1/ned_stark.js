let url="https://thronesapi.com/api/v2";

function obtenerNedStark(id){
    fetch(`${url}/Characters/${id}`)
        .then(response=>response.json())
        .then(data=>console.log(data))
        .catch(error=>console.error('Error:', error));
    }

obtenerNedStark(6);

