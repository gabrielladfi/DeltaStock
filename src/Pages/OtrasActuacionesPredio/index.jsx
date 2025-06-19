
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './otrasactuacionespredio.scss'
import FormOAPredioPredio from '@/Components/Molecules/FormOAPredioPredio'
import FormOAPredioUrbanizacion from '@/Components/Molecules/FormOAPredioUrbanizacion'
import PrimaryButton from '@/Components/PrimaryButton'

function OtrasActuacionesPredio() {
    return (
        <PrincipalPage >
            <section className='global-section-all '>
                <article className='global-article-tabla-observaciones'>
                    <h2 className='global-h2'>Predio</h2>
                </article>
            </section>
            <section className='global-section-all'>
                <article className='global-article-tabla-observaciones'>
                    <FormOAPredioPredio />
                    <FormOAPredioUrbanizacion />
                    <div className='otras-actuaciones-predio__container-button'>
                        <PrimaryButton textButton='Guardar' />
                    </div>
                </article>
                
            </section>

        </PrincipalPage>
    )
}

export default OtrasActuacionesPredio
