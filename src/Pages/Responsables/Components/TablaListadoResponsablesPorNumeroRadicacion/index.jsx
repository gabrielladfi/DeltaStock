import { useState } from 'react';
import { useFetchDeleteResponsableId } from '../../Hooks/useFetchDeleteResponsableId';
import { useFetchGetListadoResponsables } from '../../Hooks/useFetchGetListadoResponsables';
import './tablalistadoresponsablespornumeroradicacion.scss'
import Modal from '@/Components/Modal';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function TablaListadoResponsablesPorNumeroRadicacion() {

    
    const { listadoResponsables } = useFetchGetListadoResponsables();
    const { fetchDeleteResponsableId } = useFetchDeleteResponsableId();

    const [verMas, setVerMas] = useState(false);
    const [responsableSeleccionado, setResponsableSeleccionado] = useState(null);
    

    const handleVerMas = (responsable) => {
        setResponsableSeleccionado(responsable);
        setVerMas(true);
    }

    const handleEliminarResponsable = (id) => {
        fetchDeleteResponsableId(id);
        setVerMas(false);
    }

   
    console.log(listadoResponsables)
    

    return (
        <div className='tablalistadoresponsablespornumeroradicacion'>
        <table className='tablalistadoresponsablespornumeroradicacion__table'>
            <thead className='tablalistadoresponsablespornumeroradicacion__table__thead'>
                <tr className='tablalistadoresponsablespornumeroradicacion__table__thead__tr'>
                   
                    <th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>Nombre</th>
                    {/*<th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>Email</th>
                    <th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>Telefono</th>
                    <th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>DNI</th>
                    <th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>Matricula</th>
                    <th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>Fecha</th>
                    <th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>Fecha Expedición Matrícula</th>*/}
                    <th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>Tipo Responsable</th>
                    <th className='tablalistadoresponsablespornumeroradicacion__table__thead__tr__th'>Ver más</th>
                </tr>
            </thead>
            <tbody className='tablalistadoresponsablespornumeroradicacion__table__tbody'> 
                {
                    listadoResponsables?.map((responsable, index) => {
                        return (
                            <tr key={index} className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr'>
                                <td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>{responsable.nombre.toLowerCase()}</td>
                                {/*<td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>{responsable.email}</td>
                                <td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>{responsable.phone}</td>
                                <td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>{responsable.dni}</td>
                                <td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>{responsable.matricula}</td>
                                <td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>{responsable.fecha}</td>
                                {/*<td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>{responsable.fecha_expdicion_matricula}</td>*/}
                                <td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>{responsable.tipo_responsable}</td>
                                <td className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td'>
                                    {/*<button onClick={() => fetchDeleteResponsableId(responsable.id)} className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td__button-ver-mas'>Ver más</button>*/}
                                    <button onClick={() => handleVerMas(responsable)} className='tablalistadoresponsablespornumeroradicacion__table__tbody__tr__td__button-ver-mas'>Ver más</button>
                                </td>
                            </tr>
                        )
                    })
                }  
            </tbody>
        </table>
        {
            verMas && (
                <Modal>
                    <ModalBasicNew title='Información del responsable' propFunctionCloseModal={() => setVerMas(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <ContainerTetxtPlain title='Nombre' text={responsableSeleccionado.nombre} />
                            <ContainerTetxtPlain title='Tipo Responsable' text={responsableSeleccionado.tipo_responsable} />
                            <ContainerTetxtPlain title='Email' text={responsableSeleccionado.email} />
                            <ContainerTetxtPlain title='Telefono' text={responsableSeleccionado.phone} />
                            <ContainerTetxtPlain title='DNI' text={responsableSeleccionado.dni} />
                            <ContainerTetxtPlain title='Fecha' text={dayjs(responsableSeleccionado.fecha).utc().format('DD/MM/YYYY')} />
                            <ContainerTetxtPlain title='Matricula' text={responsableSeleccionado.matricula} />
                            <ContainerTetxtPlain title='Fecha Expedición Matrícula' text={dayjs(responsableSeleccionado.fecha_expdicion_matricula).utc().format('DD/MM/YYYY')} />
                        </BoxContainerInputsByInfoBigScroll>
                        <ContainerButtonsBackandNext>
                            <PrimaryButtonNewSmall backgroundColor='#FF0000' text='Eliminar responsable' onClick={() => handleEliminarResponsable(responsableSeleccionado.id)} />
                        </ContainerButtonsBackandNext>

                    </ModalBasicNew>
                </Modal>
            )
        }
    </div>
    )
}

export default TablaListadoResponsablesPorNumeroRadicacion
