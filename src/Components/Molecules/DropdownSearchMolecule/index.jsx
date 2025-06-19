/* eslint-disable react/prop-types */
import './dropdownsearchMolecule.scss';

function DropdownSearchMolecule({
    propLabelText, 
    propContainerRef,
    propTypeInput,
    propValue,  
    propOnchangeFnInput, 
    propFocusFnInput,
    propSelectOptionFn,
    propPlaceholder,
    propAutoComplete,
    propName,
    propOptionFilters,
    state,
}) {
  
    return (
        <div>
            <label>{propLabelText}</label>
            <div ref={propContainerRef}>
                <input
                    type={propTypeInput}
                    value={propValue}
                    onChange={propOnchangeFnInput}
                    onFocus={propFocusFnInput}
                    placeholder={propPlaceholder}
                    autoComplete={propAutoComplete}
                    name={propName}
                />
                {state && propOptionFilters.length > 0 && (
                    <ul>
                        {propOptionFilters.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => propSelectOptionFn(option)}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default DropdownSearchMolecule;