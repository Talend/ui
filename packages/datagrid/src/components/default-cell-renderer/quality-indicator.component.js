import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './quality-indicator.scss';

export default function QualityIndicator(props) {
	return <div className={classNames(theme['quality-indicator'])} title={props.tooltip} />;
}

QualityIndicator.propTypes = {
	tooltip: PropTypes.string,
};
