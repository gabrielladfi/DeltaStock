/* eslint-disable react/prop-types */
import { FolderIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import './menucard.scss'


function MenuCard({ text = 'Nueva Radicacion', propFn, icon }) {


    return (
        <div onClick={propFn} className={'menucard--p'}>
            {icon ? <img src={icon} alt="icono de la tarjeta" /> : <FolderIcon className={'menucard--p__icon'} />}
            <p className={'menucard--p__div__p'}>{text}</p>
            <ArrowRightCircleIcon className={'menucard--p__icon'} />
        </div>
    )
}

export default MenuCard
    