import { useEffect, useMemo, useState } from 'react';
import Button from './Archive/Button';
import ArchiveItem from './Archive/ArchiveItem';

const Archive = ({ archiveData, }) => {

	const [types, setTypes] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [years, setYears] = useState([]);
	
	const [ activeTypes, setActiveTypes ] = useState([]);
	const [ activeStatuses, setActiveStatuses ] = useState([]);
	const [activeYears, setActiveYears] = useState([]);
	
	const [orderBy, setOrderBy] = useState('year');
	const [orderDirection, setOrderDirection] = useState('desc');

	useEffect(() => {
		const arrayTypes = [];
		const arrayStatuses = [];
		const arrayYears = [];

		for (let i = 0; i < archiveData?.length; i++) {
			const item = archiveData[i];
			item?.type?.length > 0 && arrayTypes.push(item.type);
			item?.status?.length > 0 && arrayStatuses.push(item.status);
			item?.year?.length > 0 && arrayYears.push(item.year);
			arrayYears.push(item.year);
		}
		
		setTypes([...new Set(arrayTypes)]);
		setStatuses([...new Set(arrayStatuses)]);
		setYears([...new Set(arrayYears)]);
	}, [archiveData,]);

	const filteredArchiveData = useMemo(() => {
		const filteredData = [];

		for (let i = 0; i < archiveData?.length; i++) {
			const item = archiveData[i];
			let hasType = activeTypes?.length > 0 ? false : true;
			let hasStatus = activeStatuses?.length > 0 ? false : true;
			let hasYear = activeYears?.length > 0 ? false : true;

			for (let j = 0; j < activeTypes?.length; j++) {
				if (item.type === activeTypes[j]) {
					hasType = true;
					break;
				}
			}
			for (let j = 0; j < activeStatuses?.length; j++) {
				if (item.status === activeStatuses[j]) {
					hasStatus = true;
					break;
				}
			}
			for (let j = 0; j < activeYears?.length; j++) {
				if (item.year === activeYears[j]) {
					hasYear = true;
					break;
				}
			}
			if (hasType && hasStatus && hasYear) {
				filteredData.push(item);
			}
		}

		if (orderBy === 'year') {
			filteredData.sort((a, b) => a.year - b.year);
		} else if (orderBy === 'type') {
			filteredData.sort((a, b) => a.type.localeCompare(b.type));
		} else if (orderBy === 'status') {
			filteredData.sort((a, b) => a.status.localeCompare(b.status));
		}

		if (orderDirection === 'desc') {
			filteredData.reverse();
		}
		
		return filteredData;
		
	}, [activeTypes, activeStatuses, activeYears, archiveData, orderBy, orderDirection,]);

  return (
		<div>
			<div className='flex flex-wrap gap-2 mb-2'>
				{
					types?.map((type) => (
						<Button
							value={type}
							key={type}
							onClick={() => {
								if (!activeTypes.includes(type)) {
									setActiveTypes([...activeTypes, type])
								} else {
									setActiveTypes(activeTypes.filter((t) => t !== type))
								}
							}}
							active={activeTypes.includes(type)}
						/>
					))
				}
			</div>
			<div className='flex flex-wrap gap-2'>
				{
					years?.map((year) => (
						<Button
							value={year}
							onClick={() => {
								if (!activeYears.includes(year)) {
									setActiveYears([...activeYears, year])
								} else {
									setActiveYears(activeYears.filter((y) => y !== year))
								}
							}}
							active={activeYears.includes(year)}
						/>
					))
				}
			</div>
			<div className='my-2'>
				{ filteredArchiveData?.length } item{ filteredArchiveData?.length > 1 ? 's' : '' }
			</div>
			<div className='flex flex-col gap-2 mt-4'>
				{
					filteredArchiveData?.map((item, index) => (
						<ArchiveItem key={index} item={item} />
					))
				}
			</div>
    </div>
  )
}

export default Archive;