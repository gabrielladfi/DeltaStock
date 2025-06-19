import { ObservacionesProvider, ObservacionesState } from './Context/ObservacionesContext'
import LogicaTablaObservaciones from './Components/LogicaTablaObservaciones'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import { useContext, useEffect } from 'react'
import Modal from '../../Components/Modal'
import FormularioCrearNuevaObservacion from './Components/FormularioCrearNuevaObservacion'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import { GlobalState } from '../../Context/GlobalContext'
import { areaCategoriaObservaciones } from '../../Utils/AreaCategoriaObservaciones'
import { useFetchPost } from '../../Hooks/useFetchPost'
import { AuthContextState } from '../../Context/AuthContextContext'
import { urlBase, generarDocumentosObservaciones } from '../../Utils/UrlData'
import PrimaryButton from '../../Components/PrimaryButton'
import FormularioEncargados from '../../Components/FormularioEncargados'
import SectionClosermodals from '../../Components/SectionClosermodals'
//import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
//import { dataFirmas } from '@/Utils/dataObjetoFirmas'
import FormularioDeFirmas from './Components/FormularioDeFirmas'
import { useFirmas } from '@/Hooks/useFirmas'
import { useAccesoLimitadoestandar } from '@/Hooks/useAccesoLimitadoestandar'
import Cargando from '@/Components/Atoms/Cargando'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './observaciones.scss'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import { Input } from '@mui/material'
import PickList from '@/Components/Molecules/PickList'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import ContainerButtonsBackandNextSmall from '@/Components/Atoms/ContainerButtonsBackandNextSmall'
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'


function Observaciones() {

    const { isLoadingEstandar } = useAccesoLimitadoestandar();

    if (isLoadingEstandar) return <Cargando />;

    return (
        <>
            <ObservacionesProvider>
                <ObservacionesContent />
            </ObservacionesProvider>
        </>
    )
}

function ObservacionesContent() {

    const { firmas } = useFirmas();

    const { token } = useContext(AuthContextState);

    const { 
        //crearNuevaObservacion, 
        crearNuevaObservacionJuridica, 
        crearNuevaObservacionIngenieria, 
        crearNuevaObservacionArquitectonica, 
        //handleCrearNuevaObservacion,
        handleCrearNuevaObservacionJuridica,
        handleCrearNuevaObservacionIngenieria,
        handleCrearNuevaObservacionArquitectonica,
        //handleCloseFormularioNuevaObservacion,
        handleCloseFormularioNuevaObservacionJuridica,
        handleCloseFormularioNuevaObservacionIngenieria,
        handleCloseFormularioNuevaObservacionArquitectonica,
        setValorFiltro,
        verEncargados,
        handleVerEncargados,
        handleOcultarEncargados,
        firmarObservaciones, 
        setFirmarObservaciones
    } = useContext(ObservacionesState);

    const { categoriaObservacionSeleccionada, actualizacionEncargados } = useContext(GlobalState);

    //Trae el número de radicación guardado en nuestro LocalStorage
    const numeroRadicacion = getNumeroRadicacion();
    const { navigateToHistorias } = useNavigateProvider()


    function handleCambiarValorFiltro(e) {
        setValorFiltro(e.target.value);
    }

    console.log(categoriaObservacionSeleccionada)

    const propdataPost = {
        num_radicacion: numeroRadicacion,
        nombre_firma1: firmas[0] ? firmas[0].value : null,
        profesion_firma1: firmas[0] ? firmas[0].profesion : null,
        nombre_firma2: firmas[1] ? firmas[1].value : null,
        profesion_firma2: firmas[1] ? firmas[1].profesion : null,
        nombre_firma3: firmas[2] ? firmas[2].value : null,
        profesion_firma3: firmas[2] ? firmas[2].profesion : null,
        nombre_firma4: firmas[3] ? firmas[3].value : null,
        profesion_firma4: firmas[3] ? firmas[3].profesion : null
    }

    const { dataPost, fetchPost  } = useFetchPost(token, `${urlBase}${generarDocumentosObservaciones}`, propdataPost);

    console.log(dataPost)

    useEffect(() => {
        if(dataPost && dataPost.file_path) {
            window.open(`https://apiv1.deltapro.com.co/deltacu/docs/?filename=${dataPost.file_path}`, '_blank');
        }
    }, [dataPost])
         
    function handleActualizarEncargadosVerificacion() {
        if (actualizacionEncargados === true) {
           alert('Debes guardar los cambios antes de salir')
        }else {
            handleOcultarEncargados()
        }
    }

    function handleCloseFormualrioFirmas() {
        setFirmarObservaciones(false);
    }


    

    return(
        <PrincipalPage>   
            <BoxContainerInputsByInfo>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR> 
            {
                categoriaObservacionSeleccionada === areaCategoriaObservaciones[0].value && <TitleSectionInfo text={'Observaciones Juridicas'}/> 
            }
            {
                categoriaObservacionSeleccionada === areaCategoriaObservaciones[1].value && <TitleSectionInfo text={'Observaciones Arquitectonicas'}/> 
            }
            {
                categoriaObservacionSeleccionada === areaCategoriaObservaciones[2].value && <TitleSectionInfo text={'Observaciones de Ingenieria'}/> 
            }
                <PickList
                    label='Filtrar por Categoria'
                    options={[
                        {
                            option: areaCategoriaObservaciones[0].label,
                            value: areaCategoriaObservaciones[0].value
                        },
                        {
                            option: areaCategoriaObservaciones[1].label,
                            value: areaCategoriaObservaciones[1].value
                        },
                        {
                            option: areaCategoriaObservaciones[2].label,
                            value: areaCategoriaObservaciones[2].value
                        }
                    ]}
                    optionSelected='Ver Todas las Observaciones'
                    optionSelectedvalue='ver todo'
                    onChange={handleCambiarValorFiltro}
                />

            </BoxContainerInputsByInfo>
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                            <TitleSectionInfo text={`Agregar Observacion ${categoriaObservacionSeleccionada}`} />
                                <ContainerButtonsBackandNextSmall>
                                    <SecondaryButtonNewSmall onClick={handleVerEncargados} text='Ver Encargados'  />
                                    {
                                        categoriaObservacionSeleccionada === areaCategoriaObservaciones[0].value && <PrimaryButtonNewSmall onClick={handleCrearNuevaObservacionJuridica} backgroundColor={'#D7A100'} text='Agregar Observacion'  /> 
                                    }
                                    {
                                        categoriaObservacionSeleccionada === areaCategoriaObservaciones[1].value && <PrimaryButtonNewSmall onClick={handleCrearNuevaObservacionArquitectonica} backgroundColor={'#D7A100'} text='Agregar Observacion'  />
                                    }
                                    {
                                        categoriaObservacionSeleccionada === areaCategoriaObservaciones[2].value && <PrimaryButtonNewSmall onClick={handleCrearNuevaObservacionIngenieria} backgroundColor={'#D7A100'} text='Agregar Observacion'  />
                                    }
                                    
                                </ContainerButtonsBackandNextSmall>

                            </ContainerTitleButtonsAddData>
            
            
            
                            
                        
                    
                    
                        <LogicaTablaObservaciones />

                    <section className='global-section-all observgaciones-buttons-section'>
                        <article className='observaciones-buttons'>
                            <PrimaryButtonNewSmall text={'Firmar Observaciones'} onClick={() => setFirmarObservaciones(true)} />
                            <PrimaryButtonNewSmall text={'Historia'} onClick={navigateToHistorias} />
                            
                        </article>
                    </section>
                    {/*
                        crearNuevaObservacion && <Modal> <FormularioCrearNuevaObservacion title={'Nueva observacion General'} propArea={'juridica'} fncloseModal={handleCloseFormularioNuevaObservacion} /> </Modal>
                    */}
                    {
                        crearNuevaObservacionArquitectonica && <Modal> <FormularioCrearNuevaObservacion title={'Nueva observacion Arquitectonica'} propArea={areaCategoriaObservaciones[1].value} propAreaLabel={areaCategoriaObservaciones[1].label} fncloseModal={handleCloseFormularioNuevaObservacionArquitectonica} /> </Modal>
                    }
                    {
                        crearNuevaObservacionIngenieria && <Modal> <FormularioCrearNuevaObservacion title={'Nueva observacion Ingenieria'} propArea={areaCategoriaObservaciones[2].value} propAreaLabel={areaCategoriaObservaciones[2].label} fncloseModal={handleCloseFormularioNuevaObservacionIngenieria} /> </Modal>
                    }
                    {
                        crearNuevaObservacionJuridica && <Modal> <FormularioCrearNuevaObservacion title={'Nueva observacion Juridica'} propArea={areaCategoriaObservaciones[0].value} propAreaLabel={areaCategoriaObservaciones[0].label} fncloseModal={handleCloseFormularioNuevaObservacionJuridica}/> </Modal>
                    }
                    {
                        verEncargados && 
                        <Modal>
                            <FormularioEncargados propfunctionCloseModal={handleActualizarEncargadosVerificacion} />
                        </Modal>
                    }
                    {
                        firmarObservaciones &&
                        <Modal>
                            <FormularioDeFirmas propDataPost={propdataPost} propfunctionCloseModal={handleCloseFormualrioFirmas} propFetchPost={fetchPost} />
                        </Modal>
                        
                    }

        </PrincipalPage>
    )
}

export default Observaciones
