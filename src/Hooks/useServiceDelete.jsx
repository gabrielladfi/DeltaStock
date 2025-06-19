import { useContext } from 'react';
import { deleteVecinosColindanteId, deleteRequisitoId, deletePredioId, servicioDeleteGlobalId } from '../Services/ServicionuevaRadicacion'
import { AuthContextState } from '../Context/AuthContextContext';

function useServiceDelete() {

    const { token } = useContext(AuthContextState);
    //eliminar vecino colindante por id
    const fetchEliminarVecinoPorId = async (idVecino) => {
        try {
            const data = await deleteVecinosColindanteId(token, idVecino); // Ejecuta el servicio 
            console.log('Vecino eliminado con exito:', data);
        } catch (err) {
            console.error(err.message);
        }
      };

      //Servicio para eliminar requisitos por id
      const fetchEliminarRequisitoPorId = async (idRequisito) => {
        try {
            const data = await deleteRequisitoId(token, idRequisito); // Ejecuta el servicio 
            console.log('Requisito eliminado con exito:', data);
        } catch (err) {
            console.error(err.message);
        }
      };

      //Fetch para eliminar predios por id
      const fetchEliminarPredioPorId = async (idPredio) => {
        try {
            const data = await deletePredioId(token, idPredio); // Ejecuta el servicio 
            console.log('Predio eliminado con exito:', data);
        } catch (err) {
            console.error(err.message);
        }
      };

      //Fetch para eliminar predios por id
      const fetchDeleteHookid = async (urlDelete, id) => {
        try {
            const dataDelete = await servicioDeleteGlobalId(token, urlDelete, id); // Ejecuta el servicio 

            console.log('elemento eliminado con exito:', dataDelete);
        } catch (err) {
            console.error(err.message);
        }
      };


    return{
        fetchEliminarVecinoPorId,
        fetchEliminarRequisitoPorId,
        fetchEliminarPredioPorId,
        fetchDeleteHookid,
    }
}

export { useServiceDelete };