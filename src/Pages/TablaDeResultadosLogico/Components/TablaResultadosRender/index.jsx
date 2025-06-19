/* eslint-disable react/prop-types */
import LayoutOne from '@/Components/Layout/LayoutOne'
import './tablaresultadosrender.scss'
import NavBar from '@/Components/NavBar'
import ContentDesktop from '@/Components/ContentDesktop'
import LayoutContent from '@/Components/Layout/LayoutContent'
import ButtonChat from '@/Components/ButtonChat'
import FooterBasic from '@/Components/FooterBasic'
import TablaPrimaria from '../Tablas/TablaPrimaria'
import PrimaryButton from '@/Components/PrimaryButton'
import TablaSecundaria from '../Tablas/TablaSecundaria'
import { dataCargoFijo, adaptadorDataCargoFijo } from '../../Utils/dataTablas'


function TablaResultadosRender({ propTitleSection, propTitleTarifa, propFnButton, propDataColumnsSecondTable, propDataColumnsSecondTableColumnInicial }) {

    
   
        

    return (
        <LayoutOne>
            <NavBar />
            <ContentDesktop>
                <LayoutContent>
                    <section className='global-section-all '>
                        <article className='global-article-tabla-observaciones'>
                            <h2 className='global-h2'>Tablas de Resultados</h2>
                        </article>
                    </section>
                    <section className='global-section-all '>
                        <article className='container-title'>
                            <div className='container-title__div-title'>
                                <span className='container-title__div-title__span'>{propTitleSection}</span>
                            </div>
                            <div className='container-tarifa__div-title'>
                                <p className='container-tarifa__div-title__p'>{propTitleTarifa}</p>
                            </div>
                        
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'CARGO FIJO'}
                                propTitleColumnOne={'ESTARTO'}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                                propData={adaptadorDataCargoFijo(dataCargoFijo)}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'OTROS USOS'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'RELOTEO'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'EXPENSA UNICA VIVIENDA INT. SOCIAL'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'EXPENSA UNICA SUBDIVISION'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <div className='container-title__div-title'>
                                <span className='container-title__div-title__span'>{'OTRAS ACTUACIONES'}</span>
                            </div>
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'AJUSTES DE COTAS DE AREAS POR PROYECTO'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'APROVACION DE PLANOS DE PROP. HORIZONTAL'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'MODIFICACION DE PLANO URBANISTICO'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'CONCEPTO DE NORMA URBANISTICA'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'CONCEPTO DE USO DE SUELO'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaPrimaria 
                                propTitleTable={'APROBACION DE PROYECTO URBANISTICO'}
                                propTitleColumnOne={''}
                                propTitleColumnTwo={'VR SIN IVA'}
                                propTitleColumnThree={'IVA'}
                                propTitleColumnFour={'TOTAL'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTableColumnInicial}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'A 100 MT2 E INFERIORES A 11.000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTableColumnInicial}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'PROYECTOS IGUALES O MENORES A 100 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTableColumnInicial}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'PROYECTOS SUPERIORES A 11.000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'DE 0 A 100 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'DE 101 A 299 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'DE 301 A 1000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'DE 1001 A 11000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'SUPERIORES A 11000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'OTROS USOS MAS DE 11000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <div className='container-title__div-title'>
                                <span className='container-title__div-title__span'>{'PARA VIVIENDA'}</span>
                            </div>
                            <div className='container-tarifa__div-title'>
                                <p className='container-tarifa__div-title__p'>{'ESTRATO 1 Y 2'}</p>
                            </div>
                        
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'URBANISMO/PARCELACION OTROS USOS MAS DE 11.000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <div className='container-tarifa__div-title'>
                                <p className='container-tarifa__div-title__p'>{'ESTRATO 3'}</p>
                            </div>
                        
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'URBANISMO/PARCELACION OTROS USOS MAS DE 11.000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <div className='container-tarifa__div-title'>
                                <p className='container-tarifa__div-title__p'>{'ESTRATO 4'}</p>
                            </div>
                        
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'URBANISMO/PARCELACION OTROS USOS MAS DE 11.000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <div className='container-tarifa__div-title'>
                                <p className='container-tarifa__div-title__p'>{'ESTRATO 5'}</p>
                            </div>
                        
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'URBANISMO/PARCELACION OTROS USOS MAS DE 11.000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <div className='container-tarifa__div-title'>
                                <p className='container-tarifa__div-title__p'>{'ESTRATO 6'}</p>
                            </div>
                        
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <TablaSecundaria 
                                propTitleTable={'CARGO VARIABLE x FACTOR I'}
                                propColumns={propDataColumnsSecondTable}
                                propTitleCargo={'CARGO VARIABLE x FACTOR I'}
                                proTitleFactorJ={'URBANISMO/PARCELACION OTROS USOS MAS DE 11.000 MT2'}
                            />
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <article className='container-title'>
                            <PrimaryButton textButton={'VOLVER A ATRÁS'} propFunction={propFnButton} />
                        </article>
                    </section>

                </LayoutContent>
                <ButtonChat />
            </ContentDesktop>
            <FooterBasic />
        </LayoutOne>
    )
}

export default TablaResultadosRender
