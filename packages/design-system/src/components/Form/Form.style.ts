import styled from 'styled-components';

import tokens from '../../tokens';

export const Form = styled.form`
	margin: 0 auto;
	width: 100%;
	font-family: ${tokens.fonts.sansSerif};

	fieldset {
		padding: 0;
		border: none;
	}

	.c-field,
	.c-field-group,
	.c-inline-message {
		margin-bottom: ${tokens.space.s};
	}
`;
