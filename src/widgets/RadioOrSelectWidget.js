import React from 'react';

import Radio from 'react-jsonschema-form/lib/components/widgets/RadioWidget';
import Select from 'react-jsonschema-form/lib/components/widgets/SelectWidget';

const MAX_TO_RADIO = 2;

/**
 * Render Radio or Select by choices length
 * @param props
 * @returns {*} Radio inputs if choices length is gte to 2 or Select
 * @constructor
 */
const RadioOrSelectWidget = (props) => {
	const options = props.options && props.options;
	const enumOptions = options && options.enumOptions;
	const shouldDisplayRadio = enumOptions && enumOptions.length <= MAX_TO_RADIO;

	if (shouldDisplayRadio) {
		return <Radio {...props} />;
	}
	return <Select {...props} />;
};

RadioOrSelectWidget.propTypes = {
	options: React.PropTypes.shape({
		enumOptions: React.PropTypes.array,
	}),
};

export default RadioOrSelectWidget;
