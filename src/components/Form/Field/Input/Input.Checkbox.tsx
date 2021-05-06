import React from 'react';
import styled from 'styled-components';
import { Checkbox as ReakitCheckbox, useCheckboxState } from 'reakit';
import tokens from '../../../../tokens';
import InlineStyle from './styles/Input.Inline.style';
import { Icon } from '../../../Icon/Icon';

const InlineField = styled(InlineStyle)<{ readOnly: boolean; checked: boolean }>`
	span:before,
	span:after {
		border-radius: ${tokens.radii.inputBorderRadius};
	}

	span:after {
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

export type CheckboxProps = HTMLInputElement & {
	label: string;
};

const Checkbox = ({
	id = `checkbox--${Date.now()}`,
	label,
	indeterminate,
	checked,
	readOnly,
	...rest
}: CheckboxProps) => {
	const checkbox = useCheckboxState({ state: (indeterminate && 'indeterminate') || checked });

	const icon =
		checkbox.state === 'indeterminate' ? (
			<Icon name="talend-minus-circle" />
		) : (
			checkbox.state && <Icon name="talend-check" />
		);

	return (
		<InlineField readOnly={readOnly} checked={checked}>
			<label htmlFor={id}>
				{!readOnly && (
					<>
						{/*
						// @ts-ignore */}
						<ReakitCheckbox id={id} {...rest} {...checkbox} />
					</>
				)}
				<span>{label}</span>
				{icon}
			</label>
		</InlineField>
	);
};

export default Checkbox;
