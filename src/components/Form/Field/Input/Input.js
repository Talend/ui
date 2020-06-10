import React from 'react';
import Field from '../Field';

const Input = React.forwardRef((props, ref) => {
	return <Field as="input" ref={ref} {...props} />;
});

export default Input;
