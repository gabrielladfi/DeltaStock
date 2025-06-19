/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { getNumeroRadicacion } from '../../../Utils/manejoLocalStorageNumeroRadicacion';

const ProcedentesJuridicosState = createContext();

function ProcedentesJuridicosProvider({ children }) {

  const numeroRadicacion = getNumeroRadicacion();
  const [procedenteJuridicoId, setProcedenteJuridicoId] = useState(null);

  const procedenteJuridico = 'De conformidad con el Decreto 1469 de 2010, compilado en el Decreto 1077 de 2015, en concordancia con la resolución 1025 de 2021 y demás normas complementarias, se emiten Procedente Jurídico.'

    const dataInicial =  {
        numero_radicacion: numeroRadicacion,
        procedente_juridico: procedenteJuridico
    }

    const [ procedenteJuridicoPut, setProcedenteJuridicoPut ] = useState(dataInicial);

    const [ reload, setReload ] = useState(false);

  return (
    <ProcedentesJuridicosState.Provider value={{
        setProcedenteJuridicoId,
        procedenteJuridicoId,
        procedenteJuridicoPut,
        setProcedenteJuridicoPut,
        reload,
        setReload
    }}>
      {children}
    </ProcedentesJuridicosState.Provider>
  );
}

export { ProcedentesJuridicosState, ProcedentesJuridicosProvider };
