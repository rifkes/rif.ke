import React, { useState, useEffect } from 'react';


const ProjectArchiveInput = ({ document, path, value, type, onChange, }) => {

	console.log(onChange)

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
						/* grid-template-columns: ${fields.map((field) => `1fr`).join(' ')}; */
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
						// grid-template-columns: ${fields.map((field) => `1fr`).join(' ')};
						grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
					`
				}
			</style>
			<header className='table-header'>
				{
					fields.map((field) => (
						<p key={field.name}>{field.title}</p>
					))
				}
			</header>
			{
				value?.map((item, index) => (
					<div key={index} className='table-row'>
						{
							fields.map((field) => (
								<div key={field.name} className='table-cell'>
									{
										field.type === 'image' ?
											<>
												{
													item[field.name] &&
													<img src={item[field.name]} alt={''} />
												}
											</>
											:
											field.type === 'mux.video' ?
												<div>
													{
														item[field.name] &&
														<MuxVideoPlayer value={item[field.name]} />
													}
												</div>
												:
												field.type === 'boolean' ?
													<input type="checkbox" checked={item[field.name]}
														onChange={(e) => {
															setValue(index, { ...item, [field.name]: e.target.checked });
														}} />
													:
												<input type={field.type} value={item[field.name]}
													placeholder={field.title}
													onChange={(e) => {
													setValue(index, { ...item, [field.name]: e.target.value });
												}} />
									}
								</div>
							))
						}
					</div>
				))
			}
		</div>
	)
}

export default ProjectArchiveInput;