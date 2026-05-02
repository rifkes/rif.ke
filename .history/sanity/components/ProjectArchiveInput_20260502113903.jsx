import React, { useState, useEffect } from 'react';


const ProjectArchiveInput = ({ document, path, value, type, }) => {

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
					.table-header {
						font-weight: bold;
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
						width: 100%;
						gap: 0.5rem;
						border-bottom: 1px solid black;
					}
						.table-header p {
							margin: 0;
							font-size: 0.8rem;
						}
					.table-row {
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
						gap: 0.5rem;
						width: 100%;
					}
					.table-cell {
						column-span: 1;
					}
					.table-cell input:not([type="checkbox"]) {
						width: 100%;
						border: none;
						border-bottom: 1px solid black;
					}
					`
				}
			</style>
			<header className='table-header'>
				<p>Title</p>
				<p>Client</p>
				<p>Year</p>
				<p>Type</p>
				<p>Status</p>
				<p>Hidden</p>
			</header>
			{
				value?.map((item, index) => (
					<div key={index} className='table-row'>
						<div className='table-cell'>
							<input type="text" value={ item.title } onChange={ (e) => {
								setValue(index, { ...item, title: e.target.value });
							}} />
						</div>
						<div className='table-cell'>
							<input type="text" value={ item.client } onChange={ (e) => {
								setValue(index, { ...item, client: e.target.value });
							}} />
						</div>
						<div className='table-cell'>
							<input type="number" value={item.year} onChange={(e) => {
								setValue(index, { ...item, year: e.target.value });
							}} />
						</div>
						<div className='table-cell'>
							<input type="text" value={ item.type } onChange={ (e) => {
								setValue(index, { ...item, type: e.target.value });
							}} />
						</div>
						<div className='table-cell'>
							<input type="text" value={ item.status } onChange={ (e) => {
								setValue(index, { ...item, status: e.target.value });
							}} />
						</div>
						<div className='table-cell'>
							<input type="checkbox" checked={ item.hidden } onChange={ (e) => {
								setValue(index, { ...item, hidden: e.target.checked });
							}} />
						</div>
					</div>
				))
			}
		</div>
	)
}

export default ProjectArchiveInput;