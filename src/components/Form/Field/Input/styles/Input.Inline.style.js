import styled from 'styled-components';
import tokens from '../../../../../tokens';

const InlineStyle = styled.span(
	({ theme }) => `
	input {
		position: absolute;
		margin-left: -9999px;
	}

	span {
		position: relative;
		padding: 0 2rem;
		font-size: ${tokens.fontSizes.normal};
		color: ${theme.colors.textColor};
		cursor: pointer;
	}

	span:before,
	span:after {
		content: '';
		position: absolute;
		top: .3rem;
		left: 0;
		background: ${theme.colors.inputBackgroundColor};
		transition: background 0.2s, box-shadow 0.2s;
	}

	input + span:before {
		width: ${tokens.sizes.smallerr};
		height: ${tokens.sizes.smallerr};
		box-shadow: 0 0 0 1px ${theme.colors.inputBorderColor};
	}

	input + span:after {
		margin: calc((${tokens.sizes.smallerr} - ${tokens.sizes.smallerrr}) / 2);
		width: ${tokens.sizes.smallerrr};
		height: ${tokens.sizes.smallerrr};
	}

	input:not(:disabled) + span:hover,
	input:focus:not(:disabled) + span {
		&:before {
			box-shadow: 0 0 0 1px ${theme.colors.inputBorderFocusColor};
		}
	}

	input:checked + span:before,
	input[aria-checked="mixed"] + span:before {
		background: ${theme.colors.activeColor};
		box-shadow: 0 0 0 1px ${theme.colors.activeColor};
	}


	input:disabled + span,
	input:disabled + span:before,
	input:disabled + span:after {
		opacity: ${tokens.opacity.disabled};
		cursor: not-allowed;
	}
`,
);

export default InlineStyle;
