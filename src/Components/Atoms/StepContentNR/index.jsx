import PropTypes from 'prop-types'
import './stepcontentnr.scss'

StepContentNR.propTypes = {
    children: PropTypes.node.isRequired
}

function StepContentNR({ children }) {
    return (
        <section className='step-content-nr'>
            {children}
        </section>
    )
}

export default StepContentNR
