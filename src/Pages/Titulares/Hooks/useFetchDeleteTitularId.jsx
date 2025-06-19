import { useContext } from "react";
import { useServiceDelete } from "../../../Hooks/useServiceDelete";
import { urlEliminarTitularPorId } from "../../../Utils/UrlData";
import { TitularesState } from "../TitularesContext/TitularesContext";

export function useFetchDeleteTitularId() {

    const { fetchDeleteHookid } = useServiceDelete();
    const { setReload } = useContext(TitularesState)

    async function fetchDeleteTitularId(idTitular) {
        try {
            const data = await fetchDeleteHookid(urlEliminarTitularPorId, idTitular); // Ejecuta el servicio 
            setReload(state => !state);
            console.log('Titular eliminado con exito:', data);
        } catch (err) {
            console.error(err.message);
        }
    }

    return {
        fetchDeleteTitularId,
    }
}