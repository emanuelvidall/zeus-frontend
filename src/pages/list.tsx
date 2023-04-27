import { useEffect, useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faBowlRice, faCartShopping, faShower } from '@fortawesome/free-solid-svg-icons'


const CostList = () => {
    const [data, setData] = useState([]);

    console.log('carregando......')

    useEffect(() => {
    fetch('http://10.50.188.123:3001/todoscustos')
        .then((response) => response.json())
        .then((json) => {
        const sortedData = json.sort((a, b) => {
            const dateA = moment(a.date, 'DD-MM-YYYY').toDate();
            const dateB = moment(b.date, 'DD-MM-YYYY').toDate();
            return dateA - dateB;
        });
        setData(sortedData.reverse());
        console.log(sortedData.reverse())
        })
        .catch((error) => console.error('ocorreu um erro', error));
    }, []);

    const lastTenItems = data.slice(-10).reverse()

    console.log('dados carregados:...', lastTenItems)

    return (
    <div className='listRender absolute h-[50%] w-[40%] pl-4 overflow-y-scroll'>
        {lastTenItems.map((item) => {
        return (
        <div key={item.id} className='w-[90%] cursor-pointer mt-1 flex flex-row mb-6 hover:shadow-lg hover:scale-105 transition-all hover:bg-slate-100 duration-300 rounded-xl p-4'>
            <div className='leftPart flex flex-row'>
                <div>
                    {item.tipo == 'racao' ? (
                        <div className='rounded-full bg-[#DC3434] w-[48px] h-[48px] items-center flex justify-center align-middle'>
                            <FontAwesomeIcon className='text-white text-base'icon={faBowlRice} />
                        </div>
                    ) : item.tipo == 'banho' ? (
                        <div className='rounded-full bg-[#32A7E2] w-[48px] h-[48px] items-center flex justify-center align-middle'>
                            <FontAwesomeIcon className='text-white text-base'icon={faShower} />
                        </div>
                    ) : item.tipo == 'shop' ? (
                        <div className='rounded-full bg-[#4BA83D] w-[48px] h-[48px] items-center flex justify-center align-middle'>
                            <FontAwesomeIcon className='text-white text-base'icon={faCartShopping} />
                        </div>
                    ) : item.tipo == 'clinica' ? (
                        <div className='rounded-full bg-[#B548C6] w-[48px] h-[48px] items-center flex justify-center align-middle'>
                            <FontAwesomeIcon className='text-white text-base'icon={faStethoscope} />
                        </div>
                    ) : null}
                </div>
                <div className='flex flex-col ml-4'>
                    <p className='text-lg'>{item.desc}</p>
                    <p className='text-black opacity-50 text-sm'>{item.data}</p>
                </div>
            </div>
            <div className='rightPart ml-auto'>
                <p className='text-base font-semibold'>R$ {item.valor.toFixed(2)}</p>
            </div>
            
        </div>
        );
    })}
    </div>
    );
    };
export default CostList;
