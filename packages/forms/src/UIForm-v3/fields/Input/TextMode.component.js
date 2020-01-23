import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import FieldTemplate from '../../templates/FieldTemplate/TextMode.component';

export default function TextMode(props) {
	const { id, label, name, type } = props;
	const { getValues } = useFormContext();
	const value = getValues()[name];

	return (
		<FieldTemplate id={id} label={label}>
			{type === 'password' && value ? '**********' : value}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		label: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.string,
	};
}

TextMode.defaultProps = {
	schema: {},
	value: '',
};
