/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import './tablaobservaciones.scss'
import Modal from '@/Components/Modal';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import { useState } from 'react';
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';
import BoxContainerInputsByInfoBig from '@/Components/Atoms/BoxContainerInputsByInfoBig';
import PickListSmall from '@/Components/Molecules/PickListSmall';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall';



function TablaObservaciones({ openModalObservacionesInformacionDetallada, setOpenModalObservacionesInformacionDetallada, propListadoObservaciones, propListadoObservacionesFiltrado, state, propFunctionPut, propFunctionDelete, propFunctionChangeEstado, propFunctionPendiente }) {

    console.log('ListadoObservaciones:', propListadoObservaciones);

    const [ observacionSeleccionada, setObservacionSeleccionada ] = useState(null);

    const handleOpenModalObservacionesInformacionDetallada = (item) => {
        console.log('item:', item);
        setObservacionSeleccionada(item);
        setOpenModalObservacionesInformacionDetallada(true);
    }

    const handleEliminarObservacion = async (item) => {
        console.log('item:', item);
        await propFunctionDelete(item);
        setOpenModalObservacionesInformacionDetallada(false);
    }

    const handleAprobarObservacion = async (item) => {
        console.log('item:', item);
        await propFunctionPut(item);
        setOpenModalObservacionesInformacionDetallada(false);
    }

    const handlePendienteObservacion = async (item) => {
        console.log('item:', item);
        await propFunctionPendiente(item);
        setOpenModalObservacionesInformacionDetallada(false);
    }

    return (
        <>
        <div className='tablaobservacionescontainer'>
        <table className='tablaobservacionescontainer__table'>
            <thead className='tablaobservacionescontainer__table__thead'>
                <tr className='tablaobservacionescontainer__table__thead__tr'>
                    {/*<th className='tablaobservacionescontainer__table__thead__tr__th'>Número de radicación</th>*/}
                    <th className='tablaobservacionescontainer__table__thead__tr__th'>Área</th>
                    {/*<th className='tablaobservacionescontainer__table__thead__tr__th'>Categoría</th>*/}
                    <th className='tablaobservacionescontainer__table__thead__tr__th'>Observación</th>
                    {/*<th className='tablaobservacionescontainer__table__thead__tr__th'>Usuario</th>*/}
                    {/*<th className='tablaobservacionescontainer__table__thead__tr__th'>Fecha de creación</th>*/}
                    {/*<th className='tablaobservacionescontainer__table__thead__tr__th'>Última modificacion</th>*/}
                    {/*<th className='tablaobservacionescontainer__table__thead__tr__th'>Estado</th>*/}
                    <th className='tablaobservacionescontainer__table__thead__tr__th'>Aprobo</th>
                    <th className='tablaobservacionescontainer__table__thead__tr__th'>Fecha de Aprobacion</th>
                    {/*<th className='tablaobservacionescontainer__table__thead__tr__th'>Aprobar</th>*/}
                    {/*<th className='tablaobservacionescontainer__table__thead__tr__th'>Eliminar</th>*/}
                    <th className='tablaobservacionescontainer__table__thead__tr__th'>Ver más</th>
                </tr>
            </thead>
            <tbody className='global-tabla__tbody'> 
                {
                    propListadoObservacionesFiltrado?.length < 1 && state === 'ver todo' ?

                    propListadoObservaciones?.map((observacion, index) => {
                        return (
                            <tr key={index} className='global-tabla__tbody__tr capitalCase'>
                                {/*<td className='global-tabla__tbody__tr__td-two capitalCase'>{observacion.numero_radicacion}</td>*/}
                                <td className='global-tabla__tbody__tr__td-three capitalCase'>{observacion.area.toLowerCase().length > 25 ? observacion.area.toLowerCase().substring(0,25) + '...' : observacion.area.toLowerCase()}</td>
                                {/*<td className='global-tabla__tbody__tr__td-four capitalCase'>{observacion.categoria.toLowerCase()}</td>*/}
                                <td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{observacion.observacion.toLowerCase().length > 25 ? observacion.observacion.toLowerCase().substring(0,75) + '...' : observacion.observacion.toLowerCase()}</td>
                                {/*<td className='global-tabla__tbody__tr__td-five capitalCase'>{observacion.username.toLowerCase()}</td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-five capitalCase'>{format(observacion.fecha_creacion, 'dd/MM/yyyy')}</td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-six capitalCase'>{format(observacion.ultima_modificacion, 'dd/MM/yyyy') }</td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-one capitalCase'>
                                    <select 
                                        onChange={(e) => propFunctionChangeEstado(e, observacion)}
                                        value={observacion.estado || ''}
                                        className='tabal-observaciones-select' 
                                        name='estado'
                                    >
                                        <option selected value="">Estado de la observacion</option>
                                        <option value="pendiente">Pendiente</option>
                                        <option value="resuelta">Resuelta</option>
                                        <option value="no resuelta">No Resuelta</option>
                                        <option value="completado">Completado</option>
                                        <option value="aprobó">Aprobó</option>
                                    </select>
                                </td>*/}
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>{observacion.aprobado === true ? 'Si' : 'No'}</td>
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>{observacion.fecha_aprobado ?  observacion.fecha_aprobado : 'Sin Aprobacion'}</td>
                                {/*<td className='global-tabla__tbody__tr__td-six capitalCase'>
                                    {
                                        observacion.aprobado === false ?
                                        <button onClick={() => propFunctionPut(observacion)} className='tabla-observaciones-button-aprobar'>Aprobar</button>
                                        :
                                        <button onClick={() => propFunctionPendiente(observacion)} className='tabla-observaciones-button-pendiente'>Pendiente</button>
                                    }
                                    
                                </td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-six capitalCase'>
                                    <button onClick={() => propFunctionDelete(observacion)} className='tabla-observaciones-button-eliminar'>Eliminar</button>
                                </td>*/}
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>
                                    <button onClick={() => handleOpenModalObservacionesInformacionDetallada(observacion)} className='tabla-observaciones-button-ver-mas'>Ver más</button>
                                </td>
                            </tr>
                        )
                    })

                    :

                    propListadoObservacionesFiltrado?.map((observacion, index) => {
                        return (
                            <tr key={index} className='global-tabla__tbody__tr capitalCase'>
                                <td className='global-tabla__tbody__tr__td-three capitalCase'>{observacion.area.toLowerCase()}</td>
                                {/*<td className='global-tabla__tbody__tr__td-four capitalCase'>{observacion.categoria.toLowerCase()}</td>*/}
                                <td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{observacion.observacion.toLowerCase().length > 25 ? observacion.observacion.toLowerCase().substring(0,75) + '...' : observacion.observacion.toLowerCase()}</td>
                                {/*<td className='global-tabla__tbody__tr__td-five capitalCase'>{observacion.username.toLowerCase()}</td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-five capitalCase'>{format(observacion.fecha_creacion, 'dd/MM/yyyy')}</td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-six capitalCase'>{format(observacion.ultima_modificacion, 'dd/MM/yyyy') }</td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-one capitalCase'>
                                    <select 
                                        onChange={() => propFunctionChangeEstado( observacion )}
                                        value={observacion.estado || ''}
                                        className='tabal-observaciones-select' 
                                        name='estado'
                                    >
                                        <option selected value="">Estado de la observacion</option>
                                        <option value="pendiente">Pendiente</option>
                                        <option value="resuelta">Resuelta</option>
                                        <option value="no resuelta">No Resuelta</option>
                                        <option value="completado">Completado</option>
                                        <option value="aprobó">Aprobó</option>
                                    </select>
                                </td>*/}
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>{observacion.aprobado === true ? 'Si' : 'No'}</td>
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>{observacion.fecha_aprobado ? observacion.fecha_aprobado : 'Sin Aprobacion'}</td>
                                {/*<td className='global-tabla__tbody__tr__td-six capitalCase'>
                                    {
                                        observacion.aprobado === false ?
                                        <button onClick={() => propFunctionPut(observacion)} className='tabla-observaciones-button-aprobar'>Aprobar</button>
                                        :
                                        <button onClick={() => propFunctionPendiente(observacion)} className='tabla-observaciones-button-pendiente'>Pendiente</button>
                                    }
                                </td>*/}
                                {/* <td className='global-tabla__tbody__tr__td-six capitalCase'>
                                    <button onClick={() => propFunctionDelete(observacion)} className='tabla-observaciones-button-eliminar'>Eliminar</button>
                                </td>*/}
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>
                                    <button onClick={() => handleOpenModalObservacionesInformacionDetallada(observacion)} className='tabla-observaciones-button-ver-mas'>Ver más</button>
                                </td>
                            </tr>
                        )
                    })
                    
                }  
            </tbody>
        </table>
        
        {
            openModalObservacionesInformacionDetallada && 
            <Modal>
                <ModalBasicNew 
                    title='Información Detallada' 
                    propFunctionCloseModal={() => setOpenModalObservacionesInformacionDetallada(false)}
                >
                <BoxContainerInputsByInfoBigScroll>

                    
                    <ContainerTetxtPlain title='Área' text={observacionSeleccionada.area} />
                    <ContainerTetxtPlain title='Categoría' text={observacionSeleccionada.categoria} />
                    <ContainerTetxtPlain title='Usuario' text={observacionSeleccionada.username} />
                    <ContainerTetxtPlain title='Fecha de creación' text={format(observacionSeleccionada.fecha_creacion, 'dd/MM/yyyy')} />
                    <ContainerTetxtPlain title='Última modificación' text={format(observacionSeleccionada.ultima_modificacion, 'dd/MM/yyyy')} />
                    <ContainerTetxtPlain title='Estado' text={observacionSeleccionada.estado} />
                    <ContainerTetxtPlain title='Aprobado' text={observacionSeleccionada.aprobado ? 'Si' : 'No'} />
                    <PickListSmall
                        label='Estado'
                        options={[
                            { value: 'pendiente', option: 'Pendiente' },
                            { value: 'resuelta', option: 'Resuelta' },
                            { value: 'no resuelta', option: 'No Resuelta' },
                            { value: 'completado', option: 'Completado' },
                            { value: 'aprobó', option: 'Aprobó' },
                        ]}
                        value={observacionSeleccionada.estado || ''}
                        onChange={(e) => propFunctionChangeEstado(e, observacionSeleccionada)}
                    />
                    <ContainerTetxtPlain title='Observación' text={observacionSeleccionada.observacion} />
                </BoxContainerInputsByInfoBigScroll>

                <ContainerButtonsBackandNext>
                    <PrimaryButtonNewSmall backgroundColor='red' text='Eliminar' onClick={() => handleEliminarObservacion(observacionSeleccionada)} />
                    {
                        observacionSeleccionada.aprobado === false ?
                        <PrimaryButtonNewSmall text='Aprobar' onClick={() => handleAprobarObservacion(observacionSeleccionada)} />
                        :
                        <SecondaryButtonNewSmall text='Pendiente' onClick={() => handlePendienteObservacion(observacionSeleccionada)} />
                        
                    }
                </ContainerButtonsBackandNext>

                </ModalBasicNew>
            </Modal>
        }
    </div>
    <div className='tablaobservacionescontainer--mobile'>
    {
        propListadoObservacionesFiltrado?.length < 1 && state === 'ver todo' ?

        propListadoObservaciones?.map((observacion, index) => {
            return (
                <div key={index} className='tablaobservacionescontainer--mobile__item'>
                    <div className='tablaobservacionescontainer--mobile__item__header'>
                        <p className='capitalCase tablaobservacionescontainer--mobile__item__header__p'>{observacion.area}</p>
                    </div>
                    <div className='tablaobservacionescontainer--mobile__item__body'>
                        <ContainerTetxtPlain title='Aprobado' text={observacion.aprobado ? 'Si' : 'No'} />
                        <ContainerTetxtPlain title='Fecha de Aprobacion' text={observacion.fecha_aprobado ? observacion.fecha_aprobado : 'Sin Aprobacion'} />
                        <ContainerTetxtPlain title='Observación' text={observacion.observacion.toLowerCase().length > 25 ? observacion.observacion.toLowerCase().substring(0,75) + '...' : observacion.observacion.toLowerCase()} />
                    </div>
                    <div className='tablaobservacionescontainer--mobile__item__footer'>
                        <button onClick={() => handleOpenModalObservacionesInformacionDetallada(observacion)} className='tablaobservacionescontainer--mobile__item__footer__button'>Ver más</button>
                    </div>
                </div>
            )
        })

        :

        propListadoObservacionesFiltrado?.map((observacion, index) => {
            return (
                <div key={index} className='tablaobservacionescontainer--mobile__item'>
                    <div className='tablaobservacionescontainer--mobile__item__header'>
                        <p>{observacion.area}</p>
                    </div>
                    <div>
                        <ContainerTetxtPlain title='Observación' text={observacion.observacion.toLowerCase().length > 25 ? observacion.observacion.toLowerCase().substring(0,75) + '...' : observacion.observacion.toLowerCase()} />
                        <ContainerTetxtPlain title='Aprobado' text={observacion.aprobado ? 'Si' : 'No'} />
                        <ContainerTetxtPlain title='Fecha de Aprobacion' text={observacion.fecha_aprobado ? observacion.fecha_aprobado : 'Sin Aprobacion'} />
                    </div>
                    <div>
                        <button onClick={() => handleOpenModalObservacionesInformacionDetallada(observacion)} className='tabla-observaciones-button-ver-mas'>Ver más</button>
                    </div>
                </div>
            )
        })

    }

</div>
</>
    )
}

export default TablaObservaciones
