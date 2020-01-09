import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../../templates/FieldTemplate/TextMode.component';

export default function TextMode(props) {
	const { id, label, name, rhf, type } = props;
	console.log('rhf.getValues()', rhf.getValues());
	const value = rhf.getValues()[name];

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
		rhf: PropTypes.object,
		type: PropTypes.string,
	};
}

TextMode.defaultProps = {
	schema: {},
	value: '',
};
