import PropTypes from 'prop-types'
import './boxcontainerinputsbyinfobig.scss'

BoxContainerInputsByInfoBig.propTypes = {
    children: PropTypes.node.isRequired
}

function BoxContainerInputsByInfoBig({ children }) {
    return (
        <section className='box-container-inputs-by-info-big'>
            {children}
        </section>
    )
}

export default BoxContainerInputsByInfoBig
