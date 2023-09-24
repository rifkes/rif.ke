import Info from '@/components/Info';
import { useState } from 'react';

const UI = () => {

  const [ infoIsActive, setInfoIsActive ] = useState(false);

  return (
    <>
      <h1 className='select-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-2 mix-blend- difference text -white'>Rifke</h1>
      <button
        onClick={() => setInfoIsActive(!infoIsActive)}
        className='select-none fixed top-0 left-0 p-2 uppercase mix-blend- difference text -white z-[999]'
      >
        {infoIsActive === true ? 'close' : 'Info'}
      </button>
      {
        infoIsActive === true &&
        <Info />
      }
      <a href='https://instagram/rifke.world' className='select-none fixed top-0 right-0 p-2 uppercase mix-blend- difference text -white z-[999]'>
        Instagram
      </a>
      <button className='select-none fixed bottom-0 left-0 p-2 uppercase mix-blend- difference text -white z-[999]'>
        Ask me anything
      </button>
      <button className='select-none fixed bottom-0 right-0 p-2 uppercase mix-blend- difference text -white z-[999]'>
        Lab
      </button>
    </>
  )
}

export default UI;