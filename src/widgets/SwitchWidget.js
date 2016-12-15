import React from 'react';

import Checkbox from 'react-jsonschema-form/lib/components/widgets/CheckboxWidget';

/**
 * Render Switch widget for on/off field
 * @param props
 * @returns {*} Radio inputs if choices length is gte to 2 or Select
 * @constructor
 */
const SwitchWidget = (props) => {
	const propsWithHiddenLabel = {...props, displayLabel: false};
	return (
		<div className="switch">
			<Checkbox {...propsWithHiddenLabel} />
		</div>
	);
};

export default SwitchWidget;
