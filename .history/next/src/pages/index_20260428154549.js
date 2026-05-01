import HomepageScrollingContent from '@/components/HomepageScrollingContent';
import Seo from '@/utils/Seo';
import SetGlobalProps from '@/utils/SetGlobalProps';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getGlobalProps from '@/utils/getGlobalProps';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { motion } from 'framer-motion';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';

export default function Home({ globalData, }) {

	const { titleText, windowWidth, activeItem, infoIsActive, itemInfoIsActive, } = useSiteGlobals();

  return (
    <div>
			{
				globalData?.settings?.gaMeasurementId &&
				<GoogleAnalytics trackPageViews gaMeasurementId={ globalData.settings.gaMeasurementId } />
			}
      <Seo { ...{ globalData, } } />
      <SetGlobalProps { ...{ globalData } } />
        {
          itemInfoIsActive === false &&
          <motion.h1
            key='title'
            className='select-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-2 mix-blend-difference text-white ui-text'
            { ...fadeInOutVariants }
          >
            { titleText }
          </motion.h1>
        }
      {
        activeItem?.title &&
        infoIsActive === false &&
        <button
          onClick={ () => {
            setItemInfoIsActive(!itemInfoIsActive);
            setInfoIsActive(false);
          } }
          className='select-none fixed top-0 left-1/2 -translate-x-1/2 p-2 uppercase mix-blend-difference text-white ui-text z-[999] cursor-pointer'
        >
						{itemInfoIsActive === true ? 'close' :
							windowWidth < 768 ? '?' : 'About the project'}
        </button>
      }
			{
				!activeItem &&
				<button
					onClick={ () => {
						const scrollingElement = document.querySelector('.scrolling-element');
						if (scrollingElement) {
							scrollingElement.scrollTo({
								top: window.innerHeight,
								behavior: 'smooth',
							});
						}
					} }
					className='select-none block fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-all cursor-pointer p-2 uppercase mix-blend-difference text-white ui-text z-[999]'
				>
					scroll
				</button>
			}
      <HomepageScrollingContent { ...{ items: globalData?.homepage, } } />
    </div>
  )
}

export async function getStaticProps() {

	const globalData = await getGlobalProps();

  return {
    props: {
      globalData: globalData,
    }
  }
}