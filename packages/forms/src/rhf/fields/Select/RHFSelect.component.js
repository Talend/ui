import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import Select from '../../../widgets/fields/Select';

function RHFSelect(props) {
	const { rules = {}, name = '', ...rest } = props;
	const { formState, register } = useFormContext();
	const error = formState?.errors?.[name]?.message || null;
	return <Select {...rest} {...register(name, rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFSelect.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
	};
}

export default RHFSelect;
