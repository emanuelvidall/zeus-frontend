
import React, { useState, useEffect } from 'react';
import { myIp } from '.';

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
        <div>
            {/* {data.map((item, index) => {
                return (
                    <div key={item._id}>
                        <div>{item.valor}</div>
                    </div>
                );
            })} */}
        </div>
    );
}

export default PorTipo;
