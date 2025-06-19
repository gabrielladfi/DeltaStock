/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline'
import './linkqr.scss'
import QRCodeComponent from '@/Components/QRCodeComponent'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'

function LinkQR({ propFnCloseModal, propLink }) {
    return (
        <ModalBasicNew title='Codigo QR' propFunctionCloseModal={propFnCloseModal}>
            <QRCodeComponent link={propLink} />
        </ModalBasicNew>
        
    )
}

export default LinkQR
