import { useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import MuxVideoPlayer from '../MuxVideoPlayer';
import getImageUrl from '@/utils/getImageUrl';

const ArchiveItem = ({ item, activeProjectIndex, setActiveProjectIndex, index, }) => {
	const { windowWidth, } = useSiteGlobals();
	const [hovered, setHovered] = useState(false);
	
	if (!item) return null;
	
	return (
		<button
			className='grid grid-cols-3 sm:grid-cols-4 gap-x-4 w-full px-2 !cursor-pointer text-left font-inherit'
			onClick={() => {
				if (activeProjectIndex === index) {
					setActiveProjectIndex(null);
				} else {
					setActiveProjectIndex(index);
				}
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				color: hovered || activeProjectIndex === index ? 'hotpink' : undefined,
			}}
		>
			{
				windowWidth < 768 ?
					<h3 className='col-span-2 sm:col-span-1'>{item.title}{item.client?.length > 0 ? `, ${item.client}` : ''}{item.agency ? ` (via ${item.agency})` : ''}</h3>
					:
					<h3 className='col-span-1'>{item.title}</h3>
			}
			{
				windowWidth >= 768 &&
				<p className='col-span-2 sm:col-span-1'>{item.client}</p>
			}
			{
				windowWidth >= 768 &&
				<p>{item.agency}</p>
			}
			<div className='flex justify-between gap-4 pr-4'>
				<p>{item.year}</p>
				<span className='block'>
					{activeProjectIndex === index ? '–' : '+'}
				</span>
			</div>

			{
				activeProjectIndex === index &&
				<div className='pl-4 w-full col-span-3 md:col-span-4'>
					{
						item.type?.length > 0 &&
						<p className='grid grid-cols-4 sm:block gap-4'>
							<span className='col-span-1 sm:col-span-1 max-sm:block inline-block sm:min-w-24'>type: </span>
							<span className='col-span-3 sm:col-span-3 max-sm:block inline-block'>{item.type}</span>
						</p>
					}
					{
						item.tools?.length > 0 &&
						<p className='grid grid-cols-4 sm:block gap-4'>
							<span className='col-span-1 sm:col-span-1 max-sm:block inline-block sm:min-w-24'>tools: </span>
							<span className='col-span-3 sm:col-span-3 max-sm:block inline-block'>{item.tools}</span>
						</p>
					}
					{
						item.role?.length > 0 &&
						<p className='grid grid-cols-4 sm:block gap-4'>
							<span className='col-span-1 sm:col-span-1 max-sm:block inline-block sm:min-w-24'>role: </span>
							<span className='col-span-3 sm:col-span-3 max-sm:block inline-block'>{item.role}</span>
						</p>
					}
					{
						item.credits?.length > 0 &&
						<p className='grid grid-cols-4 sm:block gap-4'>
							<span className='col-span-1 sm:col-span-1 max-sm:block inline-block sm:min-w-24'>credits: </span>
							<span className='col-span-3 sm:col-span-3 max-sm:block inline-block'>{item.credits}</span>
						</p>
						}
						{
							item?.video?.hlsUrl && item?.thumbnailTypeIsVideo ?
							<div className='w-full aspect-video relative'>
								<MuxVideoPlayer
									value={item?.video}
								/>
							</div>
								:
								item?.image?.asset?.url &&
								<div className='w-full aspect-video'>
									<img
										src={getImageUrl({ source: item?.image, width: 2500 })}
										alt={item.title}
										fill
									/>
								</div>
					}	
				</div>
			}
		</button>
	)
};

export default ArchiveItem;