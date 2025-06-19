/* eslint-disable react/prop-types */
import './sectionshownumeroradicacion.scss'


//Props que recive el componente
// propNumeroRadicacion: Número de radicación que se mostrará en el componente
function SectionShowNumeroRadicacion({ propNumeroRadicacion }) {
    return (
        <section className='sectionshownumeroradicacion--section-titulo-numero-radicacion-forms-modales'>
            <div className='sectionshownumeroradicacion--section-titulo-numero-radicacion-forms-modales__numero-radicacion'>
                <p className='sectionshownumeroradicacion--section-titulo-numero-radicacion-forms-modales__numero-radicacion__p'>numero de radicacion:</p>
                <span className='sectionshownumeroradicacion--section-titulo-numero-radicacion-forms-modales__numero-radicacion__span'>{propNumeroRadicacion}</span>
            </div>
        </section>
    )
}

export default SectionShowNumeroRadicacion
