/* eslint-disable react/prop-types */
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import './primarydropdown.scss'

function PrimaryDropDown({ classNameLabel, textLabel,  classNameContainer, propOptions, propName, propValue, propOnchangeFn, propOnFocusFn, propPlaceholderOption }) {
    return (
        <div className={classNameContainer}>
            <label className={classNameLabel}>{textLabel}</label>
            <div className='atom-primarydropdown-div'>
            <ChevronDownIcon className="atom-primarydropdown-div__icon" />
            <select 
                className="atom-primarydropdown-div__select"
                onChange={propOnchangeFn }
                onFocus={ propOnFocusFn }
                value={ propValue }
                name={ propName }
            >
                <option selected >{propPlaceholderOption}</option>
                {
                    
                    propOptions?.map((option, index) => {
                        
                        return (
                            <option className='atom-primarydropdown-div__select__option' key={index} value={option.value}>{option.option}</option>
                        )
                    })
                }
            </select>

        </div>

        </div>
        
        
    )
}

export default PrimaryDropDown
