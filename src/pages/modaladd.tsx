import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { myIp } from '.';
import CustomDatePicker from './datepicker';
import { isNumericLiteral } from 'typescript';

const ModalAdd = () => {
const [showModal, setShowModal] = useState(false);
const [desc, setDesc] = useState('');
const [data, setData] = useState('');
const [tipo, setTipo] = useState('');
const [valor, setValor] = useState(0);
const [quantidade, setQuantidade] = useState(0);
const currentDate = new Date();


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
    setData(formattedDate.replace(/\//g, '-'))
}

const handleTipoChange = (e) => {
    setTipo(e.target.value)
}

const handleValorChange = (e) => {
    const input = e.target.value;
    const treatedInput = input.replace(/,/g, '.')
    setValor(treatedInput)
}

const handleQuantidadeChange = (e) => {
    setQuantidade(e.target.value)
}

useState(() => {
    handleDataChange(currentDate);
  }, []);

const dados = {desc, data, tipo, valor, quantidade}
const url = '/novocusto';

console.log(JSON.stringify(dados))

function postData( url, dados) {
    
    if (!dados.desc || !dados.data || !dados.tipo || !dados.valor || !dados.quantidade) {
    alert('Preencha todo o formulário para adicionar a despesa');
    return;
    }
    return fetch(`http://${myIp}:3001${url}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => {response.json()
        console.log('Success:', response);
        alert('Your message was sent successfully!');
        setDesc('');
        setData('')
        setTipo('')
        setQuantidade(0)
        setValor(0)
        })
        .catch(error => {
        console.error(error);
        });
    }

return (
    <div className='ml-auto'>
    <button
        type="button"
        className="w-[30px] h-[30px] bg-green-600 rounded-full text-white transition-all duration-500 pt-1 ease-in-out hover:scale-110"
        onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlus} /></button>

    {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-hidden">
        <div className="flex items-center justify-center min-h-screen px-4 pt-32 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75 rounded-xl"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Adicione uma nova despesa 💸 </h3>

                <div className="mt-4 space-y-4 flex flex-row">
                
                </div>
            </div>
            <div className='justify-center flex flex-col items-center'>
                <div>
                    <form>
                        <h3 className='text-sm font-semibold opacity-80'>Descricao</h3>
                        <input id='desc' onChange={handleDescChange} className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2' placeholder='sobre a despesa'></input>
                    </form>
                </div>
                <div>
                    <form>
                        <h3 className='text-sm font-semibold opacity-80'>Data (DD-MM-AA)</h3>
                        <div className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2'>
                            <CustomDatePicker onChange={handleDataChange} />
                        </div>
                        {/* <input id='desc' onChange={handleDataChange} className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2' placeholder='data'></input> */}
                    </form>
                </div>
                <div>
                    <form>
                        <h3 className='text-sm font-semibold opacity-80'>Tipo</h3>
                        <div className='flex flex-col'>
                            <select name="tipo" id="tipo" onChange={handleTipoChange} className='w-[165px] h-[100] border-2 rounded-md mt-1 mb-2 bg-white p-1'>
                                <option value="" disabled selected style={{ display: "none" }}>
                                    <span style={{ opacity: 0.5 }}>Escolha o tipo</span>
                                </option>
                                <option value="racao">Racao</option>
                                <option value="banho">Banho</option>
                                <option value="shop">Shop</option>
                                <option value="clinica">Clinica</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div>
                    <form>
                        <h3 className='text-sm font-semibold opacity-80'>Quantidade</h3>
                        <input className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2' onChange={handleQuantidadeChange} placeholder='quantidade'></input>
                    </form>
                </div>
                <div>
                    <form>
                        <h3 className='text-sm font-semibold opacity-80'>Valor (R$)</h3>
                        <input className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2' onChange={handleValorChange} placeholder='valor da despesa'></input>
                    </form>
                </div>
                <div>
                    <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out mb-2"
                onClick={() => postData(url,dados)}
                >
                Adicionar
                </button>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out"
                onClick={() => setShowModal(false)}
                >
                Fechar
                </button>
            </div>
            </div>
        </div>
        </div>
    )}
    </div>
);
};

export default ModalAdd;
