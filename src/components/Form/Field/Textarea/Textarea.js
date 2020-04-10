import React from 'react';
import Field from '../Field';

function Textarea({ children, ...rest }) {
	return (
		<Field {...rest} as="textarea">
			{children}
		</Field>
	);
}

export default Textarea;
