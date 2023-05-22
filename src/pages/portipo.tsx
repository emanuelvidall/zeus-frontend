
import React, { useState, useEffect } from 'react';
import { myIp } from '.';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { TypeFormatFlags } from 'typescript';

const PorTipo = (props) => {
    const [data, setData] = useState([])
    // const [totalRacao, setTotalRacao] = useState(0)
    // const [totalBanho, setTotalBanho] = useState(0)
    // const [totalShop, setTotalShop] = useState(0)
    // const [totalClinica, setTotalClinica] = useState(0)

    const month = 5
    const userId = props.userId;

    const types = ['racao', 'banho', 'shop', 'clinica'];
    const baseUrl = 'http://172.18.9.236:3001/expenses/month';

    async function getData(){
    for (let i = 0; i < types.length; i++) {
        const response = await fetch(`${baseUrl}/${userId}/${month}/${types[i]}`)
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
      }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='bg-slate-200 w-full h-[100px] flex flex-row self-center rounded-xl'>
            <h1>total = {data[0]}</h1>
            <div className='racao hover:cursor-pointer h-full w-[10%] bg-[#DC3434] rounded-l-xl' data-tooltip-id="my-tooltip" data-tooltip-content={'vermelho 123'}><Tooltip id="my-tooltip" /></div>
            <div className='banho hover:cursor-pointer h-full w-[30%] bg-[#32A7E2]' data-tooltip-id="my-tooltip" data-tooltip-content={'azul 123'}><Tooltip id="my-tooltip" /></div>
            <div data-tooltip-target="tooltip-default" className='shop hover:cursor-pointer h-full w-[50%] bg-[#4BA83D]' data-tooltip-id="my-tooltip" data-tooltip-content={'verde 123'}><Tooltip id="my-tooltip" /></div>
            <div className='clinica hover:cursor-pointer h-full w-[10%] bg-[#B548C6] rounded-r-xl' data-tooltip-id="my-tooltip" data-tooltip-content={'laranja 1233'}><Tooltip id="my-tooltip" /></div>
        </div>
    );
}

export default PorTipo;
