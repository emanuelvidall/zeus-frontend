import React from 'react';
import 'animate.css';
import { TextField } from '@mui/material';
import swal from 'sweetalert';

export default function Login() {
  return (
    <main className='items-center flex justify-center h-screen'>
        <div className='bg-[#1e2229] drop-shadow-xl rounded-xl items-center flex justify-center pl-10 pr-10 h-[90%] w-[90%]'>
          <div className='bg-white rounded-xl animate__animated animate__bounceInUp w-1/3 h-2/3'>
            <div className='p-10'>
                <h1 style={{fontFamily: 'sans-serif'}} className='font-bold color-black text-xl text-center font-readex'>Crie ou Entre com sua conta 🐶</h1>
                <div className='flex pl-7 justify-center'>
                  <img src='/images/splashlogo1.png' width={250} height={250} alt='logo' />
                </div>
                <div className='mt-5 items-center flex flex-col'>
                  <h1 className='font-bold self-start ml-20'>Login</h1>
                  <form>
                    <TextField size='small' sx={{ m: 1, width: '25ch' }} id="outlined-basic desc" onChange={()=>{console.log('oi')}} className='' placeholder='utilize seu email' label="" variant="outlined" />
                  </form>
                  <h1 className='font-bold self-start ml-20 mt-5'>Senha</h1>
                  <form>
                    <TextField size='small' sx={{ m: 1, width: '25ch' }} id="outlined-basic desc" onChange={()=>{console.log('oi')}} className='' placeholder='digite sua senha' label="" variant="outlined" />
                  </form>
                  <h1 className='text-blue-500 text-xs underline hover:cursor-pointer mt-5'>Esqueci minha senha</h1>
                  <div className='flex flex-row mt-10'>
                    <button className='rounded bg-green-500 hover:scale-110 transition-all duration-300 ease-in-out w-[120px] p-2 mr-5 font-bold text-white'>Login</button>
                    <button className='rounded bg-blue-500 hover:scale-110 transition-all duration-300 ease-in-out w-[120px] p-2 ml-5 font-bold text-white'>Registrar</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <footer className='absolute bottom-0'>
        <h2>Desenvolvido por Emanuel Vidal em Vortex @ UNIFOR 2023</h2>
      </footer>
    </main>
  )}