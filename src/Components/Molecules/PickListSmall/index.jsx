import PropTypes from 'prop-types'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import './picklistsmall.scss'

PickListSmall.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    optionSelected: PropTypes.string.isRequired,
    labelOption: PropTypes.string
}

function PickListSmall({ label, labelOption, options, value, onChange, name, optionSelected }) {
    return (
        <article className='picklistsmall'>
            {
                labelOption &&
                <label className='picklistsmall__label'>{label}</label>
            }
            <div className='picklistsmall__div'>
                <ChevronDownIcon className="picklistsmall__div__icon" />
                <select 
                    className="picklistsmall__div__select"
                    onChange={onChange }
                    value={ value }
                    name={ name }
                >
                    <option selected >{optionSelected}</option>
                    {
                        
                        options?.map((option, index) => {
                            
                            return (
                                <option className='picklistsmall__div__select__option' key={index} value={option.value}>{option.option}</option>
                            )
                        })
                    }
                </select>

            </div>

        </article>
    )
}

export default PickListSmall
