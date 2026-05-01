const ArchiveItem = ({ item }) => {
	return (
		<div>
			<h3>{item.title}</h3>
			<p>{item.type}</p>
			<p>{item.year}</p>
		</div>
	)
}

export default ArchiveItem;