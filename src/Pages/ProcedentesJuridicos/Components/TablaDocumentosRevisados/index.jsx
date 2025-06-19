import { useContext, useState, useEffect } from 'react';
import { useFetchGet } from '../../../../Hooks/useFetchGet';
import './tabladocumentosrevisados.scss';
import { AuthContextState } from '../../../../Context/AuthContextContext';
import { urlBase, urlGetListadoDocumentosRevisados, urlActualizarDocumentoRevisado } from '../../../../Utils/UrlData';
import { getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion';
import { useFetchPut } from '../../../../Hooks/useFetchPut';
import { useFetchDelete } from '../../../../Hooks/useFetchDelete';
import { ProcedentesJuridicosState } from '../../Context/ProcedentesJuridicosContext';
import { ChevronDownIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

function TablaDocumentosRevisados() {
    const { token } = useContext(AuthContextState);
    const numeroRadicacion = getNumeroRadicacion();
    const { reload } = useContext(ProcedentesJuridicosState);
    
    const [ id, setId ] = useState(null);

    const { dataGet, refetchGet } = useFetchGet(token, `${urlBase}${urlGetListadoDocumentosRevisados}`, numeroRadicacion);

    console.log(dataGet);

    const options = [
        { id: 0, documento: 'Acta Asamblea Copropietarios' },
        { id: 1, documento: 'Acta Posesión' },
        { id: 2, documento: 'Área y Linderos' },
        { id: 3, documento: 'Boletín de Nomenclatura' },
        { id: 4, documento: 'Certificado de Tradición' },
        { id: 5, documento: 'Certificación VIS' },
        { id: 6, documento: 'Certificado de Existencia y Representación Legal' },
        { id: 7, documento: 'Certificado de Fidecomitente' },
        { id: 8, documento: 'Certificado de Libertad y Tradición' },
    ];

    const initialSelectValue = {
        numero_radicacion: numeroRadicacion,
        nombre_documento: '',
        mostrar: true
    };

    const [selectValue, setSelectValue] = useState(initialSelectValue);
    
  
    const { fetchPut } = useFetchPut(token, `${urlBase}${urlActualizarDocumentoRevisado}`, selectValue);

    const handleChange = (event, id) => {
        setId(id);
        setSelectValue({
            ...selectValue,
            nombre_documento: event.target.value,
        });
        
    };

    useEffect(() => {
        fetchPut(id, refetchGet);
    }, [id])

    const handleCheckboxChange = (event, id) => {
        setId(id);
        const newCheckedValue = event.target.checked;
        const findById = dataGet.find((item) => item.id === id);
        findById.mostrar = newCheckedValue;
        
        setSelectValue(findById);
        fetchPut(id, refetchGet);
        
    };

    const { fetchDelete } = useFetchDelete(token, `${urlBase}${urlActualizarDocumentoRevisado}`);

    async function handlefetchDelete(id) {
        await fetchDelete(id, refetchGet);
    }

    useEffect(() => {
        refetchGet();
    }, [reload]);

    return (
        <div className='tabladocumentosrevisados'>
            <table className='tabladocumentosrevisados__table'>
                <thead className='tabladocumentosrevisados__table__thead'>
                    <tr className='tabladocumentosrevisados__table__thead__tr'>
                        <th className='tabladocumentosrevisados__table__thead__tr__th-one '>Documentos Revisados</th>
                        <th className='tabladocumentosrevisados__table__thead__tr__th-two '>¿Agregar?</th>
                        <th className='tabladocumentosrevisados__table__thead__tr__th-two '>Eliminar</th>
                    </tr>
                </thead>

                <tbody className='tabladocumentosrevisados__table__tbody'>
                    {dataGet?.map((item, index) => (
                        <tr className='tabladocumentosrevisados__table__tbody__tr' key={index}>
                            <td className='tabladocumentosrevisados__table__tbody__tr__td-one'>
                                <select
                                    className='tabladocumentosrevisados__table__tbody__tr__td-one__select'
                                    value={ item.nombre_documento || '' }   
                                    onChange={(e) => handleChange(e, item.id)}
                                >
                                    <option value={item.nombre_documento}>{item.nombre_documento}</option>
                                    {options.map((option) => (
                                        <option key={option.id} value={option.documento}>
                                            {option.documento}
                                        </option>
                                    ))}
                                </select>
                                
                            </td>
                            <td className='tabladocumentosrevisados__table__tbody__tr__td-two'>
                                
                                <input 
                                    className='checkbox-input-dr'
                                    type="checkbox" 
                                    checked={item.mostrar === true}
                                    onChange={(e) => handleCheckboxChange(e, item.id)}
                                    value={item.mostrar}
                                />
                            </td>
                            <td className='tabladocumentosrevisados__table__tbody__tr__td-two'>
                                <button className='button-dr-delete' onClick={() => handlefetchDelete(item.id)}><XMarkIcon className='icon-trash-dr' /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaDocumentosRevisados;