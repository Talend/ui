import styled from 'styled-components';

import Label from '../Label';

import tokens from '../../../tokens';

export type FieldControlProps = { as: string; type: string; multiple: boolean };

export const FieldControl = styled.input.attrs(({ readOnly, checked }) => ({
	className: `${readOnly ? 'input--read-only' : ''} ${checked ? 'input--checked' : ''}`,
}))`
	padding: 0 ${tokens.space.s};
	width: 100%;
	color: ${({ theme }) => theme.colors.inputColor};
	font-size: ${tokens.fontSizes.normal};
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	background: ${({ theme }) => theme.colors.inputBackgroundColor};
	border: 1px solid ${({ theme }) => theme.colors.inputBorderColor};
	border-radius: ${tokens.radii.inputBorderRadius};

	${({ as, type, multiple }: FieldControlProps) =>
		['input', 'select'].includes(as) &&
		!['radio', 'checkbox'].includes(type) &&
		!multiple &&
		`height: ${tokens.sizes.xxl};`}

	&::placeholder {
		font-size: ${tokens.fontSizes.normal};
		color: ${({ theme }) => theme.colors.inputPlaceholderColor};
	}

	&:hover {
		border-color: ${({ theme }) => theme.colors.inputHoverBorderColor};
	}

	&:focus {
		border-width: 2px;
		border-color: ${({ theme }) => theme.colors.inputFocusBorderColor};
	}

	&:disabled {
		opacity: ${tokens.opacity.disabled};
		cursor: not-allowed;
	}

	&.input--read-only {
		border-color: ${({ theme }) => theme.colors.inputReadOnlyBorderColor};
		background: ${({ theme }) => theme.colors.inputReadOnlyBackgroundColor};
	}
`;

export const Field = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding-bottom: ${tokens.space.m};
	width: 100%;
	min-width: 8rem;
	color: ${({ theme }) => theme.colors.textColor};

	.field__group--loading {
		.field__control {
			padding-right: ${tokens.sizes.xxl};
		}

		.field__loading {
			position: absolute;
			top: 0;
			right: 0;
			left: auto;
			width: ${tokens.sizes.xxl};
			height: ${tokens.sizes.xxl};
		}
	}

	.field__group--has-error {
		${FieldControl} {
			border-width: 2px;
			border-color: ${({ theme }) => theme.colors.destructiveColor};
		}

		+ [role='status'] {
			padding-top: ${tokens.space.xs};
		}
	}

	select[multiple] {
		padding: 1rem;
	}
`;

export const FieldLabel = Label;

export const FieldGroup = styled.div<{ after: boolean }>`
	position: relative;
	display: inline-flex;
	align-items: center;
	width: 100%;

	${({ after }) =>
		after
			? ` input {
	padding-right: 3.6rem;
  }`
			: ''}

	svg, 
  button {
		position: absolute;
		padding: 0;
		height: ${tokens.sizes.l};
		z-index: ${tokens.zIndices.above};
	}

	svg {
		left: 0;
		margin: 0 1rem;
		fill: ${tokens.colors.gray[500]};
		pointer-events: none;

		+ input {
			padding-left: 3.6rem;
		}
	}

	button {
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		min-height: auto;
		border: none;

		svg {
			position: static;
		}

		&:hover {
			svg {
				fill: ${({ theme }) => theme.colors.activeColor[500]};
			}
		}
	}

	@media all and (-ms-high-contrast: none) {
		input {
			padding-right: inherit;
		}

		button,
		*::-ms-backdrop,
		button {
			display: none;
		}
	}
`;
