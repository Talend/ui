import React from 'react';

import Input from './Input';

const InputPassword = props => (
	<Input
		{...props}
		type="password"
	/>
);

InputPassword.propTypes = {
	onChange: React.PropTypes.func,
};

export default InputPassword;
