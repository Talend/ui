import React from 'react';
import { Icon } from '../../../Icon/Icon';

import Field from '../Field';

import * as S from './Select.style';
import Input from '../Input';

function Select({ children, multiple, readOnly, required, placeholder, ...rest }) {
	if (readOnly) {
		const values = children.reduce((acc, current) => {
			const { children: optChildren, originalType, selected } = current.props;
			if (originalType === 'optgroup') {
				return acc.concat(
					React.Children.toArray(optChildren)
						.filter(option => option.props.selected)
						.map(option => option.props.children),
				);
			}
			if (selected) {
				return acc.concat(optChildren);
			}
			return acc;
		}, []);

		return <Input readOnly value={values.join('; ')} {...rest} />;
	}

	return (
		<S.FieldWrapper>
			<Field
				as="select"
				multiple={multiple}
				{...rest}
				before={
					!multiple && <Icon name="talend-caret-down" className="talend-caret-down" currentColor />
				}
			>
				{placeholder && (
					<option value="" disabled selected>
						{placeholder}
					</option>
				)}
				{!required && <option value=""></option>}
				{children}
			</Field>
		</S.FieldWrapper>
	);
}

export default Select;
