import React, { useEffect } from 'react';
import { Checkbox as ReakitCheckbox, unstable_useId as useId } from 'reakit';
import styled from 'styled-components';

import useCheckboxState from './hooks/useCheckboxState';

import { InputProps } from './Input';

import { InlineStyle } from '../Field.style';

export const SCheckbox = styled(InlineStyle)<{
	readOnly: boolean;
	checked: boolean;
	disabled: boolean;
}>`
	input[type='checkbox'] {
		&::before,
		&::after,
		+ *::before,
		+ *::after {
			width: 1.4rem;
			height: 1.4rem;
		}

		&::before,
		+ *::before {
			background-color: var(--t-form-background-color);
			border: 1px solid var(--t-form-border-color);
			border-radius: 0.2rem;
		}

		// Indeterminate Checkboxes style
		&[aria-checked='mixed'] {
			&::before,
			+ *::before {
				background-color: var(--t-form-border-color--focus);
				border-color: var(--t-form-border-color--checked);
			}

			&::after,
			+ *::after {
				margin: 0;
				width: 1.4rem;
				height: 1.4rem;
				mask-image: var(--t-form-checkbox-background-image--indeterminate);
				background: var(--t-form-background-color);
			}
		}

		&[aria-checked='true'] {
			&::before,
			+ *::before {
				background-color: var(--t-form-border-color--focus);
				border-color: var(--t-form-border-color--checked);
			}

			&::after,
			+ *::after {
				margin: 0.1rem;
				width: calc(1.4rem - 2 * 0.1rem);
				height: calc(1.4rem - 2 * 0.1rem);
				mask-image: var(--t-form-checkbox-background-image--checked);
				background: var(--t-form-background-color);
			}
		}

		&:disabled {
			&::before,
			+ *::before {
				border-color: var(--t-form-border-color--disabled);
			}

			&[aria-checked='mixed'],
			&[aria-checked='true'] {
				&::before,
				+ *::before {
					background-color: var(--t-form-border-color--disabled);
					border-color: var(--t-form-border-color--disabled);
				}
			}
		}
	}

	&.c-input--read-only input[type='checkbox'] {
		&::before,
		+ *::before {
			background-color: var(--t-form-background-color--readonly);
			border-color: var(--t-form-border-color--readonly);
		}

		&[aria-checked='mixed'],
		&[aria-checked='true'] {
			&::after,
			+ *::after {
				background: var(--t-form-color--readonly);
			}
		}
	}
`;

export type CheckboxProps = InputProps & {
	checked: boolean | 'indeterminate' | (string | number)[];
};

const Checkbox = React.forwardRef(
	(
		{
			id,
			label,
			indeterminate,
			defaultChecked,
			checked,
			readOnly,
			disabled,
			required,
			children,
			...rest
		}: CheckboxProps,
		ref: React.Ref<HTMLInputElement>,
	) => {
		const { id: reakitId } = useId();
		const checkboxId = id || `checkbox--${reakitId}`;
		const state = (indeterminate && 'indeterminate') || defaultChecked || checked;
		const checkbox = useCheckboxState({
			state,
			readOnly,
		});

		return (
			<SCheckbox readOnly={!!readOnly} checked={!!checkbox.state} disabled={!!disabled}>
				<label htmlFor={checkboxId} style={readOnly ? { pointerEvents: 'none' } : {}}>
					{/*
					// ReakitCheckbox is not based on HTMLInputElement despite working like one
					// @ts-ignore */}
					<ReakitCheckbox
						id={checkboxId}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						{...rest}
						{...checkbox}
						ref={ref}
					/>
					<span>
						{label || children}
						{required && '*'}
					</span>
				</label>
			</SCheckbox>
		);
	},
);

export default Checkbox;
