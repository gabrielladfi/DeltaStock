import PropTypes from 'prop-types'
import logodeltablanco from "../../../assets/logos/logodeltacublanco.svg"
import './navvertical.scss'
import MenuVertical from '../MenuVertical'

NavVertical.propTypes = {
    nameUser: PropTypes.string.isRequired,
    emailUser: PropTypes.string.isRequired,
    initialLetter: PropTypes.string.isRequired,
}

function NavVertical({ nameUser, emailUser, initialLetter }) {
    return (
        <nav className='navvertical'>
            <section className='navvertical__section--logo'>
                <img src={logodeltablanco} alt="logo deltacu blanco" />
            </section>
            <section>
                <MenuVertical />

            </section>
            <section className='navvertical__section--user'>
                <span className='navvertical__section--user__initial'>{initialLetter}</span>
                <div className='navvertical__section--user__info'>
                    <p className='navvertical__section--user__info__name'>{nameUser}</p>
                    <p className='navvertical__section--user__info__email'>{emailUser}</p>
                </div>

            </section>
        </nav>
    )
}

export default NavVertical
