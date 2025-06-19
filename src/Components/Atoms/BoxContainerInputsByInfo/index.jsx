import PropTypes from 'prop-types'
import './boxcontainerinputsbyinfo.scss'

BoxContainerInputsByInfo.propTypes = {
    children: PropTypes.node.isRequired
}

function BoxContainerInputsByInfo({ children }) {
    return (
        <section className='box-container-inputs-by-info'>
            {children}
        </section>
    )
}

export default BoxContainerInputsByInfo
