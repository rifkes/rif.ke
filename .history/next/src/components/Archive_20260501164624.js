import { useMemo } from 'react';

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
			arrayTypes.push(item.type);
			arrayStatuses.push(item.status);
			arrayYears.push(item.year);
		}
		
		setTypes(new Set(arrayTypes));
		setStatuses(new Set(arrayStatuses));
		setYears(new Set(arrayYears));
	}, [archiveData,]);

	const filteredArchiveData = useMemo(() => {
		
		
		
	}, [activeTypes, activeStatuses, activeYears]);

  return (
    <div>
			{
				types?.map((type) => (
					<button key={type} onClick={() => setActiveTypes([...activeTypes, type])}>
						{type}
					</button>
				))
			}
			{
				statuses?.map((status) => (
					<button key={status} onClick={() => setActiveStatuses([...activeStatuses, status])}>
						{status}
					</button>
				))
			}
			{
				years?.map((year) => (
					<button key={year} onClick={() => setActiveYears([...activeYears, year])}>
						{year}
					</button>
				))
			}
			{
				filteredArchiveData?.map((item) => (
					<div key={item._key}>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
						<p>{item.year}</p>
					</div>
				))
			}
    </div>
  )
}

export default Archive;