import { useEffect, useState } from 'react';
import Image from 'next/image';

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
                const response = await fetch('http://10.50.188.105:3001/todoscustos', {
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
                const lengthRacao = racaoValues.length;
                setRacaoTotal(lengthRacao);

                const banhoValues = result.filter(obj => obj.tipo === 'banho');
                console.log(banhoValues.length);
                const lengthBanho = banhoValues.length;
                setBanhoTotal(lengthBanho);

                const shopValues = result.filter(obj => obj.tipo === 'shop');
                console.log(shopValues.length);
                const lengthShop = shopValues.length;
                setShopTotal(lengthShop);

                const clinicaValues = result.filter(obj => obj.tipo === 'clinica');
                console.log(clinicaValues.length);
                const lengthClinica = clinicaValues.length;
                setClinicaTotal(lengthClinica);

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
                <div className='h-2 rounded-xl bg-green-500' style={{ width: `${barLenghtRacao}%` }}></div>
            </div>
            </div>
            <div className='banho container'>
            <h1 className='text-sm font-bold'>Banho</h1>
            <div className='w-[90%] h-2 rounded-xl bg-slate-200'>
                <div className='w-[20%] h-2 rounded-xl bg-green-500' style={{ width: `${barLengthBanho}%` }}></div>
            </div>
            </div>
            <div className='shop container'>
            <h1 className='text-sm font-bold'>Shop</h1>
            <div className='w-[90%] h-2 rounded-xl bg-slate-200'>
                <div className='w-[50%] h-2 rounded-xl bg-green-500' style={{ width: `${barLengthShop}%` }}></div>
            </div>
            </div>
            <div className='clinica container'>
            <h1 className='text-sm font-bold'>Clínica</h1>
            <div className='w-[90%] h-2 rounded-xl bg-slate-200'>
                <div className='w-[8%] h-2 rounded-xl bg-green-500' style={{ width: `${barLengthClinica}%` }}></div>
            </div>
            </div>
            <div className='dicasSave w-[75%] h-[35%] rounded-xl self-center ml-auto mr-auto'>
            <h1 className='text-sm opacity-50'>Veja as melhores dicas de como cuidar de seu pet no blog</h1>
            <Image src='/images/dicas.png' alt='dicas' width={400} height={400}/>
            <button className='text-center "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 mt-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out'>Aumigo Dicas 🐶</button>
            </div>
            </>
    )
    
}


export default Distribuicao;

