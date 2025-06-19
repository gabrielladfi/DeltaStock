import { useState } from 'react';
import { servicePut } from './globalServiceHTTP';

/**
 * Hook personalizado para realizar peticiones PUT
 * 
 * Este hook:
 * - Maneja el estado de carga, datos y errores de la petición PUT
 * - Proporciona una función executePut para realizar peticiones bajo demanda
 * - Mantiene el estado de la última petición realizada
 * - Utiliza el servicio servicePut para realizar las peticiones HTTP
 * 
 * @returns {Object} Objeto con estados data, loading, error y función executePut
 */
export const useServicePut = () => {
    // Estados para manejar los datos, loading y errores
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Función para ejecutar una petición PUT
     * @param {string} token - Token de autenticación
     * @param {string} url - URL del endpoint
     * @param {object} putData - Datos a actualizar
     * @param {AbortSignal} signalAbort - Señal para cancelar la petición
     * @returns {Promise} Resultado de la petición PUT
     */
    const executePut = async (token, url, putData, signalAbort) => {
        try {
            setLoading(true); // Indica que está cargando
            setError(null); // Resetea errores anteriores
            const result = await servicePut(token, url, putData, signalAbort);
            setData(result); // Almacena la respuesta
            return result;
        } catch (err) {
            setError(err.message); // Captura y almacena el error
            throw err; // Re-lanza el error para manejo externo
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    // Retorna un objeto con los estados y la función executePut
    return { 
        data, 
        loading, 
        error, 
        executePut 
    };
};