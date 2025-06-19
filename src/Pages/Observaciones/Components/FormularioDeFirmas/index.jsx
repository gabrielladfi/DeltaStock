/* eslint-disable react/prop-types */
import './formulariodefirmas.scss'
import SectionClosermodals from '@/Components/SectionClosermodals'
import PrimaryLabeledInput from '@/Components/Molecules/PrimaryLabeledInput'
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import PrimaryLabel from '@/Components/Atoms/PrimaryLabel'
import { dataTodasLasFirmasObservaciones } from '@/Utils/dataObjetoFirmas'
import { useFirmas } from '@/Hooks/useFirmas'
import { useEffect, useState } from 'react'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import PickList from '@/Components/Molecules/PickList'
import BoxAlertNotificationError from '@/Components/Molecules/BoxAlertNotificationError'
import Modal from '@/Components/Modal'

function FormularioDeFirmas({ propFetchPost, propfunctionCloseModal, propDataPost }) {

    const { handleObservacionesFirmas, firmas, resetFirmas } = useFirmas();

    const [ selectedFirma, setSelectedFirma ] = useState(false);

    console.log(firmas);

    useEffect(() => {
        return () => {
            resetFirmas()
        }
    }
    , [])

    function ValidatorFirmas() {
        if(firmas.length === 0) {
            setSelectedFirma(true)
        }else {
            propFetchPost()
        }
    }

    console.log(propDataPost);


    return (
        <ModalBasicNew title='Firmar Observaciones' propFunctionCloseModal={propfunctionCloseModal}> 
            
                <PickList 
                    label='Primera Firma *'
                    options={dataTodasLasFirmasObservaciones}
                    onChange={handleObservacionesFirmas}
                    optionSelected='Seleccionar Firma'
                />
                <PickList 
                    label='Segunda Firma *'
                    options={dataTodasLasFirmasObservaciones}
                    onChange={handleObservacionesFirmas}
                    optionSelected='Seleccionar Firma'
                />
                <PickList 
                    label='Tercera Firma *'
                    options={dataTodasLasFirmasObservaciones}
                    onChange={handleObservacionesFirmas}
                    optionSelected='Seleccionar Firma'
                />
                <PickList 
                    label='Cuarta Firma *'
                    options={dataTodasLasFirmasObservaciones}
                    onChange={handleObservacionesFirmas}
                    optionSelected='Seleccionar Firma'
                />
                <PrimaryButtonNewSmall text='Generar Documento' onClick={ValidatorFirmas} />
           
           {
           
            selectedFirma && 
            <Modal>
                <BoxAlertNotificationError 
                    message='Debe seleccionar al menos una firma para generar el documento.'
                    onClick={() => setSelectedFirma(false)}
                    textButton2='Cerrar'
                />
            </Modal>
            
           }

        </ModalBasicNew>
        
    )
}

export default FormularioDeFirmas
