const ArchiveItem = ({ item }) => {
	return (
		<div className='grid grid-cols-4 gap-4'>
			<h3 className='col-span-2'>{item.title}</h3>
			<p>{item.client}</p>
			<p>{item.agency}</p>
			<p>{item.type}</p>
			<p>{item.year}</p>
			<p>{item.tools}</p>
			<p>{item.role}</p>
			<p>{item.credits}</p>
		</div>
	)
};

export default ArchiveItem;