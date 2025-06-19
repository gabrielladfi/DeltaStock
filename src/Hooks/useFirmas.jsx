import { useDataFirmas } from '@/Store/useDataFirmas';
import { useDataObservacionesFirmas } from '@/Store/useDataFirmasObservacionesStore';
import { 
    dataFirmas, 
    dataFirmasCuradores, 
    dataFirmasAbogados, 
    dataFirmasArquitectos, 
    dataFirmasIngenieros,
    dataTodasLasFirmas
} from "@/Utils/dataObjetoFirmas";

export const useFirmas = () => {
    const { firma, setFirma } = useDataFirmas();
    const { firmas, setFirmas, resetFirmas } = useDataObservacionesFirmas();

    const handleFirmas = ({ target: { value } }) => {
        setFirma(value);  // Reemplaza el estado con el objeto seleccionado
    };

    const handleObservacionesFirmas = ({ target: { value } }) => {
        setFirmas(value);  // Agrega el objeto seleccionado al estado
    }

    return {
        firma,
        handleFirmas,
        dataFirmas,
        dataFirmasCuradores,
        dataFirmasAbogados,
        dataFirmasArquitectos,
        dataFirmasIngenieros,
        dataTodasLasFirmas,
        setFirma,
        firmas,
        handleObservacionesFirmas,
        setFirmas,
        resetFirmas
    };
};
