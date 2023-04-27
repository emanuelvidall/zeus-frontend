import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

const Distribuicao = () => {
    const [racaoTotal, setRacaoTotal] = useState<number | null>(null);
    const [banhoTotal, setBanhoTotal] = useState<number | null>(null);
    const [shopTotal, setShopTotal] = useState<number | null>(null);
    const [clinicaTotal, setClinicaTotal] = useState<number | null>(null);
    const [totalTodos, setTotalTodos] = useState<number | null>(null);


    useEffect(() => {
        console.log('tentando racaooooo!!!!!!!')
        console.log('texsttttt')
            const getTotalCosts = async () => {
                try {
                const response = await fetch('http://10.50.188.123:3001/todoscustos', {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    },
                });
                console.log('Success GET');
                const result = await response.json();

                const racaoValues = result.filter(obj => obj.tipo === 'racao');
                console.log(racaoValues.length);
                var sumRacao = 0;
                racaoValues.forEach((item: number) => {sumRacao += item.valor})
                console.log('SOMA DO TOTAL SO DE RACAOOOOO', sumRacao);
                setRacaoTotal(sumRacao)

                const banhoValues = result.filter(obj => obj.tipo === 'banho');
                console.log(banhoValues.length);
                var sumBanho = 0;
                banhoValues.forEach((item: number) => {sumBanho += item.valor})
                console.log('SOMA DO TOTAL SO DE BANHO', sumBanho);
                setBanhoTotal(sumBanho)

                const shopValues = result.filter(obj => obj.tipo === 'shop');
                console.log(shopValues.length);
                var sumShop = 0;
                shopValues.forEach((item: number) => {sumShop += item.valor})
                console.log('SOMA DO TOTAL SO DE SHOPP', sumShop);
                setShopTotal(sumShop)

                const clinicaValues = result.filter(obj => obj.tipo === 'clinica');
                console.log(clinicaValues.length);
                var sumClinica = 0;
                clinicaValues.forEach((item: number) => {sumClinica += item.valor})
                console.log('SOMA DO TOTAL SO DE RACAOOOOO', sumClinica);
                setClinicaTotal(sumClinica)

                } catch (error) {
                console.error('Error:', error);
                console.log('cannot GET');
                }
            };
        getTotalCosts()

    }, []);

    useEffect(() => {
    if (racaoTotal != null && banhoTotal != null && shopTotal != null && clinicaTotal != null) {
        const soma = racaoTotal + banhoTotal + shopTotal + clinicaTotal;
        setTotalTodos(soma);
    }
    }, [racaoTotal, banhoTotal, shopTotal, clinicaTotal]);

    console.log('total todos: ', totalTodos);

    const barLenghtRacao = (racaoTotal/ totalTodos * 100).toFixed(0).toString();
    const barLengthBanho = (banhoTotal/totalTodos * 100).toFixed(0).toString();
    const barLengthShop = (shopTotal/ totalTodos * 100).toFixed(0).toString();
    const barLengthClinica = (clinicaTotal/totalTodos * 100).toFixed(0).toString();

    console.log('barlength>>>>>>>>', barLenghtRacao)

    if (totalTodos === null){
        return null;
    }

    return (
        <>
        <div className='racao container'>
            <h1 className='text-sm font-bold'>Ração</h1>
            <div className='w-[90%] h-2 rounded-xl bg-slate-200'>
                <div className='h-2 rounded-xl bg-green-500 cursor-pointer' style={{ width: `${barLenghtRacao}%` }} data-tooltip-id="my-tooltip" data-tooltip-content={barLenghtRacao+'%'+' - R$'+racaoTotal.toFixed(2)}><Tooltip id="my-tooltip" /></div>
            </div>
            </div>
            <div className='banho container'>
            <h1 className='text-sm font-bold'>Banho</h1>
            <div className='w-[90%] h-2 rounded-xl bg-slate-200'>
                <div className='w-[20%] h-2 rounded-xl bg-green-500 cursor-pointer' style={{ width: `${barLengthBanho}%` }} data-tooltip-id="my-tooltip" data-tooltip-content={barLengthBanho+'%'+' - R$'+banhoTotal.toFixed(2)}><Tooltip id="my-tooltip" /></div>
            </div>
            </div>
            <div className='shop container'>
            <h1 className='text-sm font-bold'>Shop</h1>
            <div className='w-[90%] h-2 rounded-xl bg-slate-200'>
                <div className='w-[50%] h-2 rounded-xl bg-green-500 cursor-pointer' style={{ width: `${barLengthShop}%` }} data-tooltip-id="my-tooltip" data-tooltip-content={barLengthShop+'%'+' - R$'+shopTotal.toFixed(2)}><Tooltip id="my-tooltip" /></div>
            </div>
            </div>
            <div className='clinica container'>
            <h1 className='text-sm font-bold'>Clínica</h1>
            <div className='w-[90%] h-2 rounded-xl bg-slate-200'>
                <div className='w-[8%] h-2 rounded-xl bg-green-500 cursor-pointer' style={{ width: `${barLengthClinica}%` }} data-tooltip-id="my-tooltip" data-tooltip-content={barLengthClinica+'%'+' - R$'+clinicaTotal.toFixed(2)}><Tooltip id="my-tooltip" /></div>
            </div>
            </div>
            <div className='h-[60%]'>
                <div className='dicasSave w-[75%] h-[35%] rounded-xl self-center ml-auto mr-auto'>
                    <h1 className='text-sm opacity-50'>Veja as melhores dicas de como cuidar de seu pet no blog</h1>
                    <Image src='/images/dicas.png' alt='dicas' width={400} height={400}/>
                    <div className='justify-center items-center pl-2'>
                        <button className='ml-auto mr-auto self-center text-center w-[95%] rounded-md p-2 pt-3 bg-slate-600 text-base font-medium text-white hover:bg-primary-700 hover:scale-110 transition-all duration-300 ease-in-out'>Aumigo Dicas 🐶</button>
                    </div>    
                </div>
            </div>
            </>
    )
    
}


export default Distribuicao;

