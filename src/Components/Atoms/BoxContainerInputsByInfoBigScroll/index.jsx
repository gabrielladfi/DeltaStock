import PropTypes from 'prop-types'
import './boxcontainerinputsbyinfobigscroll.scss'

BoxContainerInputsByInfoBigScroll.propTypes = {
    children: PropTypes.node.isRequired
}

function BoxContainerInputsByInfoBigScroll({ children }) {
    return (
        <section className='box-container-inputs-by-info-big-scroll'>
            {children}
        </section>
    )
}

export default BoxContainerInputsByInfoBigScroll
