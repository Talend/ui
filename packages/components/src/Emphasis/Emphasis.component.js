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

	if (!Array.isArray(value)) {
		value = [value];
	}

	const valuesUC = value.map(e => `${e}`.toLocaleUpperCase());

	return `${text}`
		.split(new RegExp(`(${valuesUC.map(e => escapeRegexCharacters(e)).join('|')})`, 'gi'))
		.filter(isNotEmpty)
		.map((part, index) => {
			if (valuesUC.includes(part.toLocaleUpperCase())) {
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
