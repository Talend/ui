import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import Input from '../../../widgets/fields/Input';

function RHFInput(props) {
	const { rules = {}, name = '', ...rest } = props;
	const { errors, register } = useFormContext();
	const error = get(errors, rest.name)?.message;
	return <Input {...rest} {...register(name, rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFInput.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
	};
}

export default RHFInput;
