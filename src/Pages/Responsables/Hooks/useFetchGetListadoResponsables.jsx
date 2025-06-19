import { useContext, useEffect, useState } from "react";
import { useServicesGet } from "../../../Hooks/useServicesGet";
import { ResponsablesState } from "../ResponsablesContext/ResponsableContext";
import { urlGetObtenerListadoResponsables } from '../../../Utils/UrlData';
import { getNumeroRadicacion } from "../../../Utils/manejoLocalStorageNumeroRadicacion";

export function useFetchGetListadoResponsables() {

    const numeroRadicacion = getNumeroRadicacion();

    console.log('numeroRadicacion:', numeroRadicacion);

    const { fetchGetHook } = useServicesGet();
    const { reload } = useContext(ResponsablesState);

    const [ listadoResponsables, setListadoResponsables ] = useState([]);

    async function obtenerListadoResponsables() {
        const DataListadoResponsables =  await fetchGetHook(urlGetObtenerListadoResponsables, numeroRadicacion);
        try {
            setListadoResponsables(DataListadoResponsables);
        }catch(err) {
            console.log('error no logramos obtener el listado de Responsables:', err);
        }
    }

    useEffect(() => {
        obtenerListadoResponsables();
    }, [reload]);

    return {
        listadoResponsables,
    }
}