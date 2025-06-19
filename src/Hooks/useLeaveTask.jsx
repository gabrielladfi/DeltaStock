import { GlobalState } from "@/Context/GlobalContext"
import { useContext, useEffect } from "react"
import { useNavigateProvider } from "./useNavigateProvider"

const useLeaveTask = () => {
    const { setIniciandoProceso, iniciandoProceso, setAbandonandoProceso } = useContext(GlobalState)

    const { navigateToMenu } = useNavigateProvider()

    // Este useEffect se ejecuta cuando se monta el componente y establece que el proceso está iniciando
    useEffect(() => {
        setIniciandoProceso(true)
    }, [])

    // Esta función maneja la navegación al menú principal
    // Si el proceso está iniciando, muestra una alerta de confirmación antes de abandonar
    // Si no está iniciando, navega directamente al menú
    const handlefnmenu = () => {
        if(iniciandoProceso) {
            setAbandonandoProceso(true)
        }else {
            navigateToMenu()
        }
    }

    return {
        handlefnmenu,
    }
}

export default useLeaveTask