/**
 * Componente principal de la aplicación que configura el enrutamiento y los proveedores de contexto
 * 
 * Funcionalidad:
 * - Configura el enrutador principal usando BrowserRouter de react-router-dom
 * - Establece los proveedores de contexto para autenticación y estado global
 * - Renderiza las rutas de la aplicación a través del hook useRoutesProvider
 * 
 * Estructura:
 * - BrowserRouter: Habilita el enrutamiento en la aplicación
 * - AuthContextProvider: Provee el contexto de autenticación (tokens, estado de login)
 * - GlobalProvider: Provee el estado global compartido de la aplicación
 * - AppRoutes: Componente que contiene todas las rutas definidas
 */

import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from '../Context/GlobalContext'
import './App.scss'
import { useRoutesProvider } from '../Hooks/useRoutesProvider'
import { AuthContextProvider } from '../Context/AuthContextContext'

function App() {
    // Obtiene el componente de rutas desde el hook personalizado
    const { AppRoutes } = useRoutesProvider()

    return (
        <>
            <BrowserRouter>
                <AuthContextProvider>
                    <GlobalProvider>
                        <AppRoutes />
                    </GlobalProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </>
    )
}

export default App
