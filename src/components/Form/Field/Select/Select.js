import React from 'react';
import Field from '../Field';

function Select({ children, values, ...rest }) {
	return (
		<Field {...rest} as="select">
			{values
				? values.map((value, index) => (
						<option key={index} value={value}>
							{value}
						</option>
				  ))
				: children}
		</Field>
	);
}

export default Select;
