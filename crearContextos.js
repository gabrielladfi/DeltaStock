/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';

// Función para crear el contexto de React
function crearContexto(nombre, rutaDestino) {
 // eslint-disable react/prop-types //
  const contexto = `
import { createContext } from 'react';

const ${nombre}State = createContext();

function ${nombre}Provider({ children }) {
  return (
    <${nombre}State.Provider value={{}}>
      {children}
    </${nombre}State.Provider>
  );
}

export { ${nombre}State, ${nombre}Provider };
`;

  // Crear la carpeta si no existe
  if (!fs.existsSync(rutaDestino)) {
    fs.mkdirSync(rutaDestino, { recursive: true });
  }

  // Crear el archivo `index.jsx` en la ruta proporcionada
  fs.writeFile(path.join(rutaDestino, `${nombre}Context.jsx`), contexto, (err) => {
    if (err) {
      console.error('Error al crear el contexto:', err);
    } else {
      console.log(`Contexto ${nombre} creado exitosamente en ${rutaDestino}!`);
    }
  });
}

// Obtener el nombre del contexto y la ruta desde los argumentos de la línea de comandos
const nombreContexto = process.argv[2]; // Primer argumento: nombre del contexto
const rutaDestino = process.argv[3] || './src/contexts'; // Segundo argumento: ruta destino (por defecto es './src/contexts')

if (nombreContexto) {
  crearContexto(nombreContexto, rutaDestino);
} else {
  console.log('Por favor, proporciona un nombre de contexto.');
}
