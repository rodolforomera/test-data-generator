import './Arquivo1.css'

import React, { useEffect, useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Arquivo1Service from "./Arquivo1.service";
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import BankService from '../bank/Bank.service';
import BankFilter from '../bankFilter/BankFilter';

function Arquivo1() {

    const toast = useRef(null);
    const folderInput= useRef(null);
    const initialData = { typeFile: 0, qty: 10, id1: 1, date: new Date(), minValue: 1, maxValue: 10000.99 }
    const [path, setPath] = useState("");
    const [reportData, setReportData] = useState(initialData);
    const fileTypes = ['Arquivo 1', 'Arquivo 2'];

    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    function showToast(severity, summary, message) {
        const data = {severity: severity, summary: summary, detail: message, life: 3000};
        toast.current.show(data);
    }
    
    useEffect(() => {
        BankService.getAllBanks().then(res => {
            setSource(res.data)
        }).catch(er => {
            showToast('error', 'Error', er.message);
        });
    }, []);

    function handleClick(event) {
        if (event.target && event.target.files[0]) {
            setPath(event.target.files[0].path.substring(0, event.target.files[0].path.lastIndexOf('/') + 1));
        }else{
            setPath("");
            showToast('warn', 'Pasta não selecionada', 
                'É necessário que a pasta contenha ao menos 1 arquivo. Também é possivel digitar o diretório desejado');
        }
    }

    function createFile() {
        if (validate()) {
            Arquivo1Service.createFile(path).then(res => {
                showToast('success', 'Sucesso', 'Arquivo gerado com sucesso: ' + res.data);
            }).catch(er => {
                showToast('error', 'Error', er.message);
            });
        }
    }

    function validate() {

        if (path == null || path.toString().trim() === "") {
            showToast('warn', 'Atenção', 'Caminho do arquivo não informado');
            return false;
        }else if (reportData.typeFile == null || reportData.typeFile.toString().trim() === "") {
            showToast('warn', 'Atenção', 'Tipo arquivo não informado');
            return false;
        }else if (reportData.id1 == null || reportData.id1.toString().trim() === "") {
            showToast('warn', 'Atenção', 'Primeiro ID não informado');
            return false;
        }else if (reportData.date == null || reportData.date.toString().trim() === "") {
            showToast('warn', 'Atenção', 'Data não informada');
            return false;
        }else if (reportData.qty == null || reportData.qty.toString().trim() === "") {
            showToast('warn', 'Atenção', 'Quantidade não informada');
            return false;
        }else if (reportData.minValue == null || reportData.minValue.toString().trim() === "") {
            showToast('warn', 'Atenção', 'Valor minimo não informado');
            return false;
        }else if (reportData.maxValue == null || reportData.maxValue.toString().trim() === "") {
            showToast('warn', 'Atenção', 'Valor máximo não informado');
            return false;
        }else if (target.length === 0) {
            showToast('warn', 'Atenção', 'Nenhum banco selecionado');
            return false;
        }

        if (target.filter(i => i.percQty == 0).length > 0) {
            showToast('warn', 'Atenção', '1 ou mais bancos selecionados estão com a quantidade zerada. Aumente a quantidade de registros, diminua a porcentagem de cada banco ou remova o banco zerado');
            return false;
        }

        return true;

    }

    const onChangePath = (evt) => {
        setPath(evt.target.value);
    }

    const onChange = (name, e) => {
        setReportData(previousState => {  
            return { ...previousState,
                [name]: e
            }
        });
    }

    return (

        <div className="file1">

            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="card mb-4">
                <div className="card-header">
                    Selecione a pasta que o arquivo será salvo
                </div>
                <div className="card-body">
                    <div className="row g-2">
                        <div className='col-md-11'>
                            <input type="text" className="form-control" value={path} onChange={evt => onChangePath(evt)}/>
                        </div>
                        <div className="col-md-1">
                            <label htmlFor="dir" className="form-control custom-file-upload">...</label>
                            <input id="dir"
                                    type="file"  
                                    directory=""
                                    webkitdirectory="true"
                                    ref={folderInput}
                                    onChange={(event)=> { handleClick(event) }}>
                            </input>
                        </div>                       
                    </div>

                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Dados para geração
                </div>
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-4">
                            <label for="cmbTypeFile" className="form-label">Tipo arquivo</label>
                            <select id="cmbTypeFile" className="form-select" aria-label="Default select example" 
                                onChange={e => onChange('typeFile', e.target.value)}>
                                { 
                                    fileTypes.map((type, i) => 
                                        <option value={i}>{type}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-4">
                            <label for="txtId1" className="form-label">Primeiro ID:</label>
                            <InputNumber inputClassName='form-control' inputId="txtId1" 
                                locale='pt-BR' min={1} value={reportData.id1} onValueChange={(e) => onChange('id1', e.value)} />
                        </div>
                        <div className="col-md-2">
                            <label for="txtDate" className="form-label">Data:</label>
                            <Calendar inputClassName='form-control' inputId="txtDate" 
                                mask="99/99/9999" value={reportData.date} dateFormat="dd/mm/yy" 
                                onChange={(e) => onChange('date', e.value)} showIcon />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <label for="txtQty" className="form-label">Quantidade:</label>
                            <InputNumber inputClassName='form-control text-end' inputId="txtQty" 
                                locale='pt-BR' min={1} value={reportData.qty} onValueChange={(e) => onChange('qty', e.value)} />
                        </div>
                        <div className="col-md-4">
                            <label for="txtMin" className="form-label">Valor Minimo:</label>
                            <InputNumber inputClassName='form-control text-end' inputId="txtMin" locale='pt-BR' 
                                min={0.01} value={reportData.minValue} minFractionDigits={2} maxFractionDigits={2} 
                                onValueChange={(e) => onChange('minValue', e.value)} prefix="R$"/>
                        </div>
                        <div className="col-md-4">
                            <label for="txtMax" className="form-label">Valor Maximo:</label>
                            <InputNumber inputClassName='form-control text-end' inputId="txtMax" locale='pt-BR' 
                                min={0.01} value={reportData.maxValue} minFractionDigits={2} maxFractionDigits={2} 
                                onValueChange={(e) => onChange('maxValue', e.value)} prefix="R$"/>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">
                            Bancos
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <BankFilter source={source} setSource={setSource} 
                                    target={target} setTarget={setTarget}
                                    qty={reportData.qty} />
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn btn-success float-end" onClick={e => {createFile()}}>Gerar Arquivo</button>

                </div>
            </div>

        </div>
          
    );
}

export default Arquivo1