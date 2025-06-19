/* eslint-disable react/prop-types */

import { createContext, useState } from 'react';

const GlobalState = createContext();

function GlobalProvider({ children }) {

  const valorInicial = { 
    "numero_radicacion": "47001-2-24-0014", 
    "organization": "",
    "departamento": "", 
    "municipio": "", 
    "fecha": "", 
    "objeto_tramite": null, 
    "nombre_solicitante": "", 
    "email_solicitante": "", 
    "dni_solicitante": "", 
    "phone_solicitante": "", 
    "usos": null, 
    "area": null, 
    "tipo_vivienda": null, 
    "is_cultural": false, 
    "requisitos_completados": [],
    "requisitos_pendientes": [],
    "descripcion_tramite": "", 
    "descripcion_modalidad": "",
    "lista_requisitos": [],
    "no_aplica": []
  };


  const [ nuevaRadicacion, setNuevaRadicacion ] = useState(valorInicial);
  const [ globalNumeroRadicacion, setGlobalNumeroRadicacion ] = useState('');
  const [ globalIdVecinos, setGlobalIdVecinos ] = useState('');

  const valorInicialVecinos = {
    "numero_radicacion": "",
    "nombre": "",
    "direccion": "",
    "barrio": "",
    "descripcion_tramite": "",
    "id_vecinos": ""
  }

  const [ vecinosColindantes, setVecinosColindantes ] = useState(valorInicialVecinos);
  const [ listadoVecinos, setListadoVecinos ] = useState(null);
  const [ valorDropdown, setValorDropdown ] = useState('');

  const valorInicialPredio = {
    'numero_radicacion': "",
    'direccion_actual': "",  
    'direccion_anterior': null,  
    'matricula_inmobiliaria': "",  
    'numero_catastral': "",  
    'clasificacion_suelo': "",  
    'barrio': "",  
    'comuna': "",  
    'estrato': "",  
    'manzana': "",  
    'planimetria': null,  
    'cual': null,  
    'vereda': null,  
    'sector': null,  
    'corregimiento': null,  
    'lote': null, 
    'area': null,
  }

  const [ predio, setPredio ] = useState(valorInicialPredio);

  const [ dataPredioCreacion, setDataPredioCreacion ] = useState({});
  const [ linkActaComunicado, setLinkActaComunicado ] = useState(null);

  const [ reloadGlobal, setReloadGlobal ] = useState(false);

  const [ listadoRadicaciones, setListadoRadicaciones ] = useState([]);

  const [ dataTramite, setDataTramite ] = useState({});

  const [ listadoRequisitos, setListadoRequisitos ] = useState([])

  const [ linkRadicacionIncompleta, setLinkRadicacionIncompleta ] = useState(null);

  const [ listadoPredios, setListadoPredios ] = useState([]);

  const [ valorParaFiltrar, setValorParaFiltrar ] = useState('');

  const [ prediosAsociadosNumeroRadicacion, setPrediosAsociadosNumeroRadicacion ] = useState([]);

  const [ informacionRadicacion, setInformacionRadicacion ] = useState({});

  const [ dataVallaFetch, setDataVallaFetch ] = useState({});

  const [ dataActaLegalFetch, setDataActaLegalFetch ] = useState({});
  const [ errorActaLegal, setErrorActaLegal ] = useState(false);

  const [ selecionAreaObservacionesModal, setSelecionAreaObservacionesModal ] = useState(false);
  const [ categoriaObservacionSeleccionada, setCategoriaObservacionSeleccionada ] = useState('');
  const [ actualizacionEncargados, setActualizacionEncargados ] = useState(false);

  const [ selecionTipoDeProcedente, setSelecionTipoDeProcedente ] = useState(false);

  const [ valorConfiguracion, setValorConfiguracion ] = useState('');

  const [ valorConfiguracionExpensas, setValorConfiguracionExpensas ] = useState('');

  const [ errorDePermisosPorAcceso, setErrorDePermisosPorAcceso ] = useState(false);
  const [ isOpenMenuMobile, setIsOpenMenuMobile ] = useState(false);

  const [ openMenuOtrasActuaciones, setOpenMenuOtrasActuaciones ] = useState(false);

  const [ openModalNuevoTitularOtrasActuaciones, setOpenModalNuevoTitularOtrasActuaciones ] = useState(false);
  const [ openModalNewHistoryOtherActs, setOpenModalNewHistoryOtherActs ] = useState(false);
  const [ openModalUpdateHistoryOtherActs, setOpenModalUpdateHistoryOtherActs ] = useState(false);
  const [ openModalNotesHistoryOtherActs, setOpenModalNotesHistoryOtherActs ] = useState(false);
  const [ showCuratorshipManagers, setShowCuratorshipManagers ] = useState(false);  
  const [ openModalDataPutTramiteOA, setOpenModalDataPutTramiteOA ] = useState(false);
  const [ openModalAgregarPredioOA, setOpenModalAgregarPredioOA ] = useState(false);

  const [ openModal, setOpenModal ] = useState(false);
  
  const [selectedRow, setSelectedRow] = useState(null);

  const [isOpenVideo, setIsOpenVideo] = useState(false);

  const [ openModalTotalLiquidacion, setOpenModalTotalLiquidacion ] = useState(false);

  const [ guardarLiquidacion, setGuardarLiquidacion ] = useState(false);
  const [ putLiquidacion, setPutLiquidacion ] = useState(false);
  const [ abandonandoProceso, setAbandonandoProceso ] = useState(false);
  const [ iniciandoProceso, setIniciandoProceso ] = useState(false);
  const [ abandonandoTramiteModal, setAbandonandoTramiteModal ] = useState(false);
  const [ isOpenMenuConfiguracion, setIsOpenMenuConfiguracion ] = useState(false);
  const [ isOpenMenuConsultas, setIsOpenMenuConsultas ] = useState(false);

  const [ progressiveStepStatus, setProgressiveStepStatus ] = useState({
    "step1": true,
    "step2": false,
    "step3": false,
    "step4": false,
    "step5": false,
    "step6": false,
    "step7": false,
    "step8": false,
  });

  const [ agregarVecinoColindante, setAgregarVecinoColindante ] = useState(false);
  const [ openModalObservacionesInformacionDetallada, setOpenModalObservacionesInformacionDetallada ] = useState(false);
  const [ qrCodeCopiado, setQrCodeCopiado ] = useState(false);
  const [ verMas, setVerMas ] = useState(false);
  const [ openModalReportes, setOpenModalReportes ] = useState(false);
  const [ openModalVerMasOAHistorias, setOpenModalVerMasOAHistorias ] = useState(false);
  const [ otrasActuacionesHistoriaSeleccionada, setOtrasActuacionesHistoriaSeleccionada ] = useState(null);
  const [ openModalVerMasOAHistoriasListado, setOpenModalVerMasOAHistoriasListado ] = useState(false);


  return (
    <GlobalState.Provider value={{
      nuevaRadicacion,
      setNuevaRadicacion,
      setGlobalNumeroRadicacion,
      globalNumeroRadicacion,
      globalIdVecinos, 
      setGlobalIdVecinos,
      vecinosColindantes, 
      setVecinosColindantes,
      listadoVecinos, 
      setListadoVecinos,
      setValorDropdown,
      valorDropdown,
      predio,
      setPredio,
      setDataPredioCreacion,
      dataPredioCreacion,
      setLinkActaComunicado,
      linkActaComunicado,
      reloadGlobal,
      setReloadGlobal,
      setListadoRadicaciones,
      listadoRadicaciones,
      setDataTramite,
      dataTramite,
      setListadoRequisitos,
      listadoRequisitos,
      linkRadicacionIncompleta, 
      setLinkRadicacionIncompleta,
      setListadoPredios,
      listadoPredios,
      setValorParaFiltrar,
      valorParaFiltrar,
      setPrediosAsociadosNumeroRadicacion,
      prediosAsociadosNumeroRadicacion,
      setInformacionRadicacion,
      informacionRadicacion,
      setDataVallaFetch,
      dataVallaFetch,
      setDataActaLegalFetch,
      dataActaLegalFetch,
      setErrorActaLegal,
      errorActaLegal,
      selecionAreaObservacionesModal,
      setSelecionAreaObservacionesModal,
      setCategoriaObservacionSeleccionada,
      categoriaObservacionSeleccionada,
      setActualizacionEncargados,
      actualizacionEncargados,
      selecionTipoDeProcedente,
      setSelecionTipoDeProcedente,
      setValorConfiguracion,
      valorConfiguracion,
      setValorConfiguracionExpensas,
      valorConfiguracionExpensas,
      valorInicialPredio,
      setErrorDePermisosPorAcceso,
      errorDePermisosPorAcceso,
      isOpenMenuMobile,
      setIsOpenMenuMobile,
      openMenuOtrasActuaciones,
      setOpenMenuOtrasActuaciones,
      openModalNuevoTitularOtrasActuaciones,
      setOpenModalNuevoTitularOtrasActuaciones,
      openModalNewHistoryOtherActs,
      setOpenModalNewHistoryOtherActs,
      openModalUpdateHistoryOtherActs,
      setOpenModalUpdateHistoryOtherActs,
      openModalNotesHistoryOtherActs,
      setOpenModalNotesHistoryOtherActs,
      showCuratorshipManagers,
      setShowCuratorshipManagers,
      openModalDataPutTramiteOA,
      setOpenModalDataPutTramiteOA,
      openModalAgregarPredioOA,
      setOpenModalAgregarPredioOA,
      openModal,
      setOpenModal,
      selectedRow,
      setSelectedRow,
      isOpenVideo,
      setIsOpenVideo,
      openModalTotalLiquidacion,
      setOpenModalTotalLiquidacion,
      guardarLiquidacion,
      setGuardarLiquidacion,
      putLiquidacion,
      setPutLiquidacion,
      abandonandoProceso,
      setAbandonandoProceso,
      iniciandoProceso,
      setIniciandoProceso,
      abandonandoTramiteModal,
      setAbandonandoTramiteModal,
      isOpenMenuConfiguracion,
      setIsOpenMenuConfiguracion,
      isOpenMenuConsultas,
      setIsOpenMenuConsultas,
      progressiveStepStatus,
      setProgressiveStepStatus,
      agregarVecinoColindante,
      setAgregarVecinoColindante,
      openModalObservacionesInformacionDetallada,
      setOpenModalObservacionesInformacionDetallada,
      qrCodeCopiado,
      setQrCodeCopiado,
      verMas,
      setVerMas,
      openModalReportes,
      setOpenModalReportes,
      openModalVerMasOAHistorias,
      setOpenModalVerMasOAHistorias,
      otrasActuacionesHistoriaSeleccionada,
      setOtrasActuacionesHistoriaSeleccionada,
      openModalVerMasOAHistoriasListado,
      setOpenModalVerMasOAHistoriasListado

    }}>
      {children}
    </GlobalState.Provider>
  );
}

export { GlobalState, GlobalProvider };
