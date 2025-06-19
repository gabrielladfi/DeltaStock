import { useContext, useEffect, useState } from "react";
import { useServicesGet } from "../../../Hooks/useServicesGet";
import { TitularesState } from "../TitularesContext/TitularesContext";
import { urlGetObtenerListadoTitulares } from '../../../Utils/UrlData';
import { getNumeroRadicacion } from "../../../Utils/manejoLocalStorageNumeroRadicacion";

export function useFetchGetListadoTitulares() {

    const numeroRadicacion = getNumeroRadicacion();

    console.log('numeroRadicacion:', numeroRadicacion);

    const { fetchGetHook } = useServicesGet();
    const { reload } = useContext(TitularesState);

    const [ listadoTitulares, setListadoTitulares ] = useState([]);

    async function obtenerListadoTitulares() {
        const DataListadoTitulares =  await fetchGetHook(urlGetObtenerListadoTitulares, numeroRadicacion);
        try {
            setListadoTitulares(DataListadoTitulares);
        }catch(err) {
            console.log('error no logramos obtener el listado de titulares:', err);
        }
    }

    useEffect(() => {
        obtenerListadoTitulares();
    }, [reload]);

    return {
        listadoTitulares,
    }
}