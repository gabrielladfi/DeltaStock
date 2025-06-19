import { useState, useEffect, useCallback } from "react";
import { serviceGet } from "../Services/ServicionuevaRadicacion";

// Custom hook para el consumo del servicio getAllUsers y el userAdapter
function useFetchGet(token, url, dato) {
    const [dataGet, setDataGet] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchGet = useCallback(async (signal) => {
        setLoading(true);
        try {
            const result = await serviceGet(token, url, dato, signal); // Ejecuta el servicio
            setDataGet(result);
            setLoading(false);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Fetch abortado');
            } else {
                setError(true);
                console.error('Error al obtener la data:', err);
            }
            setLoading(false);
        }
    }, [token, url, dato]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchGet(signal);

        // Cleanup function to abort the fetch when the component unmounts
        return () => {
            controller.abort();
        };
    }, [fetchGet]);

    const refetchGet = () => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetchGet(signal);
    };

    return {
        dataGet,
        error,
        loading,
        refetchGet, // Exponer la función para volver a ejecutar el fetch
    };
}

export { useFetchGet };