import React from 'react';
import Field from '../Field';

function Textarea({ children, ...rest }) {
	return (
		<Field as="textarea" {...rest}>
			{children}
		</Field>
	);
}

export default Textarea;
