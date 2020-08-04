import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tokens from '../../tokens';

export const StyledForm = styled.form`
	width: 100%;
	font-family: ${tokens.fonts.sansSerif};

	fieldset {
		padding: 0;
		border: none;
	}
`;

function Form({ children }) {
	return <StyledForm>{children}</StyledForm>;
}

Form.propTypes = {
	autocomplete: PropTypes.string,
	name: PropTypes.string,
	novalidate: PropTypes.string,
};

export default Form;
