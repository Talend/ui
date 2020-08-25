import React from 'react';
import Field from '../Field';

export const Datalist = ({ id = Math.round(Math.random() * 1e5).toString(), values, ...rest }) => {
	const listId = `datalist-${id}`;
	return (
		<>
			{' '}
			<Field {...rest} id={id} list={listId} />
			{values && (
				<datalist id={listId}>
					{values.map((value, index) => (
						<option key={index} value={value} />
					))}
				</datalist>
			)}
		</>
	);
};

export default Datalist;
