import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import { myIp } from '.';
import 'animate.css';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import DatePickerMui from './datepickermui';
import swal from 'sweetalert';

interface ModalEditProps {
    valor: number;
    data: string;
    tipo: string;
    desc: string;
    _id: string;
    quantidade: number;
}

const ModalEdit: React.FC<ModalEditProps> = ({ onRequestClose, onRequestExclude, valor, data, tipo, desc, _id, quantidade }) => {
    const [newDesc, setNewDesc] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [newValor, setNewValor] = useState<number>(0);
    const [newTipo, setNewTipo] = useState<string>('');
    const [newQuant, setNewQuant] = useState<number>(0);
    const [newData, setNewData] = useState<string>('');

    const currentDate = new Date();


    const handleDescChange = (e) => {
        setNewDesc(e.target.value);
    }

    const handleDataChange = (date) => {
        const formattedDate = date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        setNewData(formattedDate.replace(/\//g, '-'))
    }

    const handleTipoChange = (e) => {
        setNewTipo(e.target.value)
    }

    const handleValorChange = (e) => {
        const input = e.target.value;
        const treatedInput = input.replace(/,/g, '.')
        setNewValor(treatedInput)
    }

    const handleQuantidadeChange = (e) => {
        setNewQuant(e.target.value)
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

    const dados = { desc, data, tipo, valor, quantidade }
    const url = '/todoscustos/editar/';

    function handleSave() {

        const updatedDados = {
            desc: newDesc === '' ? desc : newDesc,
            valor: newValor === 0 ? valor : newValor,
            tipo: newTipo === '' ? tipo : newTipo,
            quantidade: newQuant === 0 ? quantidade : newQuant,
            data: newData === '' ? data : newData,
        };

        return fetch(`http://${myIp}:3001/todoscustos/editar/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDados)
        })
            .then(response => {
                response.json()
                swal("Editada!", "Sua despesa foi editada com sucesso", "success");
                setNewDesc('');
                setNewValor(0)
                setNewTipo('')
                setNewQuant(0)
                setNewData('')
                onRequestClose()
            })
            .catch(error => {
                console.error(error);
            });
    }


    const handleDelete = () => {
        fetch(`http://${myIp}:3001/costs/${_id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                swal("Deletado!", "A despesa foi deletada com sucesso!", "warning");
                onRequestClose()
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="w-full rounded-xl z-10 h-full fixed fixed bg-slate-600/50 top-0 left-0 align-center flex items-center justify-center">
            <div className="animate__animated animate__bounceInUp bg-white h-fit pb-10 w-1/3 rounded-xl pt-5">
                <h3 className="text-2xl font-medium text-gray-900 ml-5 mb-10 ">Edite sua despesa 📝 </h3>
                <div className='justify-center flex flex-col items-center'>
                    <div>
                        <form>
                            {/* <h3 className='text-sm font-semibold opacity-80'></h3> */}
                            <TextField size='small' defaultValue={desc} sx={{ m: 1, width: '25ch' }} id="outlined-basic desc" onChange={handleDescChange} className='' placeholder='sobre a despesa' label="Descricao" variant="outlined" />
                        </form>
                    </div>
                    <div>
                        <form>
                            {/* <h3 className='text-sm font-semibold opacity-80'>Data (DD-MM-AA)</h3>
                                    <div className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2'>
                                        <CustomDatePicker onChange={handleDataChange} />
                                    </div> */}
                            <DatePickerMui onChange={handleDataChange} />
                        </form>
                    </div>
                    <div>
                        <TextField
                            size='small'
                            id="outlined-select-currency"
                            select
                            label="Tipo"
                            defaultValue={tipo}
                            // helperText="Please select your currency"
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
                            <TextField size='small' defaultValue={quantidade} sx={{ m: 1, width: '25ch' }} id="outlined-number desc" type="number" onChange={handleQuantidadeChange} className='w-[100] h-[50] border-2 rounded-md mt-1 mb-2' placeholder='sobre a despesa' label="Quantidade" variant="outlined" />
                        </form>
                    </div>
                    <div>
                        <form>
                            <TextField size='small' defaultValue={valor} sx={{ m: 1, width: '25ch' }} id="outlined-basic desc" onChange={handleValorChange} className='w-[100] h-[50] border-2 rounded-md mt-1 mb-2' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment>, }} variant="outlined" label='Valor' />
                        </form>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="mt-5 mb-5 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out mb-2"
                            onClick={() => handleSave()}
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            className="mt-5 mb-5 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out mb-2"
                            onClick={() => handleDelete()}
                        >
                            Deletar
                        </button>
                    </div>
                    <div className="bg-gray-200 w-full bottom-0 fixed rounded-b-xl flex flex-row-reverse pr-4">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center mt-2 mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out"
                            onClick={onRequestClose}
                        >
                            Fechar
                        </button>

                    </div>
                </div>
                <div className="mt-4 space-y-4 flex flex-row">

                </div>

            </div>
        </div>
    )
}

export default ModalEdit;
