import PropTypes from 'prop-types'
import './numeroradicacion.scss'

NumeroRadicacion.propTypes = {
    numeroRadicacion: PropTypes.string.isRequired,
}

function NumeroRadicacion({ numeroRadicacion }) {
    return (
        <section className='numeroradicacion'>
            <h3 className='numeroradicacion__h3'>Número Radicación:</h3>
            <p className='numeroradicacion__p'>{numeroRadicacion ? numeroRadicacion : 'Numero de radicacion'}</p>
        </section>
    )
}

export default NumeroRadicacion
