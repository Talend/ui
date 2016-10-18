import React from 'react';

import { asNumber } from 'react-jsonschema-form/lib/utils';

import Input from './Input';

const InputNumber = props => (
	<Input
		{...props}
		type="number"
		onChange={(val) => props.onChange(asNumber(val))}
	/>
);

InputNumber.propTypes = {
	onChange: React.PropTypes.func,
};

export default InputNumber;
