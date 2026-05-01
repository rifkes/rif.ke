import Seo from '@/utils/Seo';
import getGlobalProps from '@/utils/getGlobalProps';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import PortableTextBlocks from '@/components/blocks/PortableTextBlocks';
import SetGlobalProps from '@/utils/SetGlobalProps';
import client from '@/hooks/useSanityQuery';
import { useEffect } from 'react';
import { ARCHIVE } from '@/fragments/archive';
import Archive from '@/components/Archive';

export default function Info({ globalData, archiveData, }) {

	const { siteGlobals, windowHeight, } = useSiteGlobals();
	
	// this updates all items from JSON
	// useEffect(() => {
	// 	const handleClick = (e) => {
	// 		fetch('/api/update-archive', {
	// 			method: 'POST',
	// 			body: JSON.stringify({
	// 				timestamp: new Date().toISOString(),
	// 			}),
	// 		})
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log(data);
	// 		})
	// 		.catch(error => {
	// 			console.error('Error:', error);
	// 		});
	// 	};
	// 	window.addEventListener('click', handleClick);
	// 	return () => window.removeEventListener('click', handleClick);
	// }, []);

	return (
    <div
      className='fixed top-0 left-0 w-screen h-screen overflow-y-scroll'
			style={{
				height: `${ windowHeight }px`,
        // maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))',
        // mask: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))',
        // WebkitMask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 10px, rgba(255, 255, 255, 1) 40px, rgba(255, 255, 255, 1) calc(100% - 40px), rgba(0, 0, 0, 0) calc(100% - 10px))',
      } }
		>
			<Archive archiveData={ archiveData } />
      <div className=' py-12 px-2'>
        {
          siteGlobals?.settings?.info &&
          siteGlobals.settings.info.map((item, index) => (
            <div className='mt-2 mb-2' key={ index }>
              {
                item.title?.length > 0 &&
                <h3 className='inline'>{ item.title }: </h3>
              }
              {
                item.text?.length > 0 &&
                <div className='inline children-inline'>
                  <PortableTextBlocks value={ item.text } />
                </div>
              }
            </div>
          ))
        }
      </div>
			{
				globalData?.settings?.gaMeasurementId &&
				<GoogleAnalytics trackPageViews gaMeasurementId={ globalData.settings.gaMeasurementId } />
			}
      <Seo { ...{ globalData, } } />
			<SetGlobalProps {...{ globalData, }} />
			<div className='fixed bottom-0 left-0 w-screen h-12 bg-white z-10'></div>
    </div>
  )
}

export async function getStaticProps() {

	const globalData = await getGlobalProps();
	const archiveData = await client.fetch(ARCHIVE, {});

  return {
    props: {
      globalData: globalData,
      archiveData: archiveData,
    }
  }
}