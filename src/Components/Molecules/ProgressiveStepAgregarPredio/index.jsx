import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import './progressivestepagregarpredio.scss'

function ProgressiveStepAgregarPredio() {

    const { progressiveStepStatus } = useContext(GlobalState)

    console.log(progressiveStepStatus.step1)

    return (
        <section className='progressive-step-agregar-predio'>
            <div className='progressive-step-agregar-predio__line'></div>
            <article className='progressive-step-agregar-predio__article'>
                <div className={`${progressiveStepStatus.step1 === true ? 'progressive-step-agregar-predio__article__div--active' : 'progressive-step-agregar-predio__article__div'}`}>
                    <span className='progressive-step-agregar-predio__article__div__span'>1</span>
                </div>
                <span className='progressive-step-agregar-predio__article__span'>Dirección y Nomenclatura</span>
            </article>
            <div></div>
            <article className='progressive-step-agregar-predio__article'>
                <div className={`${progressiveStepStatus.step2 === true ? 'progressive-step__article__div--active' : 'progressive-step__article__div'}`}>
                    <span className='progressive-step__article__div__span'>2</span>
                </div>
                <span className='progressive-step-agregar-predio__article__span'>Información General</span>
            </article>
            <div></div>
            <article className='progressive-step-agregar-predio__article'>
                <div className={`${progressiveStepStatus.step3 === true ? 'progressive-step__article__div--active' : 'progressive-step__article__div'}`}>
                    <span className='progressive-step-agregar-predio__article__div__span'>3</span>
                </div>
                <span className='progressive-step-agregar-predio__article__span'>Planimetría del lote</span>
            </article>
            <div></div>
            <article className='progressive-step-agregar-predio__article'>
                <div className={`${progressiveStepStatus.step4 === true ? 'progressive-step__article__div--active' : 'progressive-step__article__div'}`}>
                    <span className='progressive-step-agregar-predio__article__div__span'>4</span>
                </div>
                <span className='progressive-step-agregar-predio__article__span'>Vecinos Colindantes</span>
            </article>


        </section>
    )
}

export default ProgressiveStepAgregarPredio
