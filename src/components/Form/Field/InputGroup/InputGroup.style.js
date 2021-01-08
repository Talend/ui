import styled from 'styled-components';

import tokens from '../../../../tokens';

export const Span = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1rem;
	height: ${tokens.sizes.xxl};
	color: ${({ theme }) => theme.colors.inputGroupColor};
	background: ${({ theme }) => theme.colors.inputGroupBackgroundColor};
	border: 1px solid ${({ theme }) => theme.colors.inputBorderColor};
`;
export const SpanPrefix = styled(Span)`
	border-right: none;
	border-top-left-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-left-radius: ${tokens.radii.inputBorderRadius};
`;
export const SpanSuffix = styled(Span)`
	border-left: none;
	border-top-right-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-right-radius: ${tokens.radii.inputBorderRadius};
`;

export const InputGroup = styled.div`
	display: flex;
	flex-direction: column;

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

	.field__control--select {
		color: ${({ theme }) => theme.colors.inputGroupInteractiveColor};
		background: ${({ theme }) => theme.colors.inputGroupInteractiveBackgroundColor};
	}

	.input-group__item--suffix .field__control--select,
	&.input-group--has-prefix .input-group__item--input .field__control {
		border-left: none;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.input-group__item--prefix .field__control--select,
	&.input-group--has-suffix .input-group__item--input .field__control {
		border-right: none;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.input-group__item--prefix,
	.input-group__item--prefix .field__group--select:hover select:not(:disabled) {
		border-right: none;
	}

	.input-group__item--suffix,
	.input-group__item--suffix .field__group--select:hover select:not(:disabled) {
		border-left: none;
	}

	&:hover {
		${Span},
		.input-group__item .field__control {
			border-color: ${({ theme }) => theme.colors.inputBorderHoverColor};
		}
	}
`;
export const InputGroupLabel = styled.span`
	font-size: ${tokens.fontSizes.small};
	font-weight: ${tokens.fontWeights.semiBold};
	color: ${({ theme }) => theme.colors.textColor};
`;
export const InputGroupRow = styled.div`
	display: flex;
`;
