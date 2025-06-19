import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './administrativeact.scss'
import { getNumeroRadicacion } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import TablaPrimaria from '@/Components/TablaPrimaria';
import PrimaryInputLiquidaciones from '@/Components/Molecules/PrimaryInputLiquidaciones';
import PrimarySelectDropDown from '@/Components/Molecules/PrimarySelectDropDown';
import PrimaryButton from '@/Components/PrimaryButton';
import { useFetchGet } from '@/Hooks/useFetchGet';
import { useContext, useState } from 'react';
import { AuthContextState } from '@/Context/AuthContextContext';
import { urlBase, urlDeleteAdministrativeAct, urlGetDataAdministrativeAct, urlPostAdministrativeAct, urlPutAdministrativeAct } from '@/Utils/UrlData';
import { adapterAdministrativeAct, adapterAdministrativeActPut } from '@/Adapters/adapterAdministrativeAct';
import { handleGetDateTransform } from '@/Utils/handleInputs';
import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate';
import { useFetchPost } from '@/Hooks/useFetchPost';
import { useFetchDelete } from '@/Hooks/useFetchDelete';
import { useDataAdministrativeActRowTableStore } from '@/Store/useDataAdministrativeActRowTableStore'; 
import Modal from '@/Components/Modal';
import FormPutActAdministrative from './Components/FormPutActAdministrative';
import { useFetchPut } from '@/Hooks/useFetchPut';
import LinkQR from './Components/LinkQR';
import { typeact } from './Utils/objectsData';
import '@/Sass/_inputsLabel.scss'
import PrimaryLabeledInput from '@/Components/Molecules/PrimaryLabeledInput';
import PrimaryLabel from '@/Components/Atoms/PrimaryLabel';
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate';
import FormRegisterArea from './Components/FormRegisterArea';
import useLeaveTask from '@/Hooks/useLeaveTask';
import { GlobalState } from '@/Context/GlobalContext';
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR';
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion';
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';
import ContainerButtonsBackandNextSmall from '@/Components/Atoms/ContainerButtonsBackandNextSmall';
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import PrimaryButtonNew from '@/Components/Atoms/PrimaryButtonNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';
import { Input } from '@/Components/Atoms/Input/Input';
import PickList from '@/Components/Molecules/PickList';


function AdministrativeAct() {

    const { act, setAct, updateDataAct, handleChangePutAct, handlePutDateTransform } = useDataAdministrativeActRowTableStore();
    const { setIniciandoProceso } = useContext(GlobalState);
    const [ upDateAct, setUpDateAct ] = useState(false);
    const [ registerArea, setRegisterArea ] = useState(false);
    const [ postAct, setPostAct ] = useState(false);

    const { token } = useContext(AuthContextState)
    const numeroRadicacion = getNumeroRadicacion();

    const columns = [
        {id: 0, titleColumn: 'ID'},
        {id: 1, titleColumn: 'No. Acto Administrativo'},
        {id: 2, titleColumn: 'Fecha Expedición'},
        {id: 3, titleColumn: 'Fecha Ejecucion'},
        {id: 4, titleColumn: 'Vigencia'},
        {id: 5, titleColumn: 'Fecha Vigencia'},
        {id: 6, titleColumn: 'Tipo Acto'},
        {id: 7, titleColumn: 'Motivo Acto Administrativo'},
        {id: 8, titleColumn: 'Razon Publicado'},
        {id: 9, titleColumn: 'Fecha Edicto'},
        {id: 10, titleColumn: 'Tipo de Documento'},
        {id: 11, titleColumn: 'Link QR'},
    ]

    {/*const typeact = [
        {id: 1, name: 'Aprovación'},
        {id: 2, name: 'Negación'},
        {id: 3, name: 'Revocatoria'},
        {id: 4, name: 'Aclaración'},
        {id: 5, name: 'Prorroga'},
        {id: 6, name: 'Reposición'},
        {id: 7, name: 'Desistimiento'},
    ];*/}

    const publicRazon = [
        {id: 1, value: 'Razon 1', option: 'Razon 1'},
        {id: 2, value: 'Razon 2', option: 'Razon 2'},
        {id: 3, value: 'Razon 3', option: 'Razon 3'},
        {id: 4, value: 'Razon 4', option: 'Razon 4'},
        {id: 5, value: 'Razon 5', option: 'Razon 5'},
    ];

    const adminActMotivo = [
        {id: 1, value: 'Motivo 1', option: 'Motivo 1'},
        {id: 2, value: 'Motivo 2', option: 'Motivo 2'},
        {id: 3, value: 'Motivo 3', option: 'Motivo 3'},
        {id: 4, value: 'Motivo 4', option: 'Motivo 4'},
        {id: 5, value: 'Motivo 5', option: 'Motivo 5'},
    ];

    const typeDocument = [
        {id: 1, value: 'Cédula', option: 'Cédula'},
        {id: 2, value: 'Nit', option: 'Nit'},
        {id: 3, value: 'Pasaporte', option: 'Pasaporte'},
        {id: 4, value: 'Cédula de Extranjería', option: 'Cédula de Extranjería'},
    ];

    const { dataGet, refetchGet } = useFetchGet(token, `${urlBase}${urlGetDataAdministrativeAct}`, numeroRadicacion);

    const dataActAdaper = adapterAdministrativeAct(dataGet);

    console.log(dataActAdaper);

    //Get the current year
    const currentDate = new Date();
    const currentYear =  currentDate.getFullYear();


    //Post data for the new act 
    const initialDataNewAct = {
        numero_radicacion: numeroRadicacion,
        numero_acto: "",
        fecha_expedicion: "",
        fecha_ejecucion: "",
        fecha_vigencia: "",
        vigencia: currentYear,
        tipo_acto: "",
        razon_publicado: "",
        fecha_edicto: "",
        tipo_documento: "",
        link: "https://curaduriaurbana2smta.com/"
    }

    const [ dataNewAct, setDataNewAct ] = useState(initialDataNewAct);

    function handleChangeNewAct({ target }) {
        const { name, value } = target;
        setDataNewAct({
            ...dataNewAct,
            [name]: value
        })
    }

    console.log(dataNewAct);

    const { fetchPost } = useFetchPost(token, `${urlBase}${urlPostAdministrativeAct}`, dataNewAct);

    async function handlePostNewAct() {
        await fetchPost(refetchGet);
        setDataNewAct(initialDataNewAct);
        setIniciandoProceso(false);
    }


    //delete the act administrative flow
    
    const { fetchDelete } = useFetchDelete(token, `${urlBase}${urlDeleteAdministrativeAct}`);

    async function handleDeleteAct(e, id) {
        e.stopPropagation();
        await fetchDelete(id, refetchGet);
        setShowModalVerMas(false);
    }

    function getDataRowTable(data) {
        setAct(adapterAdministrativeActPut(data));
        updateDataAct("numero_radicacion", numeroRadicacion);
        setUpDateAct(true);
        
    }

    console.log(act);

    const { fetchPut } = useFetchPut(token, `${urlBase}${urlPutAdministrativeAct}`, act);

    function handlePutAct() {
        fetchPut(act.id, refetchGet);
        setUpDateAct(false);
        setShowModalVerMas(false);
    }

    function handleClosedModal() {
        setUpDateAct(false);
    }

    const [ generateQR, setGenerateQR ] = useState(false);

    function handleGenerateQR() {
        setGenerateQR(true);
    }

    function handleClosedModalQR() {
        setGenerateQR(false);
    }

    const LinkToQR = 'https://www.youtube.com/results?search_query=autocalls+'

    const { handlefnmenu } = useLeaveTask()

    const [ actSelected, setActSelected ] = useState(null);
    const [ showModalVerMas, setShowModalVerMas ] = useState(false);

    function handleSelectAct(act) {
        setActSelected(act);
        setShowModalVerMas(true);
    }

    return (
        <PrincipalPage pathActive={'Acto Administrativo'} handlefnmenu={handlefnmenu}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Acto Administrativo' />
                <ContainerButtonsBackandNextSmall>
                    <SecondaryButtonNewSmall text='Registrar Areas' onClick={() => setRegisterArea(true)}/>
                    <PrimaryButtonNewSmall backgroundColor={'#D7A100'} text='Crear Acto Administrativo' onClick={() => setPostAct(true)} />
                </ContainerButtonsBackandNextSmall>

            </ContainerTitleButtonsAddData>

            <div className='administrativeactcontainertable'>
                <table className='administrativeactcontainertable__table'>
                    <thead className='administrativeactcontainertable__table__thead'>
                        <tr className='administrativeactcontainertable__table__thead__tr'>
                            <th className='administrativeactcontainertable__table__thead__tr__th--one'>No. Acto Administrativo</th>
                            <th className='administrativeactcontainertable__table__thead__tr__th--two'>Razon Publicado</th>
                            <th className='administrativeactcontainertable__table__thead__tr__th--three'>Ver Mas</th>
                        </tr>
                    </thead>
                    <tbody className='administrativeactcontainertable__table__tbody'>
                        {dataActAdaper.map((act) => (
                            <tr key={act.id} className='administrativeactcontainertable__table__tbody__tr'>
                                <td className='administrativeactcontainertable__table__tbody__tr__td-one'>{act.numeroActo}</td>
                                <td className='administrativeactcontainertable__table__tbody__tr__td-two'>{act.razonPublicado}</td>
                                <td className='administrativeactcontainertable__table__tbody__tr__td-three'>
                                    <button onClick={() => handleSelectAct(act)} className='administrativeactcontainertable__table__tbody__tr__td-three__button'>Ver Mas</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/*<TablaPrimaria propColumns={columns} propData={dataActAdaper} propDelete={true} propFnDelete={handleDeleteAct} propRowData={getDataRowTable} />*/}


        
            <ContainerButtonsBackandNext>
                {/*<PrimaryButtonNewSmall textButton='Notificar' />*/}
                <PrimaryButtonNewSmall onClick={handleGenerateQR} text='Generar QR' />
            </ContainerButtonsBackandNext>

            {
                showModalVerMas &&
                <Modal> 
                    <ModalBasicNew title='Acto Administrativo' propFunctionCloseModal={() => setShowModalVerMas(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <ContainerTetxtPlain title='No. Acto' text={actSelected.numeroActo} />
                            <ContainerTetxtPlain title='No. Radicación' text={numeroRadicacion} />
                            <ContainerTetxtPlain title='Fecha de Expedición' text={actSelected.fechaExpedicion} />
                            <ContainerTetxtPlain title='Fecha de Ejecución' text={actSelected.fechaEjecucion} />
                            <ContainerTetxtPlain title='Vigencia' text={actSelected.fechaVigencia} />
                            <ContainerTetxtPlain title='Tipo de Acto' text={actSelected.tipoActo} />
                            <ContainerTetxtPlain title='Motivo Acto Administrativo' text={actSelected.motivoActoAdministrativo} />
                            <ContainerTetxtPlain title='Razon Publicado' text={actSelected.razonPublicado} />
                            <ContainerTetxtPlain title='Fecha Edicto' text={actSelected.fechaEdicto} />
                            <ContainerTetxtPlain title='Tipo de Documento' text={actSelected.tipoDocumento} />
                            <ContainerTetxtPlain title='Link QR' text={actSelected.linkQR} />
                            

                        </BoxContainerInputsByInfoBigScroll>
                        <ContainerButtonsBackandNext>
                            <SecondaryButtonNewSmall onClick={(e) => handleDeleteAct(e, actSelected.id)} text='Eliminar' />
                            <PrimaryButtonNewSmall onClick={() => getDataRowTable(actSelected)} text='Editar' />
                        </ContainerButtonsBackandNext>
                    </ModalBasicNew>
                </Modal>
            }

            {
                postAct &&
                <Modal>
                    <ModalBasicNew title='Crear Acto Administrativo' propFunctionCloseModal={() => setPostAct(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <Input 
                                textlabel='No. Acto Administrativo *'
                                placeholder='No. Acto Administrativo'
                                regexOptions={/^[0-9a-zA-Z-]+$/}
                                name='numero_acto'
                                onChange={handleChangeNewAct}
                                value={dataNewAct.numero_acto}
                            />
                            {/*<PrimaryInputLiquidaciones labelText='No. Acto Administrativo *' propName='numero_acto' propFnInput={handleChangeNewAct} propValue={dataNewAct.numero_acto} />*/}
                            {/*<PrimaryInputLiquidaciones 
                                labelText='Fecha de Expedicion:' 
                                propType={'date'} 
                                propName='fecha_expedicion' 
                                propFnInput={(e) => handleGetDateTransform(e, setDataNewAct)} 
                                propValue={formatDateToYYYYMMDD(dataNewAct.fecha_expedicion)} 
                            />*/}
                    
                       
                            <PrimaryInputDate 
                                label='Fecha de Expedicion *'
                                className='global_primary_input'
                                value={formatDateToYYYYMMDD(dataNewAct.fecha_expedicion)} 
                                onChangeFn={(e) => handleGetDateTransform(e, setDataNewAct)} 
                                name='fecha_expedicion'
                                blockWriteInput={true}
                            />

                            <Input 
                                textlabel='Vigencia *'
                                placeholder='Vigencia'
                                regexOptions={/^[0-9a-zA-Z-]+$/}
                                name='vigencia'
                                onChange={handleChangeNewAct}
                                value={dataNewAct.vigencia}
                            />

                            <PickList 
                                label='Tipo de Acto *'
                                placeholder='Tipo de Acto'
                                regexOptions={/^[0-9a-zA-Z-]+$/}
                                options={typeact}
                                name='tipo_acto'
                                onChange={handleChangeNewAct}
                                value={dataNewAct.tipo_acto}
                                optionSelected='Seleccione un tipo de acto'
                            />

                            <PickList 
                                label='Motivo Acto Admin *'
                                placeholder='Motivo Acto Admin'
                                regexOptions={/^[0-9a-zA-Z-]+$/}
                                options={adminActMotivo}
                                name='motivo_acto_administrativo'
                                onChange={handleChangeNewAct}
                                value={dataNewAct.motivo_acto_administrativo}
                                optionSelected='Seleccione un motivo'
                            />
                    {/*<PrimaryInputLiquidaciones labelText='Vigencia *' propName='vigencia' propFnInput={handleChangeNewAct} propValue={dataNewAct.vigencia} />*/}
                    {/*<PrimarySelectDropDown labelText='Tipo de Acto *' propOptions={typeact} propName='tipo_acto' propFnInput={handleChangeNewAct} propValue={dataNewAct.fecha_edicto.tipo_acto} />*/}
                    {/*<PrimarySelectDropDown labelText='Motivo Acto Admin *' propOptions={adminActMotivo} />*/}
                    {/*<PrimaryInputLiquidaciones labelText={'Area *'} propValue={'440'} />
                    <PrimaryInputLiquidaciones labelText={'Area Construida *'} propValue={'425'} />*/}

                    <PickList 
                        label='Razon Publicado *'
                        placeholder='Razon Publicado'
                        regexOptions={/^[0-9a-zA-Z-]+$/}
                        options={publicRazon}
                        name='razon_publicado'
                        onChange={handleChangeNewAct}
                        value={dataNewAct.razon_publicado}
                        optionSelected='Seleccione una razon'
                    />
                
                
                    {/*<PrimarySelectDropDown labelText='Razon Publicado *' propOptions={publicRazon} propName='razon_publicado' propFnInput={handleChangeNewAct} propValue={dataNewAct.razon_publicado} />*/}
                    
                        <PrimaryInputDate 
                            label='Fecha Edicto *'
                            className={'global_primary_input'}
                            value={formatDateToYYYYMMDD(dataNewAct.fecha_edicto)}
                            onChangeFn={(e) => handleGetDateTransform(e, setDataNewAct)}
                            name={'fecha_edicto'}
                            blockWriteInput={true}
                        />
                    {/*eliminar<PrimaryInputLiquidaciones labelText='Fecha Edicto:' propType={'date'} propName='fecha_edicto' propFnInput={(e) => handleGetDateTransform(e, setDataNewAct)} propValue={formatDateToYYYYMMDD(dataNewAct.fecha_edicto)} />*/}
                    
                        <PrimaryInputDate 
                            label='Fecha Ejecucion *'
                            className={'global_primary_input'}
                            value={formatDateToYYYYMMDD(dataNewAct.fecha_ejecucion)}
                            onChangeFn={(e) => handleGetDateTransform(e, setDataNewAct)}
                            name={'fecha_ejecucion'}
                            blockWriteInput={true}
                        />
                    
                    {/*eliminar<PrimaryInputLiquidaciones labelText='Fecha Ejecucion:' propType={'date'} propName='fecha_ejecucion' propFnInput={(e) => handleGetDateTransform(e, setDataNewAct)} propValue={formatDateToYYYYMMDD(dataNewAct.fecha_ejecucion)} />*/}
                    
                        <PrimaryInputDate 
                            label='Fecha Vigencia *'
                            className={'global_primary_input'}
                            value={formatDateToYYYYMMDD(dataNewAct.fecha_vigencia)}
                            onChangeFn={(e) => handleGetDateTransform(e, setDataNewAct)}
                            name={'fecha_vigencia'}
                            blockWriteInput={true}
                        />

                        <PickList 
                            label='Tipo de Documento *'
                            placeholder='Tipo de Documento'
                            regexOptions={/^[0-9a-zA-Z-]+$/}
                            options={typeDocument}
                            name='tipo_documento'
                            onChange={handleChangeNewAct}
                            value={dataNewAct.tipo_documento}
                            optionSelected='Seleccione un tipo de documento'
                        />

                        <Input 
                            textlabel='Link QR *'
                            placeholder='Link QR'
                            regexOptions={/^[0-9a-zA-Z-]+$/}
                            name='link'
                            onChange={handleChangeNewAct}
                            value={dataNewAct.link}
                            readOnly={true}
                        />
                    
                    {/*eliminar<PrimaryInputLiquidaciones labelText='Fecha Vigencia' propType={'date'} propName='fecha_vigencia' propFnInput={(e) => handleGetDateTransform(e, setDataNewAct)} propValue={formatDateToYYYYMMDD(dataNewAct.fecha_vigencia)} />*/}     
                    {/*<PrimarySelectDropDown labelText='Tipo de Documento *' propOptions={typeDocument} propName='tipo_documento' propFnInput={handleChangeNewAct} propValue={dataNewAct.tipo_documento} />*/}
                    {/*<PrimaryInputLiquidaciones labelText='Link QR *' propName='link' propFnInput={handleChangeNewAct} propValue={dataNewAct.link} />*/}
                    

                        </BoxContainerInputsByInfoBigScroll>
                        <ContainerButtonsBackandNext>
                            <PrimaryButtonNewSmall onClick={handlePostNewAct} text='Publicar' />
                        </ContainerButtonsBackandNext>
                    </ModalBasicNew>
                    

                </Modal>
            }
            

            {
                upDateAct && <Modal>
                    <FormPutActAdministrative 
                        typeact={typeact} 
                        publicRazon={publicRazon} 
                        adminActMotivo={adminActMotivo} 
                        typeDocument={typeDocument}
                        dataPutAct={act}
                        setDataPutAct={setAct}
                        handleChangeNewAct={handleChangePutAct}
                        handleGetDateTransform={handlePutDateTransform}
                        handlePutAct={handlePutAct}
                        fnCloseModal={handleClosedModal}
                    />
                </Modal>
            }

            {
                generateQR && 
                    <Modal>
                        <LinkQR propFnCloseModal={handleClosedModalQR} propLink={LinkToQR} />
                    </Modal>
            }

            {
                registerArea &&
                <Modal>
                    <FormRegisterArea numeroRadicacion={numeroRadicacion} onClose={() => setRegisterArea(false)} />
                </Modal>
            }
        </PrincipalPage>
    )
}

export default AdministrativeAct
