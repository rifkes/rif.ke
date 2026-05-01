import HomepageScrollingContent from '@/components/HomepageScrollingContent';
import Seo from '@/utils/Seo';
import SetGlobalProps from '@/utils/SetGlobalProps';
import getGlobalProps from '@/utils/getGlobalProps';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function Home({ globalData, }) {

	const { titleText, windowWidth, activeItem, infoIsActive, itemInfoIsActive, } = useSiteGlobals();

  return (
    <>
			{
				globalData?.settings?.gaMeasurementId &&
				<GoogleAnalytics trackPageViews gaMeasurementId={ globalData.settings.gaMeasurementId } />
			}
      <Seo { ...{ globalData, } } />
      <SetGlobalProps { ...{ globalData } } />
      <HomepageScrollingContent { ...{ items: globalData?.homepage, } } />
        {
          infoIsActive === false && itemInfoIsActive === false &&
          <motion.h1
            key='title'
            className='select-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-2 mix-blend-difference text-white ui-text'
            { ...fadeInOutVariants }
          >
            { titleText }
          </motion.h1>
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
    </>
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