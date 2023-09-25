import { useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HomepageScrollingContent = ({ items }) => {

  const { setBackgroundImage, setTitleText } = useSiteGlobals();

  const [ activeItemIndex, setActiveItemIndex ] = useState(-1);

  return (
    <>
      <motion.div
        { ...fadeInOutVariants }
        className='w-full h-screen fixed top-0 left-0 z-10 hover-hover:overflow-y-scroll hover-none:overflow-hidden'
        onScroll={ (e) => {
          let activeIndex = Math.ceil((e.target.scrollTop - window.innerHeight * 0.25) / window.innerHeight) - 1;
          if (activeIndex < 0 || activeIndex >= items.length) {
            setBackgroundImage('webcam');
            setTitleText('Rifke');
          } else {
            if (items[ activeIndex ].item?.backgroundImage?.url) {
              setBackgroundImage(items[ activeIndex ].item.backgroundImage.url);
            } else {
              setBackgroundImage('webcam');
            }
            if (items[ activeIndex ]._type === 'textSection') {
              setTitleText(items[ activeIndex ].text);
            } else {
              setTitleText(items[ activeIndex ].item?.title ? items[ activeIndex ].item.title : items[ activeIndex ].item?.client ? items[ activeIndex ].item.client : items[ activeIndex ].item?.project ? items[ activeIndex ].item.project : '');
            }
          }
            setActiveItemIndex(activeIndex);
        } }
      >
        <div className='w-screen h-screen' />
        {
          items.map((item, index) => (
            <div className='w-screen h-screen p-12' key={ index }>
              {
                item?.item?.foregroundMedia?.type === 'image' &&
                item?.item?.foregroundMedia?.image?.url &&
                <Image
                  className='max-w-[75%] max-h-[75%] w-auto h-auto block relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl'
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
    </>
  );
}

export default HomepageScrollingContent;