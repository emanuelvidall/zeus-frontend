import React, { useState } from 'react';
import 'animate.css';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import swal from 'sweetalert';

export const myIp = '172.18.9.236';

export default function Login() {

  interface Login {
    email: string;
    password: string;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();

  function handleLogin(email: string, password: string) {

    const url = 'http://172.18.9.236:3001/auth/login';
    console.log('posting: ', email, password)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(response => response.json())
      .then(data => {
        console.log('esse é o token:___________', data.token)
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.user._id)
        setUserId(data._id)
        console.log(data)
        if (data.token) {
          router.push('/MainPage')
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <main className='items-center flex justify-center h-screen'>
      <div className='bg-[#1e2229] drop-shadow-xl rounded-xl items-center flex justify-center pl-10 pr-10 h-[90%] w-[90%]'>
        <div className='bg-white rounded-xl md:h-fit animate__animated animate__fadeIn w-1/3 h-2/3'>
          <div className='p-10'>
            <h1 style={{ fontFamily: 'sans-serif' }} className='font-bold color-black text-xl text-center font-readex'>Crie ou Entre com sua conta 🐶</h1>
            <div className='flex pl-7 justify-center'>
              <img className='md:w-[150px] md:h-[85px]' src='/images/splashlogo1.png' width={250} height={250} alt='logo' />
            </div>
            <div className='mt-5 items-center flex flex-col'>
              <h1 className='font-bold text-sm self-start ml-32 md:ml-11'>Login</h1>
              <form>
                <TextField size='small' sx={{ m: 1, width: '25ch' }} id="outlined-basic desc" onChange={(e) => { setEmail(e.target.value) }} className='emailInput' placeholder='utilize seu email' label="" variant="outlined" />
              </form>
              <h1 className='font-bold text-sm self-start ml-32 mt-5 md:ml-11'>Password</h1>
              <form>
                <div className='flex'>
                  <TextField size='small' sx={{ m: 1, width: '25ch' }} id="outlined-basic desc" onChange={(e) => { setPassword(e.target.value) }} className='passInput ml-10' placeholder='digite sua senha' label="" variant="outlined" type={showPassword?'text':'password'} />
                  {showPassword ? <div className='w-[30px] h-[35px] relative top-3 right-10 flex flex-col items-center justify-center'><button type='button' onClick={()=> setShowPassword(!showPassword)}><FontAwesomeIcon className='opacity-50' icon={faEye}/></button></div> : <div className='w-[30px] h-[35px] relative top-3 right-10 flex flex-col items-center justify-center'><button type='button' onClick={()=>setShowPassword(!showPassword)}><FontAwesomeIcon className='opacity-50' icon={faEyeSlash} /></button></div>}
                </div>
              </form>
              <h1 className='text-blue-500 text-xs underline hover:cursor-pointer mt-5'>Esqueci minha senha</h1>
              <div className='flex flex-row mt-10'>
                <button onClick={() => handleLogin(email, password)} className='rounded bg-green-500 w-[120px] h-[30px] mr-5 text-white'>Login</button>
                <button className='rounded bg-blue-500 w-[120px] h-[30px] ml-5 text-white'>Registrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='absolute bottom-0'>
        <h2>Desenvolvido por Emanuel Vidal em Vortex @ UNIFOR 2023</h2>
      </footer>
    </main>
  )
}
