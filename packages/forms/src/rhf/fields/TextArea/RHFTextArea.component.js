import { useController, useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

function RHFTextArea({ rules = {}, name = '', defaultValue, ...rest }) {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		rules,
		defaultValue,
	});

	return (
		<Form.Textarea
			hasError={!!fieldState.error?.message}
			description={fieldState.error?.message}
			{...field}
			{...rest}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	RHFTextArea.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
		defaultValue: PropTypes.string,
	};
}

export default RHFTextArea;
