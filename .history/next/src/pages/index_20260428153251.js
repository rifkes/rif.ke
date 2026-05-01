import HomepageScrollingContent from '@/components/HomepageScrollingContent';
import Seo from '@/utils/Seo';
import SetGlobalProps from '@/utils/SetGlobalProps';
import getGlobalProps from '@/utils/getGlobalProps';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function Home({ globalData, }) {

  return (
    <>
			{
				globalData?.settings?.gaMeasurementId &&
				<GoogleAnalytics trackPageViews gaMeasurementId={ globalData.settings.gaMeasurementId } />
			}
      <Seo { ...{ globalData, } } />
      <SetGlobalProps { ...{ globalData } } />
      <HomepageScrollingContent { ...{ items: globalData?.homepage, } } />
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