import React from 'react';

const ProjectArchiveItemInput = ({ fields, setValue, }) => {

	return (
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
											// item[field.name] &&
											// <MuxVideoPlayer value={item[field.name]} />
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
	);
}

export default ProjectArchiveItemInput;