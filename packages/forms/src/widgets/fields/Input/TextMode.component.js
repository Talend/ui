import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../../templates/FieldTemplate/TextMode.component';

export default function TextMode(props) {
	const { id, label, type, value } = props;

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
		type: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

TextMode.defaultProps = {
	value: '',
};
