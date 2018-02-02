import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './quality-indicator.scss';

export default function QualityIndicator(props) {
	return (
		<div
			className={classNames(theme['quality-indicator'], {
				[theme['quality-indicator-bad']]: props.value < 0,
				[theme['quality-indicator-empty']]: props.value === 0,
			})}
			title={props.tooltip}
		/>
	);
}

QualityIndicator.propTypes = {
	tooltip: PropTypes.string,
};
