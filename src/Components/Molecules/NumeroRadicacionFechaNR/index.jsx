import PropTypes from 'prop-types'
import './numeroradicacionfechanr.scss'

NumeroRadicacionFechaNR.propTypes = {
    children: PropTypes.node.isRequired,
}

function NumeroRadicacionFechaNR({ children }) {
    return (
        <section className='numeroradicacionfechanr'>
            { children }
        </section>
    )
}

export default NumeroRadicacionFechaNR
