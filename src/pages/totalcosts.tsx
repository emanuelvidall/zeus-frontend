import React, { useState, useEffect } from "react";

interface Cost {
  valor: number;
}

const TotalCosts = () => {
  const [custos, setTotalCustos] = useState<number | null>(null);

  useEffect(() => {
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
        const valorArray: number[] = result.map((obj: Cost) => obj.valor);
        const total: number = valorArray.reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0
        );
        setTotalCustos(total);
        console.log('total dos custos', total);
      } catch (error) {
        console.error('Error:', error);
        console.log('cannot GET');
      }
    };

    getTotalCosts();
  }, []);

  return (
    <h1 className="text-4xl">
      {custos !== null ? (
        `R$ ${custos.toFixed(2)}`
      ) : (
        "Carregando custo total..."
      )}
    </h1>
  );
};

export default TotalCosts;
