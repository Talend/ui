import PropTypes from 'prop-types';
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
function RadioOrSelectWidget(props) {
	if (props.options && props.options.enumOptions) {
		if (props.options.enumOptions.length <= MAX_TO_RADIO) {
			return <Radio {...props} />;
		}
	}
	return <Select {...props} />;
}

if (process.env.NODE_ENV !== 'production') {
	RadioOrSelectWidget.propTypes = {
		options: PropTypes.shape({
			enumOptions: PropTypes.array,
		}),
	};
}

export default RadioOrSelectWidget;
