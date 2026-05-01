import Seo from '@/utils/Seo';
import getGlobalProps from '@/utils/getGlobalProps';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import SetGlobalProps from '@/utils/SetGlobalProps';
import client from '@/hooks/useSanityQuery';
import { ARCHIVE } from '@/fragments/archive';
import Archive from '@/components/Archive/Archive';

export default function Info({ globalData, archiveData, }) {

	const { siteGlobals, windowHeight, } = useSiteGlobals();
	
	// // this updates all items from JSON
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
      className='fixed top-0 left-0 w-screen h-screen overflow-y-scroll pb-12'
			style={{
				height: `${ windowHeight }px`,
      } }
		>
			<Archive archiveData={ archiveData?.items } />
			<div className='my-4 px-2'>
				<h2 className='uppercase mb-2'>Press and Awards</h2>
				<ul className='list-none'>
					{
						archiveData.pressAndAwards?.map((item, index) => (
							<li className='' key={ index }>
								<p className='text-pretty'>{item.publication}{ item.title ? `, ${item.title}` : '' }{ item.year ? `, ${item.year}` : '' }</p>
							</li>
						))
					}
				</ul>
			</div>
			<div className='my-4 px-2'>
				<h2 className='uppercase mb-2'>Engagements</h2>
				<ul className='list-none'>
					{
						archiveData.engagements?.map((item, index) => (
							<li className='' key={ index }>
								<p className='text-pretty'>{item.title}{ item.year ? `, ${item.year}` : '' }{ item.type ? `, ${item.type}` : '' }{ item.organiser ? `, organised by ${item.organiser}` : '' }{ item.collaborators ? `, with ${item.collaborators}` : '' }</p>
							</li>
						))
					}
				</ul>
			</div>
			<div className='my-4 px-2'>
				<h2 className='uppercase mb-2'>Teaching</h2>
				<ul className='list-none'>
					{
						archiveData.teaching?.map((item, index) => (
							<li className='' key={ index }>
								<p className='text-pretty'>{item.institution}{item.course ? `, ${item.course}` : ''}{item.year ? `, ${item.year}` : ''}{ item.role ? `, ${item.role}` : '' }{ item.collaborators ? `, with ${item.collaborators}` : '' }</p>
							</li>
						))
					}
				</ul>
			</div>
			{
				globalData?.settings?.gaMeasurementId &&
				<GoogleAnalytics trackPageViews gaMeasurementId={ globalData.settings.gaMeasurementId } />
			}
      <Seo { ...{ globalData, } } />
			<SetGlobalProps {...{ globalData, }} />
			<div className='fixed bottom-0 left-0 w-screen h-12 bg-white z-10'/>
			<div className='fixed top-0 left-0 w-screen h-12 bg-white z-10'/>
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