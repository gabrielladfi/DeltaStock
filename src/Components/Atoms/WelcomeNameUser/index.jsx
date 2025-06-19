import PropTypes from 'prop-types'
import imagenprofesional from '@/assets/images/profesionalmobile.svg'
import imagenprofesionaldesktop from '@/assets/images/profesionaldesktop.svg'
import imagenprofesionaltablet from '@/assets/images/profesionaltablet.svg'
import './welcomenameuser.scss'

WelcomeNameUser.propTypes = {
    nameUser: PropTypes.string.isRequired
}

function WelcomeNameUser({ nameUser }) {
    return (
        <section className='welcomenameuser'>
            <p className='welcomenameuser__p'>Bienvenido, {nameUser}</p>
            <article className='welcomenameuser__article'>
                <p className='welcomenameuser__article__p'>Accede a cada módulo y lleva el control completo de tus trámites</p>
                <img className='welcomenameuser__article__img' src={imagenprofesional} alt="imagen profesional" />
                <img className='welcomenameuser__article__img--desktop' src={imagenprofesionaldesktop} alt="imagen profesional-desktop" />
                <img className='welcomenameuser__article__img--tablet' src={imagenprofesionaltablet} alt="imagen profesional-tablet" />
            </article>
        </section>
    )
}

export default WelcomeNameUser
