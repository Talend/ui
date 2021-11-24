import styled from 'styled-components';

import tokens from '../../../tokens';

export const Span = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${tokens.space.none} ${tokens.space.s};
	height: ${tokens.sizes.xxl};
	color: ${({ theme }) => theme.colors.fieldGroupColor};
	background: ${({ theme }) => theme.colors.fieldGroupBackgroundColor};
`;
export const SpanPrefix = styled(Span)`
	border-top-left-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-left-radius: ${tokens.radii.inputBorderRadius};
`;
export const SpanSuffix = styled(Span)`
	border-top-right-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-right-radius: ${tokens.radii.inputBorderRadius};
`;

export const FieldGroupLabel = styled.span`
	margin-bottom: ${tokens.space.xs};
	font-size: ${tokens.fontSizes.small};
	font-weight: ${tokens.fontWeights.semiBold};
	color: ${({ theme }) => theme.colors.textColor};
	cursor: pointer;
`;
export const FieldGroupRow = styled.div`
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

	.c-field,
	.c-field__group {
		margin-bottom: 0;
	}

	.c-field-group__item .c-field__control,
	.c-field-group__item .c-field__control:hover:not(:disabled),
	.c-field-group__item .btn {
		margin: 0;
		border: none;
		border-radius: ${tokens.radii.inputBorderRadius};
	}

	.c-field-group__item--prefix,
	.c-field-group__item--suffix {
		max-width: 20%;

		.c-field__group,
		.c-field__control,
		.btn {
			color: ${({ theme }) => theme.colors.fieldGroupInteractiveColor};
			background: ${({ theme }) => theme.colors.fieldGroupInteractiveBackgroundColor};
			transition: ${tokens.transitions.fast};

			&:hover {
				color: ${({ theme }) => theme.colors.fieldGroupInteractiveHoverColor};
				background: ${({ theme }) => theme.colors.fieldGroupInteractiveHoverBackgroundColor};
			}

			&:active {
				color: ${({ theme }) => theme.colors.fieldGroupInteractiveActiveColor};
				background: ${({ theme }) => theme.colors.fieldGroupInteractiveActiveBackgroundColor};
			}
		}

		.btn {
			padding: 0 ${tokens.space.s};
			height: ${tokens.sizes.xxl};
			background: ${({ theme }) => theme.colors.fieldGroupInteractiveBackgroundColor};
			border-color: ${({ theme }) => theme.colors.inputBorderColor};
			border-radius: 0 ${tokens.radii.inputBorderRadius} ${tokens.radii.inputBorderRadius} 0;
		}
	}

	.c-field-group__item.c-field-group__item--suffix {
		.c-field__control,
		.btn {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	.c-field-group__item.c-field-group__item--prefix {
		.c-field__control,
		.btn {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}
`;
export const FieldGroup = styled.div`
	display: flex;
	flex-direction: column;

	.c-field-group__item--input {
		flex: 1;
	}

	.c-field__label {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.c-field-group__description {
		margin-bottom: ${tokens.space.m};
	}

	&.c-field-group--has-warning ${FieldGroupRow} {
		border-color: ${({ theme }) => theme.colors.warningColor[500]};
	}

	&.c-field-group--has-error ${FieldGroupRow} {
		border-width: 2px;
		border-color: ${({ theme }) => theme.colors.destructiveColor[500]};
	}

	&.c-field-group--disabled ${FieldGroupRow} {
		border-color: ${({ theme }) => theme.colors.inputDisabledBorderColor};
	}

	&.c-field-group--read-only ${FieldGroupRow} {
		border-color: ${({ theme }) => theme.colors.inputReadOnlyBorderColor};
	}
`;
