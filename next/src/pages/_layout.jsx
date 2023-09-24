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
      {
        router.pathname === '/' &&
        <>{children}</>
      }
    </>
  );
}

export default Layout;