import PropTypes from 'prop-types';

import TextModeWrapper from '../../../FormTemplate/TextModeWrapper.component';

export default function TextMode({ id, schema, value }) {
	const { rows = 5 } = schema;

	return (
		<TextModeWrapper id={id} schema={schema}>
			<pre style={{ height: `${rows * 2}rem`, fontSize: 'inherit' }}>{value}</pre>
		</TextModeWrapper>
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
