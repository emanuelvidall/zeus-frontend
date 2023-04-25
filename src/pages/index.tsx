import Image from 'next/image'
import { Inter } from 'next/font/google'
import TotalCosts from './totalcosts'
import List from './list'
import ImageComponent from './avatar'
import ModalAdd from './modaladd'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='items-center flex justify-center h-screen'>
      <div className='bg-zinc-950 drop-shadow-2xl rounded-xl items-center flex justify-center pl-10 pr-10 h-[900px] w-[1440px]'>
        <div className='leftSection bg-zing-950s h-5/6 w-1/6 mr-10 rounded-xl'>
          <div className='avatarSection bg-zinc-950 h-20 w-30'>
            <ImageComponent />
            <h1 className='text-zinc-50 text-3xl mt-5 mb-1'>Zeus</h1>
            <h3 className='text-neutral-500 text-base'>Border Collie</h3>
            <h3 className='text-neutral-500 text-base'>32kg</h3>
            <h3 className='text-neutral-500 text-base'>3 anos</h3>
            <div className='listSection mt-20 text-neutral-500 text-2xl space-y-10 flex flex-col'>
              <a className='hover:text-white cursor-pointer'>Home</a>
              <a className='hover:text-white cursor-pointer'>Despesas</a>
              <a className='hover:text-white cursor-pointer'>Resumo</a>
          </div>
          </div>
        </div>
        <div className='middleSection bg-white h-5/6 w-1/2 rounded-l-xl flex justify-center items-center p-10'>
          <div className='w-[510px] h-[641px]'>
            <div className='topContainer flex flex-row'>
              <h1 className='text-3xl'>Despesas</h1>
              <div className='totalMes flex-end ml-auto'>
                <TotalCosts />
                <h1 className='text-sm text-center'>Total neste mes</h1>
              </div>
          </div>
          <div className='chartContainer w-full h-[100px] bg-blue-500 mb-20'>
          </div>
          <div className='listContainer w-[500px] h-2/3 pl-5 pr-5'>
            <div className='listContainerHead w-full h-5 mb-2 flex flex-row'>
              <h3 className='font-semibold'>Historico</h3>
              <ModalAdd />
            </div>
            <div>
              <h3 className='text-sm'>Ultimas 10 despesas</h3>
            </div>
            <div className='listSeparator w-[480px] h-0.5 bg-black opacity-10 self-center ml-auto mr-auto mb-5'>
            </div>
            <div className='listItSelf relative h-5/6 w-[500px]'>
              <div className='listContainer absolute top-0 left-0 flex items-center justify-center right-0 bottom-0 overflow-y-scroll pt-60'>
                <List />
              </div>
            </div>
          </div> 
          </div>
        </div>
        <div className='rightSection bg-slate-50 h-5/6 w-1/4 rounded-r-xl p-10'>
          <div className='rightTopContainer flex flex-row'>
            <h1 className='text-xl font-semibold mt-3 opacity-90'>Distribuicao das Despesas</h1>
          </div>
        </div>
      </div>
      <footer className='absolute bottom-0'>
        <h2>Desenvolvido por Emanuel Vidal em Vortex @ UNIFOR 2023</h2>
      </footer>
    </main>
  )
}
