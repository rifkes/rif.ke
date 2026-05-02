import { useEffect, useMemo, useState } from 'react';
import Button from './Button';
import ArchiveItem from './ArchiveItem';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const Archive = ({ archiveData, scrollContainerRef, }) => {

	const { windowWidth, } = useSiteGlobals();

	const [showFilters, setShowFilters] = useState(true);
	const [ activeProjectIndex, setActiveProjectIndex ] = useState(null);

	useEffect(() => {
		if (windowWidth < 1200) {
			setShowFilters(false);
		} else {
			setShowFilters(true);
		}
	}, [windowWidth,]);

	const [types, setTypes] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [ searchQuery, setSearchQuery ] = useState('');
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

		if (archiveData?.length > 0) {
			for (let i = 0; i < archiveData?.length; i++) {
				const item = archiveData[i];
				if (!item) continue;
				item?.type?.length > 0 && arrayTypes.push(item.type);
				item?.status?.length > 0 && arrayStatuses.push(item.status);
				item?.year?.length > 0 && arrayYears.push(item.year);
				arrayYears.push(item.year);
			}
		
			setTypes([...new Set(arrayTypes)]);
			setStatuses([...new Set(arrayStatuses)]);
			setYears([...new Set(arrayYears)]);
		}
	}, [archiveData,]);

	const filteredArchiveData = useMemo(() => {
		let filteredData = [];

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

		if (searchQuery?.length > 0) {
			filteredData = filteredData?.filter((item) => {
				if (!item) return false;
				return item.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item.client?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item.agency?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item.type?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item.status?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item.year?.toString()?.includes(searchQuery) || item.tools?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item.role?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item.credits?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item.url?.toLowerCase()?.includes(searchQuery?.toLowerCase());
			});
		}

		if (orderBy === 'year') {
			filteredData.sort((a, b) => a.year - b.year);
		} else if (orderBy === 'type') {
			filteredData.sort((a, b) => a.type.localeCompare(b.type));
		} else if (orderBy === 'status') {
			filteredData.sort((a, b) => a.status.localeCompare(b.status));
		} else if (orderBy === 'title') {
			filteredData.sort((a, b) => a.title.localeCompare(b.title));
		} else if (orderBy === 'client') {
			filteredData.sort((a, b) => a.client.localeCompare(b.client));
		} else if (orderBy === 'agency') {
			filteredData.sort((a, b) => a.agency.localeCompare(b.agency));
		} else {
			filteredData.sort((a, b) => a.year - b.year);
		}

		if (orderDirection === 'desc') {
			filteredData.reverse();
		}
		
		return filteredData;
		
	}, [activeTypes, activeStatuses, activeYears, archiveData, orderBy, orderDirection,]);

	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollTop = 0;
		}
	}, [scrollContainerRef, filteredArchiveData?.length, orderBy, orderDirection, activeTypes, activeStatuses, activeYears, ]);

	return (
		<div className='pb-12'>
			<div className='sticky top-0 bg-white z-10 pt-12 px-2'>
				{
					showFilters &&
					<>
						<div className='flex justify-start items-center mb-2 gap-2'>
						<input
							type='text'
							placeholder='Search'
							value={searchQuery}
							className='border-b border-black outline-none'
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
							{
								searchQuery?.length > 0 &&
								<button
									className='border border-black px-1 hover:bg-black hover:text-white cursor-pointer'
									onClick={() => setSearchQuery('')}
								>clear</button>
							}
							</div>
						<div className='flex flex-wrap gap-2 mb-2'>
							{
								types?.map((type, index) => (
									<Button
										value={type}
										key={index}
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
								years?.map((year, index) => (
									<Button
										key={index}
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
				<div className='flex justify-start items-start gap-4'>
					<button
						className='border border-black px-1 hover:bg-black hover:text-white cursor-pointer'
						onClick={() => setShowFilters(!showFilters)}
					>{showFilters ? 'hide' : 'show'} filters</button>
					{
						!showFilters &&
						<p className=''>
							{
								activeTypes?.length > 0 &&
								<span className='inline-block'>{activeTypes.join(', ')}</span>
							}
							{
								activeYears?.length > 0 &&
								<span className='inline-block ml-4'>{activeYears.join(', ')}</span>
							}
						</p>
					}
				</div>
				{
					<div className='grid grid-cols-3 sm:grid-cols-4 gap-4 w-full top-0 bg-white z-10 pt-4'>

						<button
							className='flex justify-between gap-4 text-left cursor-pointer col-span-2 sm:col-span-1'
							onClick={() => {
								if (orderBy === 'title') {
									setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
								} else {
									setOrderBy('title');
									setOrderDirection('desc');
								}
							}}
						>
							{
								windowWidth >= 768 ? 'title' : 'title, client'
							}
						</button>
							
						{
							windowWidth >= 768 &&
							<button
								className='flex justify-between gap-4 text-left cursor-pointer col-span-2 sm:col-span-1'
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
							windowWidth >= 768 &&
							<button
								className='flex justify-between gap-4 text-left cursor-pointer'
								onClick={() => {
									if (orderBy === 'agency') {
										setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
									} else {
										setOrderBy('agency');
										setOrderDirection('desc');
									}
								}}
							>
								agency
							</button>
						}
						<button
							className='flex justify-between gap-4 text-left cursor-pointer'
							onClick={() => {
								if (orderBy === 'year') {
									setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
								} else {
									setOrderBy('year');
									setOrderDirection('desc');
								}
							}}
						>
							year
						</button>
					</div>
				}
			</div>
			<div className='flex flex-col mt-4'>
				{
					filteredArchiveData?.map((item, index) => (
						<ArchiveItem key={index} item={item} activeProjectIndex={activeProjectIndex} setActiveProjectIndex={setActiveProjectIndex} index={index} />
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