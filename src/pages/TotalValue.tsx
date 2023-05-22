import React, { useState, useEffect } from "react";
import { myIp } from '.'

const TotalValue = (props) => {
  const [totalValue, setTotalValue] = useState<number | null>(null);

  const userId = props.userId;
  const month = props.month;

  const getTotalValue = async () => {
    try {
      const response = await fetch(`http://${myIp}:3001/expenses/month/${userId}/${month}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setTotalValue(result);
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
