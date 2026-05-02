import React, { useState, useEffect } from 'react';

const ProjectArchiveInput = ({ document, path, value, type, }) => {
	return (
		<div>
			<style>
				{
					`
					header {
						font-weight: bold;
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
						width: 100%;
						border-bottom: 1px solid black;
					}
					div {
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
						width: 100%;
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