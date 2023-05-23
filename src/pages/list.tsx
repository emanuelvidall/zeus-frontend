import { useEffect, useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faBowlRice, faCartShopping, faShower } from '@fortawesome/free-solid-svg-icons'
import ModalEdit from './modaledit';


export default function ExpenseList(props) {
    const [data, setData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleModal = (item) => {
        setShowEditModal(!showEditModal); fetch
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setShowEditModal(!showEditModal);
    };

    const userId = props.userId;
    const month = props.month;

    const authorizationToken = localStorage.getItem('token');

    const headers = {
        'Authorization': authorizationToken
      };

    const requestOptions = {
    method: 'GET',
    headers: headers
    };
      

    const fetchData = async () => {
        if (month!=null){
            try {
                const response = await fetch(`http://172.18.9.236:3001/expenses/${userId}/${month}/list`, requestOptions)
                const json = await response.json();
                const sortedData = json.sort((a, b) => {
                    const dateA = moment(a.date, 'DD-MM-YYYY').toDate();
                    const dateB = moment(b.date, 'DD-MM-YYYY').toDate();
                    return dateA - dateB;
                });
                setData(sortedData.reverse());
            } catch (error) {
                console.error('An error occurred', error);
            }
        };
    }

    useEffect(() => {

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 200000);

        return () => clearInterval(intervalId);
    }, [userId, month]);

    const lastTenItems = data.reverse()


    return (
        <div className='listRender absolute h-[50%] w-[40%] pl-7 overflow-y-scroll pt-10'>
            {lastTenItems.map((item, index) => {
                return (
                    <div key={item._id} onMouseEnter={() => setHoverIndex(index)} onClick={() => handleModal(item)}
                        onMouseLeave={() => setHoverIndex(null)} className='w-[90%] border-solid border-2 border-slate-200 cursor-pointer mt-1 flex flex-row mb-6 hover:shadow-lg hover:scale-105 transition-all hover:bg-slate-100 duration-300 rounded-xl p-4'>
                        <div className='leftPart flex flex-row'>
                            <div>
                                {item.type == 'racao' ? (
                                    <div className='rounded-full bg-[#DC3434] w-[48px] h-[48px] items-center flex justify-center align-middle'>
                                        <FontAwesomeIcon className='text-white text-base' icon={faBowlRice} />
                                    </div>
                                ) : item.type == 'banho' ? (
                                    <div className='rounded-full bg-[#32A7E2] w-[48px] h-[48px] items-center flex justify-center align-middle'>
                                        <FontAwesomeIcon className='text-white text-base' icon={faShower} />
                                    </div>
                                ) : item.type == 'shop' ? (
                                    <div className='rounded-full bg-[#4BA83D] w-[48px] h-[48px] items-center flex justify-center align-middle'>
                                        <FontAwesomeIcon className='text-white text-base' icon={faCartShopping} />
                                    </div>
                                ) : item.type == 'clinica' ? (
                                    <div className='rounded-full bg-[#B548C6] w-[48px] h-[48px] items-center flex justify-center align-middle'>
                                        <FontAwesomeIcon className='text-white text-base' icon={faStethoscope} />
                                    </div>
                                ) : null}
                            </div>
                            <div className='flex flex-col ml-4'>
                                <p className='text-lg'>{item.desc}</p>
                                <p className='text-black opacity-50 text-sm'>{item.date}</p>
                            </div>
                        </div>
                        <div className='rightPart ml-auto'>
                            <p className='text-base font-semibold'>R$ {item.value.toFixed(2)}</p>
                        </div>
                        {hoverIndex === index && (
                            <div className='absolute top-0 left-100 right-0 bottom-20 flex items-center justify-center self-center transition-all duration-1000 ease-in-out'>
                                <div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
            {
                selectedItem && (
                    <ModalEdit
                        onRequestClose={handleCloseModal}
                        value={selectedItem.value}
                        date={selectedItem.date}
                        type={selectedItem.type}
                        desc={selectedItem.desc}
                        _id={selectedItem._id}
                        quantity={selectedItem.quantity}
                    />
                )
            }
        </div>
    );
};

