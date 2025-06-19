
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './entradaventanilla.scss'
import { getNumeroRadicacion } from '@/Utils/manejoLocalStorageNumeroRadicacion';
import TablaPrimariaVentanilla from '@/Components/TablaPrimariaVentanilla';
import { useFetchGet } from '@/Hooks/useFetchGet';
import { useContext, useState } from 'react';
import { AuthContextState } from '@/Context/AuthContextContext';
import { urlBase, urlDeleteVentanilla, urlGetDataVentanilla, urlPostVentanilla, urlPutVentanilla } from '@/Utils/UrlData';
import { AdapterVentanilla, adapterVentanillaPut } from '@/Adapters/AdapterVentanilla';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import FormNewFile from './Components/FormNewFile';
import { useFetchPost } from '@/Hooks/useFetchPost';
import { handleGetDateTransform } from '@/Utils/handleInputs';
import { useFetchDelete } from '@/Hooks/useFetchDelete';
import { useDataVentanillaRowTableStore } from '@/Store/useDataVentanillaRowTableStore';
import { useFetchPut } from '@/Hooks/useFetchPut';
import FormStickerLogEntrada from './Components/FormStickers/FormStickerLogEntrada';
import FormStickerLogSalida from './Components/FormStickers/FormStickerLogSalida';
import { GlobalState } from '@/Context/GlobalContext';
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';
import { Input } from '@/Components/Atoms/Input/Input';
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';

function EntradaVentanilla() {

    const { setoficio, oficio, handleChangePutoficio, handlePutDateTransform } = useDataVentanillaRowTableStore();

    const [ postNewVentanilla, setPostNewVentanilla ] = useState(false);
    const [ putNewVentanilla, setPutNewVentanilla ] = useState(false);
    const [ openStickerEntrada, setOpenStickerEntrada ] = useState(false);
    const [ openStickerSalida, setOpenStickerSalida ] = useState(false);

    const numeroRadicacion = getNumeroRadicacion();
    const { token } = useContext(AuthContextState);

    const columns = [
        {id: 2, titleColumn: 'Numero de Radicacion'},
        {id: 1, titleColumn: 'Numero de Oficio'},
        {id: 3, titleColumn: 'Ver mas'},
    ];

    const columns2 = [
        {id: 1, titleColumn: 'Numero de Oficio'},
        {id: 2, titleColumn: 'Numero de Radicacion'},
        {id: 3, titleColumn: 'Nombre del Solicitante'},
        {id: 4, titleColumn: 'Asunto'},
        {id: 5, titleColumn: 'Descripcion'},
        {id: 6, titleColumn: 'Fecha'},
    ];

    function handlePostNewVentanilla() {
        setPostNewVentanilla(true);
    }

    function handleCloseModalPost() {
        setPostNewVentanilla(false);
    }

    //get flow data
    const { dataGet, refetchGet } = useFetchGet(token, `${urlBase}${urlGetDataVentanilla}`, numeroRadicacion);

    const dataAdapterVentanilla = AdapterVentanilla(dataGet);

    console.log(dataAdapterVentanilla);

    //Post flow data

    const newFile = {
        numero_radicacion: "",
        nombre_solicitante: "",
        asunto: "",
        descripcion: "",
        fecha: "",
        recibo_salida: ""
    }

    const [dataPost, setDataPost] = useState(newFile);

    function handleGetDataInputs({ target }) {
        const { name, value } = target;
        setDataPost({
            ...dataPost,
            [name]: value
        });
    }

    console.log(dataPost);

    const { fetchPost } = useFetchPost(token, `${urlBase}${urlPostVentanilla}`, dataPost);

    async function handlePostNewVentanillafile() {
        await fetchPost(refetchGet);
        setDataPost(newFile);
        setPostNewVentanilla(false);
    }

    //delete flow data

    const { fetchDelete } = useFetchDelete(token, `${urlBase}${urlDeleteVentanilla}`);

    function handleDeleteVentanilla(id, event) {
        event.stopPropagation();
        fetchDelete(id, refetchGet);
    }

    //Put flow data

    

    async function handleSelectOficioPut(item) {
        console.log(item);
        await setoficio(adapterVentanillaPut(item));
        setPutNewVentanilla(true);
    }

    function handleClosedFormPutOficio() {
        setPutNewVentanilla(false);
    }

    console.log(oficio);

    const { fetchPut } = useFetchPut(token, `${urlBase}${urlPutVentanilla}`, oficio);

    function handlePutOficio() {
        fetchPut(oficio.id, refetchGet);
        setPutNewVentanilla(false);
        setVerMas(false);
    }

    function handleOpenStickerEntrada(e, item) {
        e.stopPropagation();
        setOpenStickerEntrada(true);
        setNumeroOficio(item.numeroOficio);
    }

    const [ numeroOficio, setNumeroOficio ] = useState('');

    function handleOpenStickerSalida(e, item) {
        e.stopPropagation();
        setOpenStickerSalida(true);
        setNumeroOficio(item.numeroOficio);
    }

    const { setValorParaFiltrar, valorParaFiltrar, setVerMas } = useContext(GlobalState);

    function handleChange(e) {
        setValorParaFiltrar(e.target.value);
    }

    // Filtrar el listado de predios basado en el valorParaFiltrar
    const listadoOficiosFiltrado = dataAdapterVentanilla.filter((item) => {
        return(
            item.numeroRadicacion?.includes(valorParaFiltrar) ||
            item.fecha.includes(valorParaFiltrar) || 
            item.nombreSolicitante.includes(valorParaFiltrar) ||
            item.numeroOficio.includes(valorParaFiltrar)
        );
    });


    function handleNumeroRadicacion(num) {
       setDataPost({
           ...dataPost,
           numero_radicacion: num
       });
    }




    return (
        <PrincipalPage pathActive={'Entrada de Ventanilla'}>
            <section className='buscador-por-numero-radicacion-section-container'>   
            <BoxContainerInputsByInfo>
                <TitleSectionInfo text={`Busqueda por expediente`} />
                <Input
                    textlabel='Buscar Expediente'
                    type='text'
                    placeholder='Ingrese numero de radicacion'
                    onChange={handleChange}
                />
            </BoxContainerInputsByInfo>
            </section>
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registar Nuevo Oficio' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Oficio'}
                    onClick={handlePostNewVentanilla}
                />
            </ContainerTitleButtonsAddData>
           {/* <section className='global-section-all '>
                <article className='global-article-between'>
                    <h2 className='global-h2'>{'Registro de Oficios'}</h2>
                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Registro de Oficios</label>
                        <input onChange={handleChange} className='input-base__input' type="text" placeholder='Ingrese numero de radicacion'/>
                    </div>
                </article>
            </section>*/}
            
            <TablaPrimariaVentanilla 
                propStickerSalida={handleOpenStickerSalida} 
                propStickerEntrada={handleOpenStickerEntrada} 
                propColumns={columns} 
                propDelete={false} 
                propDataFilter={listadoOficiosFiltrado} 
                propvalorParaFiltrar={valorParaFiltrar} 
                propData={dataAdapterVentanilla} 
                propFnDelete={handleDeleteVentanilla} 
                propRowData={handleSelectOficioPut}
            />
                


            {
                postNewVentanilla && 
                <Modal>
                    <FormNewFile 
                        propFnCloseModal={handleCloseModalPost} 
                        propDataPost={dataPost} 
                        propFnBasicInput={handleGetDataInputs} 
                        propFnDateInput={ handleGetDateTransform } 
                        statePost={setDataPost} 
                        propFnPostNewFile={handlePostNewVentanillafile}
                        propAddNumRadicacion={handleNumeroRadicacion}
                    />
                </Modal>
            }

            {
                putNewVentanilla && 
                <Modal>
                    <FormNewFile 
                        propFnCloseModal={handleClosedFormPutOficio} 
                        propDataPost={oficio} 
                        propFnBasicInput={handleChangePutoficio} 
                        propFnDateInput={ handlePutDateTransform } 
                        statePost={setDataPost} 
                        propFnPostNewFile={handlePutOficio}
                        propAddNumRadicacion={handleNumeroRadicacion}
                        stateTitleForm={putNewVentanilla}
                    />
                </Modal>
            }

            {
                openStickerEntrada &&
                <Modal>
                    <FormStickerLogEntrada stateClosedForm={setOpenStickerEntrada } propNumeroOficio={numeroOficio} />
                </Modal>
               
            }

            {
                openStickerSalida &&
                <Modal>
                    <FormStickerLogSalida stateClosedForm={setOpenStickerSalida} propNumeroOficio={numeroOficio} />
                </Modal>
            }

        </PrincipalPage>
    )
}

export default EntradaVentanilla
