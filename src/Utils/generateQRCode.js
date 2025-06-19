import QRCode from 'qrcode';

/**
 * Generates a QR code from a given URL and appends it to a specified container.
 * Also allows copying the QR code as an image.
 * @param {string} url - The URL to encode in the QR code.
 * @param {string} containerId - The ID of the HTML container where the QR code should appear.
 */
export function generateQRCode(url, containerId) {


    const canvas = document.createElement('canvas');
    canvas.classList.add('qr-canvas');
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    QRCode.toCanvas(canvas, url, {
        width: 300,
        margin: 2,
        color: {
            dark: '#000',
            light: '#fff'
        }
    }, (error) => {
        if (error) {
            console.error('Error generating QR code:', error);
        } else {
            container.innerHTML = ''; // Clear previous QR code
            container.appendChild(canvas);

            // Create a "Copy to Clipboard" button
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copiar QR';
            copyButton.classList.add('primary-button-new-small');

            copyButton.addEventListener('click', () => copyQRCodeAsImage(canvas));

            container.appendChild(copyButton);
        }
    });
}

/**
 * Copies the QR code as an image to the clipboard.
 * @param {HTMLCanvasElement} canvas - The canvas element containing the QR code.
 */
async function copyQRCodeAsImage(canvas) {
    try {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const data = [new ClipboardItem({ 'image/png': blob })];

        await navigator.clipboard.write(data);
        
    } catch (error) {
        console.error('Failed to copy QR code:', error);
        alert('❌ Error copying QR code. Please try again.');
    }
}
