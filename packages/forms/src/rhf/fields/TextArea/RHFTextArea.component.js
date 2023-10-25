import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import TextArea from '../../../widgets/fields/TextArea';

function RHFTextArea(props) {
	const { rules = {}, name = '', ...rest } = props;
	const { register, formState } = useFormContext();
	const error = formState?.errors?.[name]?.message || null;

	return <TextArea {...rest} {...register(name, rules)} error={error} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFTextArea.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
	};
}

export default RHFTextArea;
