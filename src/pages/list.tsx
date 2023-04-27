import { useEffect, useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faBowlRice, faCartShopping, faShower, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


const CostList = () => {
    const [data, setData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);

    console.log('carregando......')

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch('http://10.50.188.123:3001/todoscustos');
        const json = await response.json();
        console.log('response jsoN!', json)
        const sortedData = json.sort((a, b) => {
            const dateA = moment(a.data, 'DD-MM-YYYY').toDate();
            const dateB = moment(b.data, 'DD-MM-YYYY').toDate();
            return dateA - dateB;
        });
        setData(sortedData.reverse());
        console.log(sortedData.reverse());
        } catch (error) {
        console.error('An error occurred', error);
        }
    };

    // Fetch data on mount
    fetchData();

    // Refresh data every 2 seconds
    const intervalId = setInterval(() => {
        fetchData();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
    }, []);

    const lastTenItems = data.slice(-10).reverse()

    console.log('dados carregados:...', lastTenItems)



    return (
    <div className='listRender absolute h-[50%] w-[40%] pl-7 overflow-y-scroll pt-10'>
        {lastTenItems.map((item, index) => {

        const handleDelete = () => {
            fetch(`http://10.50.188.123:3001/costs/${item._id}`, {
            method: "DELETE",
            })
            .then((response) => response.json())
            .then((data) => {
                // handle success
                console.log(data);
            })
            .catch((error) => {
                // handle error
                console.error(error);
            });
        }
        return (
        <div key={item._id}  onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)} className='w-[90%] cursor-pointer mt-1 flex flex-row mb-6 hover:shadow-lg hover:scale-105 transition-all hover:bg-slate-100 duration-300 rounded-xl p-4'>
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
            {hoverIndex === index && (
            <div className='absolute top-0 left-100 right-0 bottom-20 flex items-center justify-center self-center transition-all duration-1000 ease-in-out'>
                <div className='rounded-md text-white mr-1 bg-orange-500 w-[28px] h-[28px] items-center flex justify-center align-middle '>
                    <FontAwesomeIcon className='text-base'icon={faPenToSquare} />
                </div>
                <div className='rounded-md bg-red-500 text-white w-[28px] h-[28px] items-center flex justify-center align-middle '>
                    <FontAwesomeIcon onClick={handleDelete}className='text-base'icon={faTrashCan} />
                </div>
            </div>
            )}
            
        </div>
        );
    })}
    </div>
    );
    };
export default CostList;
