import PropTypes from 'prop-types';

import { Form, StackVertical } from '@talend/design-system';

import { getLabelProps } from '../utils/labels';

export default function TextModeWrapper({ id, schema, children }) {
	const { title, labelProps, hint } = schema;

	return (
		<StackVertical gap="XXS" align="stretch" justify="start" height="100%" noShrink>
			<Form.Label id={id} {...getLabelProps(title, labelProps, hint)} />
			{children}
		</StackVertical>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextModeWrapper.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.object,
		children: PropTypes.node,
	};
}

TextModeWrapper.defaultProps = {
	schema: {},
	value: '',
};
