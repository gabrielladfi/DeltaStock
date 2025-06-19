import { useState, useEffect } from 'react';
import { serviceGet } from './globalServiceHTTP';

/**
 * Hook personalizado para realizar peticiones GET
 * 
 * Este hook:
 * - Maneja el estado de carga, datos y errores de la petición
 * - Realiza la petición automáticamente al montar el componente
 * - Permite refrescar los datos manualmente
 * - Utiliza el servicio serviceGet para realizar las peticiones HTTP
 * 
 * @param {string} token - Token de autenticación para la petición
 * @param {string} url - URL del endpoint a consultar
 * @param {AbortSignal} signalAbort - Señal para cancelar la petición
 * @returns {Object} Objeto con los estados data, loading, error y función refresh
 */
export const useServiceGet = (token, url, signalAbort) => {
    // Estados para manejar los datos, loading y errores
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efecto que se ejecuta al montar el componente y cuando cambian las dependencias
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Indica que está cargando
                setError(null); // Resetea errores anteriores
                const result = await serviceGet(token, url, signalAbort);
                setData(result); // Almacena los datos recibidos
            } catch (err) {
                setError(err.message); // Captura y almacena el error
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchData();
    }, [token, url, signalAbort]);

    /**
     * Función para refrescar manualmente los datos
     * Utiliza la misma lógica que el efecto inicial
     */
    const refresh = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await serviceGet(token, url, signalAbort);
            setData(result);
        } catch (err) {
            setError(err.message); 
        } finally {
            setLoading(false);
        }
    };

    // Retorna un objeto con los estados y la función de refresh
    return { data, loading, error, refresh };
};