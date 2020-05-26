import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form/dist/react-hook-form.ie11';
import get from 'lodash/get';

import Input from '../../../widgets/fields/Input';

function RHFInput(props) {
	const { rules = {}, ...rest } = props;
	const { errors, register } = useFormContext();
	const error = get(errors, rest.name)?.message;
	return <Input {...rest} ref={register(rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFInput.propTypes = {
		rules: PropTypes.object,
	};
}

export default RHFInput;
