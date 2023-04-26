import { useEffect, useState } from 'react';

const Distribuicao = () => {
    const [racaoTotal, setRacaoTotal] = useState(0);
    const [banhoTotal, setBanhoTotal] = useState(0);
    const [shopTotal, setShopTotal] = useState(0);


    useEffect(() => {
    const getTotalCosts = async () => {
        try {
        const response = await fetch('http://10.50.188.77:3001/todoscustos', {
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
        setRacaoTotal(racaoValues.length)
        console.log('racao total', racaoTotal);
        } catch (error) {
        console.error('Error:', error);
        console.log('cannot GET');
        }
    };

    getTotalCosts();
    }, [racaoTotal]);

}

export default Distribuicao;

