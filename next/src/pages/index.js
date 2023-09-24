import Info from '@/components/Info';
import { useState } from 'react';


export default function Home() {

  const [ infoIsActive, setInfoIsActive ] = useState(false);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1 className='select-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-2 mix-blend-difference text-white'>Rifke</h1>
      {/* <button className='select-none fixed top-0 left-1/2 -translate-x-1/2 p-2 uppercase mix-blend-difference text-white'>
        Info
      </button>
      <button className='select-none fixed bottom-0 left-1/2 -translate-x-1/2 text-center p-2 uppercase mix-blend-difference text-white'>
        Ask me anything
      </button> */}
      <button
        onClick={() => setInfoIsActive(!infoIsActive)}
        className='select-none fixed top-0 left-0 p-2 uppercase mix-blend-difference text-white'
      >
        {infoIsActive === true ? 'close' : 'Info'}
      </button>
      {
        infoIsActive === true &&
        <Info />
      }
      <a href='https://instagram/rifke.world' className='select-none fixed top-0 right-0 p-2 uppercase mix-blend-difference text-white'>
        Instagram
      </a>
      <button className='select-none fixed bottom-0 left-0 p-2 uppercase mix-blend-difference text-white'>
        Ask me anything
      </button>
      <button className='select-none fixed bottom-0 right-0 p-2 uppercase mix-blend-difference text-white'>
        Lab
      </button>
      <button className='select-none fixed top-1/2 -translate-y-1/2 left-0 p-2 uppercase mix-blend-difference text-white'>Previous</button>
      <button className='select-none fixed top-1/2 -translate-y-1/2 right-0 p-2 uppercase mix-blend-difference text-white'>Next</button>
    </main>
  )
}
