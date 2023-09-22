import { useRouter } from 'next/router';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import ThreeScene from '@/components/3D/ThreeScene';
import ThreeCanvas from '@/components/3D/ThreeCanvas';

const Layout = ({ children }) => {

  const router = useRouter();
  const [ stage, setStage ] = useState(0);
  const camera = useRef();

  useEffect(() => {
    if (router.pathname.indexOf('/projects') === 0) {
      const element = document.querySelector('#projects');
      if (element && scrollContainer.current) {
        scrollContainer.current.scrollTop = element.offsetTop;
      }
    }
  }, [ router.pathname ]);

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'e') {
        setActiveFilter('education');
      } else if (event.key === 'c') {
        setActiveFilter('culture');
      } else if (event.key === 'd') {
        setActiveFilter('design');
      } else if (event.key === 'Escape') {
        setActiveFilter('none');
      }
    });
  }, []);

  const sections = [
    `intro`,
    // `intro2`,
    `home`,
    `vision`,
    `mission`,
    `pre-manifesto`,
    `manifesto`,
    `team`,
    `projects`,
  ];

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