import { useState } from "react";
import { servicePut } from "../Services/ServicionuevaRadicacion";

// Custom hook para el consumo del servicio PUT
function useFetchPut(token, url, propdataPut) {
    const [dataPut, setDataPut] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchPut = async (id ,callback) => {
        setLoading(true);
        try {
            const result = await servicePut(token, `${url}${id}`, propdataPut); // Ejecuta el servicio
            setDataPut(result);
            setLoading(false);
            if (callback) callback();
        } catch (err) {
            setError(true);
            console.error('Error al actualizar la data:', err);
            setLoading(false);
        }
    };

    return {
        dataPut,
        error,
        loading,
        fetchPut, // Exponer la función para ejecutar el fetch
    };
}

export { useFetchPut };