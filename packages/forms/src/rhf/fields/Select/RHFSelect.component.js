import PropTypes from 'prop-types';
import { useController, useFormContext } from 'react-hook-form';

import Select from '../../../widgets/fields/Select';

function RHFSelect({ rules = {}, name = '', defaultValue, ...rest }) {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		rules,
		defaultValue,
	});
	return <Select {...rest} {...field} error={fieldState.error?.message} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFSelect.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
		defaultValue: PropTypes.string,
	};
}

export default RHFSelect;
