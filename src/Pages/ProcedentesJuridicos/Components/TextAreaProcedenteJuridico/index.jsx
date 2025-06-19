import { useContext } from 'react';
import './textareaprocedentejuridico.scss'
import { ProcedentesJuridicosState } from '../../Context/ProcedentesJuridicosContext';
import { handleInputChange } from '../../../../Utils/handleInputs';

function TextAreaProcedenteJuridico() {

    const { procedenteJuridicoPut, setProcedenteJuridicoPut } = useContext(ProcedentesJuridicosState);
    
    console.log(procedenteJuridicoPut);

    return (
        <div className='textareaprocedentejuridico-container'>
            <label className='textareaprocedentejuridico-container__label' htmlFor="">Procedente Juridíco</label>
            <textarea 
                onChange={(e) => handleInputChange(e, setProcedenteJuridicoPut, procedenteJuridicoPut)} 
                className='textareaprocedentejuridico-container__text-area' 
                value={procedenteJuridicoPut.procedente_juridico} 
                name="procedente_juridico"
            >

            </textarea>
        </div>
    )
}

export default TextAreaProcedenteJuridico
