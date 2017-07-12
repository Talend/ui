import React, { PropTypes } from 'react';
import theme from './Emphasis.scss';

function emphasise(text, value) {
	if (!text) {
		return '';
	}
	if (!value) {
		return text;
	}

	const parts = text.split(new RegExp(`(${value})`, 'gi')).filter(Boolean);
	return parts.map((part) => {
		if (value && part.toUpperCase() === value.toUpperCase()) {
			return <em className={theme.highlight}>{part}</em>;
		}
		return part;
	});
}

function Emphasis(props) {
	const { value, text } = props;
	return <span>{emphasise(text, value)}</span>;
}

Emphasis.propTypes = {
	value: PropTypes.string,
	text: PropTypes.string,
};

export default Emphasis;
