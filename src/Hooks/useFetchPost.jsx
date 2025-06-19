import { useState } from "react";
import { servicePost } from "../Services/ServicionuevaRadicacion";

// Custom hook para el consumo del servicio PUT
function useFetchPost(token, url, propdataPost) {
    const [dataPost, setDataPost] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchPost = async (callback) => {
        setLoading(true);
        try {
            const result = await servicePost(token, url, propdataPost); // Ejecuta el servicio
            setDataPost(result);
            setLoading(false);
            if (callback) callback();
            return result;
        } catch (err) {
            setError(true);
            console.error('Error al actualizar la data:', err);
            setLoading(false);
        }
    };

    return {
        dataPost,
        error,
        loading,
        fetchPost, // Exponer la función para ejecutar el fetch
    };
}

export { useFetchPost };