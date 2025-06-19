import { 
  urlBase, 
  numeroRadicacion, 
  urlPostNuevaRadicacion, 
  urlPostObtenerIdVecinos, 
  urlGetObtenerIdVecinosPorRadicacion, 
  urlCrearVecinos, 
  urleliminarVecinos,
  urlCrearPredio,
  urlCrearActa,
  urlObtenerRequisitosNumradicacion,
  urlGetListadoRadicaciones,
  urlPutActualizarEstadoRequisito,
  urlDeleteRequisito,
  urlPostNuevoRequisito,
  urlCrearRadicacionIncompleta,
  urlObtenerListadoDePredios,
  urlObtenerListadoDePrediosPorRadicacion,
  urlEliminarPredioPorId,
  urlInformacionDeRadicacion,
  urlGenerarValla,
  urlGenerarActaLegal
} from '../Utils/UrlData';

//servicio para obtener el numero de radicacion
export const getNumeroRadicacion = async (token) => {
    try {
      const response = await fetch(`${urlBase}${numeroRadicacion}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json(); // Devuelve los datos en JSON
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
};

//servicio para obtener el listado de vecinos por numero de radicacion
export const getVecinosNumeroRadicacion = async (token, propnumeroRadicacion) => {
  try {
    const response = await fetch(`${urlBase}${urlGetObtenerIdVecinosPorRadicacion}${propnumeroRadicacion}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorBody = await response.json();
        console.log('Error 400 Body:', errorBody);
    }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json(); // Devuelve los datos en JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error; // Permite manejar el error en el componente que llama
  }
};

//servicio para obtener el listado de radicaciones
export const getListadoRadicaciones = async (token) => {
  try {
    const response = await fetch(`${urlBase}${urlGetListadoRadicaciones}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorBody = await response.json();
        console.log('Error 400 Body:', errorBody);
    }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json(); // Devuelve los datos en JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error; // Permite manejar el error en el componente que llama
  }
};

//GET obtener requisitos por número de radicación 
export const getRequisitosNumRadicacion = async (token, numRadicacion) => {
  try {
    const response = await fetch(`${urlBase}${urlObtenerRequisitosNumradicacion}${numRadicacion}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorBody = await response.json();
        console.log('Error 400 Body:', errorBody);
    }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json(); // Devuelve los datos en JSON
  } catch (error) {
    console.error('Error al obtener el requisito:', error);
    throw error; // Permite manejar el error en el componente que llama
  }
};

//GET obtener el listado de predios 
export const getObtenerListadoDePredios = async (token) => {
  try {
    const response = await fetch(`${urlBase}${urlObtenerListadoDePredios}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorBody = await response.json();
        console.log('Error 400 Body:', errorBody);
    }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json(); // Devuelve los datos en JSON
  } catch (error) {
    console.error('Error al obtener el listado de predios:', error);
    throw error; // Permite manejar el error en el componente que llama
  }
};

//GET obtener toda la información de radicación
export const getObtenerTodaInformacionDeRadicacion = async (token, numeroRadicacion) => {
  try {
    const response = await fetch(`${urlBase}${urlInformacionDeRadicacion}${numeroRadicacion}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorBody = await response.json();
        console.log('Error 400 Body:', errorBody);
    }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json(); // Devuelve los datos en JSON
  } catch (error) {
    console.error('Error al obtener el listado de predios:', error);
    throw error; // Permite manejar el error en el componente que llama
  }
};

//Get Obtener los predios asociados a un número de radicación
export const getPrediosAsociadosNumRadicacion = async (token, numRadicacion) => {
  try {
    const response = await fetch(`${urlBase}${urlObtenerListadoDePrediosPorRadicacion}${numRadicacion}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorBody = await response.json();
        console.log('Error 400 Body:', errorBody);
    }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json(); // Devuelve los datos en JSON
  } catch (error) {
    console.error('Error al obtener los predios:', error);
    throw error; // Permite manejar el error en el componente que llama
  }
};

//servicio para crear nueva radicacion
export const postNuevaRadicacion = async (token, dataNuevaRadicacion) => {
    try {
      const response = await fetch(`${urlBase}${urlPostNuevaRadicacion}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(dataNuevaRadicacion)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear nuevos clientes:', error);
      throw error; 
    }
  };

  //servicio para obtener id de vecinos
export const postObtenerIdVecinos = async (token, dataNumeroRadicacion) => {
  try {
    const response = await fetch(`${urlBase}${urlPostObtenerIdVecinos}`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`
      },
      body : JSON.stringify(dataNumeroRadicacion)
    });
    if (!response.ok) {
      if (response.status === 400) {
        const errorBody = await response.json();
        console.log('Error 400 Body:', errorBody);
    }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al crear nuevos clientes:', error);
    throw error; 
  }
};

  //servicio para crear vecinos colindantes
  export const postCrearVecinosColindantes = async (token, data) => {
    try {
      const response = await fetch(`${urlBase}${urlCrearVecinos}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(data)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear nuevos clientes:', error);
      throw error; 
    }
  };

  //servicio para crear predio
  export const postCrearPredio = async (token, data) => {
    try {
      const response = await fetch(`${urlBase}${urlCrearPredio}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(data)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear nuevos clientes:', error);
      throw error; 
    }
  };

    //servicio para crear comunicado
    export const postCrearComunicado = async (token, datalinkComunicado) => {
      try {
        const response = await fetch(`${urlBase}${urlCrearActa}`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${token}`
          },
          body : JSON.stringify(datalinkComunicado)
        });
        if (!response.ok) {
          if (response.status === 400) {
            const errorBody = await response.json();
            console.log('Error 400 Body:', errorBody);
        }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error al crear el comunicado:', error);
        throw error; 
      }
    };
  
  //servicio POST para crear un nuevo requisito por numero de radicacion
  export const postCrearNuevoRequisito = async (token, dataNuevoRequisito) => {
    try {
      const response = await fetch(`${urlBase}${urlPostNuevoRequisito}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(dataNuevoRequisito)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear nuevos clientes:', error);
      throw error; 
    }
  };

  //Servicio POST para crear la radicacion incompleta por numero de radicacion
  export const postCrearRadicacionIncompleta = async (token, dataRadicacionIncompleta) => {
    try {
      const response = await fetch(`${urlBase}${urlCrearRadicacionIncompleta}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(dataRadicacionIncompleta)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear nuevos clientes:', error);
      throw error; 
    }
  };

  //Servicio POST para obtener valla
  export const postObtenerValla = async (token, dataValla) => {
    try {
      const response = await fetch(`${urlBase}${urlGenerarValla}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(dataValla)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al enviar data de la valla:', error);
      throw error; 
    }
  };

  //Servicio POST para obtener acta legal y debida forma recibe un objeto con el numero de radicacion
  export const postObtenerActaLegalDebidaForma = async (token, numeroRadicacionActaLegal) => {
    try {
      const response = await fetch(`${urlBase}${urlGenerarActaLegal}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(numeroRadicacionActaLegal)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al enviar data de la acta legal y debida forma:', error);
      throw error; 
    }
  };

  //eliminar un vecino colindante por id
  export const deleteVecinosColindanteId = async (token, idVecinoEliminar) => {
    try {
      const response = await fetch(`${urlBase}${urleliminarVecinos}${idVecinoEliminar}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      // Si el status es 204 o no hay contenido, devuelve null o un mensaje de éxito.
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { success: true, message: 'Eliminado correctamente' };
      }
  
      // Si hay contenido en la respuesta, devuélvelo como JSON.
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar vecino:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
  };

  //Servicio para eliminar requisito por id
  export const deleteRequisitoId = async (token, idRequisito) => {
    try {
      const response = await fetch(`${urlBase}${urlDeleteRequisito}${idRequisito}/`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      // Si el status es 204 o no hay contenido, devuelve null o un mensaje de éxito.
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { success: true, message: 'Eliminado correctamente' };
      }
  
      // Si hay contenido en la respuesta, devuélvelo como JSON.
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar requsito:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
  };

  //servicio para eliminar predio por id
  export const deletePredioId = async (token, idPredio) => {
    try {
      const response = await fetch(`${urlBase}${urlEliminarPredioPorId}${idPredio}/`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      // Si el status es 204 o no hay contenido, devuelve null o un mensaje de éxito.
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { success: true, message: 'Predio Eliminado correctamente' };
      }
  
      // Si hay contenido en la respuesta, devuélvelo como JSON.
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar requsito:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
  };


  
  //Actualizar estado de un requerimiento por id
  export const putActualizarEstadoRequisito = async (token, idRequisito, dataRequisito) => {
    try {
      const response = await fetch(`${urlBase}${urlPutActualizarEstadoRequisito}${idRequisito}/`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataRequisito),
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar estado de requisito:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
  };






  //Servicio Global de Tipo GET para obtener datos con numero de radicacion en la url
  export const servicioGetGlobal = async (token, urlFetch, segundoValor) => {
    try {
      const response = await fetch(`${urlBase}${urlFetch}${segundoValor}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json(); // Devuelve los datos en JSON
    } catch (error) {
      console.error('Error al obtener la data:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
  };

  //Servicio Global de Tipo POST para enviar datos a la API
  export const servicioPostGlobal = async (token, urlPost, primerValor) => {
    try {
      const response = await fetch(`${urlBase}${urlPost}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(primerValor)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al enviar data', error);
      throw error; 
    }
  };


  //servicio delete global para eliminar predio por id
  export const servicioDeleteGlobalId = async (token, urlDelete, id) => {
    try {
      const response = await fetch(`${urlBase}${urlDelete}${id}/`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      // Si el status es 204 o no hay contenido, devuelve null o un mensaje de éxito.
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { success: true, message: 'elemento Eliminado correctamente' };
      }
  
      // Si hay contenido en la respuesta, devuélvelo como JSON.
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
  };




  //servicio para que remplacen a todos los servicos anteriores

  //servicio put global para actualizar data de la aplicacion
  export const servicePut = async (token, url, data) => {
    try {
      const response = await fetch(`${url}/`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
  };

  //Servicio Global de Tipo GET para obtener datos con numero de radicacion en la url
  export const serviceGet = async (token, urlFetch, segundoValor, signalAbort) => {
    try {
      const response = await fetch(`${urlFetch}${segundoValor}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${token}`
        },
        signal: signalAbort
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json(); // Devuelve los datos en JSON
    } catch (error) {
      if(error.name === 'AbortError'){
          console.log('Fetch cancelado');
      }else{
          console.error('Error al obtener la respuesta:', error);
          throw error; // Permite manejar el error en el componente que llama
      }
      
  }
  };

  //Servicio Global de Tipo POST para enviar datos a la API
  export const servicePost = async (token, url, propData) => {
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(propData)
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
      }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al enviar data', error);
      throw error; 
    }
  };

  //Servicio Global de Tipo DELETE para eliminar un elemento por id
  export const serviceDelete = async (token, urlDelete) => {
    try {
      const response = await fetch(`${urlDelete}/`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          const errorBody = await response.json();
          console.log('Error 400 Body:', errorBody);
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      // Si el status es 204 o no hay contenido, devuelve null o un mensaje de éxito.
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { success: true, message: 'elemento Eliminado correctamente' };
      }
  
      // Si hay contenido en la respuesta, devuélvelo como JSON.
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      throw error; // Permite manejar el error en el componente que llama
    }
  };

