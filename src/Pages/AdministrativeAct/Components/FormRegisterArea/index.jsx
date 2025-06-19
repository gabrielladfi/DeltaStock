import PropTypes from 'prop-types'
import './formregisterarea.scss'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import { Input } from '@/Components/Atoms/Input/Input'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'

FormRegisterArea.propTypes = {
    onClose: PropTypes.func.isRequired,
    numeroRadicacion: PropTypes.string.isRequired,
}

function FormRegisterArea({ onClose }) {
    return (
        <ModalBasicNew title='Registrar Area' propFunctionCloseModal={onClose}>
            <BoxContainerInputsByInfoBigScroll>
                <Input 
                    textlabel='Uso Residencial o Vivienda'
                    placeholder='Área Construida'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                />
                <Input 
                    textlabel='Uso Comercial'
                    placeholder='Área Construida'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                />
                <Input 
                    textlabel='Uso Industrial o Bodega' 
                    placeholder='Área Construida'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                />
                <Input 
                    textlabel='Uso Oficinas o consultorios'
                    placeholder='Área Construida'
                    regexOptions={/^[0-9a-zA-Z-]+$/}    
                />
                <Input 
                    textlabel='Uso Institucional'
                    placeholder='Área Construida'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                />
                <Input 
                    textlabel='Uso Turistico'
                    placeholder='Área Construida'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                />
                <Input 
                    textlabel='Otros Usos'
                    placeholder='Área Construida'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                />

            </BoxContainerInputsByInfoBigScroll>
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text={'Guardar'} />
            </ContainerButtonsBackandNext>
            

     

        </ModalBasicNew>
        
    )
}

export default FormRegisterArea
