import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalAdd = () => {
const [showModal, setShowModal] = useState(false);

return (
    <div className='self-end ml-auto'>
    <button
        type="button"
        className="w-[30px] h-[30px] bg-slate-600 rounded-full text-white hover:bg-slate-300 transition-all duration-500 pt-1 ease-in-out"
        onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlus} /></button>

    {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-32 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
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
                        <input className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2' placeholder='sobre a despesa'></input>
                    </form>
                </div>
                <div>
                    <form>
                        <h3 className='text-sm font-semibold opacity-80'>Data</h3>
                        <input className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2' placeholder='sobre a despesa'></input>
                    </form>
                </div>
                <div>
                    <form>
                        <h3 className='text-sm font-semibold opacity-80'>Tipo</h3>
                        <div className='flex flex-col'>
                            <label>
                                <input
                                    type="radio"
                                    value="option1"
                                />
                                    Comida
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="option1"
                                />
                                    Banho
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="option1"
                                />
                                    Clinica
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="option1"
                                />
                                    Outros
                            </label>
                        </div>
                    </form>
                </div>
                <div>
                    <form>
                        <h3 className='text-sm font-semibold opacity-80'>Valor (R$)</h3>
                        <input className='w-[100] h-[100] border-2 rounded-md mt-1 mb-2' placeholder='sobre a despesa'></input>
                    </form>
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
