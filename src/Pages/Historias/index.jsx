import { HistoriasProvider, HistoriasState } from './Context/HistoriaContext'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import LogicaTablaHistorias from './Components/LogicaTablaHistorias'
//import FormularioEncargados from '../../Components/FormularioEncargados'
import { useContext, useEffect, useRef } from 'react'
import Modal from '../../Components/Modal'
//import { useContext } from 'react'
//import Modal from '../../Components/Modal'
import FormularioCrearNuevaHistoria from './Components/FormularioCrearNuevaHistoria'
import FormActualizarFechasalida from './Components/FormActualizarFechaSalida'
import FormActualizarNota from './Components/FormActualizarNota'
import FormularioEncargados from '../../Components/FormularioEncargados'
import SectionClosermodals from '../../Components/SectionClosermodals'
import PrimaryButton from '../../Components/PrimaryButton'
import { GlobalState } from '../../Context/GlobalContext'
import PrimaryLabeledInput from '@/Components/Molecules/PrimaryLabeledInput'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate'
import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate'
import { TrashIcon } from '@heroicons/react/24/outline'
import PrimaryContainerFilters from '@/Components/Molecules/PrimaryContainerFilters'
import PrimaryInputLiquidaciones from '@/Components/Molecules/PrimaryInputLiquidaciones'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './historias.scss'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave'
import warning from '@/assets/warninglogo.svg'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import InputDateNR from '@/Components/Atoms/InputDateNR'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain'

function Historias() {
    return (
        <>
            <HistoriasProvider>
                <HistoriasContent />
            </HistoriasProvider>
        </>
    )
}

function HistoriasContent() {
    
    const tramiteIniciado = useRef(true);

    const { actualizacionEncargados, setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState);

    const { 
        crearNuevaHistoria, 
        handleCrearNuevaHistoria, 
        actualizarHistoria,
        handleActualizarHistoria,
        actualizarNota,
        handleActualizarNota,
        verEncargados,
        handleVerEncargados,
        handleOcultarEncargados,
        setDataFiltrada,
        verMas,
        setVerMas,
        historySelected,
    } = useContext(HistoriasState);

    //Trae el número de radicación guardado en nuestro LocalStorage
    const numeroRadicacion = getNumeroRadicacion();
   
    console.log(actualizacionEncargados)

    function handleActualizarEncargadosVerificacion() {
        if (actualizacionEncargados === true) {
           alert('Debes guardar los cambios antes de salir')
        }else {
            handleOcultarEncargados()
        }
    }
    

    const { setFechaFiltro, fechaFiltro, dataGet } = useContext(HistoriasState);
    

    function handleFiltrarFecha() {
        if(fechaFiltro === '') {
            setDataFiltrada([])
        }else{
            const dataFiltrada = dataGet?.filter((item) => {
                return (
                    formatDateToYYYYMMDD(item.fecha_entrada)  === fechaFiltro ||
                    formatDateToYYYYMMDD(item.fecha_salida)  === fechaFiltro
                )
                
            })
            setDataFiltrada(dataFiltrada)
        }
    }


    const handleFechaAfiltrar = ({ target }) => {
        const { value } = target;
        setFechaFiltro(value)
    }

    useEffect(() => {
        handleFiltrarFecha()
    }, [fechaFiltro])

    console.log(fechaFiltro)

    function handleLimpiarFiltros() {
        setFechaFiltro('')
    }

    function handleCrearNuevaHistoriaValidator() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            handleCrearNuevaHistoria();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false);
        handleOcultarEncargados()
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false);
    }



    return(
        <PrincipalPage pathActive={'Historias'}>
            <BoxContainerInputsByInfo>
                <NumeroRadicacionFechaNR>
                    <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
                </NumeroRadicacionFechaNR>
                <TitleSectionInfo text='Filtrar por fecha' />
                <PrimaryInputDate 
                    label='Ingresar Fecha de Entrada o Salida'
                    className='global_primary_input' 
                    value={fechaFiltro}
                    onChangeFn={handleFechaAfiltrar}
                    blockWriteInput={true}
                />
                <SecondaryButtonNewSmall text='Limpiar Filtros' onClick={handleLimpiarFiltros} />
                {/*<button className='trash' onClick={handleLimpiarFiltros}><TrashIcon className='trash__icon' /></button>*/}
            </BoxContainerInputsByInfo>
            
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Etapas' />
                {/*<SecondaryButtonNewSmall text='Actualizar Historial' onClick={handleActualizarHistoria} />*/}
                <SecondaryButtonNewSmall text='Ver Encargados' onClick={handleVerEncargados} />
                <PrimaryButtonNewSmall backgroundColor='#D7A100' text='Ingresar Etapas' onClick={handleCrearNuevaHistoria} />
            </ContainerTitleButtonsAddData>
                    {/*<section className='global-section-all '>
                        <article className='global-article-tabla-observaciones'>
                            <PrimaryContainerFilters>
                            <PrimaryInputDate 
                                    className='global_primary_input' 
                                    value={fechaFiltro}
                                    onChangeFn={handleFechaAfiltrar}
                                    blockWriteInput={true}
                                />
                                
                                

                            </PrimaryContainerFilters>
                            
                        </article>
                    </section> */}
                    
                    <LogicaTablaHistorias />
                  

                    {/*<ContainerButtonsBackandNext>
                        <PrimaryButtonNewSmall text={'Encargados Curaduria'} onClick={handleVerEncargados} />
                    </ContainerButtonsBackandNext>*/}

                   {/* <section className='global-section-all observgaciones-buttons-section'>
                        <article className='observaciones-buttons'>
                            {/*<button onClick={handleActualizarHistoria} className='global-button-save'>Actualizar Historial</button>
                            <button onClick={handleActualizarNota} className='global-button-save'>Notas Historia</button>
                            
                        </article>
                    </section>*/}

                    {
                        crearNuevaHistoria && <Modal> <FormularioCrearNuevaHistoria /> </Modal>
                    }
                    {
                        actualizarHistoria && <Modal> <FormActualizarFechasalida /> </Modal>
                    }
                    {
                        actualizarNota && <Modal> <FormActualizarNota /> </Modal>
                    }
                    {
                        verEncargados && 
                        <Modal>
                                <FormularioEncargados propfunctionCloseModal={handleCrearNuevaHistoriaValidator} />
                                {
                                    abandonandoTramiteModal && (
                                        <Modal>
                                            <BoxAlertNotificationleave
                                                title="¿Estás seguro de abandonar el proceso?"
                                                message="Si abandonas el proceso sin antes guardar, no se guardaran los encargados."
                                                alt="Imagen de alerta"
                                                onClick={handleAbandonarProcesoModal}
                                                textButton="Abandonar"
                                                textButton2="Cancelar"
                                                onClickCancel={handleCancelar}
                                                image={warning}
                                            />
                                        </Modal>
                                    )
                                }
                           
                        </Modal>
                    }
                    {
                        verMas && (
                            <Modal>
                                <ModalBasicNew title='Historia' propFunctionCloseModal={() => setVerMas(false)}>
                                    <BoxContainerInputsByInfoBigScroll>
                                        <ContainerTetxtPlain title='Número de Radicación' text={historySelected.numero_radicacion} />
                                        <ContainerTetxtPlain title='Etapa' text={historySelected.etapa} />
                                        <ContainerTetxtPlain title='Sub Etapa' text={historySelected.subetapa} />
                                        <ContainerTetxtPlain title='Responsable' text={historySelected.responsable} />
                                        <ContainerTetxtPlain title='Fecha de Entrada' text={formatDateToYYYYMMDD(historySelected.fecha_entrada)} />
                                        <ContainerTetxtPlain title='Fecha de Salida' text={formatDateToYYYYMMDD(historySelected.fecha_salida)} />
                                        <ContainerTetxtPlain title='Notas' text={historySelected.notas} />
                                        <ContainerTetxtPlain title='Finalizado Por' text={historySelected.finalizado_por} />
                                        <ContainerTetxtPlain title='Iniciado Por' text={historySelected.iniciado_por} />


                                    </BoxContainerInputsByInfoBigScroll>

                                    <ContainerButtonsBackandNext>
                                        <PrimaryButtonNewSmall onClick={() => handleActualizarNota()} text='Editar Notas' />
                                        <PrimaryButtonNewSmall onClick={() => handleActualizarHistoria()} text='Actualizar Fecha de Salida' />
                                    </ContainerButtonsBackandNext>

                                </ModalBasicNew>
                            </Modal>
                        )
                    }

        </PrincipalPage>
    )
}

export default Historias
