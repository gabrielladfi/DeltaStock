import { useContext } from "react";
import { TitularesState } from "../TitularesContext/TitularesContext";

export function useCerraModalNuevoTitular() {

    const { setAgregarNuevoTitular } = useContext(TitularesState);

    function cerrarModalNuevoTitular() {
        setAgregarNuevoTitular(false);
    }

    return{
        cerrarModalNuevoTitular,
    }
}