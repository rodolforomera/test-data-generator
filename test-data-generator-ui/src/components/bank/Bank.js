import './Bank.css'

import React, { useEffect, useState, useRef } from "react";
import BankService from "./Bank.service";
import { Toast } from 'primereact/toast';
import { Paginator } from 'primereact/paginator';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

function Bank() {

    const toast = useRef(null);

    const initialState = {bank: "", name: ""};
    const initPage = {pageNumber: 0, pageSize: 5, totalPages: 0, totalRecords: 0, totalRows: 5, first: 0};

    const [banks, setBanks] = useState([]);
    const [bankSel, setBankSel] = useState(initialState);
    const [bankSelIndex, setBankSelIndex] = useState(-1);
    const [page, setPage] = useState(initPage);

    useEffect(() => {
        getBanks(page.pageNumber, page.pageSize);
    }, []);

    const onSelectBank = (bank, index) => {
        setBankSel(bank);
        setBankSelIndex(index);
    }

    const onChangeBank = (type, evt) => {
        setBankSel(previousState => {
            if (type == 1) {
                return { ...previousState, bank: evt.target.value }
            }else{
                return { ...previousState, name: evt.target.value }
            }

        });
    }

    const onPageChange = (event) => {
        getBanks(event.page, page.pageSize);
        newBank();
    };

    function getBanks(pageNumber, pageSize) {
        BankService.getBanks(pageNumber, pageSize).then(res => {
            setBanks(res.data.content)
            setPage(previousState => { 
                return { ...previousState, 
                    first: res.data.pageable.offset,
                    pageNumber: res.data.pageable.pageNumber, 
                    pageSize: res.data.pageable.pageSize,
                    totalPages: res.data.totalPages,
                    totalRecords: res.data.totalElements,
                    totalRows: res.data.numberOfElements
                }
            })
        }).catch(er => {
            showToast('error', 'Error', er.message);
        });
    }

    function newBank() {
        setBankSel(initialState);
        setBankSelIndex(-1);
    }

    const newBankClick = () => {
        newBank();
    }

    function showToast(severity, summary, message) {
        const data = {severity: severity, summary: summary, detail: message, life: 3000};
        toast.current.show(data);
    }

    const saveBankClick = () => {

        if (bankSel.bank === undefined || bankSel.bank.trim() == "") {
            showToast('warn', 'Atenção', 'Banco não informado');
            return;
        }else if (bankSel.name === undefined || bankSel.name.trim() == "") {
            showToast('warn', 'Atenção', 'Nome do banco não informado');
            return;
        }

        BankService.saveBank(bankSel.bank, bankSel.name).then(res => {
            getBanks(0, page.pageSize);
            newBank();
            showToast('success', 'Sucesso', 'Banco cadastrado com sucesso');
        }).catch(er => {
            showToast('error', 'Error', er.message);
        });
    }

    const excludeBankClick = () => {
        BankService.excludeBank(bankSel.bank).then(res => {
            getBanks(0, page.pageSize);
            newBank();
            showToast('success', 'Sucesso', 'Banco excluido com sucesso');
        }).catch(er => {
            showToast('error', 'Error', er.message);
        });
    }

    const reject = () => {
    }

    const confirmExclusion = () => {
        confirmDialog({
            message: 'Você tem certeza que deseja excluir?',
            header: 'Exclusão',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            rejectLabel: 'Não',
            acceptLabel: 'Sim',
            excludeBankClick,
            reject
        });
    };

    return (
        <div className="bank">

            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="card">
                <div className="card-header">
                    Lista de Bancos
                </div>
                <div className="card-body">
                    <div className="table-bank mb-4">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th colSpan={2}>Bancos Cadastrados</th>
                                </tr>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    banks.map((bank, i) => 
                                        <tr key={i} onClick={() => onSelectBank(bank, i)}>
                                            <td className={i === bankSelIndex ? 'bank-sel' : ''}>{ bank.bank }</td>
                                            <td className={i === bankSelIndex ? 'bank-sel' : ''}>{ bank.name }</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <Paginator first={page.first} rows={page.pageSize} totalRecords={page.totalRecords} 
                            rowsPerPageOptions={[5]} onPageChange={onPageChange} />                        
                    </div>
                    <button type="button" className="btn btn-danger float-end" 
                            style={{display: bankSelIndex != -1? "" : "none"}} onClick={confirmExclusion}>Excluir</button>
                </div>
            </div>

            <hr/>

            <button type="button" className="btn btn-primary" onClick={e => {newBank()}}>Novo</button>
            <br/>
            <br/>
            <div className="card">
                <div className="card-header">
                    Cadastro de Bancos
                </div>
                <div className="card-body">
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputBank" className="form-label">Banco</label>
                            <input type="text" className="form-control" id="inputBank" value={bankSel.bank} 
                                onChange={evt => onChangeBank(1, evt)} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputName" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="inputName" value={bankSel.name} 
                                onChange={evt => onChangeBank(2, evt)}/>
                        </div>
                        <div className="col-12">
                            <button type="button" className="btn btn-success float-end" onClick={e => saveBankClick()}>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Bank