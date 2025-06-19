/* eslint-disable react/prop-types */
import './primarybutton.scss'

// PrimaryButton componente que recibe dos props, textButton y propFunction
// textButton: string que se muestra en el botón
// propFunction: función que se ejecuta al hacer click en el botón
function PrimaryButton({ textButton, propFunction, bgColor, color, className}) {
    return (
        <button type='button' style={{backgroundColor: bgColor, color: color}} onClick={propFunction} className={`${className ? className : 'primarybutton-button'}`}>
            <p className='primarybutton-button__p'>{textButton}</p>
        </button>
    )
}

export default PrimaryButton
