/* eslint-disable react/prop-types */
import { PrinterIcon } from '@heroicons/react/24/outline'
import './tablaprimariaventanilla.scss'
import { useContext, useState } from 'react';
import ModalBasicNew from '../Molecules/ModalBasicNew';
import Modal from '../Modal';
import ContainerButtonsBackandNext from '../Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '../Atoms/PrimaryButtonNewSmall';
import SecondaryButtonNewSmall from '../Atoms/SecondaryButtonNewSmall';
import ContainerButtonsBackandNextSmall from '../Atoms/ContainerButtonsBackandNextSmall';
import BoxContainerInputsByInfoBigScroll from '../Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerTetxtPlain from '../Atoms/ContainerTetxtPlain';
import { GlobalState } from '@/Context/GlobalContext';

function TablaPrimariaVentanilla({
    propColumns,
    propData,
    propDelete,
    propFnDelete,
    propRowData,
    propStickerEntrada,
    propStickerSalida,
    propDataFilter,
    propvalorParaFiltrar
}) 
{

    const { verMas, setVerMas } = useContext(GlobalState);
    const [ oficioSelected, setOficioSelected ] = useState(null);

    const handleVerMas = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        setVerMas(true);
        setOficioSelected(item);
    }

    return (
        <div className='tablaprimariaventanilla'>
            <table className='tablaprimariaventanilla__table'>
                <thead className='tablaprimariaventanilla__table__thead'>
                {
                        propColumns ?
                        <tr className='tablaprimariaventanilla__table__thead__tr'>
                            {
                                propColumns.map((item) => (
                                    <th className='tablaprimariaventanilla__table__thead__tr__th' key={item.id}>{item.titleColumn}</th>
                                ))
                            }
                            {/*<th className='tablaprimariaventanilla__table__thead__tr__th'>Recibido/Salida</th>
                            <th className='tablaprimariaventanilla__table__thead__tr__th'>Sticker Entrada</th>
                            <th className='tablaprimariaventanilla__table__thead__tr__th'>Sticker Salida</th>*/}
                            {
                                    propDelete === true &&
                                    <th className='tablaprimariaventanilla__table__thead__tr__th'>
                                        Eliminar
                                    </th>
                            }
                        </tr>
                        :
                        <tr className='tablaprimariaventanilla__table__thead__tr'>
                            <th className='tablaprimariaventanilla__table__thead__tr__th--first'>Columna 1</th>
                            <th className='tablaprimariaventanilla__table__thead__tr__th'>Columna 2</th>
                            <th className='tablaprimariaventanilla__table__thead__tr__th'>Columna 3</th>
                            <th className='tablaprimariaventanilla__table__thead__tr__th'>Columna 4</th>
                        </tr>
                    }
                </thead>

                <tbody className='tablaprimariaventanilla__table__tbody'>
                    {
                        !propvalorParaFiltrar?.length > 0 ?
                        propData?.map((item, index) => (
                            <tr className='tablaprimariaventanilla__table__tbody__tr' key={index}>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.numeroRadicacion}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.numeroOficio}</td>
                                {/*<td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.nombreSolicitante}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.asunto}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.descripcion}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.fecha}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td resaltar'>{item.reciboSalida}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'><button onClick={(e) => propStickerEntrada(e, item)} className='tabla-primaria-ventanilla-sticker'><PrinterIcon className='tabla-primaria-ventanilla-sticker__icon' /></button></td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'><button onClick={(e) => propStickerSalida(e, item)} className='tabla-primaria-ventanilla-sticker'><PrinterIcon className='tabla-primaria-ventanilla-sticker__icon' /></button></td>
                                {
                                    propDelete === true &&
                                    <td className='tablaprimariaventanilla__table__tbody__tr__td'>
                                        <button className='tabla-primaria__delete--button' onClick={(e) => propFnDelete(item.id, e)}>Eliminar</button>
                                    </td>
                                }*/}
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>
                                    <button onClick={(e) => handleVerMas(e, item)} className='tablaprimariaventanilla__table__tbody__tr__td__button-ver-mas'>Ver más</button>
                                </td>
                            </tr>
                        ))

                        :

                        propDataFilter?.map((item, index) => (
                            <tr className='tablaprimariaventanilla__table__tbody__tr' key={index}>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.numeroRadicacion}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.numeroOficio}</td>
                                {/*<td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.nombreSolicitante}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.asunto}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.descripcion}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>{item.fecha}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td resaltar'>{item.reciboSalida}</td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'><button onClick={(e) => propStickerEntrada(e, item)} className='tabla-primaria-ventanilla-sticker'><PrinterIcon className='tabla-primaria-ventanilla-sticker__icon' /></button></td>
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'><button onClick={(e) => propStickerSalida(e, item)} className='tabla-primaria-ventanilla-sticker'><PrinterIcon className='tabla-primaria-ventanilla-sticker__icon' /></button></td>
                                {
                                    propDelete === true &&
                                    <td className='tablaprimariaventanilla__table__tbody__tr__td'>
                                        <button className='tabla-primaria__delete--button' onClick={(e) => propFnDelete(item.id, e)}>Eliminar</button>
                                    </td>
                                }*/}
                                <td className='tablaprimariaventanilla__table__tbody__tr__td'>
                                    <button onClick={(e) => handleVerMas(e, item)} className='tablaprimariaventanilla__table__tbody__tr__td__button-ver-mas'>Ver más</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                <Modal>
                    { verMas && oficioSelected &&
                        <ModalBasicNew title='Información del oficio' propFunctionCloseModal={() => setVerMas(false)}>
                            <BoxContainerInputsByInfoBigScroll>
                                <ContainerTetxtPlain title='Número de radicación' text={oficioSelected.numeroRadicacion} />
                                <ContainerTetxtPlain title='Número de oficio' text={oficioSelected.numeroOficio} />
                                <ContainerTetxtPlain title='Nombre del solicitante' text={oficioSelected.nombreSolicitante} />
                                <ContainerTetxtPlain title='Asunto' text={oficioSelected.asunto} />
                                <ContainerTetxtPlain title='Descripción' text={oficioSelected.descripcion} />
                                <ContainerTetxtPlain title='Fecha' text={oficioSelected.fecha} />
                                <ContainerTetxtPlain title='Recibido/Salida' text={oficioSelected.reciboSalida} />
                            </BoxContainerInputsByInfoBigScroll>
                            <ContainerButtonsBackandNext>
                                <SecondaryButtonNewSmall oncli text='Sticker Entrada' onClick={(e) => propStickerEntrada(e, oficioSelected)} />
                                <SecondaryButtonNewSmall text='Sticker Salida' onClick={(e) => propStickerSalida(e, oficioSelected)} />
                            </ContainerButtonsBackandNext>
                            <PrimaryButtonNewSmall text='Editar Oficio' onClick={() => propRowData(oficioSelected)} />
                        </ModalBasicNew>
                    }
                </Modal>
                
            }
        </div>
    )
}

export default TablaPrimariaVentanilla
