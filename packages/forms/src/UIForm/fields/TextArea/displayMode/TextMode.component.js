import PropTypes from 'prop-types';

import { Form, StackVertical } from '@talend/design-system';

import { getLabelProps } from '../../../utils/labels';

export default function TextMode({ id, schema, value }) {
	const { rows = 5, title, labelProps } = schema;

	return (
		<StackVertical gap="XXS" align="stretch" justify="start" height="100%" noShrink>
			<Form.Label id={id} {...getLabelProps(title, labelProps)} />
			<pre style={{ height: `${rows * 2}rem`, fontSize: 'inherit' }}>{value}</pre>
		</StackVertical>
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
