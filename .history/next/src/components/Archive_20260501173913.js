import { useEffect, useMemo, useState } from 'react';
import Button from './Archive/Button';
import ArchiveItem from './Archive/ArchiveItem';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const Archive = ({ archiveData, }) => {

	const { windowWidth, } = useSiteGlobals();

	const [showFilters, setShowFilters] = useState(true);

	useEffect(() => {
		if (windowWidth < 1200) {
			setShowFilters(false);
		} else {
			setShowFilters(true);
		}
	}, [windowWidth,]);

	const [types, setTypes] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [years, setYears] = useState([]);
	
	const [activeTypes, setActiveTypes] = useState([]);
	const [activeStatuses, setActiveStatuses] = useState([]);
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
		<div className='pb-12'>
			<div className='sticky top-0 bg-white z-10 pt-12 px-2'>
				{
					showFilters &&
					<>
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
						<div className='flex flex-wrap gap-2 mb-6'>
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
					</>
				}
				<button
					className='border border-black px-1 hover:bg-black hover:text-white cursor-pointer'
					onClick={() => setShowFilters(!showFilters)}
				>{showFilters ? 'hide' : 'show'} filters</button>
				{
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full top-0 bg-white z-10 pt-4'>
						<div className='flex justify-between gap-4'>
							{
								windowWidth >= 1200 ?
								<p>title</p>
									:
								<p>title, client</p>
							}
							<button
								onClick={() => {
									if (orderBy === 'title') {
										setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
									} else {
										setOrderBy('title');
										setOrderDirection('desc');
									}
								}}>{orderBy === 'title' ? '–' : '+'}</button>
						</div>
							
						{
							windowWidth >= 1200 &&
							<button
								className='flex justify-between gap-4 text-left cursor-pointer'
								onClick={() => {
									if (orderBy === 'client') {
										setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
									} else {
										setOrderBy('client');
										setOrderDirection('desc');
									}
								}}
							>
								client
							</button>
						}
						{
							windowWidth >= 1200 &&
							<div className='flex justify-between gap-4'>
								<p>agency</p>
								<button
									onClick={() => {
										if (orderBy === 'agency') {
											setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
										} else {
											setOrderBy('agency');
											setOrderDirection('desc');
										}
									}}>{orderBy === 'agency' ? '–' : '+'}</button>
							</div>
						}
						<div className='flex justify-between gap-4'>
							<p>year</p>
							<button
								onClick={() => {
									if (orderBy === 'year') {
										setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
									} else {
										setOrderBy('year');
										setOrderDirection('desc');
									}
								}}
							>{orderBy === 'year' ? '–' : '+'}</button>
						</div>
					</div>
				}
			</div>
			<div className='flex flex-col mt-4'>
				{
					filteredArchiveData?.map((item, index) => (
						<ArchiveItem key={index} item={item} />
					))
				}
			</div>
			<div className='my-2 px-2'>
				{ filteredArchiveData?.length } item{ filteredArchiveData?.length > 1 ? 's' : '' }
			</div>
    </div>
  )
}

export default Archive;