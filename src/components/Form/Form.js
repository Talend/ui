import React from 'react';
import styled from 'styled-components';
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

export default Form;
