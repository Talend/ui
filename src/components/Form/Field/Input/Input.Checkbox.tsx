import React from 'react';
import { Checkbox as ReakitCheckbox, unstable_useId as useId } from 'reakit';
import styled from 'styled-components';

import useCheckboxState from './hooks/useCheckboxState';

import { InputProps } from './Input';
import { Icon } from '../../../Icon/Icon';

import { InlineStyle } from '../Field.style';

import tokens from '../../../../tokens';

export const SCheckbox = styled(InlineStyle)<{
	readOnly: boolean;
	checked: boolean;
	disabled: boolean;
}>`
	label > span:before,
	label > span:after {
		border-radius: ${tokens.radii.inputBorderRadius};
	}

	label > span:after {
		background-color: transparent;
	}

	label {
		position: relative;
	}

	svg {
		position: absolute;
		top: 1px;
		left: 1px;
		width: 1rem;
		cursor: pointer;
	}

	// FIXME
	svg {
		circle {
			display: none;
		}

		path {
			fill: ${({ readOnly, theme }) => (readOnly ? 'currentColor' : theme.colors.backgroundColor)};
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
		const checkbox = useCheckboxState({
			state: (indeterminate && 'indeterminate') || defaultChecked || checked,
			readOnly,
		});

		const icon =
			checkbox.state === 'indeterminate' ? (
				<Icon name="talend-minus-circle" />
			) : (
				checkbox.state && <Icon name="talend-check" />
			);

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
					{icon}
				</label>
			</SCheckbox>
		);
	},
);

export default Checkbox;
