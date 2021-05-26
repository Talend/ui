import styled from 'styled-components';

import tokens from '../../../../tokens';

export const Span = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${tokens.space.none} ${tokens.space.s};
	height: ${tokens.sizes.xxl};
	color: ${({ theme }) => theme.colors.inputGroupColor};
	background: ${({ theme }) => theme.colors.inputGroupBackgroundColor};
`;
export const SpanPrefix = styled(Span)`
	border-top-left-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-left-radius: ${tokens.radii.inputBorderRadius};
`;
export const SpanSuffix = styled(Span)`
	border-top-right-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-right-radius: ${tokens.radii.inputBorderRadius};
`;

export const InputGroupLabel = styled.span`
	margin-bottom: ${tokens.space.xs};
	font-size: ${tokens.fontSizes.small};
	font-weight: ${tokens.fontWeights.semiBold};
	color: ${({ theme }) => theme.colors.textColor};
	cursor: pointer;
`;
export const InputGroupRow = styled.div`
	display: flex;
	margin-bottom: ${tokens.space.xs};
	border: 1px solid ${({ theme }) => theme.colors.inputBorderColor};
	border-radius: ${tokens.radii.inputBorderRadius};

	&:hover {
		border-color: ${({ theme }) => theme.colors.inputHoverBorderColor};
	}

	&:focus-within {
		border-width: 2px;
		border-color: ${({ theme }) => theme.colors.inputFocusBorderColor};
	}

	.field,
	.field__group {
		margin-bottom: 0;
	}

	.input-group__item .field__control,
	.input-group__item .field__control:hover:not(:disabled),
	.input-group__item .btn {
		margin: 0;
		border: none;
		border-radius: ${tokens.radii.inputBorderRadius};
	}

	.input-group__item--prefix,
	.input-group__item--suffix {
		max-width: 20%;

		.field__group,
		.field__control,
		.btn {
			color: ${({ theme }) => theme.colors.inputGroupInteractiveColor};
			background: ${({ theme }) => theme.colors.inputGroupInteractiveBackgroundColor};
			transition: ${tokens.transitions.fast};

			&:hover {
				color: ${({ theme }) => theme.colors.inputGroupInteractiveHoverColor};
				background: ${({ theme }) => theme.colors.inputGroupInteractiveHoverBackgroundColor};
			}

			&:active {
				color: ${({ theme }) => theme.colors.inputGroupInteractiveActiveColor};
				background: ${({ theme }) => theme.colors.inputGroupInteractiveActiveBackgroundColor};
			}
		}

		.btn {
			padding: 0 ${tokens.space.s};
			height: ${tokens.sizes.xxl};
			background: ${({ theme }) => theme.colors.inputGroupInteractiveBackgroundColor};
			border-color: ${({ theme }) => theme.colors.inputBorderColor};
			border-radius: 0 ${tokens.radii.inputBorderRadius} ${tokens.radii.inputBorderRadius} 0;
		}
	}

	.input-group__item.input-group__item--suffix {
		.field__control,
		.btn {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	.input-group__item.input-group__item--prefix {
		.field__control,
		.btn {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}
`;
export const InputGroup = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: ${tokens.space.s};

	.input-group__item--input {
		flex: 1;
	}

	.field__label {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	&.input-group--has-error ${InputGroupRow}, &.input-group--has-error ${InputGroupRow} {
		border-width: 2px;
	}

	&.input-group--has-warning ${InputGroupRow} {
		border-color: ${({ theme }) => theme.colors.warningColor[500]};
	}

	&.input-group--has-error ${InputGroupRow} {
		border-color: ${({ theme }) => theme.colors.destructiveColor[500]};
	}

	&.input-group--disabled ${InputGroupRow} {
		border-color: ${({ theme }) => theme.colors.inputDisabledBorderColor};
	}

	&.input-group--read-only ${InputGroupRow} {
		border-color: ${({ theme }) => theme.colors.inputReadOnlyBorderColor};
	}
`;
