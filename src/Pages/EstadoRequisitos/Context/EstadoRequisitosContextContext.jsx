/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const EstadoRequisitosContextState = createContext();

function EstadoRequisitosContextProvider({ children }) {

  const [ agregarNuevoRequsito, setAgregarNuevoRequisito ] = useState(false);
  const [ registrarNuevoIngreso, setRegistrarNuevoIngreso ] = useState(false);
  const [ reload, setReload] = useState(false)
  const [ generarValla, setGenerarValla ] = useState(false);

  const valorInicialDelRequisito = {
      "numero_radicacion": '',
      "requisito_title": '',
      "descripcion": '',
      "fecha_creacion": '',
      "ultima_modificacion": '',
      "descripcion_pendiente": '',
      "is_pending": ''
  }

  const [ dataNuevoRequisito, setDataNuevoRequisito ] = useState(valorInicialDelRequisito);

  return (
    <EstadoRequisitosContextState.Provider value={{
      agregarNuevoRequsito,
      setAgregarNuevoRequisito,
      dataNuevoRequisito, 
      setDataNuevoRequisito,
      reload, 
      setReload,
      registrarNuevoIngreso,
      setRegistrarNuevoIngreso,
      generarValla, 
      setGenerarValla
    }}>
      {children}
    </EstadoRequisitosContextState.Provider>
  );
}

export { EstadoRequisitosContextState, EstadoRequisitosContextProvider };
