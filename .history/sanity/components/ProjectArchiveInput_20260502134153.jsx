import React, { useMemo, useState, } from 'react';
import { set } from 'sanity';
import ProjectArchiveItemInput from './ProjectArchiveItemInput';

const ProjectArchiveInput = (props) => {

	const { value, onChange, onItemExpand, members, renderDefault, renderItem, } = props;

	const [expandedIndex, setExpandedIndex] = useState(null);
	const [ search, setSearch ] = useState('');

	const setValue = (index, itemValue) => {
		const newValues = [...value];
		newValues[index] = itemValue;
		onChange(set(newValues));
	}

	const removeItem = (index) => {
		const newValues = [...value];
		newValues.splice(index, 1);
		onChange(set(newValues));
	}

	const fields = [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'client',
			title: 'Client',
			type: 'string',
		},
		{
			name: 'year',
			title: 'Year',
			type: 'number',
		},
		{
			name: 'type',
			title: 'Type',
			type: 'string',
		},
		{
			name: 'status',
			title: 'Status',
			type: 'string',
		},
		{
			name: 'hidden',
			title: 'Hidden',
			type: 'boolean',
		},
		{
			name: 'thumbnailTypeIsVideo',
			title: 'Thumbnail Type is Video',
			type: 'boolean',
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
		},
		{
			name: 'video',
			title: 'Video',
			type: 'mux.video',
		},
		{
			name: 'tools',
			title: 'Tools',
			type: 'string',
		},
		{
			name: 'link',
			title: 'Link',
			type: 'string',
		},
		{
			name: 'agency',
			title: 'Agency',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 2,
		},
		{
			name: 'role',
			title: 'Role',
			type: 'string',
		},
		{
			name: 'credits',
			title: 'Credits',
			type: 'string',
		},
		{
			name: 'url',
			title: 'URL',
			type: 'url',
		},
	];

	return (
		<div>
			<style>
				{
					`
					.table-container {
						width: 100%;
						font-size: 11px;
					}

					.table-container * {
						box-sizing: border-box;
						font-size: 11px;
					}

					.item-header {
						width: 100%;
						text-align: left;
						background-color: transparent;
						border: none;
						padding: 0;
						margin: 0;
						cursor: pointer;
					}

					.item-header:hover {
						background-color: #f0f0f0;
					}

					.item-container:nth-child(even) {
						background-color: #f0f0f0;
					}
					
					.table-row {
						display: grid;
						// grid-template-columns: ${fields.map((field) => `1fr`).join(' ')};
						grid-template-columns: 1fr 1fr 1fr;
						gap: 0.5rem;
						padding: 0.5rem 0;
						width: 100%;
						margin-bottom: 0.5rem;
					}
					.table-row:nth-child(even) {
						background-color: #f0f0f0;
					}
					.table-cell {
						column-span: 1;
					}
					.table-cell input:not([type="checkbox"]) {
						width: 100%;
						border: none;
						border-bottom: 1px solid black;
						background-color: transparent;
					}
					.table-cell input:not([type="checkbox"])::placeholder {
						color: #ee88ee;
					}

					.table-cell label {
						font-size: 11px;
						font-weight: bold;
					}
					`
				}
			</style>

			<button onClick={() => {
				const newValues = [...value];
				for (let i = 0; i < newValues.length; i++) {
					newValues[i].video = null;
				}
				onChange(set(newValues));
			}}>Reset videos</button>

			<div className='search-container'>
				<input
					type='text'
					placeholder='Search'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button onClick={() => setSearch('')}>Clear</button>
			</div>

			<div className='table-container'>
			{
					value?.map((item, index) => (
					(item.title?.toLowerCase().includes(search?.toLowerCase()) || item.client?.toLowerCase().includes(search?.toLowerCase()) || item.year?.toString().includes(search) || item.agency?.toLowerCase().includes(search?.toLowerCase()) || item.type?.toLowerCase().includes(search?.toLowerCase()) || item.status?.toLowerCase().includes(search?.toLowerCase()) || item.hidden?.toString().includes(search) || item.tools?.toLowerCase().includes(search?.toLowerCase()) || item.link?.toLowerCase().includes(search?.toLowerCase()) || item.description?.toLowerCase().includes(search?.toLowerCase()) || item.role?.toLowerCase().includes(search?.toLowerCase()) || item.credits?.toLowerCase().includes(search?.toLowerCase()) || item.url?.toLowerCase().includes(search?.toLowerCase())) &&
					<ProjectArchiveItemInput
						key={index}
						{ ...props }
						fields={fields}
						item={item}
						index={index}
						setValue={setValue}
						expandedIndex={expandedIndex}
						setExpandedIndex={setExpandedIndex}
						removeItem={removeItem}
						onItemExpand={onItemExpand}
						members={members}
						member={members?.find(m => m.key === item._key)}
						renderItem={props.renderItem}
						renderPreview={props.renderPreview}
						renderField={props.renderField}
						renderInput={props.renderInput}
					/>
				))
				}
				<button className='add-item-button' onClick={() => onChange(set([...value, {
					_key: crypto.randomUUID(),
					_type: 'item',
					title: '',
					client: '',
					year: new Date().getFullYear(),
					agency: '',
					type: '',
					status: '',
					hidden: false,
					thumbnailTypeIsVideo: false,
					image: {},
					video: {},
					tools: '',
					link: '',
					description: '',
					role: '',
					credits: '',
				}]))}>Add Item</button>
			</div>
		</div>
	)
}

export default ProjectArchiveInput;