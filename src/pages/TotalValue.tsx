import React, { useState, useEffect } from "react";
import { myIp } from '.';

interface Cost {
  valor: number;
}

const TotalValue = (props) => {
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [mes, setMes] = useState('');

  const userId = props.userId;

  const getTotalValue = async () => {
    try {
      const response = await fetch(`http://${myIp}:3001/users/expenses/${userId}`, {
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
      console.log(result);
      const valorArray: number[] = result.map((obj: Value) => obj.value);
      const total: number = valorArray.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      );
      setTotalValue(total);
      console.log('total value', total);
    } catch (error) {
      console.error('Error:', error);
      console.log('cannot GET');
    }
  };


  useEffect(() => {
    getTotalValue();
  }, []);

  return (
    <h1 className="text-4xl">
      {totalValue !== null ? (
        `R$ ${totalValue.toFixed(2)}`
      ) : (
        "Carregando..."
      )}
    </h1>
  );
};

export default TotalValue;
