import React from 'react';
import Input from '../Input';

function Datalist({ id, values, ...rest }) {
	const listId = `${id}-datalist`
	return (
		<>
			<Input list={listId} id={id} {...rest}  />
			{values && (
				<datalist id={listId}>
					{values.map((value, index) => (
						<option key={index} value={value} />
					))}
				</datalist>
			)}
		</>
	);
}

export default Datalist;
