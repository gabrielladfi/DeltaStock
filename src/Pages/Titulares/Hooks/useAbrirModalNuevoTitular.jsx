import { useContext } from "react";
import { TitularesState } from "../TitularesContext/TitularesContext";

export function useAbrirModalNuevoTitular() {

    const { setAgregarNuevoTitular } = useContext(TitularesState);

    function abrirModalNuevoTitular() {
        setAgregarNuevoTitular(true);
    }


    return {
        abrirModalNuevoTitular,
    }
}