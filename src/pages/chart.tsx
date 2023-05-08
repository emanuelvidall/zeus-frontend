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

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth() + 1
  const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const currentMonth = monthNames[currentMonthIndex];

  return (
    <>
      {data.length > 0 && (
        <div className='h-1/2 w-full relative'>
          <VictoryChart padding={{ top: 10, bottom: 50, left: 5, right: 5 }} width={1500} height={300}
          >
            <VictoryAxis
              style={{ axis: { stroke: 'none' } }}
              tickValues={['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']}
              domain={[0, 13]}
              tickLabelComponent={<VictoryLabel style={{ fontSize: 30, fontFamily: 'sans-serif', }} />}
            />
            <VictoryBar barRatio={1} alignment="middle" labelComponent={<VictoryTooltip flyoutPadding={10} />}
              labels={({ datum }) => `R$${datum.valor}`} y='value' style={
                {
                  data: {
                    fill: ({ datum }) => (datum.month === currentMonthIndex ? '#22c55e' : '#1e2229'),
                  }, labels: {
                    fontFamily: 'sans-serif',
                    fontSize: 30,
                    fontWeight: 'bold',
                  }

                }
              } cornerRadius={6} barWidth={50}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: (props) => {
                            return {
                              style: {
                                ...props.style,
                                cursor: 'pointer',
                                fill: '#475569',
                                scale: 1.1,
                              },
                            };
                          },
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: (props) => {
                            const originalColor =
                              props.datum.month === currentMonthIndex
                                ? "#22c55e"
                                : "#1e2229";
                            return {
                              style: {
                                ...props.style,
                                cursor: 'default',
                                fill: originalColor,
                                scale: 1,
                              },
                              _originalColor: originalColor,
                            };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
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
