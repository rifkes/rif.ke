import { useState } from "react";

const ArchiveItem = ({ item }) => {
	const [ expanded, setExpanded ] = useState(false);
	return (
		<div className='grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-x-4 mb-4'>
			<h3>title: {item.title}</h3>
			<p>client: {item.client}</p>
			<p>agency: {item.agency}</p>
			<p>year: {item.year}</p>

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