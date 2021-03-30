import PropTypes from 'prop-types';
import React from 'react';
import theme from './Emphasis.scss';

function isNotEmpty(value) {
	return value;
}

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function emphasiseAll(text, value) {
	if (!text) {
		return '';
	}
	if (!value) {
		return text;
	}

	const strValue = typeof value !== 'string' ? `${value}` : value;

	return text
		.split(new RegExp(`(${escapeRegexCharacters(strValue)})`, 'gi'))
		.filter(isNotEmpty)
		.map((part, index) => {
			if (part.toUpperCase() === strValue.toUpperCase()) {
				return (
					<em key={index} className={theme.highlight}>
						{part}
					</em>
				);
			}
			return part;
		});
}

function Emphasis(props) {
	return <span>{emphasiseAll(props.text, props.value)}</span>;
}

Emphasis.displayName = 'Emphasis';

Emphasis.propTypes = {
	value: PropTypes.string,
	text: PropTypes.string,
};

export default Emphasis;
