import React, { PropTypes } from 'react';

import Toggle from 'react-talend-components/lib/Toggle';

/**
 * Render Switch widget for on/off field
 * @param props
 * @returns {*} Radio inputs if choices length is gte to 2 or Select
 * @constructor
 */
const ToggleWidget = (props) => {
	const propsWithHiddenLabel = { ...props, displayLabel: false, value: props.checked };

	return (
		<div className="switch">
			<Toggle
				{...propsWithHiddenLabel}
			/>
		</div>
	);
};

if (process.env.NODE_ENV !== 'production') {
	ToggleWidget.propTypes = {
		checked: PropTypes.bool,
	};
}

export default ToggleWidget;
