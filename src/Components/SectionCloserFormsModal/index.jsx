/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/outline"
import './sectioncloserformsmodal.scss'

// Props que recibe el componente
// titleForm: Título del formulario modal
// functionOnclick: Función que se ejecuta al hacer clic en el botón de cerrar

// Componente funcional que muestra el botón de cerrar un formulario modal
function SectionCloserFormsModal({ titleForm, functionOnclick }) {
    return (
        <section className='sectioncloserformsmodal--section-de-cerrado-modales__close'>
            <h2 className='sectioncloserformsmodal--section-de-cerrado-modales__close__h2'>{titleForm}</h2>
            <button 
                onClick={functionOnclick} 
                className='sectioncloserformsmodal--section-de-cerrado-modales__close__button'
            >
                <XMarkIcon className='sectioncloserformsmodal--section-de-cerrado-modales__close__button__icon' />
            </button>
        </section>
    )
}

export default SectionCloserFormsModal
