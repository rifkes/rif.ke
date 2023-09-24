import { useRouter } from 'next/router';
import { useState } from 'react';
import ThreeCanvas from '@/components/3D/ThreeCanvas';

const Layout = ({ children }) => {

  const router = useRouter();
  const [ stage, setStage ] = useState(0);

  return (
    <>
      <div className='w-full h-screen fixed top-0 left-0'>
        <ThreeCanvas { ...{ stage, setStage } } />
      </div>
      <div className='w-full h-screen fixed top-0 left-0 p-24'>
        {/* <img className='max-w-[50%] max-h-[50%] block relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl' src='/assets/stunning-vista.png' /> */}
      </div>
      {
        router.pathname === '/' &&
        <>{children}</>
      }
    </>
  );
}

export default Layout;