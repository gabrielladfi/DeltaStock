import PropTypes from 'prop-types'
import './containertetxtplain.scss'

ContainerTetxtPlain.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

function ContainerTetxtPlain({ title, text }) {
    return (
        <section className='containertetxtplain'>
            <h2 className='containertetxtplain__title'>{title}:</h2>
            <p className='containertetxtplain__text'>{text}</p>
        </section>
    )
}

export default ContainerTetxtPlain
