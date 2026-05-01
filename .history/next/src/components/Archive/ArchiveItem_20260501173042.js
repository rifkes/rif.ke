import { useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const ArchiveItem = ({ item }) => {
	const { windowWidth, } = useSiteGlobals();
	const [expanded, setExpanded] = useState(false);
	const [ hovered, setHovered] = useState(false);
	
	return (
		<button
			className='grid grid-cols-2 md:grid-cols-4 gap-x-4 w-full px-2 !cursor-pointer text-left font-inherit'
			onClick={() => setExpanded(!expanded)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				// backgroundColor: hovered || expanded ? 'rgba(0, 0, 0, 0.05)' : undefined,
				// paddingLeft: expanded ? '4rem' : undefined,
				fontFamily: expanded ? 'serif' : undefined,
				fontWeight: expanded ? 400 : undefined,
			}}
		>
			{
				windowWidth < 1200 ?
					<h3>{item.title}{item.client?.length > 0 ? `, ${item.client}` : ''}{item.agency ? ` (via ${item.agency})` : ''}</h3>
					:
					<h3>{item.title}</h3>
			}
			{
				windowWidth >= 1200 &&
				<p>{item.client}</p>
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
				<div className='pl-8'>
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