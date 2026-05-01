import { useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const ArchiveItem = ({ item }) => {
	const { windowWidth, } = useSiteGlobals();
	const [expanded, setExpanded] = useState(false);
	const [ hovered, setHovered] = useState(false);
	
	return (
		<button
			className='grid grid-cols-3 md:grid-cols-4 gap-x-4 w-full px-2 !cursor-pointer text-left font-inherit'
			onClick={() => setExpanded(!expanded)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				color: hovered || expanded ? 'hotpink' : undefined,
			}}
		>
			{
				windowWidth < 1200 ?
					<h3 className='col-span-2 sm:col-span-1'>{item.title}{item.client?.length > 0 ? `, ${item.client}` : ''}{item.agency ? ` (via ${item.agency})` : ''}</h3>
					:
					<h3 className='col-span-1'>{item.title}</h3>
			}
			{
				windowWidth >= 1200 &&
				<p className='col-span-2 sm:col-span-1'>{item.client}</p>
			}
			{
				windowWidth >= 1200 &&
				<p>{item.agency}</p>
			}
			<div className='flex justify-between gap-4 pr-4'>
				<p>{item.year}</p>
				<span className='block'>
					{expanded ? '–' : '+'}
				</span>
			</div>

			{
				expanded &&
				<div className='pl-8 w-full col-span-3 md:col-span-4'>
					{
						item.type?.length > 0 &&
						<p>type: {item.type}</p>
					}
					{
						item.tools?.length > 0 &&
						<p>tools: {item.tools}</p>
					}
					{
						item.role?.length > 0 &&
						<p>role: {item.role}</p>
					}
					{
						item.credits?.length > 0 &&
						<p>credits: {item.credits}</p>
					}
				</div>
			}
		</button>
	)
};

export default ArchiveItem;