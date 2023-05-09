
import React, { useState, useEffect } from 'react';
import { myIp } from '.';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

const PorTipo = () => {
    const [data, setData] = useState([])
    // const [dadosRacao, setDadosRacao] = useState([])
    // const [dadosBanho, setDadosBanho] = useState([])
    // const [dadosShop, setDadosShop] = useState([])
    // const [dadosClinica, setDadosClinica] = useState([])

    async function getData(){
        try {
                const response = await fetch(`http://${myIp}:3001/todoscustos`)
                const json = await response.json();
                console.log('DADOOOOOOOS', json)
                setData(json)
                const marco = json.filter(item => item.data.slice(3, 5) === "03");
                console.log('MARCOOOOOOOOO', marco)
                const maio = json.filter(item => item.data.slice(3, 5) === "05");
                console.log('MAIOOOOOOOOOOSS', marco)
               
        }catch(error){
            console.error('Erro fetching data', error)
        }
    }

    useEffect(() => {
        getData();
    },[])

    return (
            <div className='bg-slate-200 w-full h-[100px] flex flex-row self-center rounded-xl'>
                <div className='racao hover:cursor-pointer h-full w-[10%] bg-[#DC3434] rounded-l-xl' data-tooltip-id="my-tooltip" data-tooltip-content={'vermelho 123'}><Tooltip id="my-tooltip" /></div>
                <div className='banho hover:cursor-pointer h-full w-[30%] bg-[#32A7E2]' data-tooltip-id="my-tooltip" data-tooltip-content={'azul 123'}><Tooltip id="my-tooltip" /></div>
                <div data-tooltip-target="tooltip-default" className='shop hover:cursor-pointer h-full w-[50%] bg-[#4BA83D]' data-tooltip-id="my-tooltip" data-tooltip-content={'verde 123'}><Tooltip id="my-tooltip" /></div>
                <div className='clinica hover:cursor-pointer h-full w-[10%] bg-[#B548C6] rounded-r-xl' data-tooltip-id="my-tooltip" data-tooltip-content={'laranja 1233'}><Tooltip id="my-tooltip" /></div>
            </div>
    );
}

export default PorTipo;
