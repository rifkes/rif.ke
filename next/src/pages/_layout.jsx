import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ThreeCanvas from '@/components/silly/3D/ThreeCanvas';
import UI from '@/components/UI';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Cursor from '@/components/silly/Cursor';
import FlipHorizontal from '@/components/silly/FlipHorizontal';
import FlipVertical from '@/components/silly/FlipVertical';
import Eraser from '@/components/silly/Eraser';
import OilSlick from '@/components/silly/3D/OilSlick';
import DistortedText from '@/components/silly/3D/DistortedText';
import Metaballs from '@/components/silly/3D/Metaballs';
import useWindowSize from '@/hooks/useWindowSize';
import Grob from '@/components/silly/Grob';
import { GoogleAnalytics } from 'nextjs-google-analytics';

const Layout = ({ children }) => {

  const router = useRouter();
  const { setIsTouchscreen, sillyName, initialSillyNames, setSillyName, siteGlobals } = useSiteGlobals();
  const { windowWidth, windowHeight } = useWindowSize();

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouchscreen(true);
    }
  }, [ setIsTouchscreen ]);

  useEffect(() => {
    if (windowWidth > 2 && windowHeight > 2) {
      document.body.style.width = `${windowWidth}px`;
      document.body.style.height = `${ windowHeight }px`;
      document.querySelectorAll('.h-screen').forEach((item) => {
        item.style.height = `${ windowHeight }px`;
      });
    }
  }, [ windowWidth, windowHeight ]);

  useEffect(() => {
    setSillyName(initialSillyNames[ Math.floor(Math.random() * initialSillyNames.length) ]);
  }, [ initialSillyNames, setSillyName ]);

  return (
    <>
      {
        sillyName === 'flip horizontal' &&
        <FlipHorizontal />
      }
      {
        sillyName === 'flip vertical' &&
        <FlipVertical />
      }
      {
        sillyName === 'eraser' &&
        <Eraser />
      }
      {
        sillyName === 'metaballs' &&
        <div className='w-full h-screen fixed top-0 left-0 overflow-hidden pointer-events-none z-[9999]'>
          <ThreeCanvas perspectiveCamera={ true }>
            <Metaballs />
          </ThreeCanvas>
        </div>
      }
      {
        sillyName === 'distorted text' &&
        <div className='w-full h-screen fixed top-0 left-0 overflow-hidden mix-blend-difference'>
          <ThreeCanvas>
            <DistortedText />
          </ThreeCanvas>
        </div>
      }
      {
        sillyName === 'oil slick' &&
        <div className='w-full h-screen fixed top-0 left-0 bg-white overflow-hidden'>
          <ThreeCanvas>
            <OilSlick />
          </ThreeCanvas>
        </div>
      }
      {
        sillyName === 'trail cursor' &&
        <Cursor />
      }
      {
        sillyName === 'grob' &&
        <div className='w-full h-screen fixed top-0 left-0 overflow-hidden pointer-evets-none'>
          <Grob />
        </div>
      }
      <UI />
      {
        router.pathname === '/' &&
        <>{children}</>
      }
    </>
  );
}

export default Layout;