import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import PrimaryButton from '../../Components/PrimaryButton'
import { useFetchGet } from '../../Hooks/useFetchGet'
import { urlBase } from '../../Utils/UrlData'
import { AuthContextState } from '../../Context/AuthContextContext'
import { useFetchPost } from '../../Hooks/useFetchPost'
import { useFetchDelete } from '../../Hooks/useFetchDelete'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './configuracion.scss'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import Modal from '@/Components/Modal'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import { Input } from '@/Components/Atoms/Input/Input'
import { XMarkIcon } from '@heroicons/react/24/outline'

function Configuracion() {

    const { valorConfiguracion } = useContext(GlobalState);
    const { token } = useContext(AuthContextState);

    const urlCimentacion = `${urlBase}listas/cimentacion/`;
    const urlEstructura = `${urlBase}listas/estructura/`;
    const urlDiseno = `${urlBase}listas/diseno/`;
    const urlSismico = `${urlBase}listas/sismico/`;
    const urlCodigoCIIU = `${urlBase}listas/ciiu/`;
    const [ url, setUrl ] = useState('');

    useEffect(() => {
        if (valorConfiguracion === 'cimentacion') {
            setUrl(urlCimentacion)
        }
        if (valorConfiguracion === 'estructura') {
            setUrl(urlEstructura)
        }
        if (valorConfiguracion === 'diseño') {
            setUrl(urlDiseno)
        }
        if (valorConfiguracion === 'sismico') {
            setUrl(urlSismico)
        }
        if (valorConfiguracion === 'codigoCIIU') {
            setUrl(urlCodigoCIIU)
        }

    }, [valorConfiguracion]);



    const { dataGet: dataDinamica, refetchGet } = useFetchGet(token, `${url}`, '');

    const initialValuesCimentacion = {
        valor: ''
    }
    const [ valuesCimentacion, setValuesCimentacion ] = useState(initialValuesCimentacion);

    function handleChangeOption({ target }) {
        const { name, value } = target;
        setValuesCimentacion({
            ...valuesCimentacion,
            [name]: value
        })
    }

    console.log('dataDinamica', dataDinamica);

    const { fetchPost } = useFetchPost(token, `${url}`, valuesCimentacion);

    function handleAddOption() {
        fetchPost(refetchGet);
        setValuesCimentacion(initialValuesCimentacion);
    }

    const { fetchDelete } = useFetchDelete(token, `${url}`, '');

    function handleDeleteCimentacion(id) {
        fetchDelete(id, refetchGet);
    }

    console.log(url)

    const [ addOption, setAddOption ] = useState(false);


    return (
        <PrincipalPage pathActive={`Parametrización: ${valorConfiguracion}`}>
            <BoxContainerInputsByInfo>
                <TitleSectionInfo text={`Parametrización: ${valorConfiguracion}`} />
            </BoxContainerInputsByInfo> 
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Nueva Opción' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Opción'}
                    onClick={() => setAddOption(true)}
                />
            </ContainerTitleButtonsAddData>
            <div className='configuraciontabla'>
                <table className='configuraciontabla__table'>
                    <thead className='configuraciontabla__table__thead'>
                        <tr className='configuraciontabla__table__thead__tr'>
                            <th className='configuraciontabla__table__thead__tr__th'>Valor</th>
                            <th className='configuraciontabla__table__thead__tr__th'>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className='configuraciontabla__table__tbody'>
                        {
                            dataDinamica && dataDinamica.map((item, index) => {
                                return (
                                    <tr key={index} className='configuraciontabla__table__tbody__tr'>
                                        <td className='configuraciontabla__table__tbody__tr__td'>{item.valor}</td>
                                        <td className='configuraciontabla__table__tbody__tr__td'>
                                            <button className='configuraciontabla__table__tbody__tr__td__button-eliminar' onClick={() => handleDeleteCimentacion(item.id)}>
                                                <XMarkIcon className='configuraciontabla__table__tbody__tr__td__button-eliminar__icon' />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>

            </div>
            {
                addOption &&
                    <Modal>
                        <ModalBasicNew title='Agregar Nueva Opción' propFunctionCloseModal={() => setAddOption(false)}>
                            <BoxContainerInputsByInfoBigScroll>
                                <Input 
                                    textlabel='Valor'
                                    name='valor'
                                    value={valuesCimentacion.valor}
                                    onChange={handleChangeOption}
                                    placeholder='Ingresar valor' 
                                />
                            </BoxContainerInputsByInfoBigScroll>
                            <ContainerButtonsBackandNext>
                                <PrimaryButtonNewSmall text='Guardar Opción' onClick={handleAddOption} />
                            </ContainerButtonsBackandNext>
                        </ModalBasicNew>
                    </Modal>
                    
            }

        </PrincipalPage>
    )
}

export default Configuracion
