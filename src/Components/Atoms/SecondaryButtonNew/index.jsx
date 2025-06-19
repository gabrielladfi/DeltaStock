import PropTypes from 'prop-types'
import './secondarybuttonnew.scss'

SecondaryButtonNew.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

function SecondaryButtonNew({ text, onClick }) {
    return (
        <button className='secondary-button-new' onClick={onClick}>
            {text}
        </button>
    )
}

export default SecondaryButtonNew
