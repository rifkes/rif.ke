import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MuxVideoPlayer from './MuxVideoPlayer';

const HomepageScrollingContent = ({ items, }) => {

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
              if (items[ activeIndex ]) {
                setActiveItem(items[ activeIndex ]);
              }
              setTitleText(items[ activeIndex ]?.title ? items[ activeIndex ].title : items[ activeIndex ]?.client ? items[ activeIndex ].client : items[ activeIndex ]?.project ? items[ activeIndex ].project : '');
            }
          }
        } }
      >
        <div className='w-screen h-screen pointer-events-none' />
        {
          items.map((item, index) => (
            <div className='w-screen min-h-screen max-xs:px-0 p-12 flex justify-center items-center' key={ index }>
              {
                item?.video?.hlsUrl &&
                <div
                  className='max-xs:w-full xs:max-w-[75%] xs:max-h-[75%] xs:w-auto h-auto relative'
                  style={ {
                    boxShadow: '2px 2px 25px -5px rgba(0, 0, 0, 0.5)'
                  } }
								>
									{
										<MuxVideoPlayer value={item.video} />
									}
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