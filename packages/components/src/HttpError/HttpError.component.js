import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';

import css from './HttpError.scss';

const className = 'http-error';

function getScopedClassName(scopedClassName = className) {
	return [css[scopedClassName], scopedClassName];
}

function HttpError(props) {
	const { backAction, backLabel, message, status, style, title } = props;

	return (
		<div className={classNames(getScopedClassName())} data-status={status}>
			<div
				className={classNames(getScopedClassName(`${className}-content`), `${className}-${status}`)}
				style={style}
			>
				<h1>{title}</h1>
				<p>{message}</p>
				{backAction && (
					<Action icon="talend-arrow-left" label={backLabel} link onClick={backAction} />
				)}
			</div>
		</div>
	);
}

HttpError.displayName = 'HttpError';

HttpError.propTypes = {
	backAction: PropTypes.func,
	backLabel: PropTypes.string,
	message: PropTypes.string.isRequired,
	status: PropTypes.number.isRequired,
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	title: PropTypes.string.isRequired,
};

export default HttpError;
