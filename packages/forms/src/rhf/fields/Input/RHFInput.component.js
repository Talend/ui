import PropTypes from 'prop-types';
import { useController, useFormContext } from 'react-hook-form';

import Input from '../../../widgets/fields/Input';

function RHFInput({ rules = {}, name = '', defaultValue, ...rest }) {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		rules,
		defaultValue,
	});
	return <Input {...rest} {...field} error={fieldState.error?.message} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFInput.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
		defaultValue: PropTypes.string,
	};
}

export default RHFInput;
