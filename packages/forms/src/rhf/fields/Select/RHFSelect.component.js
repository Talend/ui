import { useController, useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

function RHFSelect({ rules = {}, name = '', defaultValue, options, ...rest }) {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		rules,
		defaultValue,
	});

	return (
		<Form.Select
			hasError={!!fieldState.error?.message}
			description={fieldState.error?.message}
			{...field}
			{...rest}
		>
			{rest.required && !rest.placeholder && <option value=""></option>}
			{options &&
				options.map(option => {
					return (
						<option key={option.value} value={option.value} selected={rest.value === option.value}>
							{option.name}
						</option>
					);
				})}
		</Form.Select>
	);
}

if (process.env.NODE_ENV !== 'production') {
	RHFSelect.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
		defaultValue: PropTypes.string,
		options: PropTypes.array,
	};
}

export default RHFSelect;
