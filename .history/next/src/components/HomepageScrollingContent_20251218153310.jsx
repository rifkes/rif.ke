import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer';

const HomepageScrollingContent = ({ items }) => {

  const { setBackgroundImage, setTitleText, setActiveItem, infoIsActive, itemInfoIsActive } = useSiteGlobals();

  return (
    <>
      <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: infoIsActive === false && itemInfoIsActive === false ? 1 : 0 } }
        exit={ { opacity: 0 } }
        className='w-full h-screen fixed top-0 left-0 z-10 overflow-y-scroll scrolling-element'
        style={ {
          pointerEvents: infoIsActive === false && itemInfoIsActive === false ? 'auto' : 'none',
        } }
        onScroll={ (e) => {
          let activeIndex = Math.ceil((e.target.scrollTop - window.innerHeight * 0.25) / window.innerHeight) - 1;
          if (activeIndex < 0 || activeIndex >= items.length) {
            setBackgroundImage('webcam');
            setTitleText('Rifke');
            setActiveItem(null);
          } else {
            if (items[ activeIndex ].item?.backgroundImage?.url) {
              setBackgroundImage('/white.png');
            } else {
              setBackgroundImage('/white.png');
            }
            if (items[ activeIndex ]._type === 'textSection') {
              setTitleText(items[ activeIndex ].text);
              setActiveItem(items[ activeIndex ]);
            } else {
              if (items[ activeIndex ]?.item) {
                setActiveItem(items[ activeIndex ].item);
              }
              setTitleText(items[ activeIndex ].item?.title ? items[ activeIndex ].item.title : items[ activeIndex ].item?.client ? items[ activeIndex ].item.client : items[ activeIndex ].item?.project ? items[ activeIndex ].item.project : '');
            }
          }
        } }
      >
        <div className='w-screen h-screen pointer-events-none' />
        {
          items.map((item, index) => (
            <div className='w-screen h-screen max-xs:px-0 p-12' key={ index }>
              {
                item?.item?.foregroundMedia?.type === 'image' &&
                item?.item?.foregroundMedia?.image?.url &&
                <Image
                  className='max-xs:w-full xs:max-w-[75%] xs:max-h-[75%] xs:w-auto h-auto block relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl'
                  src={ item.item.foregroundMedia.image.url }
                  alt={ item.item.foregroundMedia.image.altText ?? item.item.title + ' image' }
                  width={ 1024 }
                  height={ 1024 }
                  style={ {
                    boxShadow: '2px 2px 25px -5px rgba(0, 0, 0, 0.5)'
                  } }
                />
              }
              {
                item?.item?.foregroundMedia?.type === 'video' &&
                item?.item?.foregroundMedia?.videoEmbed?.url &&
                <div
                  className='max-xs:w-full xs:max-w-[75%] xs:max-h-[75%] xs:w-auto h-auto relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  style={ {
                    boxShadow: '2px 2px 25px -5px rgba(0, 0, 0, 0.5)'
                  } }
                >
                  <VideoPlayer url={ item.item.foregroundMedia.videoEmbed.url } />
                </div>
              }
            </div>
          ))
        }
      </motion.div>
    </>
  );
}

export default HomepageScrollingContent;