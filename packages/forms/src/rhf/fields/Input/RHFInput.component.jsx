import { useController, useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

function RHFInput({ rules = {}, name = '', defaultValue, ...rest }) {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		rules,
		defaultValue,
	});

	return (
		<Form.Input
			hasError={!!fieldState.error?.message}
			description={fieldState.error?.message}
			{...field}
			{...rest}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	RHFInput.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
		defaultValue: PropTypes.string,
	};
}

export default RHFInput;
