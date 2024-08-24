const fs = require('fs').promises;

const fetch = require('node-fetch'); 
const path = require('path');
const notifier = require('node-notifier');

const iconPath = path.join(__dirname, 'assets', 'archivo.png');

const url = "https://thronesapi.com/api/v2/Characters";

function pasar_json_personajes() {
    //funcion que retorna una promesa
    // lleva dos parametros de resolucion y rechazo
  return new Promise((resolve, reject) => {
    //control de respuesta
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error de servidor: ${response.status}`);
        }     
        return response.json(); 
      })
      //si no hubo inconveniente obtenemos los datos. Donde resolve tiene los datos finales y sino rechazo obtiene el error
      .then(data => {
        console.log('Datos recibidos:', data);
        resolve(data);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

//se emplea la funcion promesa por eso el uso del .then
pasar_json_personajes().then(data => {  
    try {
        //escribo en archivo
        fs.writeFile('./personajes.json', JSON.stringify(data, null, 2));
        //informo por consola
        console.log('Datos guardados en personajes.json');
        //notifico por windows
         notifier.notify({
          title: 'Operación Completada',
          message: 'Los datos han sido guardados exitosamente.',
          icon: iconPath , 
          sound: true, 
          wait: true 
        });
    } catch (error) {
        notifier.notify({
            title: 'La operacion no se realizo',
            message: 'Los datos no fueron guardados',
            icon: iconPath , 
            sound: true, 
            wait: true 
          });
    }

  
}).catch(error => {
  console.error("Fallo para capturar los datos del personaje:", error);
});

 