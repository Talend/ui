import styled from 'styled-components';
import tokens from '@talend/design-tokens';

export const Form = styled.form`
	margin: 0 auto;
	width: 100%;
	font: ${tokens.coralParagraphM};

	fieldset {
		padding: 0;
		border: none;
	}

	.c-field,
	.c-field-group,
	.c-inline-message {
		margin-bottom: ${tokens.coralSpacingS};
	}
`;
