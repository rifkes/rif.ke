import { useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const ArchiveItem = ({ item }) => {
	const { windowWidth, } = useSiteGlobals();
	const [expanded, setExpanded] = useState(false);
	
	return (
		<div className='grid grid-cols-2 md:grid-cols-4 gap-x-4 mb-4 w-full'>
			{
				windowWidth < 1200 ?
					<h3>{item.title}{item.client?.length > 0 ? `, ${item.client}` : ''}{item.agency ? ` (${item.agency})` : ''}</h3>
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
				<button
					className='cursor-pointer'
					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? '–' : '+'}
				</button>
			</div>

			{
				expanded &&
				<div>
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
		</div>
	)
};

export default ArchiveItem;