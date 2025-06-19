/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import './qrcodecomponent.scss'

import { generateQRCode } from '@/Utils/generateQRCode'; // Asegúrate de que la ruta sea correcta

const QRCodeComponent = ({ link }) => {
    useEffect(() => {
        if (link) {
            generateQRCode(link, 'qr-container');
        }
    }, [link]);

    return <div id="qr-container" />;
};

export default QRCodeComponent;