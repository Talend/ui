import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Actions from './../Actions/Actions.component';
import CircularProgress from './../CircularProgress/CircularProgress.component';
import Icon from './../Icon/Icon.component';

import css from './Status.scss';

/**
 * @param {object} props react props
 * @example
 const status = {
			status: 'Successful',
			label: 'Successful',
			icon: 'fa fa-check',
			actions: [
					{
						label: 'cancel',
						icon: 'fa fa-cancel',
						onClick: action('onCancel'),
					},
					{
						label: 'delete',
						icon: 'fa fa-delete',
						onClick: action('onDelete'),
					}],
	};
 <Status {...status}/>
 */

export const STATUS = {
	IN_PROGRESS: 'inProgress',
	SUCCESSFUL: 'successful',
	FAILED: 'failed',
	CANCELED: 'canceled',
	WARNING: 'warning',
};

export function getbsStyleFromStatus(status) {
	switch (status) {
		case STATUS.IN_PROGRESS:
			return 'info';
		case STATUS.SUCCESSFUL:
			return 'success';
		case STATUS.FAILED:
			return 'danger';
		case STATUS.CANCELED:
			return 'muted';
		case STATUS.WARNING:
			return 'warning';
		default:
			return '';
	}
}

function renderIcon(status, icon, progress) {
	if (status === STATUS.IN_PROGRESS) {
		if (icon) {
			return <Icon name={icon} />;
		}
		return <CircularProgress size={'small'} percent={progress} />;
	}
	return icon && <Icon name={icon} />;
}

export function Status({ status, label, icon, actions, progress }) {
	const rootClassnames = classNames(css['tc-status'], 'tc-status', {
		[css.action]: actions && actions.length,
	});

	const iconClassnames = classNames(
		css['tc-status-icon'],
		'tc-status-icon',
		css[getbsStyleFromStatus(status)],
	);

	return (
		<div role="status" className={rootClassnames}>
			<span className={iconClassnames}>{renderIcon(status, icon, progress)}</span>
			<span className={classNames(css['tc-status-label'], 'tc-status-label')}>{label}</span>
			<Actions
				actions={actions}
				className={classNames(css['tc-status-actions'], 'tc-status-actions')}
			/>
		</div>
	);
}

Status.displayName = 'Status';

Status.propTypes = {
	status: PropTypes.oneOf([
		STATUS.IN_PROGRESS,
		STATUS.SUCCESSFUL,
		STATUS.FAILED,
		STATUS.CANCELED,
		STATUS.WARNING,
	]),
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	icon: PropTypes.string,
	actions: Actions.propTypes.actions,
	progress: PropTypes.number,
};

Status.defaultProps = {
	actions: [],
};
