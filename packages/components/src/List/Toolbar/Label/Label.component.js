import PropTypes from 'prop-types';
import React from 'react';
import { Navbar } from 'react-bootstrap';

function Label({ htmlFor, text }) {
	return (
		<Navbar.Text>
			<label htmlFor={htmlFor}>{text}</label>
		</Navbar.Text>
	);
}

Label.propTypes = {
	htmlFor: PropTypes.string,
	text: PropTypes.string.isRequired,
};

export default Label;
