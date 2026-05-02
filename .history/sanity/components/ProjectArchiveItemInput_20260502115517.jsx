import React from 'react';

const ProjectArchiveItemInput = ({ fields, item, index, setValue, }) => {

	return (
		<div className='table-row'>
			{
				fields.map((field, fieldIndex) => (
					<div key={fieldIndex} className='table-cell'>
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
										<label>{field.title}</label>
										{
											// item[field.name] &&
											// <MuxVideoPlayer value={item[field.name]} />
										}
									</div>
									:
									field.type === 'boolean' ?
										<label>
											<input
												type='checkbox'
												checked={item[field.name]}
												onChange={(e) => {
													setValue(index, { ...item, [field.name]: e.target.checked });
												}}
											/>
											{field.title}
										</label>
										:
										<>
											<label>{field.title}</label>
											<input
												type={field.type}
												value={item[field.name]}
												placeholder={field.title}
												onChange={(e) => {
													setValue(index, { ...item, [field.name]: e.target.value });
												}}
											/>
										</>
						}
					</div>
				))
			}
		</div>
	);
}

export default ProjectArchiveItemInput;