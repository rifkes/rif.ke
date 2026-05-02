import React from 'react';

const ProjectArchiveItemInput = ({ fields, item, index, setValue, removeItem, expandedIndex, setExpandedIndex, onItemExpand, members, member, renderInput, }) => {


console.log('member keys:', Object.keys(member));
console.log('member.schemaType:', member?.schemaType);
console.log('member.item?.schemaType:', member?.item?.schemaType);

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
							<div key={fieldIndex} className='table-cell'>
								{
									field.type === 'image' ?
										<>
											<div>
												<label>{field.title}:</label>
												
											</div>
										</>
										:
										field.type === 'mux.video' ?
											<div>
												<label>{field.title}:</label>
													{/* <div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>
														{item[field.name]?.asset?._ref ?
															'✅ Video set' : 'No video set'
													}
													</div>
													<button
													onClick={() => {
														onItemExpand([{ _key: members[index].key }])
													}}
												>
													{item[field.name]?.asset?._ref ?
														'Edit video ↗':
														'Upload video ↗'
													}
													</button> */}
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
						<div className='table-cell'>
							<button className='remove-item-button' onClick={() => removeItem(index)}>Remove</button>
						</div>
				</div>
			}
		</div>
	);
}

export default ProjectArchiveItemInput;