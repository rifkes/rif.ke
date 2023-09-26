import HomepageScrollingContent from '@/components/HomepageScrollingContent';
import SetGlobalProps from '@/utils/SetGlobalProps';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getGlobalProps from '@/utils/getGlobalProps';
import { useMemo } from 'react';

export default function Home({ globalData }) {

  const { siteGlobals } = useSiteGlobals();

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
      <HomepageScrollingContent { ...{ items } } />
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