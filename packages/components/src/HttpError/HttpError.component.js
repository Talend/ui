import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './HttpError.scss';

const className = 'http-error';

function HttpError(props) {
	const {
		status,
		title,
		message,
		style,
	} = props;

	return (
		<div
			className={classNames(css[className], className, `${className}-${status}`)}
			data-status={status}
		>
			<div
				className={`${className}-${status}`}
				style={style}
			>
				<h1>{title}</h1>
				<p>{message}</p>
			</div>
		</div>
	);
}

HttpError.propTypes = {
	status: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};

export default HttpError;
