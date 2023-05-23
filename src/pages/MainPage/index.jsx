import TotalValue from '../TotalValue'
import List from '../list'
import ImageComponent from '../avatar'
import ModalAdd from '../modaladd'
import CurrentDate from '../currentdate'
import PorTipo from '../portipo'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, Select, MenuItem } from '@mui/material';

export default function MainPage() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDog, setUserDog] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState(null);

  const router = useRouter();

  async function validate() {
    const authorizationToken = localStorage.getItem('item');
    const headers = {
      'Authorization': authorizationToken
    };

    const requestOptions = {
      method: 'GET',
      headers: headers
    };

    try {
      const response = await fetch('http://172.18.9.236:3001/auth/validate', requestOptions);

      if (response.ok) {
        console.log('Token is valid');
      } else {
        console.log('Token is invalid');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const currentDate = new Date();

  async function userCheck(userId) {
    if (month != null) {
      try {
        const response = await fetch(`http://172.18.9.236:3001/users/view/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data._id != userId) {
              router.push("/")
            }
          })
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  const handleChange = (e) => {
    setMonth(e.target.value)
  }

  useEffect(() => {
    validate();
    const storedToken = localStorage.getItem('token');
    const storedId = localStorage.getItem('id');
    if (storedToken) {
      setToken(storedToken);
      setUserId(storedId);
      getUserData(storedId);
      setIsLoading(false);
      userCheck(userId);
      setMonth(currentDate.getMonth() + 1);
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
        setUserDog(data.dog);
      })
      .catch(error => {
        console.error(error);
      });
  }


  const userNameUpperCase = (userName) => {
    return userName.charAt(0).toUpperCase() + userName.slice(1);
  }

  function logout() {
    localStorage.clear();
    router.push("/");
  }

  return (
    <main className='items-center flex justify-center h-screen'>
      <div className='bg-[#1e2229] drop-shadow-xl rounded-xl items-center flex justify-center pl-10 pr-10 h-[90%] w-[90%]'>
        <div className='leftSection bg-white h-[90%] w-1/6 mr-10 rounded-xl p-5 flex flex-col'>

          <div className='secaoUser flex flex-row justify-center'>
            <div className='text-black mb-5 ml-2 flex flex-col items-center justify-center'>
              <FontAwesomeIcon className='mb-2' icon={faUser} color='#1e2229' size='6x' />
              <h1>Olá <span className='text-xl font-bold'>{userNameUpperCase(userName)}</span></h1>
              <h1>{userEmail}</h1>
            </div>
          </div>
          <h1 className='text-black opacity-70 text-center'>🐶 Seu aumigo é:</h1>
          <div className='secaoDog flex flex-col items-center justify-center'>
            <h1 className='text-black text-3xl mt-5 mb-1'>{userNameUpperCase(userDog)}</h1>
            <ImageComponent />
          </div>
          <div className='buttonDiv flex justify-center mt-80'>
            <button type='button' onClick={() => logout()} className='w-[fit] self-center text-sm px-2 h-[30px] bg-[#DC3434] rounded-md text-white transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-lg'>Encerrar Sessão</button>
          </div>
          <div className='listSection mt-20 text-neutral-500 text-2xl space-y-10 flex flex-col'>
          </div>

        </div>
        <div className='middleSection bg-white h-[90%] w-1/2 rounded-l-xl flex justify-center items-center p-10'>
          <div className='w-[95%] h-[100%]'>
            <CurrentDate />
            <div className='topContainer flex flex-row'>
              <div>
                {month != null && (
                <h1 className='text-3xl'>Total de Despesas em <FormControl className='mt-0' sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    onChange={handleChange}
                    defaultValue={month}
                  >
                    <MenuItem value={1}>Janeiro</MenuItem>
                    <MenuItem value={2}>Fevereiro</MenuItem>
                    <MenuItem value={3}>Marco</MenuItem>
                    <MenuItem value={4}>Abril</MenuItem>
                    <MenuItem value={5}>Maio</MenuItem>
                    <MenuItem value={6}>Junho</MenuItem>
                    <MenuItem value={7}>Julho</MenuItem>
                    <MenuItem value={8}>Agosto</MenuItem>
                    <MenuItem value={9}>Setembro</MenuItem>
                    <MenuItem value={10}>Outubro</MenuItem>
                    <MenuItem value={11}>Novembro</MenuItem>
                    <MenuItem value={12}>Dezembro</MenuItem>
                  </Select>
                </FormControl></h1>
                )}
              </div>
              <div className='totalMes flex-end ml-auto'>
                {isLoading ? <h1>carregando</h1> : <TotalValue userId={userId} month={month} />}
                <h1 className='text-sm text-left'></h1>
              </div>
            </div>
            <div className='chartContainer h-[150px] w-full mb-2 flex relative items-center justify-center align-center'>
              <PorTipo month={month} userId={userId} />
            </div>
            <div className='listContainer w-[100%] h-[50%] top-0 pl-5 pr-5'>
              <div className='listContainerHead w-full h-5 mb-2 flex flex-row'>
                <h3 className='font-semibold'>Lista de Despesas</h3>

              </div>
              <div>
              </div>
              <div className='listSeparator w-[100%] h-0.5 bg-black opacity-10 self-center ml-auto mr-auto mb-2'>
              </div>
              <div className='w-full absolute z-[10] md:w-[400px]'>
                <ModalAdd userId={userId} />
              </div>
              <div className=''>
                <List userId={userId} month={month} />
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
          </div>
        </div>
      </div>
      <footer className='absolute bottom-0'>
        <h2>Desenvolvido por Emanuel Vidal em Vortex @ UNIFOR 2023</h2>
      </footer>
    </main>
  )
}