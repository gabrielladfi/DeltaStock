import './tablaestadorequisitos.scss'
import '../../../../Sass/globalSass.scss'
import { useServicesGet } from '../../../../Hooks/useServicesGet'
import { useContext, useEffect } from 'react'
import { GlobalState } from '../../../../Context/GlobalContext'
import { useServicesPut } from '../../../../Hooks/useServicesPut'
import { useServiceDelete } from '../../../../Hooks/useServiceDelete'
import { EstadoRequisitosContextState } from '../../Context/EstadoRequisitosContextContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import SubTitleSectionInfo from '@/Components/Atoms/SubTitleSectionInfo'
import BarraEstadoRequisitos from '@/Components/Molecules/BarraEstadoRequisitos'

function TablaEstadoRequisitos() {

    const { listadoRequisitos, globalNumeroRadicacion } = useContext(GlobalState)
    const { fetchRequisitoNumeroRadicacion } = useServicesGet();
    const { fetchPutActualizarEstadoRequisito } = useServicesPut();
    const { fetchEliminarRequisitoPorId } = useServiceDelete();
    const { reload } = useContext(EstadoRequisitosContextState);

    console.log(globalNumeroRadicacion)

    const numeroRadicacion = localStorage.getItem('numeroRadicacionLocalStorage')
    
    useEffect(() => {
        fetchRequisitoNumeroRadicacion(numeroRadicacion)
    },[reload, globalNumeroRadicacion])

    async function completarRequisito(id) {
        const dataComunicado = { is_pending: false };
        try {
            await fetchPutActualizarEstadoRequisito(id, dataComunicado);
            fetchRequisitoNumeroRadicacion(globalNumeroRadicacion)
        } catch (error) {
            console.error("Error completando requisito:", error);
        }
    }
    
    async function pendienteRequisito(id) {
        const dataComunicado = { is_pending: true };
        try {
            await fetchPutActualizarEstadoRequisito(id, dataComunicado);
            fetchRequisitoNumeroRadicacion(globalNumeroRadicacion)
        } catch (error) {
            console.error("Error marcando requisito como pendiente:", error);
        }
    }

    async function eliminarRequisito(id) {
        try {
            await fetchEliminarRequisitoPorId(id);
            fetchRequisitoNumeroRadicacion(globalNumeroRadicacion)
        } catch (error) {
            console.error("Error eliminando requisito:", error);
        }
    }

    console.log(listadoRequisitos)
    const completados = listadoRequisitos.filter(item => !item.is_pending).length
    const incompletos = listadoRequisitos.filter(item => item.is_pending).length

    return (
        <>
        <BarraEstadoRequisitos completados={completados} total={listadoRequisitos.length} incompletos={incompletos} />
        <div className='tablaestadorequisitos-container--mobile'>
        {
            listadoRequisitos?.map((item, index) => { 
                return (
                    <div className='tablaestadorequisitos-container--mobile__card' key={index}>
                        <div className='tablaestadorequisitos-container--mobile__card__header'>
                            <SubTitleSectionInfo text={'Estado del Requisito'} />
                            <select 
                                className='tablaestadorequisitos-container--mobile__card__header__select'
                                value={item.is_pending ? 'pendiente' : 'completado'}
                                onChange={(e) => {
                                    if (e.target.value === 'completado') {
                                        completarRequisito(item.id)
                                    } else {
                                        pendienteRequisito(item.id)
                                    }
                                }}
                            >
                                <option value="completado">Completado</option>
                                <option value="pendiente">Pendiente</option>
                            </select>


                        </div>
                        <div className='tablaestadorequisitos-container--mobile__card__body'>
                            <p className='tablaestadorequisitos-container--mobile__card__body__p'>Número de Radicación: <span className='tablaestadorequisitos-container--mobile__card__body__p__span'>{item.numero_radicacion}</span></p>
                            <p className='tablaestadorequisitos-container--mobile__card__body__p'>Requisito: <span className='tablaestadorequisitos-container--mobile__card__body__p__span'>{item.requisito_title}</span></p>
                        </div>
                        <div className='tablaestadorequisitos-container--mobile__card__footer'>
                            <button onClick={() => eliminarRequisito(item.id)} className='tablaestadorequisitos-container--mobile__card__footer__button'>
                                Eliminar
                            </button>

                        </div>
                    </div>
                )
            })
        }
        </div>
        <div className='tablaestadorequisitos-container'>
            <table className='tablaestadorequisitos-container__table'>
                <thead className='tablaestadorequisitos-container__table__thead'>
                    <tr className='tablaestadorequisitos-container__table__thead__tr'>
                        <th className='tablaestadorequisitos-container__table__thead__tr__th'>Número de Radicación</th>
                        <th className='tablaestadorequisitos-container__table__thead__tr__th'>Título del Requisito</th>
                        <th className='tablaestadorequisitos-container__table__thead__tr__th'>Estado del Requisito</th>
                        <th className='tablaestadorequisitos-container__table__thead__tr__th--button'>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='tablaestadorequisitos-container__table__tbody'>
                    {
                        listadoRequisitos?.map((item, index) => {   
                            return (
                                <tr className='tablaestadorequisitos-container__table__tbody__tr' key={index}>
                                    <td className='tablaestadorequisitos-container__table__tbody__tr__td'>{item.numero_radicacion}</td>
                                    <td className='tablaestadorequisitos-container__table__tbody__tr__td'>{item.requisito_title}</td>
                                    <td className='tablaestadorequisitos-container__table__tbody__tr__td'>
                                        <select 
                                            className={`tablaestadorequisitos-container__table__tbody__tr__td tablaestadorequisitos-container__table__tbody__tr__td--select ${item.is_pending === false && 'requisito-completado'}`}
                                            value={item.is_pending ? 'pendiente' : 'completado'}
                                            onChange={(e) => {
                                                if (e.target.value === 'completado') {
                                                    completarRequisito(item.id)
                                                } else {
                                                    pendienteRequisito(item.id)
                                                }
                                            }}
                                        >
                                            <option value="completado">Completado</option>
                                            <option value="pendiente">Pendiente</option>
                                        </select>
                                    </td>
                                    <td className='tablaestadorequisitos-container__table__tbody__tr__td tablaestadorequisitos-container__table__tbody__tr__td--button'>
                                        <button onClick={() => eliminarRequisito(item.id)} className='tablaestadorequisitos-container__table__tbody__tr__td--button__button'>
                                            <XMarkIcon className='tablaestadorequisitos-container__table__tbody__tr__td--button__icon' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default TablaEstadoRequisitos
