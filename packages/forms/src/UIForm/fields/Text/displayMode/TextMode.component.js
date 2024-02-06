import PropTypes from 'prop-types';

import TextModeWrapper from '../../../FormTemplate/TextModeWrapper.component';

export default function TextMode(props) {
	const { id, schema, value } = props;
	const { type } = schema;

	return (
		<TextModeWrapper id={id} schema={schema}>
			{type === 'password' && value ? '**********' : value}
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
