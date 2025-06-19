import PropTypes from "prop-types";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import PrimaryButton from '@/Components/PrimaryButton'
import './formularioreportecatastral.scss'
import { XMarkIcon } from '@heroicons/react/24/outline'
import DropdownSearch from "@/Components/Molecules/DropdownSearch";
import { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useServicePost } from "@/Api/useServicePost";
import { AuthContextState } from "@/Context/AuthContextContext";
import ModalBasicNew from "../ModalBasicNew";
import BoxContainerInputsByInfoBigScroll from "@/Components/Atoms/BoxContainerInputsByInfoBigScroll";
import ContainerTetxtPlain from "@/Components/Atoms/ContainerTetxtPlain";
import ContainerButtonsBackandNext from "@/Components/Atoms/ContainerButtonsBackandNext";
import SecondaryButtonNewSmall from "@/Components/Atoms/SecondaryButtonNewSmall";
import PrimaryButtonNewSmall from "@/Components/Atoms/PrimaryButtonNewSmall";

FormularioReporteDane.propTypes = {
    functionBuscarExpedientes: PropTypes.func,
    propFunctionCloseModal: PropTypes.func,
}


function FormularioReporteDane( { functionBuscarExpedientes, propFunctionCloseModal } ) {

    const dateInputRef = useRef(null);

    useEffect(() => {
        if (dateInputRef.current) {
            flatpickr(dateInputRef.current, {
                mode: "range",
                onChange: handleGetDate
            });
        }
    }, []);

    const [ valueInputNumeroRadicacion, setValueInputNumeroRadicacion ] = useState('')
    const [ listNumRadicacion, setListNumRadicacion ] = useState([])

    function handleInputNumeroRadicacion(event) {
        setValueInputNumeroRadicacion(event.target.value);
    }

    function handleAddNumRadicaciondd(value) {
        setListNumRadicacion(prevList => [...prevList, value]);
        setDataPost({
            ...dataPost,
            otros_tramites: [...dataPost.otros_tramites, value]
        })
    }

    function handleDeleteNumRadicacion(index) {
        setListNumRadicacion(prevList => prevList.filter((_, i) => i !== index));
    }

    console.log('listNumRadicacion', listNumRadicacion)

    const initialDataPost = {
        fecha_inicio: '',
        fecha_finalización: '',
        otros_tramites: []
    }

    const [ dataPost, setDataPost ] = useState(initialDataPost)

    function handleGetDate(date) {
        console.log('date', date)
        setDataPost({
            ...dataPost,
            fecha_inicio: dayjs(date[0]).format('YYYY-MM-DD'),
            fecha_finalización: dayjs(date[1]).format('YYYY-MM-DD')
        })
    }

    console.log('dataPost', dataPost)

    const { token } = useContext(AuthContextState)

    const { executePost, data } = useServicePost()

    function handleSubmit() {
        executePost(token, 'https://apiv1.deltapro.com.co/deltacu/reports/dane/', dataPost)
    }

    useEffect(() => {
        if (data) {
            window.open(
                `https://apiv1.deltapro.com.co/deltacu/docs?filename=${data.filepath}`,
                '_blank'
            );  
        }
    }, [data])
    
    
    return (
        <ModalBasicNew title='Reporte Dane' propFunctionCloseModal={propFunctionCloseModal}>
            <BoxContainerInputsByInfoBigScroll>
            <div className='formulario-reporte-catastral__fechas'>
                <label className='formulario-reporte-catastral__fechas__label' htmlFor="">Filtro Fechas *</label>
                <input onChange={handleGetDate} name='fecha_inicio' ref={dateInputRef} placeholder="Rango de fechas" className='formulario-reporte-catastral__fechas__input' type="date" />
            </div>
            <DropdownSearch isLabel={false} propAddNumRadicaciondd={handleAddNumRadicaciondd} propValue={valueInputNumeroRadicacion} propFnInput={handleInputNumeroRadicacion} />
            <div className="div-line"></div>
            <ContainerTetxtPlain title='Expedientes agregados manualmente' />
                <div className="formulario-reporte-catastral__container-list__list">
                    {
                        listNumRadicacion.map((item, index) => (
                            <div key={index} className="formulario-reporte-catastral__container-list__list__item">
                                <span className="formulario-reporte-catastral__container-list__list__item__span">{item}</span>
                                <button onClick={() => handleDeleteNumRadicacion(index)} className="formulario-reporte-catastral__container-list__list__item__button">
                                    <XMarkIcon className='formulario-reporte-catastral__container-list__list__item__button__icon' />
                                </button>
                            </div>
                        ))
                    }
                </div>
            </BoxContainerInputsByInfoBigScroll>
            <ContainerButtonsBackandNext>
                <SecondaryButtonNewSmall onClick={functionBuscarExpedientes} text={'Buscar Expedientes'} />
                <PrimaryButtonNewSmall onClick={handleSubmit} text={'Generar Informe'} />
            </ContainerButtonsBackandNext>
             

        </ModalBasicNew>
       
    )
}

export default FormularioReporteDane
