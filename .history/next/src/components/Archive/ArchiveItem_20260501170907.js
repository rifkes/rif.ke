import { useState } from "react";

const ArchiveItem = ({ item }) => {
	const [ expanded, setExpanded ] = useState(false);
	return (
		<div className='grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-x-4 mb-4'>
			<h3>{item.title}</h3>
			<p>{item.client}</p>
			<p>{item.agency}</p>
			<p>{item.year}</p>

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