import PropTypes from 'prop-types'
import { ChartPieIcon } from '@heroicons/react/24/outline'
import './cardreportes.scss'

CardReportes.propTypes = {
    title: PropTypes.string.isRequired,
    onclick: PropTypes.func, // Add validation for 'onclick'
}
CardReportes.defaultProps = {
    title: 'Reporte',
    onClick: () => {},
}

function CardReportes({title, onclick}) {
    return (
        <div className='card-reportes'>
            <div className='card-reportes__circle'></div>
            <div className='card-reportes__content'>
                <span>{title}</span>
                <button onClick={onclick} className='card-reportes__content__button'>Generar</button>
            </div>
            <div className='card-reportes__div-icon'>
                <ChartPieIcon />
            </div>
        </div>
    )
}

export default CardReportes
