import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import './progressivestep.scss'

function ProgressiveStep() {

    const { progressiveStepStatus } = useContext(GlobalState)

    console.log(progressiveStepStatus.step1)

    return (
        <section className='progressive-step'>
            <div className='progressive-step__line'></div>
            <article className='progressive-step__article'>
                <div className={`${progressiveStepStatus.step1 === true ? 'progressive-step__article__div--active' : 'progressive-step__article__div'}`}>
                    <span className='progressive-step__article__div__span'>1</span>
                </div>
                <span className='progressive-step__article__span'>Datos Generales</span>
            </article>
            <div></div>
            <article className='progressive-step__article'>
                <div className={`${progressiveStepStatus.step2 === true ? 'progressive-step__article__div--active' : 'progressive-step__article__div'}`}>
                    <span className='progressive-step__article__div__span'>2</span>
                </div>
                <span className='progressive-step__article__span'>Tipos de Usos</span>
            </article>
            <div></div>
            <article className='progressive-step__article'>
                <div className={`${progressiveStepStatus.step3 === true ? 'progressive-step__article__div--active' : 'progressive-step__article__div'}`}>
                    <span className='progressive-step__article__div__span'>3</span>
                </div>
                <span className='progressive-step__article__span'>Trámite</span>
            </article>
            <div></div>
            <article className='progressive-step__article'>
                <div className={`${progressiveStepStatus.step4 === true ? 'progressive-step__article__div--active-four' : 'progressive-step__article__div' } ${progressiveStepStatus.step5 === true ? 'progressive-step__article__div--active-five' : 'progressive-step__article__div'} ${progressiveStepStatus.step6 === true ? 'progressive-step__article__div--active-six' : 'progressive-step__article__div'} ${progressiveStepStatus.step7 === true ? 'progressive-step__article__div--active-seven' : 'progressive-step__article__div'}`}>
                    <span className='progressive-step__article__div__span'>4</span>
                </div>
                <span className='progressive-step__article__span'>Requisitos</span>
            </article>


        </section>
    )
}

export default ProgressiveStep
