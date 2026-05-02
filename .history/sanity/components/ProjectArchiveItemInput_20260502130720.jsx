import React from 'react';

import SanityImageUpload from './SanityImageUpload'

const ProjectArchiveItemInput = (props) => {
	const { fields, item, index, setValue, removeItem, expandedIndex, setExpandedIndex, onItemExpand, members, member, } = props;

	console.log(props.renderDefault.toString())

	return (
		<div className='item-container'>
			<button className='item-header' onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
				{
					item?.title?.length > 0 ?
						<p>{item.title}{item.client ? `, ${item.client}` : ''}{item.year ? `, ${item.year}` : ''}{item.agency ? ` (via ${item.agency})` : ''}</p>
						:
						<p>New Item</p>
				}
			</button>
			{
				expandedIndex === index &&
				<div className='table-row'>
					{
						fields.map((field, fieldIndex) => (
							field.type === 'image' ?
								<div key={fieldIndex} className='table-cell table-cell-2'>
									<label>{field.title}:</label>
									<SanityImageUpload
										value={item[field.name]}
										onChange={(val) => setValue(index, { ...item, [field.name]: val })}
									/>
								</div>
										:
										field.type === 'mux.video' ?
											<div key={fieldIndex} className='table-cell table-cell-2'>
												<label>{field.title}:</label>
											</div>
											:
											field.type === 'boolean' ?
												<div key={fieldIndex} className='table-cell'>
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
											</div>
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
						<div className='table-cell'>
							<button className='remove-item-button' onClick={() => removeItem(index)}>Remove</button>
						</div>
				</div>
			}
		</div>
	);
}

export default ProjectArchiveItemInput;