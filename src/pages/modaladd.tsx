import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import myIp from './index'
import 'animate.css';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import DatePickerMui from './datepickermui';
import swal from 'sweetalert';;

const ModalAdd = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [month, setMonth] = useState(null);
    
    const currentDate = new Date();

    const userId = props.userId;

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handleDataChange = (date) => {
        const formattedDate = date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        console.log('data aqui!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', formattedDate)
        const formattedMonth = formattedDate.slice(3,5)
        setDate(formattedDate.replace(/\//g, '-'))
        setMonth(formattedMonth)
    }

    const handleTipoChange = (e) => {
        setType(e.target.value)
    }

    const handleValorChange = (e) => {
        const input = e.target.value;
        const treatedInput = input.replace(/,/g, '.')
        setValue(treatedInput)
    }

    const handleQuantidadeChange = (e) => {
        setQuantity(e.target.value)
    }

    useState(() => {
        handleDataChange(currentDate);
    }, []);

    const tipos = [
        {
            value: 'racao',
            label: 'Racao',
        },
        {
            value: 'banho',
            label: 'Banho',
        },
        {
            value: 'shop',
            label: 'Shop',
        },
        {
            value: 'clinica',
            label: 'Clinica',
        },
    ]

    const dados = { value, type, quantity, desc, date, month, userId }

    console.log('dadooooooooooooooooooooooos', JSON.stringify(dados))

    function postData(dados) {

        if (!dados.value || !dados.type || !dados.quantity || !dados.desc || !dados.date || !dados.userId) {
            swal("Oops!", "Preencha todos os campos para adicionar sua despesa", "error");
            return;
        }
        return fetch('http://172.18.9.236:3001/expenses/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                response.json()
                console.log('Success:', response);
                swal("Adicionada!", "Sua despesa foi adicionada com sucesso", "success");
                setDesc('');
                setDate('')
                setType('')
                setQuantity(0)
                setValue(0)
                setShowModal(false)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='w-[40%] items-center justify-center content-center flex flex-row'>
            <button
                type="button"
                className="w-[fit] font-bold px-2 py-2 h-[30px] bg-[#22c55e] rounded-full text-white transition-all duration-500 pt-1 ease-in-out hover:scale-110 hover:shadow-lg"
                onClick={() => setShowModal(true)}>+ Nova Despesa </button>

            {showModal && (
                <div className="w-[100%] z-10 h-[100%] fixed bg-slate-600/50 top-0 left-0 align-center flex items-center justify-center">
                    <div className="animate__animated animate__bounceInUp bg-white h-fit pb-10 w-1/3 rounded-xl pt-5">
                        <h3 className="text-2xl font-medium text-gray-900 ml-5 mb-10 ">Adicione uma nova despesa 💸 {userId}</h3>
                        <div className='justify-center flex flex-col items-center'>
                            <div>
                                <form>
                                    <TextField size='small' sx={{ m: 1, width: '25ch' }} id="outlined-basic desc" onChange={handleDescChange} className='' placeholder='sobre a despesa' label="Descricao" variant="outlined" />
                                </form>
                            </div>
                            <div>
                                <form>
                                    <DatePickerMui onChange={handleDataChange} />
                                </form>
                            </div>
                            <div>
                                <TextField
                                    size='small'
                                    id="outlined-select-currency"
                                    select
                                    label="Tipo"
                                    defaultValue="EUR"
                                    onChange={handleTipoChange}
                                    sx={{ m: 1, width: '25ch' }}
                                >
                                    {tipos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <form>
                                    <TextField size='small' sx={{ m: 1, width: '25ch' }} id="outlined-number desc" type="number" onChange={handleQuantidadeChange} className='w-[100] h-[50] border-2 rounded-md mt-1 mb-2' placeholder='sobre a despesa' label="Quantidade" variant="outlined" />
                                </form>
                            </div>
                            <div>
                                <form>
                                    <TextField size='small' sx={{ m: 1, width: '25ch' }} id="outlined-basic desc" onChange={handleValorChange} className='w-[100] h-[50] border-2 rounded-md mt-1 mb-2' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment>, }} variant="outlined" label='Valor' />
                                </form>
                            </div>
                            <div className='mb-5'>
                                <button
                                    type="button"
                                    className="mt-5 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out mb-2"
                                    onClick={() => postData(dados)}
                                >
                                    Adicionar
                                </button>
                            </div>
                            <div className="bg-gray-200 w-full bottom-0 fixed rounded-b-xl flex flex-row-reverse pr-4">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center mt-2 mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out"
                                    onClick={() => setShowModal(false)}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 space-y-4 flex flex-row">

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalAdd;
