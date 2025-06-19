/* eslint-disable react/prop-types */
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import './erroractalegal.scss'
import { useContext } from 'react'
import { GlobalState } from '../../../../Context/GlobalContext'

function ErrorActaLegal({ propNumerodeRadicacion }) {

    const { setErrorActaLegal } = useContext(GlobalState);

    function cerrarErrorActaLegal() {
        setErrorActaLegal(false);
    }

    return (
        <div className='erroractalegal'>
            <div className='erroractalegal__div-text-icon'>
                <h2 className='erroractalegal__div-text-icon__h2'>Detalles: Error al Crear el Acta de Legal y Debida Forma</h2>
                <ExclamationTriangleIcon className='erroractalegal__div-text-icon__icon' />
            </div>
            <div className='erroractalegal__div-text'>
                <p className='erroractalegal__div-text__p'>Contexto: Para la radicacion <span>{propNumerodeRadicacion}</span> existen aún algunos requisitos pendientes.</p>
                <p className='erroractalegal__div-text__p'>Por favor verifique y complételos antes de continuar</p>
            </div>
            <div className='erroractalegal__div-buttons'>
                <button onClick={cerrarErrorActaLegal} className='global-button-save'>Cerrar</button>
            </div>

        </div>
    )
}

export default ErrorActaLegal
