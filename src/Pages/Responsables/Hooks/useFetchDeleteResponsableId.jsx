import { useContext } from "react";
import { useServiceDelete } from "../../../Hooks/useServiceDelete";
import { urlEliminarResponsablePorId } from "../../../Utils/UrlData";
import { ResponsablesState } from "../ResponsablesContext/ResponsableContext";

export function useFetchDeleteResponsableId() {

    const { fetchDeleteHookid } = useServiceDelete();
    const { setReload } = useContext(ResponsablesState)

    async function fetchDeleteResponsableId(idResponsable) {
        try {
            const data = await fetchDeleteHookid(urlEliminarResponsablePorId, idResponsable); // Ejecuta el servicio 
            setReload(state => !state);
            console.log('Responable eliminado con exito:', data);
        } catch (err) {
            console.error(err.message);
        }
    }

    return {
        fetchDeleteResponsableId,
    }
}