import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import Select from '../../../widgets/fields/Select';

function RHFSelect(props) {
	const { rules = {}, ...rest } = props;
	const { errors, register } = useFormContext();
	const error = get(errors, rest.name)?.message;
	return <Select {...rest} ref={register(rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFSelect.propTypes = {
		rules: PropTypes.object,
	};
}

export default RHFSelect;
