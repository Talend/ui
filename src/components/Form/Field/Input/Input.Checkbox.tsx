import React from 'react';
import { Checkbox as ReakitCheckbox, useCheckboxState } from 'reakit';
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

const Checkbox = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id = `checkbox--${Date.now()}`,
			label,
			indeterminate,
			checked,
			readOnly,
			required,
			children,
			...rest
		},
		ref,
	) => {
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
				<label htmlFor={id}>
					{!readOnly && (
						// @ts-ignore
						<ReakitCheckbox id={id} {...rest} {...checkbox} ref={ref} />
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
