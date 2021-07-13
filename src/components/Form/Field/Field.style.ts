import React from 'react';
import styled from 'styled-components';

import Label from '../Label';

import tokens from '../../../tokens';

export type FieldControlProps = { as: string; type: string; multiple: boolean };

export const FieldControl = styled.input.attrs(({ readOnly, checked }) => ({
	className: `${readOnly ? 'input--read-only' : ''} ${checked ? 'input--checked' : ''}`,
}))`
	padding: ${tokens.space.none} ${tokens.space.s};
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

export const FieldLabel = Label;

export const Field = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	margin-bottom: ${tokens.space.s};
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

	.field__group--has-warning {
		${FieldControl} {
			border-width: 2px;
			border-color: ${({ theme }) => theme.colors.warningColor[500]};
		}
	}

	.field__group--has-error {
		${FieldControl} {
			border-width: 2px;
			border-color: ${({ theme }) => theme.colors.destructiveColor[500]};
		}
	}

	select[multiple] {
		padding: 1rem;
	}

	.field__label,
	.link {
		order: -1;
	}

	.link {
		align-self: flex-end;
		margin-top: -2rem;
		margin-bottom: 0.5rem;
	}
`;

export const InlineStyle = styled.div.attrs<{ readOnly: boolean; checked: boolean }>(
	({ readOnly, checked }) => ({
		className: `${readOnly ? 'input--read-only' : ''} ${checked ? 'input--checked' : ''}`,
	}),
)`
	margin-bottom: ${tokens.space.xs};

	input {
		position: absolute;
		margin-left: -9999px;
	}

	label > span {
		position: relative;
		padding: 0 ${tokens.space.l};
		font-size: ${tokens.fontSizes.normal};
		color: ${({ theme }) => theme.colors.textColor};
		cursor: pointer;
	}

	label > span:before,
	label > span:after {
		content: '';
		position: absolute;
		top: 0.3rem;
		left: 0;
		background: ${({ theme }) => theme.colors.inputBackgroundColor};
		transition: ${tokens.transitions.fast};
	}

	label > span:before {
		width: ${tokens.sizes.s};
		height: ${tokens.sizes.s};
		box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.inputBorderColor};
	}

	label > span:after {
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
		// Safari
		outline: 0.3rem solid ${({ theme }) => theme.colors.focusColor[500]};
	}
	input:focus:not(:focus-visible):not(:disabled) + span {
		// Reset for others than Safari
		outline: none;
	}
	input:focus-visible:not(:disabled) + span {
		// For others than Safari
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

export const FieldGroup = styled.div<{ after: React.ReactNode }>`
	position: relative;
	margin-bottom: ${tokens.space.xs};
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
		margin: ${tokens.space.none} ${tokens.space.s};
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
