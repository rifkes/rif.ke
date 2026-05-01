const ArchiveItem = ({ item }) => {
	return (
		<div className='grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-x-4 mb-4'>
			<h3>title: {item.title}</h3>
			<p>client: {item.client}</p>
			<p>agency: {item.agency}</p>
			<p>type: {item.type}</p>
			<p>year: {item.year}</p>
			<p>tools: {item.tools}</p>
			<p>role: {item.role}</p>
			<p>credits: {item.credits}</p>
		</div>
	)
};

export default ArchiveItem;