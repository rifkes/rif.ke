import React from 'react';

const ProjectArchiveItemInput = ({ fields, item, index, setValue, removeItem, expandedIndex, setExpandedIndex, onItemOpen, onItemClose, }) => {

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
												{item[field.name]?.asset?._ref ? (
													<div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>
														✅ Image set
														<button
															style={{ display: 'block', marginTop: 4 }}
															onClick={() => onItemOpen({_key: item._key})}
														>
															Edit image ↗
														</button>
													</div>
												) : (
													<button onClick={() => onItemOpen({_key: item._key})}>
														Upload image ↗
													</button>
												)}
											</div>
										</>
										:
										field.type === 'mux.video' ?
											<div>
												<label>{field.title}:</label>
													{item[field.name]?.asset?._ref ? (
														<div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>
															✅ Video set
															<button
																style={{ display: 'block', marginTop: 4 }}
															// onClick={() => onItemOpen({_key: item._key})}
															onClick={() => {
																const key = item._key;
  const attempts = [
    [{ _key: key }],
    ['items', { _key: key }],
    [{ _key: key }, 'image'],
  ];
  console.log('trying:', attempts[0]);
  try { onItemOpen(attempts[0]); } catch(e) { console.error('attempt 0 failed:', e); }
															}}
															>
																Edit video ↗
															</button>
														</div>
													) : (
														<button onClick={() => onItemOpen({_key: item._key})}>
															Upload video ↗
														</button>
													)}
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