import PropTypes from 'prop-types';

import { TextMode as FieldTemplate } from '../../FieldTemplate';

export default function TextMode({ id, schema, value }) {
	const { rows = 5 } = schema;

	return (
		<FieldTemplate id={id} label={schema.title} labelProps={schema.labelProps}>
			<pre style={{ height: `${rows * 2}rem`, fontSize: 'inherit' }}>{value}</pre>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.object,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

TextMode.defaultProps = {
	schema: {},
	value: '',
};
