import PrincipalPage from '@/Components/Pages/PrincipalPage'
import { informacionExpedienteStore } from '../../Store/informacionExpedienteStore'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import { FechasProvider } from './Context/FechasContext'
import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate'
import './fechas.scss'

function Fechas() {
    return (
        <FechasProvider>
            <FechasContent />
        </FechasProvider>
    )
}

function FechasContent() {
    const numeroRadicacion = getNumeroRadicacion();
    
    const { radicacion } = informacionExpedienteStore();

    console.log('radicacion', radicacion.descripcion_tramite);

    console.log(radicacion)

    function addSpaceAfterComma(inputString) {
        return inputString.replace(/,/g, ', ');
    }

    

    return (
        <PrincipalPage>
            {/* seccion titulo y numero de radicacion */}
            <section className='global-section-all '>
                <article className='global-article-tabla-observaciones'>
                    <h2 className='global-h2'>Control de Fechas</h2>
                    <div className='fechas-num-radicacion__container'>
                        <div className='fechas-num-radicacion__container__num-radicacion'>
                            <label className='input-base__label' htmlFor="">Número Radicación:</label>
                            <p className='observaciones-num-radicacion--fecha'>{numeroRadicacion}</p>
                        </div>
                        <div className='fechas-num-radicacion__container__fecha-radicacion'>
                            <label className='input-base__label' htmlFor="">Fecha de Radicación:</label>
                            <p className='observaciones-num-radicacion--fecha'>{formatDateToYYYYMMDD(radicacion.fecha)}</p>
                        </div>

                    </div>
                    
                </article>
            </section>
                    <section className='global-section-all '>
                        <article className='global-article-tabla-observaciones'>
                            <div className='fechas-num-radicacion__container'>
                                <div className='fechas-num-radicacion__container__tramite'>
                                    <label className='input-base__label' htmlFor="">Trámite:</label>
                                    <p className='observaciones-num-radicacion--fecha'>{addSpaceAfterComma(radicacion.descripcion_tramite)}</p>
                                </div>
                            </div>
                            
                        </article>
                    </section>
                    <div className='div-fecha--tablas--container'>
                        <div className='div-fecha--tablas'>
                        <section className='global-section-all section-fecha'>
                        <div className='dias-habiles'>
                            <h2 className='dias-habiles__h2'>DIAS HABILES USUARIO</h2>
                            <span>{radicacion.dias_cliente}</span>
                        </div>
                        <div className='table-user-fecha'>
                            <table className='table-user-fecha__table'>
                                <thead className='table-user-fecha__table__thead'>
                                    <tr className='table-user-fecha__table__thead__tr'>
                                        <th className='table-user-fecha__table__thead__tr__th-one'>USUARIO</th>
                                        <th className='table-user-fecha__table__thead__tr__th-two'>D. CALENDARIO</th>
                                        <th className='table-user-fecha__table__thead__tr__th-two'>DIAS HABILES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='tr-user-fecha'>
                                        <td className='td-user--green'>CUMPLE DEB. FORMA:</td>
                                        <td >N/A</td>
                                        <td >0</td>
                                    </tr>
                                    <tr className='tr-user-fecha'>
                                        <td className='td-user--green'>T. DEB. FORMA:</td>
                                        <td >28</td>
                                        <td >20</td>
                                    </tr>
                                    <tr className='tr-user-fecha'>
                                        <td className='td-user--green'>T. CUMPLE VALLA:</td>
                                        <td >0</td>
                                        <td >14</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className='global-section-all section-fecha'>
                        <div className='dias-habiles'>
                            <h2 className='dias-habiles__h2'>DIAS HABILES CURADURIA</h2>
                            <span>{radicacion.dias_curaduria}</span>
                        </div>
                        <div className='table-user-fecha'>
                            <table className='table-user-fecha__table'>
                                <thead className='table-user-fecha__table__thead'>
                                    <tr className='table-user-fecha__table__thead__tr'>
                                        <th className='table-user-fecha__table__thead__tr__th-one'>CURADURIA</th>
                                        <th className='table-user-fecha__table__thead__tr__th-two'>D. CALENDARIO</th>
                                        <th className='table-user-fecha__table__thead__tr__th-two'>DIAS HABILES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='tr-user-fecha'>
                                        <td className='td-curador--blue'>DEB.FORMA A #.ACTA:</td>
                                        <td >18</td>
                                        <td >14</td>
                                    </tr>
                                    <tr className='tr-user-fecha'>
                                        <td className='td-curador--blue'>PLAZO:</td>
                                        <td ></td>
                                        <td ><input className=' checkbox-fecha'  type="checkbox" /></td>
                                    </tr>
                                    <tr className='tr-user-fecha'>
                                        <td className='td-curador--blue'>F.CIE.OBS A F .CV/AVIP:</td>
                                        <td >0</td>
                                        <td >0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                        </div>
                        <div className='div-fecha--tablas-vencimientos'>
                            <div className='div-fecha--tablas-vencimientos__title'>
                                <span>VENCIMIENTOS</span>
                            </div>
                            <section className='data-vencimientos'>
                                <div className='data-vencimientos__item-one'>
                                    <span>30 DH</span>
                                </div>
                                <div className='data-vencimientos__item-two__container'>
                                    <div className='data-vencimientos__item-two'>
                                        <span>V.Deb.Forma:</span>
                                    </div>
                                    <div className='data-vencimientos__items'>
                                        <p>{formatDateToYYYYMMDD(radicacion.vencimiento_debforma)}</p>
                                    </div>
                                </div>

                            </section>

                            <section className='data-vencimientos'>
                                <div className='data-vencimientos__item-one'>
                                    <span>5 DH</span>
                                </div>
                                <div className='data-vencimientos__item-two__container'>
                                    <div className='data-vencimientos__item-two'>
                                        <span>F. V. Recibido Valla:</span>
                                    </div>
                                    <div className='data-vencimientos__items'>
                                        <p>{formatDateToYYYYMMDD(radicacion.vencimiento_valla)}</p>
                                    </div>
                                </div>

                            </section>

                            <section className='data-vencimientos'>
                                <div className='data-vencimientos__item-one'>
                                    <span>30 DH</span>
                                </div>
                                <div className='data-vencimientos__item-two__container'>
                                    <div className='data-vencimientos__item-two'>
                                        <span>F. V. Acta:</span>
                                    </div>
                                    <div className='data-vencimientos__items'>
                                        <p>{formatDateToYYYYMMDD(radicacion.vencimiento_acta)}</p>
                                    </div>
                                </div>

                            </section>

                            <section className='data-vencimientos'>
                                <div className='data-vencimientos__item-one'>
                                    <span>45 DH</span>
                                </div>
                                <div className='data-vencimientos__item-one'>
                                    <span>30 DH</span>
                                </div>
                                <div className='data-vencimientos__item-two__container'>
                                    <div className='data-vencimientos__item-two'>
                                        <span>F. V. Pagos:</span>
                                    </div>
                                    <div className='data-vencimientos__items'>
                                        <p>{formatDateToYYYYMMDD(radicacion.vencimiento_pagos)}</p>
                                    </div>
                                </div>

                            </section>

                        </div>
                    </div>

        </PrincipalPage>
    )
}

export default Fechas
