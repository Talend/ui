import PropTypes from 'prop-types';

import { Form, StackVertical } from '@talend/design-system';

import { getLabelProps } from '../../../utils/labels';

function FieldTemplate({ id, label, labelProps, children }) {
	return (
		<StackVertical gap="XXS" align="stretch" justify="start" height="100%" noShrink>
			<Form.Label htmlFor={id} {...getLabelProps(label, labelProps)} />
			<div id={id}>{children}</div>
		</StackVertical>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		children: PropTypes.node,
		id: PropTypes.string,
		label: PropTypes.string,
		labelProps: PropTypes.object,
	};
}
FieldTemplate.displayName = 'FieldTemplate';

export default FieldTemplate;
