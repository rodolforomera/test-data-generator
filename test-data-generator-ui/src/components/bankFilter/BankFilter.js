import './BankFilter.css';

import React, { useEffect } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { PickList } from 'primereact/picklist';


function BankFilter(props) {

    useEffect(() => { 
        if (props.target.length > 0) {
            applyQty(props.target);
            props.setTarget([... props.target]);
        }
    }, [props.qty]);

    const onChangeTarget = (item, e) => {

        let bank = item.bank;

        const changedTarget = [...props.target];

        const isBank = (element) => element.bank === bank;
        if (e != changedTarget.filter(isBank)[0].percentage) {

            let index = changedTarget.findIndex(isBank);
            let elements = changedTarget.length - (index + 1);
            let totalAnterior = 0;

            if (elements >= 0) {

                changedTarget[index].percentage = e;

                let percTotal = 0;
                if (index == 0) {
                    percTotal = Number(e);
                }else{
                    percTotal = changedTarget.slice(0, index).map(e => e.percentage).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0) + Number(e);
                    totalAnterior = changedTarget.slice(0, index).map(e => e.percentage).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);
                }
                
                let percApply = 0;
                let percApllyDiff = 0;
                let totalPerc = 100 - percTotal;
                
                if ((totalPerc - elements) < 0) {
                    totalPerc = (totalPerc < 0) ? (-1 * totalPerc): totalPerc;
                    totalPerc = 100 - totalAnterior;
                    if (elements > 0) {
                        e = Number((totalPerc / (elements + 1)).toFixed(0));
                    }else{
                        e = totalPerc;
                    }
                    totalPerc = Number(totalPerc) - Number(e);
                    if (elements > 0) {
                        percApply = Number((totalPerc / elements).toFixed(0));
                        percApllyDiff = 100 - totalAnterior - e - (percApply * elements);
                    }else{
                        percApply = totalPerc;
                        percApllyDiff = 0;
                    }
                    if (percApllyDiff != 0) {
                        e = e + percApllyDiff;
                        totalPerc = totalPerc - percApllyDiff;
                    }
                }

                changedTarget[index].percentage = e;

                if (elements > 0) {
                    percApply = Number((totalPerc / elements).toFixed(0));
                    percApllyDiff = 100 - totalAnterior - Number(e) - (percApply * elements);
                }else{
                    percApply = totalPerc;
                    percApllyDiff = 100 - totalAnterior - Number(e) - percApply;
                    e = e + percApply;
                    changedTarget[index].percentage = e;
                }

                for (let i = index + 1; i < changedTarget.length; i++) {
                    changedTarget[i].percentage = Number(percApply);
                }
                if (percApllyDiff > 0) {
                    changedTarget[index+1].percentage = Number(changedTarget[index+1].percentage) + percApllyDiff;
                }else{
                    changedTarget[changedTarget.length - 1].percentage = Number(changedTarget[changedTarget.length - 1].percentage) + percApllyDiff;
                }   
            }else{
                e = "100";
            }

            applyQty(changedTarget);
            
            props.setTarget([...changedTarget]);
            document.getElementById('txtPercentage' + bank).value = '%' + e.toString();
            item.percentage = e;

        }

    }

    const onChangeA = (event) => {

        let targetToSource;
        let sourceToTarget;
        if (event.target.length > 100) {
            targetToSource = event.target.slice(100, event.target.length);
            targetToSource = targetToSource.concat(event.source);
            sourceToTarget = event.target.slice(0, 100);
            props.setSource(targetToSource);
            applyPerc(sourceToTarget);
            applyQty(sourceToTarget);
            props.setTarget(sourceToTarget);
        }else{
            props.setSource(event.source);
            if (event.target.length > 0) {
                applyPerc(event.target);
                applyQty(event.target);
            }
            props.setTarget(event.target);
        }
        
    };

    function applyPerc(target) {

        let perc = 100;
        const elements = target.length;
        let percApply = (100 / elements).toFixed(0); 

        let percApllyDiff = perc - (percApply * elements);

        for (let i = 0; i < elements; i++) {
            target[i].percentage = percApply;
        }

        apllyDiff(target, percApllyDiff, percApllyDiff >= 0? '+': '-');

    }

    function apllyDiff(target, percApllyDiff, operation) {

        let index;
        if (operation === '+') {
            index = 0;
        }else if (operation === '-') {
            percApllyDiff = -1 * percApllyDiff;
            index = target.length - 1;
        }

        while(percApllyDiff > 0) {
            if (operation === '+') {
                target[index].percentage = Number(target[index].percentage) + 1;
            }else if (operation === '-') {
                target[index].percentage = target[index].percentage - 1;
            }

            percApllyDiff = percApllyDiff - 1;

            if (operation === '+') {
                index++;
            }else if (operation === '-') {
                index--;
            }            
        }

    }

    function applyQty(target) {

        target.forEach(e => {
            e.percQty = ((e.percentage / 100).toFixed(2) * props.qty).toFixed(0);
        });
        
        let totalPercQty = target.map(e => e.percQty).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);
        let percApllyDiff = props.qty - totalPercQty;
        
        apllyDiffQty(target, percApllyDiff, percApllyDiff >= 0? '+': '-');

    }

    function apllyDiffQty(target, percApllyDiff, operation) {

        let index;
        if (operation === '+') {
            index = 0;
        }else if (operation === '-') {
            percApllyDiff = -1 * percApllyDiff;
            index = target.length - 1;
        }

        while(percApllyDiff > 0) {
            if (operation === '+') {
                target[index].percQty =  Number(target[index].percQty) + 1;
            }else if (operation === '-') {
                target[index].percQty = Number(target[index].percQty) - 1;
            }

            percApllyDiff = percApllyDiff - 1;

            if (operation === '+') {
                index++;
            }else if (operation === '-') {
                index--;
            }            
        }

    }



    const itemTemplateTarget = (item) => {
        return (
            <div className="flex flex-wrap p-2 items-center gap-3">
                <div className="flex-2 flex flex-col"> 
                    <span className="font-bold">{item.bank} - {item.name}</span>
                    <div className="row">
                        <div className="col-md">
                            <InputNumber inputClassName='form-control text-end' inputId={"txtPercentage" + item.bank}
                                        locale='pt-BR' value={item.percentage} min={1} max={100} prefix="%" onValueChange={(e) => onChangeTarget(item, e.value)} />
                        </div>
                        <div className="col-md">
                            <input class="form-control text-end" type="text" value={item.percQty} disabled></input>
                        </div>
                    </div>
                </div>
            </div>

        );
    };

    const itemTemplateSource = (item) => {
        return (
            <div className="flex flex-wrap p-2 items-center gap-3">
                <div className="flex-1 flex flex-col">
                    <span className="font-bold">{item.bank} - {item.name}</span>
                </div>
            </div>
        );
    };

    return (

        <div className='bankFilter'>
            <PickList dataKey="bank" source={props.source} target={props.target} onChange={onChangeA} 
                                        sourceItemTemplate={itemTemplateSource} targetItemTemplate={itemTemplateTarget} breakpoint="1280px"
                                        showSourceControls={false}
                                        filter filterBy="bank"
                                        sourceHeader="Não selecionados" targetHeader="Selecionados" 
                                        sourceStyle={{ height: '24rem' }} 
                                        targetStyle={{ height: '24rem' }} 
                                        sourceFilterPlaceholder="Busca por código" targetFilterPlaceholder="Busca por código" />
            Não selecionados: <span>{props.source.length}</span> - Selecionados: <span>{props.target.length}</span>  
        </div>

    );

}

export default BankFilter