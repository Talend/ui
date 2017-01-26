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
	htmlFor: React.PropTypes.string,
	text: React.PropTypes.string.isRequired,
};

export default Label;
