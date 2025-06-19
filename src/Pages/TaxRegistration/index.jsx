
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './taxregistration.scss'
import { getNumeroRadicacion } from '@/Utils/manejoLocalStorageNumeroRadicacion';
import TablaPrimaria from '@/Components/TablaPrimaria';
import PrimaryInputLiquidaciones from '@/Components/Molecules/PrimaryInputLiquidaciones';
import PrimarySelectDropDown from '@/Components/Molecules/PrimarySelectDropDown';
import PrimaryButton from '@/Components/PrimaryButton';
import { useFetchGet } from '@/Hooks/useFetchGet';
import { useContext, useState } from 'react';
import { AuthContextState } from '@/Context/AuthContextContext';
import { urlBase, urlDeleteTaxRegistration, urlGetDataTaxRegistration, urlPostTaxRegistration } from '@/Utils/UrlData';
import { adapterTaxRegistration } from '@/Adapters/adapterTaxRegistartion';
import { handleGetDateTransform } from '@/Utils/handleInputs';
import { useFetchPost } from '@/Hooks/useFetchPost';
import { useFetchDelete } from '@/Hooks/useFetchDelete';
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate';
import PrimaryLabeledInput from '@/Components/Molecules/PrimaryLabeledInput';
import PrimaryLabel from '@/Components/Atoms/PrimaryLabel';
import useLeaveTask from '@/Hooks/useLeaveTask';
import { GlobalState } from '@/Context/GlobalContext';
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR';
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion';
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall';
import TablaRegistarImpuesto from './Components/TablaRegistarImpuesto';
import Modal from '@/Components/Modal';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import PickList from '@/Components/Molecules/PickList';
import { Input } from '@/Components/Atoms/Input/Input';


function TaxRegistration() {

    const { token } = useContext(AuthContextState);
    const numeroRadicacion = getNumeroRadicacion();
    const { setIniciandoProceso } = useContext(GlobalState);
    //Columns for the table
    const columns = [
        {id: 0, titleColumn: 'ID'},
        {id: 1, titleColumn: 'Tipo'},
        {id: 2, titleColumn: 'Base'},
        {id: 3, titleColumn: 'Valor'},
        {id: 4, titleColumn: 'Sticker'},
        {id: 5, titleColumn: 'Fecha de Pago'},
        {id: 6, titleColumn: 'Fecha de Pressentacion'},
        {id: 7, titleColumn: 'A. Declaracion'},
    ]

    //Options for the select dropdown type tax
    const optionsTypeTax = [
        {id: 1, option: 'Impuesto 1', value: 'Impuesto 1'},
        {id: 2, option: 'Impuesto 2', value: 'Impuesto 2'},
        {id: 3, option: 'Impuesto 3', value: 'Impuesto 3'},
        {id: 4, option: 'Impuesto 4', value: 'Impuesto 4'},
        {id: 5, option: 'Impuesto 5', value: 'Impuesto 5'},
    ];

    //Fetch data for the table tax registration and refetch data
    const { dataGet, refetchGet } = useFetchGet(token, `${urlBase}${urlGetDataTaxRegistration}`, numeroRadicacion);

    //Adapter data for the table tax registration
    const adapterDataTaxRegistration = adapterTaxRegistration(dataGet);

    //Get the current year
    const currentDate = new Date();
    const currentYear =  currentDate.getFullYear();

    //Initial data for the new tax registration
    const initialDataNewTax = {
        numero_radicacion: numeroRadicacion,
        tipo: '',
        base: '',
        valor: '',
        numero_sticker: '',
        fecha_pago: '',
        fecha_presentacion: '',
        ano_declaracion: currentYear,
    }

    //State for the new tax registration
    const [newTax, setNewTax] = useState(initialDataNewTax);

    //Handle change for the new tax registration
    function handleChangeNewTax({ target }) {
        const { name, value } = target;
        setNewTax({
            ...newTax,
            [name]: value
        })
    }

    //Function to format the date to YYYY-MM-DD
    function formatDateToYYYYMMDD(dateString) {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    //Fetch post for the new tax registration
    const { fetchPost } = useFetchPost(token, `${urlBase}${urlPostTaxRegistration}`, newTax);

    //Handle save the new tax registration
    async function handleSaveTax() {
        await fetchPost(refetchGet);
        setNewTax(initialDataNewTax);
        setIniciandoProceso(false);
    }

    //Fetch delete for the tax registration
    const { fetchDelete } = useFetchDelete(token, `${urlBase}${urlDeleteTaxRegistration}`);

    //Handle delete tax registration
    function handleDeleteTax(e, id) {
        e.stopPropagation();
        fetchDelete(id, refetchGet);
    }

    //Not aplicate flow POST
    const dataNotAplicate = {
        numero_radicacion: numeroRadicacion,
        tipo: 'No Aplica',
        base: 'No Aplica',
        valor: 'No Aplica',
        numero_sticker: 'No Aplica',
        fecha_pago: null,
        fecha_presentacion: null,
        ano_declaracion: null,
    }

    const { fetchPost: fetchPostNotAplicate } = useFetchPost(token, `${urlBase}${urlPostTaxRegistration}`, dataNotAplicate);

    async function handleNotAplicate() {
        try {
            await fetchPostNotAplicate(refetchGet);
        }
        catch (error) {
            console.log(error);
        }
    }

    const { handlefnmenu } = useLeaveTask();

    const [ agregarImpuesto, setAgregarImpuesto ] = useState(false);
    const handleCloseModal = () => {
        setNewTax(initialDataNewTax);
        setAgregarImpuesto(false);
    }

    return (
        <PrincipalPage pathActive={'Registro de Impuestos'} handlefnmenu={handlefnmenu}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Nuevo Impuesto' />
                <SecondaryButtonNewSmall text='No Aplica' onClick={handleNotAplicate} />
                <PrimaryButtonNewSmall  
                    backgroundColor='#D7A100'
                    text={'Agregar Impuesto'}
                    onClick={() => setAgregarImpuesto(true)}
                />
            </ContainerTitleButtonsAddData>

            <TablaRegistarImpuesto dataTable={adapterDataTaxRegistration} fnDelete={handleDeleteTax} />
            

            {/*<section className='global-section-all '>
                <article className='container-title'>
                    <TablaPrimaria propColumns={columns} propData={adapterDataTaxRegistration} propDelete={true} propFnDelete={handleDeleteTax} />
                </article>
            </section>*/}


            {
                agregarImpuesto &&
                <Modal>
                    <ModalBasicNew title='Agregar Impuesto' propFunctionCloseModal={handleCloseModal}>
                        <BoxContainerInputsByInfoBigScroll>
                            <PickList 
                                optionSelected='Selecciona un tipo'
                                options={optionsTypeTax}
                                label='Tipo *'
                                value={newTax.tipo}
                                onChange={handleChangeNewTax}
                                name={"tipo"}
                            />
                            <Input 
                                textlabel='Base *'
                                value={newTax.base}
                                onChange={handleChangeNewTax}
                                name={"base"}
                                placeholder='Ingrese la base'
                            />
                            <Input 
                                textlabel='Valor *'
                                value={newTax.valor}
                                onChange={handleChangeNewTax}
                                name={"valor"}
                                placeholder='Ingrese el valor'
                            />
                            <Input 
                                textlabel='No. Sticker *'
                                value={newTax.numero_sticker}
                                onChange={handleChangeNewTax}
                                name={"numero_sticker"}
                                placeholder='Ingrese el no. sticker'
                            />
                            <PrimaryInputDate 
                                label='Fecha de Pago *'
                                value={formatDateToYYYYMMDD(newTax.fecha_pago)}
                                onChangeFn={(e) => handleGetDateTransform(e, setNewTax)}
                                name={'fecha_pago'}
                                blockWriteInput={true}

                            />
                            <PrimaryInputDate 
                                label='Fecha de Presentacion *'
                                value={formatDateToYYYYMMDD(newTax.fecha_presentacion)}
                                onChangeFn={(e) => handleGetDateTransform(e, setNewTax)}
                                name={'fecha_presentacion'}
                                blockWriteInput={true}

                            />
                        </BoxContainerInputsByInfoBigScroll>
                        <ContainerButtonsBackandNext>
                            <PrimaryButtonNewSmall text='Guardar' onClick={handleSaveTax} />     
                        </ContainerButtonsBackandNext>
                    </ModalBasicNew>
                </Modal>
            }
        </PrincipalPage>
    )
}

export default TaxRegistration
