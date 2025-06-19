import PropTypes from 'prop-types'
import './primarybuttonnew.scss'

PrimaryButtonNew.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

function PrimaryButtonNew({ text, onClick }) {
    return (
        <button type={'button'} className='primary-button-new' onClick={onClick}>
            {text}
        </button>
    )
}

export default PrimaryButtonNew
