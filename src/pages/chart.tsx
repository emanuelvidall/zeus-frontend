import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import moment from 'moment'; // You need to import 'moment' for it to work
import { myIp } from '.';

const Barras = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${myIp}:3001/todoscustos`);
        const json = await response.json();
        console.log('RESPOSTA BARRRAAAAAAAA', json);

        const monthlyData = json.reduce((accumulator, item) => {
          const month = moment(item.data, 'DD-MM-YYYY').month();
          if (!accumulator[month]) {
            accumulator[month] = {
              month: month + 1, // Add 1 to the month, as moment.js month starts from 0
              valor: 0,
            };
          }
          accumulator[month].valor += item.valor;
          return accumulator;
        }, {});

        const monthlyDataArray = Object.values(monthlyData);
        setData(monthlyDataArray);
        console.log('monthlydatarray____________________', monthlyDataArray)
        console.log(monthlyDataArray);
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {data.length > 0 && (
        <div className='h-full w-full relative'>
          <VictoryChart padding={{ top: 10, bottom: 50, left: 5, right: 5 }} width={1500} height={500}
          >
            <VictoryAxis
                        
                        tickValues={['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']}
                        domain={[0, 13]}
                        tickLabelComponent={<VictoryLabel style={{ fontSize: 30, fontFamily: 'Helvetica' }} />}
          />
              <VictoryBar barRatio={1} alignment="middle" labelComponent={
                <VictoryTooltip
                  style={{
                    fontFamily: 'ReadexPro-Medium',
                    fontSize: 30,
                  }}
                />
              } labels={({ datum }) => `R$${datum.valor}`} style={
                {data: { 
                  fill: "#1e2229", 
                   
                },
                
              }
            }cornerRadius={6} barWidth={50}
            
            data={data}
                // data accessor for x values
                x="month"
                // data accessor for y values
                y="valor"
              />
          </VictoryChart>
          </div>
        )}
    </>
  );
};

export default Barras;
