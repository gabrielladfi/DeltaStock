import { useContext, useState } from "react";
import { AuthContextState } from "../Context/AuthContextContext";
import { 
    getNumeroRadicacion, 
    getVecinosNumeroRadicacion, 
    getListadoRadicaciones, 
    getRequisitosNumRadicacion, 
    getObtenerListadoDePredios ,
    getPrediosAsociadosNumRadicacion,
    getObtenerTodaInformacionDeRadicacion,
    servicioGetGlobal,
} from "../Services/ServicionuevaRadicacion";
import { GlobalState } from "../Context/GlobalContext";

function useServicesGet() {


    const { token } = useContext(AuthContextState);
    const { 
        setListadoVecinos, 
        setListadoRadicaciones, 
        setListadoRequisitos, 
        setListadoPredios,
        setPrediosAsociadosNumeroRadicacion,
        setInformacionRadicacion
    } = useContext(GlobalState);

    const [ error, setError ] = useState(null);
    const [ numeroRadicacion, setNumeroRadicacion ] = useState('');
    const [ loading, setLoading ] = useState(true)

    console.log(token);

//Obtener el numero de radicacion
  const fetchNumeroRadicacion = async () => {
      try {
          const data = await getNumeroRadicacion(token); // Ejecuta el servicio 

          setLoading(false)
          setNumeroRadicacion(data);

      } catch (err) {
          setLoading(false)
          setError(err.message);
      }
  };

//Obtener listado de vecinos colindantes por numero de radicacion
const fetchListadoVecinosNumeroRadicacion = async (propnumeroRadicacion) => {
    try {
        const data = await getVecinosNumeroRadicacion(token, propnumeroRadicacion); // Ejecuta el servicio 
        setLoading(false)
        setListadoVecinos(data);
    } catch (err) {
        setLoading(false)
        setError(err.message);
    }
};

  //Obtener listado de radicaciones
const fetchListadoRadicaciones = async () => {
    try {
        const data = await getListadoRadicaciones(token); // Ejecuta el servicio 

        setLoading(false)
        setListadoRadicaciones(data);

    } catch (err) {
        setLoading(false)
        setError(err.message);
    }
};

  //Obtener listado de requisitos por numero de radicacion
const fetchRequisitoNumeroRadicacion = async (numRadicacion) => {
    try {
        const data = await getRequisitosNumRadicacion(token, numRadicacion); // Ejecuta el servicio 

        setLoading(false)
        setListadoRequisitos(data);

    } catch (err) {
        setLoading(false)
        setError(err.message);
    }
};

//Obtener el listado de predios 
const fetchObtenerListadoDePredios = async () => {
    try {
        const dataListadoPredios = await getObtenerListadoDePredios(token); // Ejecuta el servicio 
        setLoading(false)
        setListadoPredios(dataListadoPredios);
        return dataListadoPredios;

    } catch (err) {
        setLoading(false)
        setError(err.message);
    }
};


//Get fetch para obtener los predios asociados a un numero de radicacion  
const fetchPrediosAsociadosNumeroRadicacion = async (numRadicacion) => {
    try {
        const dataPrediosAsociados = await getPrediosAsociadosNumRadicacion(token, numRadicacion); // Ejecuta el servicio 

        setLoading(false)
        setPrediosAsociadosNumeroRadicacion(dataPrediosAsociados);

    } catch (err) {
        setLoading(false)
        setError(err.message);
    }
};

//Get fetch para obtener toda la informacion de una radicacion  
const fetchInformacionDeRadicacion = async (numRadicacion) => {
    try {
        const dataInformacionRadicacion = await getObtenerTodaInformacionDeRadicacion(token, numRadicacion); // Ejecuta el servicio 

        setLoading(false)
        setInformacionRadicacion(dataInformacionRadicacion);
        return dataInformacionRadicacion;

    } catch (err) {
        setLoading(false)
        setError(err.message);
    }
};

    //Fetch tipo GET Global nuevo hook para hacer todas las peticiones get sin repetir codigo
    const fetchGetHook = async (urlFetch, segundoValor) => {
        try {
            const fetchGetdata = await servicioGetGlobal(token, urlFetch, segundoValor); // Ejecuta el servicio 
            setLoading(false)
            return fetchGetdata;
  
        } catch (err) {
            setLoading(false)
            setError(err.message);
        }
    };




  return {
    error,
    loading,
    fetchNumeroRadicacion,
    numeroRadicacion,
    fetchListadoVecinosNumeroRadicacion,
    fetchListadoRadicaciones,
    fetchRequisitoNumeroRadicacion,
    fetchObtenerListadoDePredios,
    fetchPrediosAsociadosNumeroRadicacion,
    fetchInformacionDeRadicacion,
    fetchGetHook
  };
}

export { useServicesGet };