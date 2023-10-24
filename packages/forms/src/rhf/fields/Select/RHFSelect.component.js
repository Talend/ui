import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import Select from '../../../widgets/fields/Select';

function RHFSelect(props) {
	const { rules = {}, name = '', ...rest } = props;
	const { errors, register } = useFormContext();
	const error = get(errors, rest.name)?.message;
	return <Select {...rest} {...register(name, rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFSelect.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
	};
}

export default RHFSelect;
