import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './quality-bar.scss';

export default function QualityBar(props) {
	return (
		<div className={classNames(theme['td-quality-bar'], 'td-quality-bar')}>
			<span
				className={classNames(theme['td-quality-bar-invalid'], 'td-quality-bar-invalid')}
				style={{ width: `${props.invalid}%` }}
				title={`${props.invalid}%`}
			/>
			<span
				className={classNames(theme['td-quality-bar-empty'], 'td-quality-bar-empty')}
				style={{ width: `${props.empty}%` }}
				title={`${props.empty}%`}
			/>
			<span
				className={classNames(theme['td-quality-bar-valid'], 'td-quality-bar-valid')}
				style={{ width: `${props.valid}%` }}
				title={`${props.valid}%`}
			/>
		</div>
	);
}

QualityBar.propTypes = {
	valid: PropTypes.number,
	empty: PropTypes.number,
	invalid: PropTypes.number,
};
