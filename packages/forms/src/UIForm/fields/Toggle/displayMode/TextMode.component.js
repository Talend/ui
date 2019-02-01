import PropTypes from 'prop-types';
import React from 'react';
import ToggleWidget from '../Toggle.component';

export default function TextModeToggle(props) {
	const newProps = { ...props, schema: { ...props.schema, disabled: true } };
	return <ToggleWidget {...newProps} />;
}

if (process.env.NODE_ENV !== 'production') {
	TextModeToggle.propTypes = {
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
		}),
	};
}
