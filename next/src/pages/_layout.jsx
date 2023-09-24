import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ThreeCanvas from '@/components/3D/ThreeCanvas';
import UI from '@/components/UI';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const Layout = ({ children }) => {

  const router = useRouter();
  const [ stage, setStage ] = useState(0);
  const { setIsTouchscreen } = useSiteGlobals();

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouchscreen(true);
    }
  }, [ setIsTouchscreen ]);

  return (
    <>
      <div className='w-full h-screen fixed top-0 left-0'>
        <ThreeCanvas { ...{ stage, setStage } } />
      </div>
      <UI />
      {
        router.pathname === '/' &&
        <>{children}</>
      }
    </>
  );
}

export default Layout;