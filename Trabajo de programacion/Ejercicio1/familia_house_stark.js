const fs = require('fs');

function leer_y_buscar(casa){

   fs.readFile('./personajes.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('Error al leer el archivo:', err);
    return;
  }
  try {
      const data = JSON.parse(jsonString);
      buscarFamilia(casa,data);
    } catch (err) {
    console.log('Error al parsear JSON:', err);
  }
})
}

function buscarFamilia(casa,data){
    
    let familia=data.filter(f =>f.family===casa);            
    console.log(familia);
}


leer_y_buscar("House Stark");

