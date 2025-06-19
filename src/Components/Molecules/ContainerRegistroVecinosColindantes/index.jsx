import PropTypes from 'prop-types'
import './containerregistrovecinoscolindantes.scss'

ContainerRegistroVecinosColindantes.propTypes = {
    children: PropTypes.node.isRequired,
    children2: PropTypes.node.isRequired,
}

function ContainerRegistroVecinosColindantes({ children }) {
    return (
        <section className='container-registro-vecinos-colindantes'>
                {children}
        </section>
    )
}

export default ContainerRegistroVecinosColindantes
