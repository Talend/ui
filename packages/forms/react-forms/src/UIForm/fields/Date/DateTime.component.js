import React from 'react';
import PropTypes from 'prop-types';
import DateWidget from './Date.component';

export default function DateTimeWidget(props) {
	return <DateWidget {...props} useSeconds={props.options.useSeconds} useTime />;
}
DateTimeWidget.displayMode = 'DateTimeWidget';
DateTimeWidget.defaultProps = {
	options: {},
};
DateTimeWidget.propTypes = {
	options: PropTypes.shape({
		useSeconds: PropTypes.bool,
	}),
};
