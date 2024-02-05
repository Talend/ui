import PropTypes from 'prop-types';

import { Form, SizedIcon, StackHorizontal } from '@talend/design-system';

import { getLabelProps } from '../../../utils/labels';

export default function TextModeCheckBox({ id, schema, value }) {
	const labelProps = getLabelProps(schema.title, schema.labelProps);

	return (
		<StackHorizontal gap="XXS" align="center">
			<SizedIcon name={value ? 'check' : 'cross'} size="S" />
			<Form.Label id={id} {...labelProps} />
		</StackHorizontal>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextModeCheckBox.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.object.isRequired,
		value: PropTypes.bool,
	};
}
