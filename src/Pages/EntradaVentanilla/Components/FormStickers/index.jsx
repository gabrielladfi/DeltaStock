/* eslint-disable react/prop-types */
import PrimaryButton from '@/Components/PrimaryButton'
import './formstickers.scss'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate'

function FormStickers({
    propFnForm, // Funcion que se ejecutara al hacer click en el boton del formulario
    propLabel, // Texto que se mostrara en el label del input
    propTextButton, // Texto que se mostrara en el boton del formulario
    propFnInputData, // Funcion que se ejecutara al seleccionar la fecha en el input
    propInputName, // Nombre del input
    propValueInput, // Valor del input
    propTitleForm, // Titulo del formulario
    propFnCloseForm // Funcion que se ejecutara al hacer click en el boton de cerrar formulario
}) 
{
    return (
    <ModalBasicNew title={propTitleForm} propFunctionCloseModal={propFnCloseForm}>
        <BoxContainerInputsByInfoBigScroll>
            <PrimaryInputDate 
                label={propLabel} 
                value={propValueInput}
                onChangeFn={(e) => propFnInputData(e, propValueInput)}
                name={propInputName}
                blockWriteInput={true}
                type='datetime-local'
            />

        </BoxContainerInputsByInfoBigScroll>
       {/* <form className='formsticker-Container' action="">
            
            <div className='formsticker-Container__input'>
                <label htmlFor="datetime-local">{propLabel}</label>
            
                <input
                    className='formsticker-Container__input__input' 
                    onChange={propFnInputData} 
                    name={propInputName} 
                    value={propValueInput} 
                    type="datetime-local" 
                />
            </div>
            
        </form>*/}
        <PrimaryButtonNewSmall onClick={propFnForm} text={propTextButton} />

    </ModalBasicNew>
        
    )
}

export default FormStickers
