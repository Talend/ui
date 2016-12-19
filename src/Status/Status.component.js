import React, { PropTypes } from 'react';
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

export const STATUS_IN_PROGRESS = 'inProgress';
export const STATUS_SUCCESSFUL = 'successful';
export const STATUS_FAILED = 'failed';
export const STATUS_CANCELED = 'canceled';

function getbsStyleFromStatus(status) {
	switch (status) {
	case STATUS_IN_PROGRESS:
		return 'info';
	case STATUS_SUCCESSFUL:
		return 'success';
	case STATUS_FAILED:
		return 'danger';
	case STATUS_CANCELED:
		return 'muted';
	default:
		return '';
	}
}

function renderIcon(status, icon) {
	if (status === STATUS_IN_PROGRESS) {
		return (icon ? <Icon name={icon} /> : <CircularProgress size={'small'} />);
	}
	return (icon && <Icon name={icon} />);
}

function Status(props) {
	const {
		status,
		label,
		icon,
		actions,
	} = props;

	return (
		<div className={classNames(css['tc-status'], `text-${getbsStyleFromStatus(status)}`)}>
			{renderIcon(status, icon)}
			<span className={css['tc-status-label']}> {label} </span>
			<span className={css['tc-status-actions']}>
				<Actions actions={actions} />
			</span>
		</div>
	);
}

Status.propTypes = {
	status: PropTypes.oneOf([
		STATUS_IN_PROGRESS,
		STATUS_SUCCESSFUL,
		STATUS_FAILED,
		STATUS_CANCELED,
	]),
	label: PropTypes.string.isRequired,
	icon: PropTypes.string,
	actions: PropTypes.shape(
		Actions.propTypes.actions
	),
};

Status.defaultProps = {
	actions: [],
};

export default Status;
