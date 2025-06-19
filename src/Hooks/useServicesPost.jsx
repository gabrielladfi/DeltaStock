import { useContext } from "react";
import { AuthContextState } from "../Context/AuthContextContext";
import { 
  postNuevaRadicacion, 
  postObtenerIdVecinos, 
  postCrearVecinosColindantes, 
  postCrearPredio,
  postCrearComunicado,
  postCrearNuevoRequisito,
  postCrearRadicacionIncompleta,
  postObtenerValla,
  postObtenerActaLegalDebidaForma,
  servicioPostGlobal
} from "../Services/ServicionuevaRadicacion";
import { GlobalState } from "../Context/GlobalContext";

function useServicesPost() {

    const { token } = useContext(AuthContextState);
    const { 
      nuevaRadicacion, 
      setGlobalNumeroRadicacion, 
      setGlobalIdVecinos,
      setDataPredioCreacion,
      setLinkActaComunicado,
      setLinkRadicacionIncompleta,
      setDataVallaFetch,
      setDataActaLegalFetch,
      setErrorActaLegal
    } = useContext(GlobalState)
    

    const fetchPostNuevaRadicacion = async () => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!nuevaRadicacion || Object.keys(nuevaRadicacion).length === 0) {
            throw new Error('Los datos del cliente son inválidos.');
          }
        try {
            const data = await postNuevaRadicacion(token, nuevaRadicacion); // Llama al service

            console.log('Radicacion creada con éxito:', data);
            setGlobalNumeroRadicacion(data)
            return data;
          
        } catch (err) {
          console.error(err)
        }

      };

      const fetchPostObtenerIdVecinos = async (numeroRadicacion) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!numeroRadicacion || Object.keys(numeroRadicacion).length === 0) {
            throw new Error('Los datos del cliente son inválidos.');
          }
        try {
            const data = await postObtenerIdVecinos(token, numeroRadicacion); // Llama al service
            setGlobalIdVecinos(data)
            console.log('Id de vecinos obtenido con exito:', data);
            return data;
          
        } catch (err) {
          console.error(err)
        }

      };

      //servicio para crear vecinos colindantes
      const fetchPostCrearVecinos = async (dataVecino) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!dataVecino || Object.keys(dataVecino).length === 0) {
            throw new Error('Los datos del cliente son inválidos.');
          }
        try {
            const data = await postCrearVecinosColindantes(token, dataVecino); // Llama al service
            console.log('vecino creado con exito:', dataVecino);
            return data;
          
        } catch (err) {
          console.error(err)
        }

      };

      //servicio para crear predio
      const fetchPostCrearPredio = async (dataPredio) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!dataPredio || Object.keys(dataPredio).length === 0) {
            throw new Error('Los datos del cliente son inválidos.');
          }
        try {
            const data = await postCrearPredio(token, dataPredio); // Llama al service
            console.log('predio:', dataPredio);
            setDataPredioCreacion(dataPredio)
            return data;
          
        } catch (err) {
          console.error(err)
        }

      };

      //servicio para crear comunicado
      const fetchPostCrearComunicado = async (dataComunicado) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!dataComunicado || Object.keys(dataComunicado).length === 0) {
            throw new Error('Los datos del cliente son inválidos.');
          }
        try {
            const dataLinkComunicado = await postCrearComunicado(token, dataComunicado); // Llama al service
            console.log('comunicado:', dataComunicado);
            setLinkActaComunicado(dataLinkComunicado)
            return dataLinkComunicado;
          
        } catch (err) {
          console.error(err)
        }

      };

      //servicio para crear un nuevo requisito por numero de radicacion
      const fetchPostCrearNuevoRequisito = async (dataNuevoRequisito) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!dataNuevoRequisito || Object.keys(dataNuevoRequisito).length === 0) {
            throw new Error('Los datos del nuevo requisito son inválidos.');
          }
        try {
            const data = await postCrearNuevoRequisito(token, dataNuevoRequisito); // Llama al service
            console.log('Nuevo requisito:', dataNuevoRequisito);
            setLinkActaComunicado(data)
            return data;
          
        } catch (err) {
          console.error(err)
        }

      };

      //servicio para crear la radicacion incompleta por nuemro de radicacion
      const fetchPostCrearRadicacionIncompleta = async (dataRadicacionIncompleta) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!dataRadicacionIncompleta || Object.keys(dataRadicacionIncompleta).length === 0) {
            throw new Error('Los datos del nuevo requisito son inválidos.');
          }
        try {
            const data = await postCrearRadicacionIncompleta(token, dataRadicacionIncompleta); // Llama al service
            console.log('Nuevo requisito:', dataRadicacionIncompleta);
            setLinkRadicacionIncompleta(data)
            return data;
          
        } catch (err) {
          console.error(err)
        }

      };

      //servicio obtener valla
      const fetchPostObtenerValla = async (dataValla) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!dataValla || Object.keys(dataValla).length === 0) {
            throw new Error('Los datos de la valla son inválidos.');
          }
        try {
            const resdataValla = await postObtenerValla(token, dataValla); // Llama al service
            console.log('valla:', dataValla);
            setDataVallaFetch(resdataValla)
            return resdataValla;
          
        } catch (err) {
          console.error(err)
        }

      };

      //servicio obtener acta legal y debida forma por numero de radicacion este fetch recibe el numero de radicacion en un objeto 
      const fetchPostObtenerActaLegal = async (dataActaLegal) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!dataActaLegal || Object.keys(dataActaLegal).length === 0) {
            throw new Error('Los datos del acta legal no son inválidos.');
          }
        try {
            const resdataActaLegal = await postObtenerActaLegalDebidaForma(token, dataActaLegal); // Llama al service
            console.log('acta legal:', dataActaLegal);
            setDataActaLegalFetch(resdataActaLegal)
            return resdataActaLegal;
          
        } catch (err) {
          console.error(err)
          console.log('los datos no estan completados ojito')
          setErrorActaLegal(true)
        }

      };

      //hook para los servicios post global
      const fetchPostGlobal = async (urlPost, primerValor) => {
        if (!token) {
            throw new Error('El token no está disponible.');
          }
      
          if (!primerValor || Object.keys(primerValor).length === 0) {
            throw new Error('Los datos del acta legal no son inválidos.');
          }
        try {
            const respuestaFetchPost = await servicioPostGlobal(token, urlPost, primerValor); // Llama al service
            console.log('respuesta fetch post:', respuestaFetchPost);
            return respuestaFetchPost;
          
        } catch (err) {
          console.error('Error al obtener los datos del fetch post', err)
        }

      };
  

  return {
    fetchPostNuevaRadicacion,
    fetchPostObtenerIdVecinos,
    fetchPostCrearVecinos,
    fetchPostCrearPredio,
    fetchPostCrearComunicado,
    fetchPostCrearNuevoRequisito,
    fetchPostCrearRadicacionIncompleta,
    fetchPostObtenerValla,
    fetchPostObtenerActaLegal,
    fetchPostGlobal
  };
}

export { useServicesPost}