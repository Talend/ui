import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import Input from '../../../widgets/fields/Input';

function RHFInput(props) {
	const { rules = {}, name = '', ...rest } = props;
	const { formState, register } = useFormContext();
	const error = formState?.errors?.[name]?.message || null;
	return <Input {...rest} {...register(name, rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFInput.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
	};
}

export default RHFInput;
