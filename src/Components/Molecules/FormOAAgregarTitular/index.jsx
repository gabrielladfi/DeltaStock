/* eslint-disable react/prop-types */

import SectionCloserFormsModal from '@/Components/SectionCloserFormsModal'
import PrimaryInputWithOutValidator from '@/Components/Atoms/PrimaryInputWithOutValidator'
import PrimaryInputEmailValidator from '@/Components/Atoms/PrimaryInputEmailValidator'
import PrimaryInputNumberValidator from '@/Components/Atoms/PrimaryInputNumberValidator'
import PrimaryButton from '@/Components/PrimaryButton'
import './formoaagregartitular.scss'
import ModalBasicNew from '../ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import { Input } from '@/Components/Atoms/Input/Input'

function FormOAAgregarTitular({ closeModal, data, fetchData, getFetchData }) {

    console.log(data)

    return (
        <ModalBasicNew title='Agregar Titular' propFunctionCloseModal={closeModal}>
            <BoxContainerInputsByInfoBigScroll>
           
                <Input
                    textlabel='Nombre Completo *' 
                    name='nombre'   
                    value={data.nombre}
                    onChange={getFetchData}
                    placeholder='Ingrese Nombre Completo'
                />
                <Input
                    textlabel='Correo Electrónico *' 
                    name='email'
                    value={data.email}
                    onChange={getFetchData}
                    placeholder='Ingrese Correo Electrónico'
                />
                <Input
                    textlabel='Teléfono *' 
                    name='phone'
                    value={data.phone}
                    onChange={getFetchData}
                    placeholder='Ingrese Teléfono'
                />
                <Input
                    textlabel='Numero de Documento *' 
                    name='dni'
                    value={data.dni}
                    onChange={getFetchData}
                    placeholder='Ingrese Numero de Documento'
                />
            
            </BoxContainerInputsByInfoBigScroll>

            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text={'Agregar Titular'} onClick={fetchData} />
            </ContainerButtonsBackandNext>
      

        </ModalBasicNew>
        
    )
}

export default FormOAAgregarTitular
