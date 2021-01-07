import styled from 'styled-components';
import tokens from '../../../../../tokens';

const InlineStyle = styled.div`
	input {
		position: absolute;
		margin-left: -9999px;
	}

	span {
		position: relative;
		padding: 0 2rem;
		font-size: ${tokens.fontSizes.normal};
		color: ${({ theme }) => theme.colors.textColor};
		cursor: pointer;
	}

	span:before,
	span:after {
		content: '';
		position: absolute;
		top: 0.3rem;
		left: 0;
		background: ${({ theme }) => theme.colors.inputBackgroundColor};
		transition: ${tokens.transitions.fast};
	}

	input + span:before {
		width: ${tokens.sizes.s};
		height: ${tokens.sizes.s};
		box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.inputBorderColor};
	}

	input + span:after {
		margin: calc((${tokens.sizes.s} - ${tokens.sizes.xs}) / 2);
		width: ${tokens.sizes.xs};
		height: ${tokens.sizes.xs};
	}

	input:not(:disabled) + span:hover,
	input:focus:not(:disabled) + span {
		&:before {
			box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.inputBorderFocusColor};
		}
	}

	input:focus:not(:disabled) + span {
		outline: 0.3rem solid ${({ theme }) => theme.colors.focusColor};
	}

	input:checked + span:before,
	input[aria-checked='mixed'] + span:before {
		background: ${({ theme }) => theme.colors.activeColor};
		box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.activeColor};
	}

	input:disabled + span,
	input:disabled + span:before,
	input:disabled + span:after {
		opacity: ${tokens.opacity.disabled};
		cursor: not-allowed;
	}
`;

export default InlineStyle;
