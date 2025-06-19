/* eslint-disable react/prop-types */
import './titledropdown.scss'
import { 
    ChevronRightIcon,
    ChevronDownIcon, 
} from '@heroicons/react/24/outline'

function TitleDropDown({ state, propTitle, propFn }) {
    return (
        <div className='titledropdown-div'>
            <h2 className='titledropdown-div__h2'>{ propTitle }</h2>
            <button onClick={() => propFn()} className='titledropdown-div__button'>
                {
                    !state ? <ChevronRightIcon className="titledropdown-div__button__icon" /> : <ChevronDownIcon className="titledropdown-div__button__icon" />
                }
            </button>
        </div>
    )
}

export default TitleDropDown
