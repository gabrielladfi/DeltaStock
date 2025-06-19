import { useState } from "react";
import { serviceDelete } from "../Services/ServicionuevaRadicacion";

// Custom hook para el consumo del servicio PUT
function useFetchDelete(token, url) {
    const [dataDelete, setDataDelete] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchDelete = async (id ,callback) => {
        setLoading(true);
        try {
            const result = await serviceDelete(token, `${url}${id}`); // Ejecuta el servicio
            setDataDelete(result);
            setLoading(false);
            if (callback) callback();
        } catch (err) {
            setError(true);
            console.error('Error al eliminar la data:', err);
            setLoading(false);
        }
    };

    return {
        dataDelete,
        error,
        loading,
        fetchDelete, // Exponer la función para ejecutar el fetch
    };
}

export { useFetchDelete };