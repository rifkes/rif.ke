import HomepageScrollingContent from '@/components/HomepageScrollingContent';
import HomepageSlideshow from '@/components/HomepageSlideshow';
import SetGlobalProps from '@/utils/SetGlobalProps';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getGlobalProps from '@/utils/getGlobalProps';

export default function Home({ globalData }) {

  const { isTouchscreen, siteGlobals } = useSiteGlobals();

  return (
    <>
      <SetGlobalProps { ...{ globalData } } />
      {
        isTouchscreen === true ?
          <HomepageSlideshow /> :
          <HomepageScrollingContent />
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