import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './QualityBar.scss';

const QUALITY_BAR_MIN_WIDTH = 5;

export default function QualityBar(props) {
	return (
		<div className={classNames(theme['td-quality-bar'], 'td-quality-bar')}>
			{!!props.invalid && (
				<span
					className={classNames(theme['td-quality-bar-invalid'], 'td-quality-bar-invalid')}
					style={{ width: `${props.invalid}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={`${props.invalid}%`}
				/>
			)}
			{!!props.empty && (
				<span
					className={classNames(theme['td-quality-bar-empty'], 'td-quality-bar-empty')}
					style={{ width: `${props.empty}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={`${props.empty}%`}
				/>
			)}
			{!!props.valid && (
				<span
					className={classNames(theme['td-quality-bar-valid'], 'td-quality-bar-valid')}
					style={{ width: `${props.valid}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={`${props.valid}%`}
				/>
			)}
		</div>
	);
}

QualityBar.propTypes = {
	valid: PropTypes.number,
	empty: PropTypes.number,
	invalid: PropTypes.number,
};
