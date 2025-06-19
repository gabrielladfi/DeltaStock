/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import FormStickers from "./index";
import { formatDateToYYYYMMDDHHMM } from '@/Utils/handleTrasnformDate';
import { useFetchPost } from "@/Hooks/useFetchPost";
import { AuthContextState } from "@/Context/AuthContextContext";
import { urlBase, urlGenerarStickerSalida } from "@/Utils/UrlData";

function FormStickerLogSalida({stateClosedForm, propNumeroOficio}) {

    const { token } = useContext(AuthContextState);
    
    //estado para guardar la fecha
    const [ date, setDate ] = useState(new Date());

    //Logica para desestructurar la fecha en dia, mes, año, hora y minutos
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hora = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');

    //objeto con la fecha desestructurada para enviar al endpoint
    const dataDate = {
        dia: dia,
        mes: mes,
        year: year,
        hora: hora,
        minutos: minutos,
        numero_oficio: propNumeroOficio
    }

    //funcion para cambiar la fecha y verifica si existe un evento toma la data del evento si no toma la fecha actual
    function handleChangeDate(e) {
        setDate(e.target
            ? new Date(e.target.value)
            : new Date
        );
    }

    console.log(dataDate);

    //hook para consumir el servicio POST
    const { fetchPost, dataPost } = useFetchPost(token, `${urlBase}${urlGenerarStickerSalida}`, dataDate);

    //funcion para cerrar el formulario que genera el sticker de salida
    function handleClosedForm() {
        stateClosedForm(false);
    }

    //funcion para ejecutar el servicio POST para generar el sticker de salida
    async function handleFetchPost() {
        console.log('click')
        try {
            await fetchPost('');
        }catch(err){
            console.error('Error al generar sticker', err);
        }
    }

    //este useEffect se encarga de abrir el enlace del documento generado en una nueva pestaña, primero verificando que la dataPost exista
    useEffect(() => {
        if(dataPost && dataPost.file_path) {
            window.open(
                `https://apiv1.deltapro.com.co/deltacu/docs?filename=${dataPost.file_path}`,
                '_blank'
            );
            handleClosedForm()
        }else {
            console.error('No se pudo generar el enlace para el documento');
        }
    }, [dataPost])

    


    return (
        <FormStickers
            propTitleForm='Generar Sticker de Salida'
            propLabel='Fecha de salida'
            propTextButton='Generar Sticker'
            propInputName='nombre'
            propValueInput={formatDateToYYYYMMDDHHMM(date)}
            propFnForm={handleFetchPost}
            propFnInputData={handleChangeDate}
            propFnCloseForm={handleClosedForm}
        />
    )
}

export default FormStickerLogSalida
