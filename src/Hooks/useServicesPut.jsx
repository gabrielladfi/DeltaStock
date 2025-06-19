import { useContext } from "react";
import { AuthContextState } from "../Context/AuthContextContext";
import { putActualizarEstadoRequisito, servicePut } from '../Services/ServicionuevaRadicacion';

function useServicesPut() {

    const { token } = useContext(AuthContextState);

    const fetchPutActualizarEstadoRequisito = async (idRequisito, dataComunicado) => {
            if (!token) {
                throw new Error('El token no está disponible.');
              }
          
              if (!dataComunicado || Object.keys(dataComunicado).length === 0) {
                throw new Error('Los datos del cliente son inválidos.');
              }
            try {
                const data = await putActualizarEstadoRequisito(token, idRequisito, dataComunicado); // Llama al service
                console.log('predio:', dataComunicado);
                return data;
              
            } catch (err) {
              console.error(err)
            }
    
          };

          const fetchPutHook = async ( url, identificador, data ) => {
            if (!token) {
                throw new Error('El token no está disponible.');
              }
          
              if (!data || Object.keys(data).length === 0) {
                throw new Error('Los datos del cliente son inválidos.');
              }
            try {
                const data = await servicePut(token, url, identificador, data); // Llama al service
                console.log('data del fetch put:', data);
                return data;
              
            } catch (err) {
              console.error(err)
            }
    
          };





    return{
        fetchPutActualizarEstadoRequisito,
        fetchPutHook
    }
}

export { useServicesPut } 