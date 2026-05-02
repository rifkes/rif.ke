import React from 'react';

import SanityImageUpload from './SanityImageUpload'
import CustomMuxReference from './CustomMuxReference';

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
							<div
								key={fieldIndex} className='table-cell'
								style={{
									display: (field.type === 'image' && item.thumbnailTypeIsVideo) || (field.type === 'mux.video' && !item.thumbnailTypeIsVideo) ? 'none' : 'block',
									columnSpan: field.type === 'image' || field.type === 'video' ? '2' : '1',
								}}
							>
								{
									field.type === 'image' ?
										<>
											{
												!item.thumbnailTypeIsVideo &&
											<>
											<label>{field.title}:</label>
											<SanityImageUpload
												value={item[field.name]}
												onChange={(val) => setValue(index, { ...item, [field.name]: val })}
												/>
												</>
											}
										</>
										:
										field.type === 'mux.video' ?
											<>
												{
													item.thumbnailTypeIsVideo &&
													<>
														<label>{field.title}:</label>
														<CustomMuxReference
															value={item[field.name]}
															onChange={(val) => setValue(index, { ...item, [field.name]: val })}
														/>
													</>
												}
											</>
											:
											field.type === 'boolean' ?
												<>
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
												</>
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
						))}
				</div>
			}
		</div>
	);
};

export default ProjectArchiveItemInput;