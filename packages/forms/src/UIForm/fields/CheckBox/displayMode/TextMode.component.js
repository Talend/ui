import PropTypes from 'prop-types';

import { Form, SizedIcon, StackHorizontal } from '@talend/design-system';

import { getLabelProps } from '../../../utils/labels';

export default function TextModeCheckBox({ id, schema, value }) {
	const formlabelProps = getLabelProps(schema.title || value, schema.labelProps);
	const iconName = value ? 'check' : 'cross';
	const dataTestID = `widget-checkbox-icon-${iconName}`;
	return (
		<StackHorizontal gap="XXS" align="center">
			<SizedIcon id={id} data-testid={dataTestID} data-test={dataTestID} name={iconName} size="S" />
			<Form.Label htmlFor={id} {...formlabelProps} />
		</StackHorizontal>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextModeCheckBox.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			labelProps: PropTypes.object,
		}).isRequired,
		value: PropTypes.bool,
	};
}
