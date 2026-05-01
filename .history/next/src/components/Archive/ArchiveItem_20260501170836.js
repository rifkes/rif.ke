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
					<p>type: {item.type}</p>
					<p>tools: {item.tools}</p>
					<p>role: {item.role}</p>
					<p>credits: {item.credits}</p>
				</div>
			}
		</div>
	)
};

export default ArchiveItem;