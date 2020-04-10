import React from 'react';
import PropTypes from 'prop-types';

function Form({ children }) {
	return <form>{children}</form>;
}

Form.propTypes = {
	autocomplete: PropTypes.string,
	name: PropTypes.string,
	novalidate: PropTypes.string,
};

export default Form;
