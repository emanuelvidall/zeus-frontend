import { useEffect, useState } from 'react';
import moment from 'moment';

const CostList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://10.50.188.77:3001/todoscustos')
      .then((response) => response.json())
      .then((json) => {
        const sortedData = json.sort((a, b) => {
          const dateA = moment(a.date, 'DD-MM-YYYY').toDate();
          const dateB = moment(b.date, 'DD-MM-YYYY').toDate();
          return dateA - dateB;
        });
        setData(sortedData.reverse());
      })
      .catch((error) => console.error('ocorreu um erro', error));
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className='w-[450px] mt-1 flex flex-row mb-6 hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-xl p-4'>
            <div className='leftPart'>
                <p className='text-base'>{item.desc}</p>
                <p className='text-black opacity-50 text-sm'>{item.date}</p>
            </div>
            <div className='rightPart ml-auto'>
                <p className='text-base font-semibold'>R$ {item.preco.toFixed(2)}</p>
            </div>
          
        </div>
      ))}
    </div>
  );
};

export default CostList;
