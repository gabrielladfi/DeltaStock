import { createPortal } from 'react-dom'
import './modal.scss'

function Modal({children}) {
    return (
        createPortal(
            <div className="modal" style={{display: children ? 'flex': 'none'}}>{children}</div>,
            document.getElementById('modal')
        )
    )
}

export default Modal
