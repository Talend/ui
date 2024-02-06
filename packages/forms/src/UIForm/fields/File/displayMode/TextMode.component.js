import PropTypes from 'prop-types';

import TextModeWrapper from '../../../FormTemplate/TextModeWrapper.component';
import { getFileName } from '../File.component';

export default function FileTextMode(props) {
	const { id, schema, value } = props;

	return (
		<TextModeWrapper id={id} schema={schema}>
			{getFileName(value, schema)}
		</TextModeWrapper>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FileTextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.object,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

FileTextMode.defaultProps = {
	schema: {},
	value: '',
};
