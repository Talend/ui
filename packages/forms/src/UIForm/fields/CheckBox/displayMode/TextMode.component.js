import PropTypes from 'prop-types';

import { Form, SizedIcon, StackHorizontal } from '@talend/design-system';

import { getLabelProps } from '../../../utils/labels';

export default function TextModeCheckBox({ id, schema, value }) {
	const labelProps = getLabelProps(schema.title, schema.labelProps);
	const iconName = value ? 'check' : 'cross';
	const dataTestID = `widget-checkbox-icon-${iconName}`;
	return (
		<StackHorizontal gap="XXS" align="center">
			<SizedIcon data-testid={dataTestID} data-test={dataTestID} name={iconName} size="S" />
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
