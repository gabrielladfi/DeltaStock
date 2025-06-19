/* eslint-disable react/prop-types */

import TablaDePredios from '@/Pages/Predio/Components/TablaDePredios'
import './viewdatainfoexpedienteliquidaciones.scss'

function ViewDataInfoExpedienteLiquidaciones({ numero_radicacion, tipo_tramite, modalidad_tramite, usos, nombre_solicitante, dni_solicitante, phone_solicitante, email_solicitante }) {

    const addSpaceAfterComma = (text) => {
        if (!text) return '';
        return text.replace(/,/g, ', ');
    }
    return (
        <div className='viewdatainfoexpedienteliquidaciones__container'>
            <section className='viewdatainfoexpedienteliquidaciones__container__section-info'>
                <article className='viewdatainfoexpedienteliquidaciones__container__section-info__article'>
                    <div className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div'>
                        <span className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__span'>Número de radicación:</span>
                        <p className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__p'>{numero_radicacion}</p>
                    </div>
                    <div className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div'>
                        <span className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__span'>Tipo de tramite:</span>
                        <p className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__p'>{tipo_tramite}</p>
                    </div>
                    <div className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div'>
                        <span className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__span'>Modalidad de tramite:</span>
                        <p className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__p'>{addSpaceAfterComma(modalidad_tramite)}</p>
                    </div>
                    <div className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div'>
                        <span className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__span'>Usos:</span>
                        <p className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__p'>{usos}</p>
                    </div>
                </article>
                <article className='viewdatainfoexpedienteliquidaciones__container__section-info__article'>
                    <div className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div'>
                        <span className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__span'>Solicitante:</span>
                        <p className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__p'>{nombre_solicitante}</p>
                    </div>
                    <div className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div'>
                        <span className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__span'>DNI:</span>
                        <p className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__p'>{dni_solicitante}</p>
                    </div>
                    <div className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div'>
                        <span className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__span'>Teléfono:</span>
                        <p className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__p'>{phone_solicitante}</p>
                    </div>
                    <div className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div'>
                        <span className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__span'>Email:</span>
                        <p className='viewdatainfoexpedienteliquidaciones__container__section-info__article__div__p'>{email_solicitante}</p>
                    </div>
                </article>
            </section>
            <section className='viewdatainfoexpedienteliquidaciones__container__section-table'>
                <TablaDePredios />
            </section>

        </div>
        
    )
}

export default ViewDataInfoExpedienteLiquidaciones
