import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import { Action } from '../Actions';
import theme from './Notification.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';

const TYPES = {
	INFO: 'info',
	WARNING: 'warning',
	ERROR: 'error',
};

function CloseButtonComponent(props) {
	return (
		<Action
			onClick={() => props.leaveFn(props.notification)}
			data-feature={props['data-feature']}
			label=""
			icon="talend-cross"
			bsClass={classNames(
				theme['tc-notification-action'],
				'tc-notification-action',
				theme['tc-notification-close'],
				'.tc-notification-close',
			)}
			aria-label={props.t('NOTIFICATION_CLOSE', { defaultValue: 'Close notification' })}
		/>
	);
}
CloseButtonComponent.propTypes = {
	notification: PropTypes.object,
	leaveFn: PropTypes.func,
	t: PropTypes.func,
	'data-feature': PropTypes.string,
};
CloseButtonComponent.defaultProps = {
	t: getDefaultT(),
};
const CloseButton = withTranslation(I18N_DOMAIN_COMPONENTS)(CloseButtonComponent);

function MessageAction({ action }) {
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

function Message({ notification }) {
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

function TimerBar({ type, autoLeaveError }) {
	if (type === TYPES.ERROR && !autoLeaveError) {
		return null;
	}
	return (
		<div className={classNames(theme['tc-notification-timer-bar'], 'tc-notification-timer-bar')} />
	);
}

function Notification({ notification, leaveFn, ...props }) {
	const isInfo = !notification.type || notification.type === TYPES.INFO;
	const isWarning = notification.type === TYPES.WARNING;
	const isError = notification.type === TYPES.ERROR;

	const classes = classNames(theme['tc-notification'], 'tc-notification', {
		[theme['tc-notification-info']]: isInfo,
		'tc-notification-info': isInfo,

		[theme['tc-notification-warning']]: isWarning,
		'tc-notification-warning': isWarning,

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
			<CloseButton
				notification={notification}
				leaveFn={leaveFn}
				data-feature={`close-notification-${notification.type}`}
			/>
			<Message notification={notification} />
			<TimerBar type={notification.type} autoLeaveError={props.autoLeaveError} />
		</div>
	);
}

class Timer {
	constructor(callback, delay) {
		this.timerId = null;
		this.start = null;
		this.callbackFn = callback;
		this.remaining = delay;
		this.resume();
	}

	pause() {
		clearTimeout(this.timerId);
		this.remaining -= Date.now() - this.start;
	}

	resume() {
		this.start = Date.now();
		clearTimeout(this.timerId);
		this.timerId = setTimeout(this.callbackFn, this.remaining);
	}

	cancel() {
		clearTimeout(this.timerId);
	}
}

class Registry {
	constructor() {
		this.timerRegistry = {};
	}

	isRegistered(notification) {
		return !!this.timerRegistry[notification.id];
	}

	register(notification, timer) {
		this.timerRegistry[notification.id] = timer;
	}

	pause(notification) {
		if (this.isRegistered(notification)) {
			this.timerRegistry[notification.id].pause();
		}
	}

	resume(notification) {
		if (this.isRegistered(notification)) {
			this.timerRegistry[notification.id].resume();
		}
	}

	cancel(notification) {
		if (this.isRegistered(notification)) {
			this.timerRegistry[notification.id].cancel();
			// Clean registry to avoid memory leak
			delete this.timerRegistry[notification.id];
		}
	}
}

class NotificationsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.registry = new Registry();
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onClose = this.onClose.bind(this);
		this.register = this.register.bind(this);
		this.register(props);
	}

	componentWillReceiveProps(nextProps) {
		this.register(nextProps);
	}

	onClick(event, notification) {
		if (notification.type !== TYPES.ERROR || this.props.autoLeaveError) {
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
			this.registry.pause(notification);
		}
	}

	onMouseOut(event, notification) {
		if (
			(notification.type !== TYPES.ERROR || this.props.autoLeaveError) &&
			event.currentTarget.getAttribute('pin') !== 'true'
		) {
			this.registry.resume(notification);
		}
	}

	register(props) {
		props.notifications
			.filter(notification => !this.registry.isRegistered(notification))
			.filter(notification => notification.type !== TYPES.ERROR || props.autoLeaveError)
			.forEach(notification => {
				this.registry.register(
					notification,
					new Timer(() => {
						this.props.leaveFn(notification);
						this.registry.cancel(notification);
					}, this.props.autoLeaveTimeout),
				);
			});
	}

	render() {
		const { enterTimeout, leaveTimeout, notifications, leaveFn, autoLeaveTimeout } = this.props;
		return (
			<div className={classNames(theme['tc-notification-container'], 'tc-notification-container')}>
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
			</div>
		);
	}
}

const notificationShape = {
	id: PropTypes.any.isRequired,
	type: PropTypes.oneOf(Object.values(TYPES)),
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
	type: PropTypes.oneOf(Object.values(TYPES)),
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

NotificationsContainer.TYPES = TYPES;

export default NotificationsContainer;
