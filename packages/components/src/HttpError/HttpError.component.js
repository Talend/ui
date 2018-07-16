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
	const { message, status, style, onLinkClick, linkLabel, title } = props;

	return (
		<div className={classNames(getScopedClassName())} data-status={status}>
			<div
				className={classNames(getScopedClassName(`${className}-content`), `${className}-${status}`)}
				style={style}
			>
				<h1>{title}</h1>
				<p>{message}</p>
				{onLinkClick && (
					<Action icon="talend-arrow-left" label={linkLabel} link onClick={onLinkClick} />
				)}
			</div>
		</div>
	);
}

HttpError.displayName = 'HttpError';

HttpError.propTypes = {
	message: PropTypes.string.isRequired,
	linkLabel: PropTypes.string,
	onLinkClick: PropTypes.func,
	status: PropTypes.number.isRequired,
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	title: PropTypes.string.isRequired,
};

export default HttpError;
