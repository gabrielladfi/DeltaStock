
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import './formoanuevotramite.scss'
import PrimaryButton from '@/Components/PrimaryButton'
import { useServicePost } from '@/Api/useServicePost'
import { useContext, useState } from 'react'
import { AuthContextState } from '@/Context/AuthContextContext'
import PrimaryInputWithOutValidator from '@/Components/Atoms/PrimaryInputWithOutValidator'
import { optionsTypeProcess } from '@/Utils/dataInputNuevoTramiteOtrosActos'
import { useServiceGet } from '@/Api/useServiceGet'
import { urlBase } from '@/Utils/UrlData'
import { adapterCodigosCiiu } from '@/Adapters/adapterCodigosCiiu'
import { GlobalState } from '@/Context/GlobalContext'
import ContainerInputsNRNew from '@/Components/Atoms/ContainerInputsNRNew'
import ContainerButtonsBackandNextSmall from '@/Components/Atoms/ContainerButtonsBackandNextSmall'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import { Input } from '@/Components/Atoms/Input/Input'
import PickList from '../PickList'

function FormOANuevoTramite() {

    const { setIniciandoProceso } = useContext(GlobalState);
    const { token } = useContext(AuthContextState);

    const {
        executePost 
    } = useServicePost();

    const initialDataPost = {
        numero_radicacion: "10101010",
        typo_tramite: "",
        uso_especifico: "",
        otros_usos: "",
        area_residencial: 0,
        is_horizontal: false,
        is_ccomercial: false
    }

    const [dataPost, setDataPost] = useState(initialDataPost);

    const urlCodigoCIIU = `${urlBase}listas/ciiu/`;


    const { data } = useServiceGet(token, urlCodigoCIIU);

    console.log(adapterCodigosCiiu(data));

    console.log('data CIIU', data);

    console.log(dataPost);

    const optionsYesorNo = [
        {
            value: true,
            option: 'Si'
        },
        {
            value: false,
            option: 'No'
        }
    ];

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setDataPost({
            ...dataPost,
            [name]: value
        })
    }

    const handlePost = async () => {
        await executePost(token, 'https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/radicacion/', dataPost);
        setDataPost(initialDataPost);
        setIniciandoProceso(false);
    }


    return (
       <>
            <ContainerInputsNRNew>
                <BoxContainerInputsByInfo>
                    <PickList 
                        label='Tipo de Trámite *'
                        name='typo_tramite'
                        value={dataPost.typo_tramite}
                        onChange={handleChange}
                        optionSelected='Seleccione un tipo de trámite'
                        options={optionsTypeProcess}
                    />
                    <Input 
                        onChange={handleChange} 
                        name={'uso_especifico'} 
                        value={dataPost.uso_especifico}  
                        textlabel='Uso Específico *' 
                        placeholder='Ingrese el uso específico'
                    />
                    <Input 
                        onChange={handleChange} 
                        name={'otros_usos'} 
                        value={dataPost.otros_usos}  
                        textlabel='Otro Usos *' 
                        placeholder='Ingrese el otro uso'
                    />
                </BoxContainerInputsByInfo>
                <BoxContainerInputsByInfo>
                    <Input 
                        textlabel='Área *'
                        onChange={handleChange}
                        name={'area_residencial'} 
                        value={dataPost.area_residencial} 
                        className='form-oa-nuevo-tramite__input-number' 
                        classNameContainer='form-oa-nuevo-tramite__container-input' 
                        />
                    <PickList 
                        label='¿Es Propiedad Horizontal? *'
                        name='is_horizontal'
                        value={dataPost.is_horizontal}
                        onChange={handleChange}
                        optionSelected='Selecciona una opción'
                        options={optionsYesorNo}
                        classNameContainer='form-oa-nuevo-tramite__container-dropdown' 
                        textLabel='¿Es Propiedad Horizontal? *' 
                        propPlaceholderOption={'Selecciona una opción'}
                    />
                    <PickList 
                        label='¿Es Centro Comercial? *'
                        name='is_ccomercial'
                        value={dataPost.is_ccomercial}
                        onChange={handleChange}
                        optionSelected='Selecciona una opción'
                        options={optionsYesorNo}
                        classNameContainer='form-oa-nuevo-tramite__container-dropdown' 
                        textLabel='¿Es Centro Comercial? *' 
                        propPlaceholderOption={'Selecciona una opción'}
                    />
                    <PickList 
                        label='Selecciona el Código CIIU *'
                        name='codigo_ciiu'
                        value={dataPost.codigo_ciiu}
                        onChange={handleChange}
                        optionSelected='Selecciona una opción'
                        options={adapterCodigosCiiu(data)}
                        classNameContainer='form-oa-nuevo-tramite__container-dropdown' 
                        textLabel='Selecciona el Código CIIU *' 
                        propPlaceholderOption={'Selecciona una opción'}
                    />
                    
                </BoxContainerInputsByInfo>
           

            </ContainerInputsNRNew>
            <ContainerButtonsBackandNextSmall>  
                <PrimaryButtonNewSmall text='Guardar Nuevo Trámite' onClick={handlePost} />
            </ContainerButtonsBackandNextSmall>
            </>

       
        
    )
}

export default FormOANuevoTramite
