/* eslint-disable react/prop-types */
import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate'

import PrimaryInputLiquidaciones from '@/Components/Molecules/PrimaryInputLiquidaciones'
import './formputactadministrative.scss'
import PrimarySelectDropDown from '@/Components/Molecules/PrimarySelectDropDown'
import PrimaryButton from '@/Components/PrimaryButton'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PrimaryLabeledInput from '@/Components/Molecules/PrimaryLabeledInput'
import PrimaryLabel from '@/Components/Atoms/PrimaryLabel'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate'
import { useContext, useRef } from 'react'
import Modal from '@/Components/Modal'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave'
import warning from '@/assets/warninglogo.svg'
import { GlobalState } from '@/Context/GlobalContext'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import { Input } from '@/Components/Atoms/Input/Input'
import PickList from '@/Components/Molecules/PickList'

function FormPutActAdministrative({typeact, publicRazon, adminActMotivo, typeDocument, dataPutAct, setDataPutAct, handleChangeNewAct, handleGetDateTransform, handlePutAct, fnCloseModal}) {
    
    const tramiteIniciado = useRef(true);

    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState)

    function handleCloseFormPutActAdministrativeValidator() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            fnCloseModal();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false);
        fnCloseModal();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false);
    }

    return (
        <ModalBasicNew title='Actualizar Acto Administrativo' propFunctionCloseModal={handleCloseFormPutActAdministrativeValidator}>
            <BoxContainerInputsByInfoBigScroll>
                <Input 
                    textlabel='No. Acto Administrativo:'
                    placeholder='No. Acto Administrativo'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                    name='numero_acto'
                    onChange={handleChangeNewAct}
                    value={dataPutAct.numero_acto}
                />
                   {/*<PrimaryInputLiquidaciones labelText='No. Acto Administrativo:' propName='numero_acto' propFnInput={handleChangeNewAct} propValue={dataPutAct.numero_acto} />*/}
                    
                <PrimaryInputDate 
                    label='Fecha de Expedicion:'
                    className={'global_primary_input'}
                    value={formatDateToYYYYMMDD(dataPutAct.fecha_expedicion)}
                    onChangeFn={(e) => handleGetDateTransform(e, setDataPutAct)}
                    name={'fecha_expedicion'}
                    blockWriteInput={true}
                />

                <Input 
                    textlabel='Vigencia:'
                    placeholder='Vigencia'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                    name='vigencia'
                    onChange={handleChangeNewAct}
                    value={dataPutAct.vigencia}
                />

                <PickList 
                    label='Tipo de Acto:'
                    placeholder='Tipo de Acto'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                    options={typeact}
                    name='tipo_acto'
                    onChange={handleChangeNewAct}
                    value={dataPutAct.tipo_acto}
                />

                <PickList 
                    label='Motivo Acto Admin:'
                    placeholder='Motivo Acto Admin'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                    options={adminActMotivo}
                    name='motivo_acto_administrativo'
                    onChange={handleChangeNewAct}
                    value={dataPutAct.motivo_acto_administrativo}
                    optionSelected='Motivo 1'
                />

                <Input 
                    textlabel='Area:'
                    placeholder='Area'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                    name='area'
                    onChange={handleChangeNewAct}
                    value={dataPutAct.area}
                />

                <Input 
                    textlabel='Area Construida:'
                    placeholder='Area Construida'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                    name='area_construida'
                    onChange={handleChangeNewAct}
                />

                <PickList 
                    label='Razon Publicado:'
                    placeholder='Razon Publicado'
                    regexOptions={/^[0-9a-zA-Z-]+$/}
                    options={publicRazon}
                    name='razon_publicado'
                    onChange={handleChangeNewAct}
                    value={dataPutAct.razon_publicado}
                    optionSelected='Razon 1'
                />


                    
                    {/*<PrimaryInputLiquidaciones labelText='Fecha de Expedicion:' propType={'date'} propName='fecha_expedicion' propFnInput={(e) => handleGetDateTransform(e, setDataPutAct)} propValue={formatDateToYYYYMMDD(dataPutAct.fecha_expedicion)} />*/}
                    {/*<PrimaryInputLiquidaciones labelText='Vigencia:' propName='vigencia' propFnInput={handleChangeNewAct} propValue={dataPutAct.vigencia} />*/}
                    {/*<PrimarySelectDropDown labelText='Tipo de Acto:' propOptions={typeact} propName='tipo_acto' propFnInput={handleChangeNewAct} propValue={dataPutAct.tipo_acto} />*/}
                    {/*<PrimarySelectDropDown labelText='Motivo Acto Admin:' propOptions={adminActMotivo} />*/}
                    {/*<PrimaryInputLiquidaciones labelText={'Area'} propValue={'440'} />
                    <PrimaryInputLiquidaciones labelText={'Area Construida'} propValue={'425'} />*/}
              
                
                    {/*<PrimarySelectDropDown labelText='Razon Publicado:' propOptions={publicRazon} propName='razon_publicado' propFnInput={handleChangeNewAct} propValue={dataPutAct.razon_publicado} />*/}
                    
                        <PrimaryInputDate 
                            label='Fecha Edicto:'
                            className={'global_primary_input'}
                            value={formatDateToYYYYMMDD(dataPutAct.fecha_edicto)}
                            onChangeFn={(e) => handleGetDateTransform(e, setDataPutAct)}
                            name={'fecha_edicto'}
                            blockWriteInput={true}
                        />
                    
                    {/*eliminar<PrimaryInputLiquidaciones labelText='Fecha Edicto:' propType={'date'} propName='fecha_edicto' propFnInput={(e) => handleGetDateTransform(e, setDataPutAct)} propValue={formatDateToYYYYMMDD(dataPutAct.fecha_edicto)} />*/}
                    
                        <PrimaryInputDate 
                            label='Fecha Ejecucion:'
                            className={'global_primary_input'}
                            value={formatDateToYYYYMMDD(dataPutAct.fecha_ejecucion)}
                            onChangeFn={(e) => handleGetDateTransform(e, setDataPutAct)}
                            name={'fecha_ejecucion'}
                            blockWriteInput={true}
                        />
                    
                    {/*eliminar<PrimaryInputLiquidaciones labelText='Fecha Ejecucion:' propType={'date'} propName='fecha_ejecucion' propFnInput={(e) => handleGetDateTransform(e, setDataPutAct)} propValue={formatDateToYYYYMMDD(dataPutAct.fecha_ejecucion)} />*/}    
                    
                        <PrimaryInputDate 
                            label='Fecha Vigencia:'
                            className={'global_primary_input'}
                            value={formatDateToYYYYMMDD(dataPutAct.fecha_vigencia)}
                            onChangeFn={(e) => handleGetDateTransform(e, setDataPutAct)}
                            name={'fecha_vigencia'}
                            blockWriteInput={true}
                        />

                    <PickList 
                        label='Tipo de Documento:'
                        placeholder='Tipo de Documento'
                        regexOptions={/^[0-9a-zA-Z-]+$/}
                        options={typeDocument}
                        name='tipo_documento'
                        onChange={handleChangeNewAct}
                        value={dataPutAct.tipo_documento}
                        optionSelected='Seleccione un tipo de documento'
                    />

                    <Input 
                        textlabel='Link QR:'
                        placeholder='Link QR'
                        regexOptions={/^[0-9a-zA-Z-]+$/}
                        name='link'
                        onChange={handleChangeNewAct}
                        value={dataPutAct.link}
                        readOnly={true}
                    />
                    {/*<PrimarySelectDropDown labelText='Tipo de Documento:' propOptions={typeDocument} propName='tipo_documento' propFnInput={handleChangeNewAct} propValue={dataPutAct.tipo_documento} />*/}
                    {/*<PrimaryInputLiquidaciones labelText='Link QR:' propName='link' propFnInput={handleChangeNewAct} propValue={dataPutAct.link} />*/}
                

            </BoxContainerInputsByInfoBigScroll>
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall onClick={handlePutAct} text={'Actualizar'} />
            </ContainerButtonsBackandNext>
            

            
            {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, no se actualizara el acto administrativo."
                            alt="Imagen de alerta"  
                            onClick={handleAbandonarProcesoModal}
                            textButton="Abandonar"
                            textButton2="Cancelar"
                            onClickCancel={handleCancelar}
                            image={warning}
                        />
                    </Modal>
                )
            }
        

        </ModalBasicNew>
       
    )
}

export default FormPutActAdministrative
