import { useState } from 'react';
import { servicePost } from './globalServiceHTTP';

/**
 * Hook personalizado para realizar peticiones POST
 * 
 * Este hook:
 * - Maneja el estado de carga, datos y errores de la petición POST
 * - Proporciona una función executePost para realizar peticiones bajo demanda
 * - Mantiene el estado de la última petición realizada
 * - Utiliza el servicio servicePost para realizar las peticiones HTTP
 * 
 * @returns {Object} Objeto con estados data, loading, error y función executePost
 */
export const useServicePost = () => {
    // Estados para manejar los datos, loading y errores
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Función para ejecutar una petición POST
     * @param {string} token - Token de autenticación
     * @param {string} url - URL del endpoint
     * @param {object} postData - Datos a enviar en el body
     * @param {AbortSignal} signalAbort - Señal para cancelar la petición
     * @returns {Promise} Resultado de la petición POST
     */
    const executePost = async (token, url, postData, signalAbort) => {
        try {
            setLoading(true); // Indica que está cargando
            setError(null); // Resetea errores anteriores
            const result = await servicePost(token, url, postData, signalAbort);
            setData(result); // Almacena la respuesta
            return result;
        } catch (err) {
            setError(err.message); // Captura y almacena el error
            throw err; // Re-lanza el error para manejo externo
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    // Retorna un objeto con los estados y la función executePost
    return { 
        data, 
        loading, 
        error, 
        executePost 
    };
};