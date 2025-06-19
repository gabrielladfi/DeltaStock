import { useContext } from "react";
import { useServicesPost } from "../../../Hooks/useServicesPost";
import { urlPostNuevoTitular } from "../../../Utils/UrlData";
import { TitularesState } from "../TitularesContext/TitularesContext";

export function useFetchPostNuevoTitular() {

    const { fetchPostGlobal} = useServicesPost();
    const { setReload, setAgregarNuevoTitular } = useContext(TitularesState);

    async function fetchPostNuevoTitular(dataNuevoTitular) {
        const respuesta = await fetchPostGlobal(urlPostNuevoTitular, dataNuevoTitular);
        try {
            setReload(state => !state);
            setAgregarNuevoTitular(false);
            console.log('titular creado con exito:', respuesta);
        }catch(err) {
            console.error('Error al crear el nuevo titular', err);
        }
    }

    return {
        fetchPostNuevoTitular
    }
}