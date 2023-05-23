import React, { useState, useEffect } from "react";

const TotalValue = (props) => {
  const [totalValue, setTotalValue] = useState<number | null>(null);

  const userId = props.userId;
  const month = props.month;

  const authorizationToken = localStorage.getItem('token');

  const headers = {
      'Authorization': authorizationToken
    };

  const requestOptions = {
  method: 'GET',
  headers: headers,
  };

  const getTotalValue = async () => {
    if (month!=null){
      try {
        const response = await fetch(`http://172.18.9.236:3001/expenses/month/${userId}/${month}`, requestOptions)
        const result = await response.json();
        setTotalValue(result);
      } catch (error) {
        console.error('Error:', error);
        console.log('cannot GET');
      }
    };
  }

  useEffect(() => {
    getTotalValue();
  }, [userId, month]);

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
