
import { useContext, useEffect, useState } from 'react';
import { getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion';
import './dropdowndocumentosrevisados.scss'
import { useFetchPost } from '../../../../Hooks/useFetchPost';
import { AuthContextState } from '../../../../Context/AuthContextContext';
import { urlBase, urlCrearDocumentoRevisado } from '../../../../Utils/UrlData';
import { ProcedentesJuridicosState } from '../../Context/ProcedentesJuridicosContext';

function DropdownDocumentosRevisados() {

    const numeroRadicacion = getNumeroRadicacion();
    const { token } = useContext(AuthContextState);
    const { setReload } = useContext(ProcedentesJuridicosState);


    

    const options = [
        {id: 0, documento: 'Acta Asamblea Copropietarios'},
        {id: 1, documento: 'Acta Posesión'},
        {id: 2, documento: 'Área y Linderos'},
        {id: 3, documento: 'Boletín de Nomenclatura'},
        {id: 4, documento: 'Certificado de Tradición'},
        {id: 5, documento: 'Certificación VIS'},
        {id: 6, documento: 'Certificado de Existencia y Representación Legal'},
        {id: 7, documento: 'Certificado de Fidecomitente'},
        {id: 8, documento: 'Certificado de Libertad y Tradición'},
    ]

    const initialSelectValue = {
        numero_radicacion: numeroRadicacion,
        nombre_documento: "",
        mostrar: true
    }

    const [selectValue, setSelectValue] = useState(initialSelectValue);

    function handleSelectChange(e) {
        console.log(e.target.value);
        setSelectValue({
            ...selectValue,
            nombre_documento: e.target.value
        })
    }

    const { fetchPost, loading } = useFetchPost(token, `${urlBase}${urlCrearDocumentoRevisado}`, selectValue);

    async function handleFetchPost() {
        await fetchPost();
        setReload(state => !state);
    }

    useEffect(() => {
        handleFetchPost();
    }, [selectValue])

    console.log(selectValue);

    console.log(loading);

    return (
        
        <div className='dropdown-documentos-revisados'>
            <div className='dropdown-documentos-revisados__header'>
                <div className='dropdown-documentos-revisados__header__div-one'><span className='dropdowndocumentosrevisados-span'>Agregar Documento Revisado</span></div>
            </div>
            <div className='dropdown-documentos-revisados__select dropdown-documentos-revisados__select--modificador'>
                <div className='dropdown-documentos-revisados__select__div-one'>
                    <select onChange={handleSelectChange} className='dropdowndocumentosrevisados-select' name="" id="">
                        <option selected value="">Selecciona un Documento</option>
                        {options?.map((option) => (
                            <option key={option.id} value={option.documento}>{option.documento}</option>
                        ))}
                    </select>
                </div>
            </div>
            {
                
                loading ? <div className='dropdown-documentos-revisados__loader'>Creando Documento Revisado...</div> : null
            }
        </div>
    )
}

export default DropdownDocumentosRevisados
