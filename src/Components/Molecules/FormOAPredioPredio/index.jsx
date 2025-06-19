/* eslint-disable react/prop-types */

import PrimaryInputWithOutValidator from '@/Components/Atoms/PrimaryInputWithOutValidator'
import './formoaprediopredio.scss'
import PrimaryInputNumberValidator from '@/Components/Atoms/PrimaryInputNumberValidator'
import DropdownSearch from '@/Pages/CrearNuevaSolicitudNR/Components/DropdownSearch'
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import PrimaryButton from '@/Components/PrimaryButton'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import ModalBasicNew from '../ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import { Input } from '@/Components/Atoms/Input/Input'
import PickList from '../PickList'

function FormOAPredioPredio({ onclickFetch, dataToFetch, setDataToFetch}) {

    const { setOpenModalAgregarPredioOA } = useContext(GlobalState)

    const handleCloseModalAgregarPredioOA = () => {
        setOpenModalAgregarPredioOA(false)
    }

    const dataComunas = [
        {
            id: 1,
            value: 'Comuna 1',
            option: 'Comuna 1'
        },
        {
            id: 2,
            value: 'Comuna 2',
            option: 'Comuna 2'
        },
        {
            id: 3,
            value: 'Comuna 3',
            option: 'Comuna 3'
        },
        {
            id: 4,
            value: 'Comuna 4',
            option: 'Comuna 4'
        },
        {
            id: 5,
            value: 'Comuna 5',
            option: 'Comuna 5'
        }
    ]

    const dataEstratos = [
        {
            id: 1,
            value: 'Estrato 1',
            option: 'Estrato 1'
        },
        {
            id: 2,
            value: 'Estrato 2',
            option: 'Estrato 2'
        },
        {
            id: 3,
            value: 'Estrato 3',
            option: 'Estrato 3'
        },
        {
            id: 4,
            value: 'Estrato 4',
            option: 'Estrato 4'
        },
        {
            id: 5,
            value: 'Estrato 5',
            option: 'Estrato 5'
        },
        {
            id: 6,
            value: 'Estrato 6',
            option: 'Estrato 6'
        },  
    ]

    return (
        <ModalBasicNew title='Agregar Predio' propFunctionCloseModal={handleCloseModalAgregarPredioOA}>
            <BoxContainerInputsByInfoBigScroll>
            <Input 
                name='direccion_actual'
                textlabel='Direccion Actual *' 
                value={dataToFetch?.direccion_actual}
                onChange={setDataToFetch}
                placeholder='Ingrese la dirección actual'
            />
            <Input 
                name='direccion_anterior'
                textlabel='Direccion Anterior' 
                value={dataToFetch?.direccion_anterior}
                onChange={setDataToFetch}
                placeholder='Ingrese la dirección anterior'
            />
            <Input 
                name='matricula_inmobiliaria'
                textlabel='Matricula Inmobiliaria *' 
                value={dataToFetch?.matricula_inmobiliaria}
                onChange={setDataToFetch}
                placeholder='Ingrese la matrícula inmobiliaria'
            />
            <Input 
                name='numero_catastral'
                textlabel='Numero Catastral *' 
                value={dataToFetch?.numero_catastral}
                onChange={setDataToFetch}
                placeholder='Ingrese el número catastral'
            />
            <DropdownSearch label='Urbanización' />
            <PickList 
                label='Comuna'
                name={'comuna'}
                optionSelected={'Seleccione una Comuna'} 
                options={dataComunas} 
                value={dataToFetch?.comuna}
                onChange={setDataToFetch}
            />
            <PickList 
                label='Estrato'
                name={'estrato'}
                optionSelected={'Seleccione un Estrato'} 
                options={dataEstratos} 
                value={dataToFetch?.estrato}
                onChange={setDataToFetch}
            />

            </BoxContainerInputsByInfoBigScroll>
            
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Agregar Predio' onClick={onclickFetch} />
            </ContainerButtonsBackandNext>

        </ModalBasicNew>
        
    )
}

export default FormOAPredioPredio
