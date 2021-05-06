import styled from 'styled-components';

import tokens from '../../../../../tokens';

const InlineStyle = styled.div.attrs<{ readOnly: boolean; checked: boolean }>(
	({ readOnly, checked }) => ({
		className: `${readOnly ? 'input--read-only' : ''} ${checked ? 'input--checked' : ''}`,
	}),
)`
	margin-bottom: ${tokens.space.xs};

	input {
		position: absolute;
		margin-left: -9999px;
	}

	span {
		position: relative;
		padding: 0 ${tokens.space.l};
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

	span:before {
		width: ${tokens.sizes.s};
		height: ${tokens.sizes.s};
		box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.inputBorderColor};
	}

	span:after {
		margin: calc((${tokens.sizes.s} - ${tokens.sizes.xs}) / 2);
		width: ${tokens.sizes.xs};
		height: ${tokens.sizes.xs};
	}

	input:not(:disabled) + span:hover,
	input:focus:not(:disabled) + span {
		&:before {
			box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.inputFocusBorderColor};
		}
	}

	input:focus:not(:disabled) + span {
		outline: 0.3rem solid ${({ theme }) => theme.colors.focusColor[500]};
	}

	[aria-checked='true'] + span:before,
	[aria-checked='mixed'] + span:before {
		background: ${({ theme }) => theme.colors.activeColor[500]};
		box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.inputCheckedBorderColor};
	}

	input:disabled + span,
	input:disabled + span:before,
	input:disabled + span:after {
		opacity: ${tokens.opacity.disabled};
		cursor: not-allowed;
	}

	&.input--read-only span:before,
	&.input--read-only span:after {
		color: ${({ theme }) => theme.colors.inputReadOnlyColor};
		background: ${({ theme }) => theme.colors.inputReadOnlyBackgroundColor};
		box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.inputReadOnlyBorderColor};
	}
`;

export default InlineStyle;
