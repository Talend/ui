import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Actions from '../Actions/Actions.component';
import CircularProgress from '../CircularProgress/CircularProgress.component';
import Icon from '../Icon/Icon.component';
import Skeleton from '../Skeleton';

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
	SKELETON: 'skeleton',
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
		case STATUS.SKELETON:
			return 'skeleton';
		default:
			return '';
	}
}

function renderIcon(status, icon, progress) {
	switch (status) {
		case STATUS.IN_PROGRESS:
			if (icon) {
				return <Icon name={icon} />;
			}
			return <CircularProgress size="small" percent={progress} />;

		case STATUS.SKELETON:
			return (
				<Skeleton
					className={classNames(css['tc-status-skeleton-item'], 'tc-status-skeleton-item')}
					type={Skeleton.TYPES.circle}
					size={Skeleton.SIZES.small}
				/>
			);
		default:
			return icon && <Icon name={icon} />;
	}
}

function renderLabel(status, label) {
	if (status === STATUS.SKELETON) {
		return (
			<Skeleton
				className={classNames(css['tc-status-skeleton-item'], 'tc-status-skeleton-item')}
				type={Skeleton.TYPES.text}
				size={Skeleton.SIZES.large}
			/>
		);
	}

	return label;
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

	const labelClassNames = classNames(
		css['tc-status-label'],
		'tc-status-label',
		css[getbsStyleFromStatus(status)],
	);

	return (
		<div role="status" className={rootClassnames}>
			<span className={iconClassnames}>{renderIcon(status, icon, progress)}</span>
			<span className={labelClassNames}>
				{renderLabel(status, label)}
			</span>
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
		STATUS.SKELETON,
	]),
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	icon: PropTypes.string,
	actions: Actions.propTypes.actions,
	progress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Status.defaultProps = {
	actions: [],
};

Status.getBsStyleFromStatus = getbsStyleFromStatus;
