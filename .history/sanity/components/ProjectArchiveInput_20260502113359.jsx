import React, { useState, useEffect } from 'react';

const ProjectArchiveInput = ({ document, path, value, type, }) => {
	return (
		<div>
			<header
				style={{ 
					fontWeight: 'bold',
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
				}}
			>
				<p>Title</p>
				<p>Client</p>
				<p>Year</p>
				<p>Type</p>
				<p>Status</p>
				<p>Hidden</p>
			</header>
			{
				value?.map((item, index) => (
					<div key={index}>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
							}}
						>
							<div>
								<input type="text" value={ item.title } onChange={ (e) => {
									setValue(index, { ...item, title: e.target.value });
								}} />
							</div>
							<div>
								<input type="text" value={ item.client } onChange={ (e) => {
									setValue(index, { ...item, client: e.target.value });
								}} />
							</div>
							<div>
								<input type="number" value={item.year} onChange={(e) => {
									setValue(index, { ...item, year: e.target.value });
								}} />
							</div>
							<div>
								<input type="text" value={ item.type } onChange={ (e) => {
									setValue(index, { ...item, type: e.target.value });
								}} />
							</div>
							<div>
								<input type="text" value={ item.status } onChange={ (e) => {
									setValue(index, { ...item, status: e.target.value });
								}} />
							</div>
							<div>
								<input type="checkbox" checked={ item.hidden } onChange={ (e) => {
									setValue(index, { ...item, hidden: e.target.checked });
								}} />
							</div>
						</div>
					</div>
				))
			}
		</div>
	)
}

export default ProjectArchiveInput;