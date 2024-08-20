//importo fileSystem
const fs = require('fs');

// Defino la URL de la API a consultar
const urlApi = ('https://thronesapi.com/api/v2/Characters');

//función para recuperar todos los datos de los personajes de la API
//2. Realizar una función que permita recuperar todos los personajes disponibles.
async function recuperarDatos() {
    try {
        const respuesta = await fetch(urlApi)
        if (!respuesta.ok) {
            throw new Error("Error", respuesta.status)
            // Si no fue exitosa, lanzo un error con el estado de la              
            //respuesta y sale del then, pasando el control al catch
        }
        const datos = await respuesta.json();
        //console.log(datos)    
        return datos
    }
    catch (error) {
        console.log(error)
    }
}



//1. Realizar una función que permita recuperar la información del personaje “Ned Stark”.
// lo resuelvo con la función mostrar datos creada recuperarDatos y filtrando solo
//el personaje buscado
/*
recuperarDatos()
    .then(datos => {
        if (datos) {
            let personajeBuscado = "Ned Stark";
            let recuperarPersonajeNombre =datos.filter(dato => dato.fullName === personajeBuscado);
            console.log(recuperarPersonajeNombre);
        }
})
    .catch(error => {
        console.error("Ocurrió un error al manejar los datos:", error); // Manejo de errores en la promesa
    });
*/


//3. Persistir el resultado de la segunda consulta localmente en un archivo JSON.

//traigo todos los datos recuperados solicitados en el punto 2 - function recuperarDatos() -
recuperarDatos()
    .then(datos => {
        if (datos) {
            //muestro los datos por pantalla
            //console.log(datos);            
            //Escribir de nuevo el archivo para hacer permanentes los cambios
            fs.writeFileSync("./personajes.json", JSON.stringify(datos, null, 4))
            console.log("se guardaron los datos de los personajes en personajes.json");


            //4. lectura de un archivo local
            const lecturaArchivoJson = fs.readFileSync("./personajes.json", "utf8");

            //convierto al archivo guardodo en formato json a formato objeto de js para
            //poder manipularlo con javascript
            let personajes = JSON.parse(lecturaArchivoJson);


            //a) Mostrar por consola los personajes de la familia Stark. Es decir: “family” = “House Stark”
            //defino familia y luego aplico el filter con esa variable para filtar solo los que coincidan con ese criterio

            let familia = 'House Stark';
            let personajesFamilia = personajes
                .filter(personaje => personaje.family == familia)
                .map(personaje => personaje.fullName);    //agrego un map para mostrar solo los nombres
            console.log(`Los personajes de la familia ${familia}`);
            console.log(personajesFamilia);


            //  b) Agregar un nuevo personaje y sobrescribir el archivo original
            //Omar Larrosa jugadorazo, campeón del mundo 1978
            const nuevoPersonaje = {
                "id": 53,
                "firstName": "Omar Rubén",
                "lastName": "Larrosa",
                "fullName": "Omar Rubén Larrosa",
                "title": "Prócer de Boca",
                "family": "Boca Juniors",
                "image": "larrosa.jpg",
                "imageUrl": "https://i.pinimg.com/originals/98/16/6c/98166c8e3eb2a7f67b1ad8cf9eaa24e1.jpg"
            }
            //al nuevo personaje lo agrego nuevo a mi array de personajes
            personajes.push(nuevoPersonaje);

            // muestro en pantalla mi objeto personajes
            //console.log(personajes);

            // convierto el objeto JavaScritp en una cadena de texto en formato JSON
            //agrego null, 4 para indentar con espaciado de 4 caracteres

            const personajeCadena = JSON.stringify(personajes, null, 4);
            //console.log(personajeCadena); //muestro mi cadena de texto json

            // guardo el personaje en mi archivo (sobreescribo el archivo anterior)
            fs.writeFileSync('./personajes.json', JSON.stringify(personajes, null, 4));
            console.log("Se actualizaron los datos de los personajes en personajes.json");



            // c) Eliminar los personajes cuyo ID sean mayores a 25 y 
            //sobrescribir el archivo original
  
            // Filtrar los personajes con ID mayor a 25
            let personajesMayoresID25 = personajes.filter(personaje => personaje.id > 25);
            //console.log(personajesMayoresID25);
            
            // Sobreescribir el archivo con los personajes filtrados
            fs.writeFileSync('./personajes.json', JSON.stringify(personajesMayoresID25, null, 4));
            console.log("Se eliminaron los personajes con ID mayor a 25 y se actualizó personajes.json")
            
            //comprobación temporal del archivo escrito
            //let lecturaArchivoTemp = fs.readFileSync("./personajes.json", "utf8");
            //console.log(lecturaArchivoTemp);

           

        }
    })
    .catch(error => {
        console.error("Ocurrió un error al manejar los datos:", error); // Manejo de errores en la promesa
    });
