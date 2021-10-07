import React from 'react';
import { Checkbox as ReakitCheckbox, useCheckboxState, unstable_useId as useId } from 'reakit';

import styled from 'styled-components';

import { InputProps } from './Input';
import { Icon } from '../../../Icon/Icon';

import { InlineStyle } from '../Field.style';

import tokens from '../../../../tokens';

export const SCheckbox = styled(InlineStyle)<{ readOnly: boolean; checked: boolean }>`
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
		{ id, label, indeterminate, checked, readOnly, required, children, ...rest }: CheckboxProps,
		ref: React.Ref<HTMLInputElement>,
	) => {
		const { id: reakitId } = useId();
		const checkboxId = `checkbox--${id || reakitId}`;
		const checkbox = useCheckboxState({ state: (indeterminate && 'indeterminate') || checked });

		const icon =
			checkbox.state === 'indeterminate' ? (
				<Icon name="talend-minus-circle" />
			) : (
				checkbox.state && <Icon name="talend-check" />
			);

		React.useEffect(() => {
			checkbox.setState((indeterminate && 'indeterminate') || checked);
		}, [indeterminate, checked]);

		return (
			<SCheckbox readOnly={!!readOnly} checked={!!checked}>
				<label htmlFor={checkboxId}>
					{readOnly ? (
						// @ts-ignore
						<input type="hidden" id={checkboxId} {...rest} {...checkbox} ref={ref} />
					) : (
						// @ts-ignore
						<ReakitCheckbox id={checkboxId} {...rest} {...checkbox} ref={ref} />
					)}
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
