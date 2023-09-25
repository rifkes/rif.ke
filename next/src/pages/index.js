import HomepageScrollingContent from '@/components/HomepageScrollingContent';
import HomepageSlideshow from '@/components/HomepageSlideshow';
import SetGlobalProps from '@/utils/SetGlobalProps';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getGlobalProps from '@/utils/getGlobalProps';
import { useMemo } from 'react';

export default function Home({ globalData }) {

  const { isTouchscreen, siteGlobals } = useSiteGlobals();

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

  return (
    <>
      <SetGlobalProps { ...{ globalData } } />
      {
        isTouchscreen === true ?
          <HomepageScrollingContent { ...{ items } } /> :
          <HomepageScrollingContent { ...{ items } } />
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