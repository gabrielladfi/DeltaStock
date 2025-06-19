/**
 * Servicio GET para realizar peticiones HTTP GET
 * @param {string} token - Token de autenticación
 * @param {string} urlFetch - URL del endpoint a consultar
 * @param {AbortSignal} signalAbort - Señal para cancelar la petición
 * @returns {Promise} Respuesta del servidor en formato JSON
 * 
 * Este servicio:
 * - Realiza peticiones GET con autenticación via Bearer token
 * - Maneja errores HTTP comunes (400, 401, 403, 404, 500)
 * - Permite cancelar la petición mediante AbortSignal
 * - Retorna los datos JSON de la respuesta
 */
export const serviceGet = async (token, urlFetch, signalAbort) => {
    try {
        const response = await fetch( urlFetch, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", 
                'Authorization': `Bearer ${token}`
            },
            signal: signalAbort
        });
  
        if (!response.ok) {
            const errorBody = await response.json();
            console.error(`❌ Error:`, errorBody);

            switch (response.status) {
                case 400:
                    throw new Error('❗ Solicitud incorrecta (400)');
                case 401:
                    throw new Error('🔒 No autorizado (401) - Token expirado o inválido.');
                case 403:
                    throw new Error('⛔ Prohibido (403) - No tienes permisos.');
                case 404:
                    throw new Error('🕵️‍♂️ Recurso no encontrado (404).');
                case 500:
                    throw new Error('💥 Error interno del servidor (500).');
                default:
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        }

        return await response.json();

    } catch (error) {
        if(error.name === 'AbortError'){
            console.log('Cancelled Fetch');
        }else{
            console.error('Error to get the response:', error);
            throw error;
        }
    }
};

/**
 * Servicio POST para realizar peticiones HTTP POST
 * @param {string} token - Token de autenticación
 * @param {string} urlFetch - URL del endpoint
 * @param {object} data - Datos a enviar en el body
 * @param {AbortSignal} signalAbort - Señal para cancelar la petición
 * @returns {Promise} Respuesta del servidor en formato JSON
 * 
 * Este servicio:
 * - Envía datos en formato JSON mediante POST
 * - Incluye autenticación via Bearer token
 * - Maneja errores HTTP y parsing de JSON
 * - Registra la respuesta raw para debugging
 * - Permite cancelar la petición
 */
export const servicePost = async (token, urlFetch, data, signalAbort) => {
    try {
        const response = await fetch(urlFetch, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            signal: signalAbort
        });

        // Log the raw response text
        const responseText = await response.text();
        console.log('Raw response text:', responseText);

        if (!response.ok) {
            console.error(`❌ Error:`, responseText);

            switch (response.status) {
                case 400:
                    throw new Error('❗ Solicitud incorrecta (400)');
                case 401:
                    throw new Error('🔒 No autorizado (401) - Token expirado o inválido.');
                case 403:
                    throw new Error('⛔ Prohibido (403) - No tienes permisos.');
                case 404:
                    throw new Error('🕵️‍♂️ Recurso no encontrado (404).');
                case 500:
                    throw new Error('💥 Error interno del servidor (500).');
                default:
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        }

        // Try to parse the response as JSON
        try {
            return JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse response as JSON:', parseError);
            console.error('Response text was:', responseText);
            throw new Error('Invalid JSON response from server');
        }

    } catch (error) {
        if(error.name === 'AbortError'){
            console.log('Cancelled Fetch');
        }else{
            console.error('Error in POST request:', error);
            throw error;
        }
    }
};

/**
 * Servicio PUT para realizar peticiones HTTP PUT
 * @param {string} token - Token de autenticación
 * @param {string} urlFetch - URL del endpoint
 * @param {object} data - Datos a actualizar
 * @param {AbortSignal} signalAbort - Señal para cancelar la petición
 * @returns {Promise} Respuesta del servidor en formato JSON
 * 
 * Este servicio:
 * - Actualiza recursos mediante PUT
 * - Envía datos en formato JSON
 * - Incluye autenticación via Bearer token
 * - Maneja errores HTTP comunes
 * - Permite cancelar la petición
 */
export const servicePut = async (token, urlFetch, data, signalAbort) => {
    try {
        const response = await fetch(urlFetch, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            signal: signalAbort
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error(`❌ Error:`, errorBody);

            switch (response.status) {
                case 400:
                    throw new Error('❗ Solicitud incorrecta (400)');
                case 401:
                    throw new Error('🔒 No autorizado (401) - Token expirado o inválido.');
                case 403:
                    throw new Error('⛔ Prohibido (403) - No tienes permisos.');
                case 404:
                    throw new Error('🕵️‍♂️ Recurso no encontrado (404).');
                case 500:
                    throw new Error('💥 Error interno del servidor (500).');
                default:
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        }

        return await response.json();

    } catch (error) {
        if(error.name === 'AbortError'){
            console.log('Cancelled Fetch');
        }else{
            console.error('Error in PUT request:', error);
            throw error;
        }
    }
};

/**
 * Servicio DELETE para realizar peticiones HTTP DELETE
 * @param {string} token - Token de autenticación
 * @param {string} urlFetch - URL del endpoint
 * @param {AbortSignal} signalAbort - Señal para cancelar la petición
 * @returns {Promise} Respuesta del servidor en formato JSON
 * 
 * Este servicio:
 * - Elimina recursos mediante DELETE
 * - Incluye autenticación via Bearer token
 * - Maneja errores HTTP
 * - Permite cancelar la petición
 * - Retorna confirmación del servidor
 */
export const serviceDelete = async (token, urlFetch, signalAbort) => {
    try {
        const response = await fetch(urlFetch, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            signal: signalAbort
        }); 

        if (!response.ok) {
            const errorBody = await response.json();
            console.error(`❌ Error:`, errorBody);

            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }   

        return await response.json();

    } catch (error) {
        if(error.name === 'AbortError'){
            console.log('Cancelled Fetch');
        }else{
            console.error('Error in DELETE request:', error);
            throw error;
        }
    }
};