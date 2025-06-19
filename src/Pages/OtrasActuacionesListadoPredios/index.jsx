
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './otrasactuacioneslistadopredios.scss'
import { getOtherAct } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import OtherActsTableByNumber from '@/Components/Molecules/OtherActsTableByNumber'
import { AuthContextState } from '@/Context/AuthContextContext';
import { useContext, useEffect, useState } from 'react';
import { useServiceGet } from '@/Api/useServiceGet';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { GlobalState } from '@/Context/GlobalContext';
import FormOAPredioPredio from '@/Components/Molecules/FormOAPredioPredio';
import { useServicePost } from '@/Api/useServicePost';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR';
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion';
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';


function OtrasActuacionesListadoPredios() {

    const { token } = useContext(AuthContextState);
    const { openModalAgregarPredioOA, setOpenModalAgregarPredioOA, setValorDropdown, valorDropdown, setReloadGlobal, reloadGlobal } = useContext(GlobalState);

    const oaDataRadicacion = getOtherAct()
    const oaNumeroRadicacion = oaDataRadicacion.numero_radicacion

    console.log(oaNumeroRadicacion)

    const { data, refresh } = useServiceGet(token, `https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/predios/buscar/?numero_radicacion=${oaNumeroRadicacion}`);

    const handleOpenModalAgregarPredioOA = () => {
        setOpenModalAgregarPredioOA(true);
    }
    console.log(valorDropdown)
    
    const initialDataToFetch = {
        numero_radicacion: "10101010",      
        direccion_actual: "",
        direccion_anterior: "",
        matricula_inmobiliaria: "",
        numero_catastral: "",
        barrio: "",
        comuna: "",
        estrato: ""
    }

    useEffect(() => {
        setDataToFetch({...dataToFetch, barrio: valorDropdown})
    }, [valorDropdown])

    const [ dataToFetch, setDataToFetch ] = useState(initialDataToFetch)

    const handlegetDataFetch = ({ target }) => {
        setDataToFetch({ ...dataToFetch, [target.name]: target.value })
    }
    
    console.log(dataToFetch)

    const { executePost } = useServicePost()

    const handlePostPredio = () => {
        setReloadGlobal(true)
        executePost(token, 'https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/predios/', dataToFetch)
        setDataToFetch(initialDataToFetch)
        setValorDropdown('')
    }

    useEffect(() => {
        if (reloadGlobal) {
            refresh()
            setReloadGlobal(false)
        }
    }, [reloadGlobal])

    console.log(data)

    return (
        <PrincipalPage firstpathname={'Otras Actuaciones'} pathActive={'Listado de predios'}>
            <TitleSectionInfo text='Listado de predios' />
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={oaNumeroRadicacion} />
            </NumeroRadicacionFechaNR>
            
            <div className='div-line'></div>

            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Nuevo Predio' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Predio'}
                    onClick={handleOpenModalAgregarPredioOA}
                />
            </ContainerTitleButtonsAddData>


           
            <OtherActsTableByNumber isEdit={false} data={data} />
            {
                openModalAgregarPredioOA && 
                <Modal>
                        <FormOAPredioPredio 
                            dataToFetch={dataToFetch} 
                            setDataToFetch={handlegetDataFetch} 
                            onclickFetch={handlePostPredio}
                        />
                </Modal>
            }
        </PrincipalPage>
    )
}

export default OtrasActuacionesListadoPredios
