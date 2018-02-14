import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './quality-indicator.scss';

export default function QualityIndicator(props) {
	return (
		<div
			className={classNames(theme['td-cell-quality-indicator'], 'td-cell-quality-indicator', {
				[theme['td-cell-quality-indicator-invalid']]: props.value < 0,
				[theme['td-cell-quality-indicator-empty']]: props.value === 0,
			})}
			title={props.tooltip}
		/>
	);
}

QualityIndicator.propTypes = {
	tooltip: PropTypes.string,
};
