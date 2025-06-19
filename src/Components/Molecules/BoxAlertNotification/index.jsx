import PropTypes from 'prop-types'
import PrimaryButton from '@/Components/PrimaryButton'
import './boxalertnotification.scss'

BoxAlertNotification.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    textButton: PropTypes.string.isRequired,
}

function BoxAlertNotification({
    title,
    message,
    image,
    alt,
    onClick,
    textButton,

}) {
    return (
        <div className='boxalertnotification'>
            <div className='boxalertnotification__title'>
                <h2 className='boxalertnotification__title__h2'>{title}</h2>
            </div>
            <div className='boxalertnotification__content'>
                <p className='boxalertnotification__content__p'>{message}</p>
                <div className='boxalertnotification__content__img-container'>
                    <img className='boxalertnotification__content__img' src={image} alt={alt} />
                </div>
            </div>
            <div className='boxalertnotification__button'>
                <PrimaryButton textButton={textButton} propFunction={onClick} bgColor={'#383675'} />
            </div>
        </div>
    )
}

export default BoxAlertNotification
