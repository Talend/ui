import styled from 'styled-components';

import tokens from '../../../../tokens';

export const FieldWrapper = styled.div.attrs({
	className: 'c-field c-field--select',
})`
	position: relative;

	svg {
		position: absolute;
		top: auto;
		left: auto;
		right: 0;
		width: ${tokens.sizes.xs};
		fill: currentColor;
		pointer-events: none;
	}

	.c-field__control {
		overflow: auto;
		cursor: pointer;
		border-color: ${({ theme }) => theme.colors.inputBorderColor};
		background: ${({ theme }) => theme.colors.inputBackgroundColor};

		&:hover {
			&:not(:disabled) {
				border: 1px solid ${({ theme }) => theme.colors.inputHoverBorderColor};
			}
		}
	}

	:not(.c-field__group--multiple) {
		.c-field__control {
			appearance: none;

			&:disabled {
				border: 1px solid ${({ theme }) => theme.colors.inputDisabledBorderColor};
				opacity: ${tokens.opacity.disabled};
				cursor: not-allowed;
			}
		}
	}
`;
