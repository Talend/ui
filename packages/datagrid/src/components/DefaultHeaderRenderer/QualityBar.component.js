import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './QualityBar.scss';

const QUALITY_BAR_MIN_WIDTH = 5;

export default function QualityBar(props) {
	return (
		<div className={classNames(theme['td-quality-bar'], 'td-quality-bar')}>
			{!!props.invalid.total && (
				<span
					className={classNames(theme['td-quality-bar-invalid'], 'td-quality-bar-invalid')}
					style={{ width: `${props.invalid.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={`${props.invalid.total} invalid values (${props.invalid.percentage}%)`}
				/>
			)}
			{!!props.empty.total && (
				<span
					className={classNames(theme['td-quality-bar-empty'], 'td-quality-bar-empty')}
					style={{ width: `${props.empty.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={`${props.empty.total} empty values (${props.empty.percentage}%)`}
				/>
			)}
			{!!props.valid.total && (
				<span
					className={classNames(theme['td-quality-bar-valid'], 'td-quality-bar-valid')}
					style={{ width: `${props.valid.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={`${props.valid.total} valid values (${props.valid.percentage}%)`}
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
