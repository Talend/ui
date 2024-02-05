import PropTypes from 'prop-types';

import { Form, StackVertical } from '@talend/design-system';

import { getLabelProps } from '../../../utils/labels';

export default function TextMode(props) {
	const { id, schema, value } = props;
	const { title, type, labelProps } = schema;

	return (
		<StackVertical gap="XXS" align="stretch" justify="start" height="100%" noShrink>
			<Form.Label id={id} {...getLabelProps(title, labelProps)} />
			{type === 'password' && value ? '**********' : value}
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
