import PropTypes from 'prop-types'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import './picklist.scss'

PickList.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    optionSelected: PropTypes.string.isRequired,
    optionSelectedvalue: PropTypes.string.isRequired
}

function PickList({ label, options, value, onChange, name, optionSelected, optionSelectedvalue }) {
    return (
        <article className='picklist'>
            <label className='picklist__label'>{label}</label>
            <div className='picklist__div'>
                <ChevronDownIcon className="picklist__div__icon" />
                <select 
                    className="picklist__div__select"
                    onChange={onChange }
                    value={ value }
                    name={ name }
                >
                    <option value={optionSelectedvalue} selected >{optionSelected}</option>
                    {
                        
                        options?.map((option, index) => {
                            
                            return (
                                <option className='picklist__div__select__option' key={index} value={option.value}>{option.option}</option>
                            )
                        })
                    }
                </select>

            </div>

        </article>
    )
}

export default PickList
