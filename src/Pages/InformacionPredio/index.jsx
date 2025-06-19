import { useContext, useEffect } from 'react'
import TablaInformacionPredio from './Components/TablaInformacionPredio'
import { InformacionPredioProvider } from './Context/InformacionPredioContext'
import './informacionpredio.scss'
import { GlobalState } from '../../Context/GlobalContext'
import { useServicesPost } from '../../Hooks/useServicesPost'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import { useServicesGet } from '../../Hooks/useServicesGet'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import PrimaryButton from '@/Components/PrimaryButton'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import ContainerInputsNRNew from '@/Components/Atoms/ContainerInputsNRNew'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall'
import ContainerTextSmall from '@/Components/Atoms/ContainerTextSmall'

function InformacionPredio() {
    return (
        <>
            <InformacionPredioProvider>
                <InformacionPredioContent />
            </InformacionPredioProvider>
        </>
    )
}

function InformacionPredioContent() {

    const { dataPredioCreacion, globalIdVecinos, globalNumeroRadicacion, informacionRadicacion } = useContext(GlobalState);
    const { fetchPostCrearComunicado, fetchPostObtenerIdVecinos } = useServicesPost();
    const { navigateToMenu, navigateToEstadoRequisitos, navigateToAgregarNuevoPredio } = useNavigateProvider();
    const { fetchInformacionDeRadicacion } = useServicesGet();

    const numeroRadicacion = localStorage.getItem('numeroRadicacionLocalStorage');
    const numeroRadicacionParse = {
        "numero_radicacion": numeroRadicacion
    }

    console.log(numeroRadicacion);

    useEffect(() => {
        fetchPostObtenerIdVecinos(numeroRadicacionParse);
    }, [numeroRadicacion])
    


    console.log(dataPredioCreacion);
    console.log(globalIdVecinos);

    const dataPostCrearComunicado = {
        "num_radicacion": numeroRadicacion,
        "id_vecinos": globalIdVecinos.id_vecinos
    }

    console.log(dataPostCrearComunicado);

    async function handleCrearComunicado() {
        try {
            const respuesta = await fetchPostCrearComunicado(dataPostCrearComunicado);

            if (respuesta) {
                window.open(`https://apiv1.deltapro.com.co/deltacu/docs?filename=${respuesta.file_path}`, '_blank');
            }else {
                alert('No se pudo generar el comunicado');
            }

        } catch (error) {
            console.log('Error al crear el comunicado', error);
        }
    }

    useEffect(() => {
        fetchInformacionDeRadicacion(globalNumeroRadicacion);
    }, [globalNumeroRadicacion])

    console.log(informacionRadicacion.numero_radicacion);

    useEffect(() => {
        if(dataPostCrearComunicado.num_radicacion) {
        localStorage.setItem('numeroRadicacionLocalStorage', dataPostCrearComunicado.num_radicacion);
        }
    }, [dataPostCrearComunicado.num_radicacion])
    

    function handleClick() {
        navigateToEstadoRequisitos();
    }

    function handleAgregarNuevoPredio(){
        navigateToAgregarNuevoPredio();
    }




        
    return (
        <PrincipalPage pathActive={'Informacion Predio'}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={dataPredioCreacion.numero_radicacion} />
            </NumeroRadicacionFechaNR>
            <ContainerTextSmall>

           
                <BoxContainerInputsByInfo>
                    <ContainerTetxtPlain title='Dirección Actual' text={dataPredioCreacion.direccion_actual} />
                    <ContainerTetxtPlain title='Dirección Anterior' text={dataPredioCreacion.direccion_anterior === null ? 'Sin Registro' : dataPredioCreacion.direccion_anterior} />
                    <ContainerTetxtPlain title='Matricula Inmobiliaria' text={dataPredioCreacion.matricula_inmobiliaria === null ? 'Sin Registro' : dataPredioCreacion.matricula_inmobiliaria} />
                    <ContainerTetxtPlain title='Numero Catastral' text={dataPredioCreacion.numero_catastral === null ? 'Sin Registro' : dataPredioCreacion.numero_catastral} />
                    <ContainerTetxtPlain title='Clasificacion Suelo' text={dataPredioCreacion.clasificacion_suelo === null ? 'Sin Registro' : dataPredioCreacion.clasificacion_suelo} />
                    <ContainerTetxtPlain title='Barrio' text={dataPredioCreacion.barrio === null || dataPredioCreacion.barrio === '' ? 'Sin Registro' : dataPredioCreacion.barrio} />
                    <ContainerTetxtPlain title='Comuna' text={dataPredioCreacion.comuna === null ? 'Sin Registro' : dataPredioCreacion.comuna} />
                    <ContainerTetxtPlain title='Estrato' text={dataPredioCreacion.estrato === null ? 'Sin Registro' : dataPredioCreacion.estrato} />
                </BoxContainerInputsByInfo>
                <BoxContainerInputsByInfo>
                    <ContainerTetxtPlain title='Manzana' text={dataPredioCreacion.manzana === null ? 'Sin Registro' : dataPredioCreacion.manzana} />
                    <ContainerTetxtPlain title='Planimetría' text={dataPredioCreacion.planimetria === null ? 'Sin Registro' : dataPredioCreacion.planimetria} />
                    <ContainerTetxtPlain title='Cual Lote' text={dataPredioCreacion.cual === null ? 'Sin Registro' : dataPredioCreacion.cual} />
                    <ContainerTetxtPlain title='Vereda' text={dataPredioCreacion.vereda === null ? 'Sin Registro' : dataPredioCreacion.vereda} />
                    <ContainerTetxtPlain title='Sector' text={dataPredioCreacion.sector === null ? 'Sin Registro' : dataPredioCreacion.sector} />
                    <ContainerTetxtPlain title='Corregimiento' text={dataPredioCreacion.corregimiento === null ? 'Sin Registro' : dataPredioCreacion.corregimiento} />
                    <ContainerTetxtPlain title='Lote' text={dataPredioCreacion.lote === null ? 'Sin Registro' : dataPredioCreacion.lote} />
                    <ContainerTetxtPlain title='Área' text={dataPredioCreacion.area === null ? 'Sin Registro' : dataPredioCreacion.area} />
                </BoxContainerInputsByInfo>
            </ContainerTextSmall>
            
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Agregar Predio' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Predio'}
                    onClick={handleAgregarNuevoPredio}
                />
            </ContainerTitleButtonsAddData>
            <TablaInformacionPredio />
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Estado de Radicacion' onClick={handleClick} />
                <PrimaryButtonNewSmall text='Imprimir Comunicado' onClick={handleCrearComunicado} />
            </ContainerButtonsBackandNext>

            {/*<section className='informacionpredio'>
                <article className='informacionpredio__article'>
                    <h3 className='informacionpredio__article__h3'>Direccion Actual</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.direccion_actual}</p>
                </article>
                <article className='informacionpredio__article'>
                    <h3 className='informacionpredio__article__h3'>Direccion Anterior</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.direccion_anterior === null ? 'Sin Registro' : dataPredioCreacion.direccion_anterior}</p>
                </article>
            </section>
            <section className='informacionpredio'>
                <article className='informacionpredio__article'>
                    <h3 className='informacionpredio__article__h3'>Matricula Inmobiliaria</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.matricula_inmobiliaria}</p>
                </article>
                <article className='informacionpredio__article'>
                    <h3 className='informacionpredio__article__h3'>Numero Catastral</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.numero_catastral}</p>
                </article>
            </section>
            <section className='informacionpredio'>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3 '>Clasificación Suelo</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.clasificacion_suelo}</p>
                </article>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3 '>Barrio</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.barrio}</p>
                </article>
            </section>
            <section className='informacionpredio'>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3 '>Comuna</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.comuna}</p>
                </article>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3 '>Estrato</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.estrato}</p>
                </article>
            </section>
            <section className='informacionpredio'>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3'>Manzana</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.manzana}</p>
                </article>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3'>Planimetría</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.planimetria === null ? 'Sin Registro' : dataPredioCreacion.planimetria}</p>
                </article>
            </section>
            <section className='informacionpredio'>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3'>Cual Lote</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.cual === null ? 'Sin Registro' : dataPredioCreacion.cual}</p>
                </article>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3'>Vereda</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.vereda === null ? 'Sin Registro' : dataPredioCreacion.vereda}</p>
                </article>
            </section>
            <section className='informacionpredio'>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3'>Sector</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.sector === null ? 'Sin Registro' : dataPredioCreacion.sector}</p>
                </article>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3'>Corregimiento</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.corregimiento === null ?  'Sin Registro' : dataPredioCreacion.corregimiento}</p>
                </article>
            </section>
            <section className='informacionpredio'>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3'>Lote</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.lote === null ? 'Sin Registro' : dataPredioCreacion.lote}</p>
                </article>
                <article className='informacionpredio__article '>
                    <h3 className='informacionpredio__article__h3'>Área</h3>
                    <p className='informacionpredio__article__p'>{dataPredioCreacion.area === null ? 'Sin Registro' : dataPredioCreacion.area}</p>
                </article>
            </section>*/}

        </PrincipalPage>
    )
}

export default InformacionPredio
