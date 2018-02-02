import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './quality-bar.scss';

export default function QualityBar(props) {
	return (
		<div className={classNames(theme['quality-bar'])}>
			<span
				className={classNames(theme['quality-bar-invalid'])}
				style={{ width: `${props.invalid}%` }}
				title={`${props.invalid}%`}
			/>
			<span
				className={classNames(theme['quality-bar-empty'])}
				style={{ width: `${props.empty}%` }}
				title={`${props.empty}%`}
			/>
			<span
				className={classNames(theme['quality-bar-valid'])}
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
