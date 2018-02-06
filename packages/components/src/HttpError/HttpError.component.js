import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import css from './HttpError.scss';

const className = 'http-error';

function getScopedClassName(scopedClassName = className) {
	return [css[scopedClassName], scopedClassName];
}

function HttpError(props) {
	const { status, title, message, style } = props;

	return (
		<div className={classNames(getScopedClassName())} data-status={status}>
			<div
				className={classNames(getScopedClassName(`${className}-content`), `${className}-${status}`)}
				style={style}
			>
				<h1>{title}</h1>
				<p>{message}</p>
			</div>
		</div>
	);
}

HttpError.displayName = 'HttpError';

HttpError.propTypes = {
	status: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default HttpError;
