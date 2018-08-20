import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import { Action } from '../Actions';
import theme from './Notification.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';

function CloseButtonComponent({ notification, leaveFn, t }) {
	return (
		<Action
			onClick={() => leaveFn(notification)}
			label={''}
			icon={'talend-cross'}
			bsClass={classNames(
				theme['tc-notification-action'],
				'tc-notification-action',
				theme['tc-notification-close'],
				'.tc-notification-close',
			)}
			aria-label={t('NOTIFICATION_CLOSE', { defaultValue: 'Close notification' })}
		/>
	);
}
CloseButtonComponent.propTypes = {
	notification: PropTypes.object,
	leaveFn: PropTypes.func,
	t: PropTypes.func,
};
CloseButtonComponent.defaultProps = {
	t: getDefaultT(),
};
export const CloseButton = translate(I18N_DOMAIN_COMPONENTS)(CloseButtonComponent);

export function MessageAction({ action }) {
	return (
		!!action && (
			<Action
				{...action}
				bsClass={classNames(
					theme['tc-notification-action'],
					'tc-notification-action',
					theme['tc-notification-message-action'],
					'tc-notification-message-action',
				)}
			/>
		)
	);
}

export function Message({ notification }) {
	const { title, message, action } = notification;
	const messages = Array.isArray(message) ? message : [message];
	const titleClass = classNames(theme['tc-notification-title'], 'tc-notification-title');
	const messageClass = classNames(theme['tc-notification-message'], 'tc-notification-message');

	return (
		<article className={theme.article}>
			{title && <h3 className={titleClass}>{title}</h3>}
			{messages.map((paragraph, index) => (
				<p key={index} className={messageClass}>
					{paragraph}
					{index === messages.length - 1 && <MessageAction action={action} />}
				</p>
			))}
		</article>
	);
}

export function TimerBar({ type, autoLeaveError }) {
	if (type === 'error' && !autoLeaveError) {
		return null;
	}
	return (
		<div className={classNames(theme['tc-notification-timer-bar'], 'tc-notification-timer-bar')} />
	);
}

export function Notification({ notification, leaveFn, ...props }) {
	const isError = notification.type === 'error';
	const classes = classNames(theme['tc-notification'], 'tc-notification', {
		[theme['tc-notification-info']]: !notification.type || notification.type === 'info',
		'tc-notification-info': !notification.type || notification.type === 'info',

		[theme['tc-notification-warning']]: notification.type === 'warning',
		'tc-notification-warning': notification.type === 'warning',

		[theme['tc-notification-error']]: isError,
		'tc-notification-error': isError,
	});
	const enterAction = event => props.onMouseEnter(event, notification);
	const leaveAction = event => props.onMouseOut(event, notification);

	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			role={isError ? 'alert' : 'status'}
			className={classes}
			onClick={event => props.onClick(event, notification)}
			onFocus={enterAction}
			onMouseEnter={enterAction}
			onMouseLeave={leaveAction}
			tabIndex={0}
		>
			<CloseButton {...{ notification, leaveFn }} />
			<Message notification={notification} />
			<TimerBar type={notification.type} autoLeaveError={props.autoLeaveError} />
		</div>
	);
}

class NotificationsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onClose = this.onClose.bind(this);
		this.register = this.register.bind(this);
		this.timerRegistry = {};
		const self = this;
		this.registry = {
			register: (notification, timer) => {
				self.timerRegistry[notification.id] = timer;
			},
			isRegistered: notification => !!self.timerRegistry[notification.id],
			cancel(notification) {
				if (this.isRegistered(notification)) {
					clearTimeout(self.timerRegistry[notification.id]);
				}
			},
		};
		this.register(props);
	}

	componentWillReceiveProps(nextProps) {
		this.register(nextProps);
	}

	onClick(event, notification) {
		if (notification.type !== 'error' || this.props.autoLeaveError) {
			if (event.currentTarget.getAttribute('pin') !== 'true') {
				event.currentTarget.setAttribute('pin', 'true');
			} else {
				event.currentTarget.setAttribute('pin', 'false');
				this.props.leaveFn(notification);
			}
		}
	}

	onClose(event, notification) {
		event.stopPropagation();
		this.registry.cancel(notification);
		this.props.leaveFn(notification);
	}

	onMouseEnter(event, notification) {
		if (notification.error !== 'error' || this.props.autoLeaveError) {
			this.registry.cancel(notification);
			event.currentTarget.setAttribute('pin', 'true');
		}
	}

	onMouseOut(event, notification) {
		if (
			(notification.type !== 'error' || this.props.autoLeaveError) &&
			event.currentTarget.getAttribute('pin') !== 'true'
		) {
			this.props.leaveFn(notification);
		}
	}

	register(props) {
		props.notifications
			.filter(notification => !this.registry.isRegistered(notification))
			.filter(notification => notification.type !== 'error' || props.autoLeaveError)
			.forEach(notification => {
				this.registry.register(
					notification,
					setTimeout(() => this.props.leaveFn(notification), this.props.autoLeaveTimeout),
				);
			});
	}

	render() {
		const { enterTimeout, leaveTimeout, notifications, leaveFn, autoLeaveTimeout } = this.props;
		return (
			<div className={classNames(theme['tc-notification-container'], 'tc-notification-container')}>
				{
					<TransitionGroup>
						{notifications.map(notification => (
							<CSSTransition
								classNames="tc-notification"
								key={notification.id}
								timeout={{ enter: enterTimeout, exit: leaveTimeout }}
							>
								<Notification
									notification={notification}
									leaveFn={leaveFn}
									autoLeaveTimeout={autoLeaveTimeout}
									autoLeaveError={this.props.autoLeaveError}
									onMouseEnter={this.onMouseEnter}
									onMouseOut={this.onMouseOut}
									onClose={this.onClose}
									onClick={this.onClick}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				}
			</div>
		);
	}
}

const notificationShape = {
	id: PropTypes.any.isRequired,
	type: PropTypes.oneOf(['info', 'warning', 'error']),
	title: PropTypes.string,
	message: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
	action: PropTypes.shape(Action.propTypes),
};

CloseButton.propTypes = {
	notification: PropTypes.shape(notificationShape).isRequired,
	leaveFn: PropTypes.func.isRequired,
};

MessageAction.propTypes = {
	action: PropTypes.shape(Action.propTypes),
};

Message.propTypes = {
	notification: PropTypes.shape(notificationShape).isRequired,
};

TimerBar.propTypes = {
	type: PropTypes.oneOf(['info', 'warning', 'error']),
	autoLeaveError: PropTypes.bool,
};

Notification.displayName = 'Notification';

Notification.propTypes = {
	notification: PropTypes.shape(notificationShape).isRequired,
	leaveFn: PropTypes.func.isRequired,
	autoLeaveTimeout: PropTypes.number,
	autoLeaveError: PropTypes.bool,
	onMouseEnter: PropTypes.func,
	onMouseOut: PropTypes.func,
	onClick: PropTypes.func,
};

NotificationsContainer.displayName = 'NotificationsContainer';

NotificationsContainer.propTypes = {
	enterTimeout: PropTypes.number,
	leaveTimeout: PropTypes.number,
	autoLeaveTimeout: PropTypes.number,
	notifications: PropTypes.arrayOf(PropTypes.shape(notificationShape)).isRequired,
	leaveFn: PropTypes.func.isRequired,
	autoLeaveError: PropTypes.bool,
};

NotificationsContainer.defaultProps = {
	enterTimeout: 300,
	leaveTimeout: 300,
	autoLeaveTimeout: 4000,
	autoLeaveError: false,
};

export default NotificationsContainer;
