import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import InputTextMode from '../../../../widgets/fields/Input/TextMode.component';

export default function TextMode(props) {
	const { name, ...restProps } = props;
	const { getValues } = useFormContext();
	const value = getValues()[name];

	return <InputTextMode {...restProps} value={value} />;
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		label: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.string,
	};
}
