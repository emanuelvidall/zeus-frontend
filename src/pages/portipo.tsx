
import React, { useState, useEffect } from 'react';
import { myIp } from '.';

const PorTipo = () => {
    const [data, setData] = useState([])

    async function getData(){
        try {
                const response = await fetch(`http://${myIp}:3001/todoscustos`)
                console.log(' data fetched ')
                const json = await response.json();
                setData(json)
        }catch(error){
            console.error('Erro fetching data', error)
        }
    }

    useEffect(() => {
        getData();
    })

    return (
        <h1>{[data]}</h1>
    );
}

export default PorTipo;
