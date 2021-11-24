import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import TextArea from '../../../widgets/fields/TextArea';

function RHFTextArea(props) {
	const { rules = {}, ...rest } = props;
	const { errors, register } = useFormContext();
	const error = get(errors, rest.name)?.message;
	return <TextArea {...rest} ref={register(rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFTextArea.propTypes = {
		rules: PropTypes.object,
	};
}

export default RHFTextArea;
