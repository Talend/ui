import React from 'react';
import { isElement } from 'react-is';

import { Icon } from '../../../Icon/Icon';

import Field, { FieldProps } from '../Field';
import Input from '../Input';

import * as S from './Select.style';

export type SelectProps = FieldProps;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ children, multiple, readOnly, required, placeholder, ...rest }: SelectProps, ref) => {
		if (readOnly) {
			const values = React.Children.toArray(children).reduce((acc: string[], current) => {
				if (!isElement(current)) {
					return acc.concat(current.toString());
				}
				const { children: optChildren, originalType, selected } = current.props;
				if (originalType === 'optgroup') {
					return acc.concat(
						React.Children.toArray(optChildren)
							.filter(option => isElement(option) && option.props.selected)
							.map(option => isElement(option) && option.props.children),
					);
				}
				if (selected) {
					return acc.concat(optChildren);
				}
				return acc;
			}, []);
			// @ts-ignore
			return <Input readOnly value={values.join('; ')} {...rest} />;
		}

		return (
			<S.FieldWrapper>
				{/*
				// @ts-ignore */}
				<Field
					{...rest}
					as="select"
					multiple={multiple}
					// @ts-ignore
					before={!multiple && <Icon name="talend-caret-down" className="talend-caret-down" />}
					// @ts-ignore
					ref={ref}
				>
					{placeholder && (
						<option value="" disabled selected>
							{placeholder}
						</option>
					)}
					{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
					{!required && <option value="" />}
					{children}
				</Field>
			</S.FieldWrapper>
		);
	},
);

export default Select;
