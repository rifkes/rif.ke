import HomepageScrollingContent from '@/components/HomepageScrollingContent';
import { HOMEPAGE } from '@/fragments/homePage';
import Seo from '@/utils/Seo';
import SetGlobalProps from '@/utils/SetGlobalProps';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getGlobalProps from '@/utils/getGlobalProps';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useMemo } from 'react';

export default function Home({ globalData, items }) {

  return (
    <>
			{
				globalData?.settings?.gaMeasurementId &&
				<GoogleAnalytics trackPageViews gaMeasurementId={ globalData.settings.gaMeasurementId } />
			}
      <Seo { ...{ globalData, } } />
      <SetGlobalProps { ...{ globalData } } />
      <HomepageScrollingContent { ...{ items, } } />
    </>
  )
}

export async function getStaticProps() {

	const globalData = await getGlobalProps();
	const items = await client.fetch(HOMEPAGE, {});

  return {
    props: {
      globalData: globalData,
      items: items,
    }
  }
}