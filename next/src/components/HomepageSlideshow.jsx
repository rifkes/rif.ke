import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';

const HomepageSlideshow = ({ items }) => {

  const { setBackgroundImage, setTitleText } = useSiteGlobals();
  const [ activeItemIndex, setActiveItemIndex ] = useState(-1);

  useEffect(() => {
    if (activeItemIndex < 0 || activeItemIndex >= items.length) {
      setBackgroundImage('webcam');
      setTitleText('Rifke');
    } else {
      if (items[ activeItemIndex ].item?.backgroundImage?.url) {
        // setBackgroundImage(items[ activeItemIndex ].item.backgroundImage.url);
        setBackgroundImage('white.png');
      } else {
        setBackgroundImage('/white.png');
      }
      if (items[ activeItemIndex ]._type === 'textSection') {
        setTitleText(items[ activeItemIndex ].text);
      } else {
        setTitleText(items[ activeItemIndex ].item?.title ? items[ activeItemIndex ].item.title : items[ activeItemIndex ].item?.client ? items[ activeItemIndex ].item.client : items[ activeItemIndex ].item?.project ? items[ activeItemIndex ].item.project : '');
      }
    }
  }, [ activeItemIndex ]);

  return (
    <>
      <motion.div
        { ...fadeInOutVariants }
        className='w-full h-screen fixed top-0 left-0 z-10 hover-hover:overflow-y-scroll hover-none:overflow-hidden'
      >
        <div className='w-screen h-screen' />
        {
          items.map((item, index) => (
            <div
              className='w-screen h-screen absolute top-0 left-0 p-12 max-xs:px-0 transition-opacity duration-500 pointer-events-none'
              key={ index }
              style={ {
                opacity: activeItemIndex === index ? 1 : 0,
              } }
            >
              {
                item?.item?.foregroundMedia?.type === 'image' &&
                item?.item?.foregroundMedia?.image?.url &&
                <Image
                  className='max-w-[100%] max-h-[75%] w-auto h-auto block relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl'
                  src={ item.item.foregroundMedia.image.url }
                  alt={ item.item.foregroundMedia.image.altText ?? item.item.title + ' image' }
                  width={ 1024 }
                  height={ 1024 }
                  style={ {
                    boxShadow: '2px 2px 25px -5px rgba(0, 0, 0, 0.5)'
                  } }
                />
              }
            </div>
          ))
        }
      </motion.div>
      <button
        onClick={ () => {
          if (activeItemIndex > 0) {
            setActiveItemIndex(activeItemIndex - 1);
          } else {
            setActiveItemIndex(items.length - 1);
          }
        } }
        className='z-[999] select-none fixed top-1/2 -translate-y-1/2 left-0 p-2 uppercase mix-blend-difference text-white'
      >Previous</button>
      <button
        onClick={ () => {
          if (activeItemIndex < items.length - 1) {
            setActiveItemIndex(activeItemIndex + 1);
          } else {
            setActiveItemIndex(0);
          }
        } }
        className='z-[999] select-none fixed top-1/2 -translate-y-1/2 right-0 p-2 uppercase mix-blend-difference text-white'
      >Next</button>
    </>
  );
}

export default HomepageSlideshow;