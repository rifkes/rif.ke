import { useMemo, useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HomepageScrollingContent = () => {

  const { siteGlobals, setBackgroundImage } = useSiteGlobals();

  const items = useMemo(() => {
    if (siteGlobals?.homepage?.items) {
      return siteGlobals.homepage.items.map((item, index) => ({
        ...item,
        index,
      }));
    } else {
      return [];
    }
  }, [ siteGlobals?.homepage?.items ]);

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
          } else {
            if (items[ activeIndex ].item?.backgroundImage?.url) {
              setBackgroundImage(items[ activeIndex ].item.backgroundImage.url);
            } else {
              setBackgroundImage('webcam');
            }
          }
            setActiveItemIndex(activeIndex);
        } }
      >
        <div className='w-screen h-screen p-24' />
        {
          items.map((item, index) => (
            <div className='w-screen h-screen p-24' key={ index }>
              {
                item?.item?.foregroundMedia?.type === 'image' &&
                item?.item?.foregroundMedia?.image?.url &&
                <Image
                  className='max-w-[50%] max-h-[50%] block relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl'
                  src={ item.item.foregroundMedia.image.url }
                  alt={ item.item.foregroundMedia.image.altText ?? item.item.title + ' image' }
                  width={ 1024 }
                  height={ 1024 }
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