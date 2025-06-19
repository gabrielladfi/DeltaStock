import PropTypes from 'prop-types'
import './barraestadorequisitos.scss'

BarraEstadoRequisitos.propTypes = {
    completados: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    incompletos: PropTypes.number.isRequired
}

function BarraEstadoRequisitos({ completados, total, incompletos }) {
    return (
        <>
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div 
                    className="progress-bar__fill"
                    style={{
                        width: `${(completados / total) * 100}%`,
                        backgroundColor: completados === total ? '#008000' : '#0E1B6B',
                        borderRadius: completados === total && '8px'
                    }}
                />
            </div>
            <div className="progress-bar__stats">
                <span className={`${incompletos === 0 ? 'pedding-zero' : '`progress-bar__pending'}`}>
                    {incompletos} pendientes
                </span>
                <span className="progress-bar__completed">
                    {completados} completados de {total}
                </span>
                
            </div>
        </div>
        </>
    )
}

export default BarraEstadoRequisitos
