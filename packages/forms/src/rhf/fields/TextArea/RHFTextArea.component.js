import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import TextArea from '../../../widgets/fields/TextArea';

function RHFTextArea(props) {
	const { rules = {}, name = '', ...rest } = props;
	const { errors, register } = useFormContext();
	const error = get(errors, rest.name)?.message;
	return <TextArea {...rest} {...register(name, rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFTextArea.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
	};
}

export default RHFTextArea;
