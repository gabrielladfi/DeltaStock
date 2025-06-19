import { useContext } from "react";
import { useServicesPost } from "../../../Hooks/useServicesPost";
import { urlPostNuevoResponsable } from "../../../Utils/UrlData";
import { ResponsablesState } from "../ResponsablesContext/ResponsableContext";

export function useFetchPostNuevoResponsables() {

    const { fetchPostGlobal} = useServicesPost();
    const { setReload, setAgregarNuevoResponsable } = useContext(ResponsablesState);

    async function fetchPostNuevoResponsable(dataNuevoResponsable) {
        const respuesta = await fetchPostGlobal(urlPostNuevoResponsable, dataNuevoResponsable);
        try {
            setReload(state => !state);
            setAgregarNuevoResponsable(false);
            console.log('Responsable creado con exito:', respuesta);
        }catch(err) {
            console.error('Error al crear el nuevo Responsable', err);
        }
    }

    return {
        fetchPostNuevoResponsable
    }
}