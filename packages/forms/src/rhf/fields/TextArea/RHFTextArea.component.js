import PropTypes from 'prop-types';
import { useController, useFormContext } from 'react-hook-form';

import TextArea from '../../../widgets/fields/TextArea';

function RHFTextArea({ rules = {}, name = '', defaultValue, ...rest }) {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		rules,
		defaultValue,
	});

	return <TextArea {...rest} {...field} error={fieldState.error?.message} />;
}

if (process.env.NODE_ENV !== 'production') {
	RHFTextArea.propTypes = {
		rules: PropTypes.object,
		name: PropTypes.string,
		defaultValue: PropTypes.string,
	};
}

export default RHFTextArea;
