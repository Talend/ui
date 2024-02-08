import PropTypes from 'prop-types';

import { TextMode as FieldTemplate } from '../../FieldTemplate';
import { getFileName } from '../File.component';

export default function FileTextMode(props) {
	const { id, schema, value } = props;

	return (
		<FieldTemplate id={id} label={schema.title} labelProps={schema.labelProps}>
			{getFileName(value, schema)}
		</FieldTemplate>
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
