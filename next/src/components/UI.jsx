import Info from '@/components/Info';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect } from 'react';
import ItemInfoSection from './ItemInfoSection';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';

const UI = () => {
  const { titleText, activeItem, infoIsActive, setInfoIsActive, itemInfoIsActive, setItemInfoIsActive, sillyNames, setSillyName } = useSiteGlobals();

  useEffect(() => {
    setItemInfoIsActive(false);
  }, [ activeItem, setItemInfoIsActive ]);

  return (
    <>
      <AnimatePresence mode='wait'>
        {
          activeItem?.title && itemInfoIsActive === true &&
          <ItemInfoSection key='itemInfo' />
        }
        {
          infoIsActive === false && itemInfoIsActive === false &&
          <motion.h1
            key='title'
            className='select-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-2 mix-blend-difference text-white'
            { ...fadeInOutVariants }
          >
            { titleText }
          </motion.h1>
        }
        {
          infoIsActive === true &&
          <Info key='info' />
        }
      </AnimatePresence>
      <button
        onClick={ () => {
          setInfoIsActive(!infoIsActive);
          setItemInfoIsActive(false);
        } }
        className='select-none fixed top-0 left-0 p-2 uppercase mix-blend-difference text-white z-[999]'
      >
        { infoIsActive === true ? 'close' : 'Info' }
      </button>
      {
        activeItem?.title &&
        infoIsActive === false &&
        <button
          onClick={ () => {
            setItemInfoIsActive(!itemInfoIsActive);
            setInfoIsActive(false);
          } }
          className='select-none fixed top-0 left-1/2 -translate-x-1/2 p-2 uppercase mix-blend-difference text-white z-[999]'
        >
          { itemInfoIsActive === true ? 'close' : '?' }
        </button>
      }
      <button
        onClick={ () => {
          setSillyName(sillyNames[ Math.floor(Math.random() * sillyNames.length) ]);
        } }
        className='select-none fixed top-0 right-0 p-2 uppercase mix-blend-difference text-white z-[999]'
      >
        ♡
      </button>
      <a
        href={ `mailto:rifke@rifke.world` }
        target='_blank'
        rel='noopener noreferrer'
        className='select-none fixed bottom-0 left-0 p-2 uppercase mix-blend-difference text-white z-[999]'
      >
        Ask me anything
      </a>
      <a
        href='https://instagram.com/rifke.world'
        target='_blank'
        rel='noopener noreferrer'
        className='select-none fixed bottom-0 right-0 p-2 uppercase mix-blend-difference text-white z-[999]'
      >
        @rifke.world
      </a>
      {
        !activeItem &&
        <span
          href='https://instagram.com/rifke.world'
          target='_blank'
          rel='noopener noreferrer'
          className='select-none block fixed bottom-0 left-1/2 -translate-x-1/2 p-2 uppercase mix-blend-difference text-white z-[999]'
        >
          scroll
        </span>
      }
    </>
  )
}

export default UI;