import React, { useState, } from 'react';
import { set } from 'sanity';
import ProjectArchiveItemInput from './ProjectArchiveItemInput';

const ProjectArchiveInput = (props) => {

	const { value, onChange, onItemOpen, onItemClose, } = props;

	const [expandedIndex, setExpandedIndex] = useState(null);
	console.log('onItemOpen:', onItemOpen.toString())
	
	console.log('member[0] path:', props.members[0].path)
console.log('member[0] keys:', Object.keys(props.members[0]))


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
		<>
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
			<div className='table-container'>
			{
				value?.map((item, index) => (
					<ProjectArchiveItemInput
						key={index}
						fields={fields}
						item={item}
						index={index}
						setValue={setValue}
						expandedIndex={expandedIndex}
						setExpandedIndex={setExpandedIndex}
						removeItem={removeItem}
						onItemOpen={onItemOpen}
						onItemClose={onItemClose}
					/>
				))
				}
				<button className='add-item-button' onClick={() => onChange(set([...value, {
					_key: `item-${value.length + 1}`,
					_type: 'item',
					title: '',
					client: '',
					year: '',
					agency: '',
					type: '',
					status: '',
					hidden: false,
					thumbnailTypeIsVideo: false,
					image: '',
					video: '',
					tools: '',
					link: '',
					description: '',
					role: '',
					credits: '',
					url: '',
				}]))}>Add Item</button>
			</div>
		</>
	)
}

export default ProjectArchiveInput;