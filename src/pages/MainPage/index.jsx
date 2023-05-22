import TotalCosts from '../totalcosts'
import List from '../list'
import ImageComponent from '../avatar'
import ModalAdd from '../modaladd'
import Distribuicao from '../distribuicao'
import CurrentDate from '../currentdate'
import PorTipo from '../portipo'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MainPage() {
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedId = localStorage.getItem('id');
    console.log('tokenzim:__________', storedToken);
    console.log('idzim:__________', storedId);
    if (storedToken) {
      setToken(storedToken);
      setUserId(storedId);
      getUserData(storedId);
    } else {
      router.push('/');
    }
  }, []);


  function getUserData(userId) {
    const url = `http://172.18.9.236:3001/users/view/${userId}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        setUserName(data.name);
        setUserEmail(data.email);
      })
      .catch(error => {
        console.error(error);
      });
  }


  const userNameUpperCase = (userName) => {
    return userName.charAt(0).toUpperCase()+userName.slice(1);
  }

  return (
    <main className='items-center flex justify-center h-screen'>
      <div className='bg-[#1e2229] drop-shadow-xl rounded-xl items-center flex justify-center pl-10 pr-10 h-[90%] w-[90%]'>
        <div className='leftSection bg-zinc-950 h-[40%] w-1/6 mr-10 rounded-xl p-5'>
          <div className='avatarSection h-20 w-30'>
            <div className='secaoUser'>
              <div className='userIcon rounded-full bg-white w-6 h-fit text-center'>
                <FontAwesomeIcon icon={faUser} color='#1e2229' />
              </div>
              <div className='text-white mb-5'>
                <h1>Olá {userNameUpperCase(userName)}</h1>
                <h1>{userEmail}</h1>
              </div>
            </div>
            <h1 className='text-white'>Seu aumigo é:</h1>
            <div className='secaoDog'>
              <ImageComponent />
              <h1 className='text-zinc-50 text-3xl mt-5 mb-1'>Zeus</h1>
              <h3 className='text-neutral-500 text-base'>Border Collie</h3>
              <h3 className='text-neutral-500 text-base'>18kg</h3>
              <h3 className='text-neutral-500 text-base'>2 anos</h3>
            </div>
            <button type='button' className='w-[fit] absolute bottom-11 text-sm px-2 h-[30px] bg-[#DC3434] rounded-md text-white transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-lg'>Encerrar Sessão</button>
            <div className='listSection mt-20 text-neutral-500 text-2xl space-y-10 flex flex-col'>
            </div>
          </div>
        </div>
        <div className='middleSection bg-white h-[90%] w-1/2 rounded-l-xl flex justify-center items-center p-10'>
          <div className='w-[95%] h-[100%]'>
            <CurrentDate />
            <div className='topContainer flex flex-row'>
              <h1 className='text-3xl'>Despesas</h1>
              <div className='totalMes flex-end ml-auto'>
                <TotalCosts />
                <h1 className='text-sm text-left'></h1>
              </div>
            </div>
            <div className='chartContainer h-[150px] w-full mb-2 flex relative items-center justify-center align-center'>
              <PorTipo />
            </div>
            <div className='listContainer w-[100%] h-[50%] top-0 pl-5 pr-5'>
              <div className='listContainerHead w-full h-5 mb-2 flex flex-row'>
                <h3 className='font-semibold'>Últimas 10 Despesas</h3>

              </div>
              <div>
              </div>
              <div className='listSeparator w-[100%] h-0.5 bg-black opacity-10 self-center ml-auto mr-auto mb-2'>
              </div>
              <div className='w-full absolute z-[10] md:w-[400px]'>
                <ModalAdd userId={userId} />
              </div>
              <div className=''>
                <List />
              </div>
            </div>
          </div>
        </div>
        <div className='rightSection bg-slate-50 h-[90%] w-1/4 rounded-r-xl p-10'>
          <div className='rightTopContainer flex flex-col'>
            <h1 className='text-xl font-semibold mt-3 opacity-90'>Distribuição das Despesas</h1>
            <h2 className='text-sm text-left'>Total</h2>
          </div>
          <div className='w-[100%] h-[90%] pt-5'>
            <Distribuicao />
          </div>
        </div>
      </div>
      <footer className='absolute bottom-0'>
        <h2>Desenvolvido por Emanuel Vidal em Vortex @ UNIFOR 2023</h2>
      </footer>
    </main>
  )
}