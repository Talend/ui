import React from 'react';
import styled from 'styled-components';

import Label from '../Label';

import tokens from '../../../tokens';

export type FieldControlProps = { as: string; type: string; multiple: boolean };

export const FieldControl = styled.input`
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

	&.c-input--read-only {
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
	width: 100%;
	min-width: 8rem;
	color: ${({ theme }) => theme.colors.textColor};

	.c-field__label {
		margin-bottom: ${tokens.space.xs};
	}

	.c-field__description {
		margin: ${tokens.space.xs} ${tokens.space.none} ${tokens.space.m};
	}

	.c-field__group--loading {
		.c-field__control {
			padding-right: ${tokens.sizes.xxl};
		}

		.c-field__loading {
			position: absolute;
			top: 0;
			right: 0;
			left: auto;
			width: ${tokens.sizes.xxl};
			height: ${tokens.sizes.xxl};
		}
	}

	.c-field__group--has-warning {
		${FieldControl} {
			border-width: 2px;
			border-color: ${({ theme }) => theme.colors.warningColor[500]};
		}
	}

	.c-field__group--has-error {
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

export const InlineStyle = styled.div.attrs<{
	readOnly: boolean;
	checked: boolean;
	disabled: boolean;
}>(({ readOnly, checked, disabled }) => ({
	className: `${readOnly ? 'c-input--read-only' : ''} ${checked ? 'c-input--checked' : ''} ${
		disabled ? 'c-input--disabled' : ''
	}`,
}))`
	--t-form-color: ${({ theme }) => theme.colors.inputColor};
	--t-form-background-color: ${({ theme }) => theme.colors.inputBackgroundColor};
	--t-form-border-color: ${({ theme }) => theme.colors.inputBorderColor};
	--t-form-border-color--hover: ${({ theme }) => theme.colors.inputHoverBorderColor};
	--t-form-border-color--focus: ${({ theme }) => theme.colors.inputFocusBorderColor};
	--t-form-border-color--checked: ${({ theme }) => theme.colors.inputCheckedBorderColor};
	--t-form-border-color--disabled: ${({ theme }) => theme.colors.inputDisabledBorderColor};

	--t-form-color--readonly: ${({ theme }) => theme.colors.inputReadOnlyColor};
	--t-form-background-color--readonly: ${({ theme }) => theme.colors.inputReadOnlyBackgroundColor};
	--t-form-border-color--readonly: ${({ theme }) => theme.colors.inputReadOnlyBorderColor};

	--t-form-placeholder-color: ${({ theme }) => theme.colors.inputPlaceholderColor};

	--t-form-radio-background-color: ${({ theme }) => theme.colors.inputRadioBackgroundColor};

	--t-form-checkbox-background-image--indeterminate: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTIgMTIiPgogIDxyZWN0IHg9IjMiIHk9IjUiIHdpZHRoPSI2IiBoZWlnaHQ9IjIiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4K');
	--t-form-checkbox-background-image--checked: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImZpbGw6IHdoaXRlIj4KCTxwYXRoIGQ9Ik02IDE0TDAgOGwxLjktMS45TDYgMTAuMiAxNC4xIDIgMTYgMy45eiI+PC9wYXRoPgo8L3N2Zz4=');

	--t-form-group-color: ${({ theme }) => theme.colors.fieldGroupColor};
	--t-form-group-background-color: ${({ theme }) => theme.colors.fieldGroupBackgroundColor};
	--t-form-group-interactive-color: ${({ theme }) => theme.colors.fieldGroupInteractiveColor};
	--t-form-group-interactive-background-color: ${({ theme }) =>
		theme.colors.fieldGroupInteractiveBackgroundColor};
	--t-form-group-interactive-color--hover: ${({ theme }) =>
		theme.colors.fieldGroupInteractiveHoverColor};
	--t-form-group-interactive-background-color--hover: ${({ theme }) =>
		theme.colors.fieldGroupInteractiveHoverBackgroundColor};
	--t-form-group-interactive-color--active: ${({ theme }) =>
		theme.colors.fieldGroupInteractiveActiveColor};
	--t-form-group-interactive-background-color--active: ${({ theme }) =>
		theme.colors.fieldGroupInteractiveActiveBackgroundColor};

	margin-top: 0;

	label {
		display: inline-block;
		position: relative;
		padding-left: calc(1.4rem + ${tokens.space.s});
		margin-bottom: ${tokens.space.xs};
		font-size: 1.4rem;
		font-weight: 400;

		&,
		> * {
			line-height: 1.5rem;
			min-height: 1.5rem;
		}
	}

	input {
		margin: 0;
		appearance: none;

		&,
		+ * {
			display: inline-block;
		}

		&,
		&::before,
		&::after,
		+ *::before,
		+ *::after {
			position: absolute;
			top: 0;
			left: 0;
		}

		&::before,
		&::after,
		+ *::before,
		+ *::after {
			content: '';
		}
	}

	+ & {
		margin: 0;
	}

	/*
	input:not(:read-only):not(:disabled) + span:hover,
	input:focus:not(:read-only):not(:disabled) + span {
		&:before {
			box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.inputFocusBorderColor};
		}
	}
*/
	input:focus:not(:disabled) + span {
		// Safari
		outline: 0.3rem solid ${({ theme }) => theme.colors.inputFocusBorderColor};
	}
	input:focus:not(:focus-visible):not(:disabled) + span {
		// Reset for others than Safari
		outline: none;
	}
	input:focus-visible:not(:disabled) + span {
		// For others than Safari
		outline: 0.3rem solid ${({ theme }) => theme.colors.inputFocusBorderColor};
	}

	&.c-input--disabled,
	&.c-input--disabled label {
		opacity: ${tokens.opacity.disabled};
		cursor: not-allowed;
	}

	&.c-input--disabled,
	&.c-input--disabled label {
		opacity: ${tokens.opacity.disabled};
		cursor: not-allowed;
	}
`;

export const FieldGroup = styled.div<{ after: React.ReactNode }>`
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
