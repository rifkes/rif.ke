import React from 'react';

const ProjectArchiveItemInput = ({ fields, item, index, setValue, expandedIndex, setExpandedIndex, }) => {

	return (
		<div className='item-container'>
			<button className='item-header' onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
				<p>{item.title}{item.client ? `, ${item.client}` : ''}{item.year ? `, ${item.year}` : ''}{item.agency ? ` (via ${item.agency})` : ''}</p>
			</div>
			{
				expandedIndex === index &&
				<div className='table-ro'>
					{
						fields.map((field, fieldIndex) => (
							<div key={fieldIndex} className='table-cell'>
								{
									field.type === 'image' ?
										<>
											<label>{field.title}:</label>
											{
												item[field.name] &&
												<img src={item[field.name]} alt={''} />
											}
										</>
										:
										field.type === 'mux.video' ?
											<div>
												<label>{field.title}:</label>
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
													<label>{field.title}:</label>
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
			}
		</div>
	);
}

export default ProjectArchiveItemInput;