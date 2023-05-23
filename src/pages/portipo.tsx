
import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

export default function PorTipo(props) {
    const [racao, setRacao] = useState(0);
    const [banho, setBanho] = useState(0);
    const [shop, setShop] = useState(0);
    const [clinica, setClinica] = useState(0);

    const monthTotal = props.monthTotal;
    const month = props.month;
    const userId = props.userId;

    const types = ['racao', 'banho', 'shop', 'clinica'];
    const baseUrl = 'http://localhost:3001/expenses/month';

    async function getData(type) {
        if (month!=null){
        const response = await fetch(`http://172.18.9.236:3001/${userId}/${month}/${type}`);
        const data = await response.json();
        const typeTotal = data.reduce((total, expense) => total + expense.value, 0);

        switch (type) {
            case 'racao':
                setRacao(typeTotal);
                break;
            case 'banho':
                setBanho(typeTotal);
                break;
            case 'shop':
                setShop(typeTotal);
                break;
            case 'clinica':
                setClinica(typeTotal);
                break;
            default:
                break;
           }
        }
    }

    useEffect(() => {
        types.forEach((type) => getData(type));
    }, [userId, month]);


    return (
        <div className='bg-slate-200 w-full h-[100px] flex flex-row self-center rounded-xl'>
            <div className='racao hover:cursor-pointer h-full w-[10%] bg-[#DC3434] rounded-l-xl' data-tooltip-id="my-tooltip" data-tooltip-content={'vermelho 123'}><Tooltip id="my-tooltip" /></div>
            <div className='banho hover:cursor-pointer h-full w-[30%] bg-[#32A7E2]' data-tooltip-id="my-tooltip" data-tooltip-content={'azul 123'}><Tooltip id="my-tooltip" /></div>
            <div data-tooltip-target="tooltip-default" className='shop hover:cursor-pointer h-full w-[50%] bg-[#4BA83D]' data-tooltip-id="my-tooltip" data-tooltip-content={'verde 123'}><Tooltip id="my-tooltip" /></div>
            <div className='clinica hover:cursor-pointer h-full w-[10%] bg-[#B548C6] rounded-r-xl' data-tooltip-id="my-tooltip" data-tooltip-content={'laranja 1233'}><Tooltip id="my-tooltip" /></div>
        </div>
    );
}