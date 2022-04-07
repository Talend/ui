/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
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
		<div
			className={classNames(theme['tc-notification-timer-bar'], 'tc-notification-timer-bar')}
			data-testid="timer"
		/>
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
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div
			role={isError ? 'alert' : 'status'}
			className={classes}
			onClick={event => props.onClick(event, notification)}
			onFocus={enterAction}
			onMouseEnter={enterAction}
			onMouseLeave={leaveAction}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
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

function NotificationsContainer({
	autoLeaveError,
	autoLeaveTimeout,
	enterTimeout,
	leaveFn,
	leaveTimeout,
	notifications,
}) {
	const registryRef = useRef(new Registry());
	const registry = registryRef.current;

	useEffect(() => {
		if (!registry) {
			return;
		}
		notifications
			.filter(notification => !registry.isRegistered(notification))
			.filter(notification => notification.type !== TYPES.ERROR || autoLeaveError)
			.forEach(notification => {
				registry.register(
					notification,
					new Timer(() => {
						leaveFn(notification);
						registry.cancel(notification);
					}, autoLeaveTimeout),
				);
			});
	}, [autoLeaveError, autoLeaveTimeout, leaveFn, notifications, registry]);

	const onClick = (event, notification) => {
		if (notification.type !== TYPES.ERROR || this.props.autoLeaveError) {
			if (event.currentTarget.getAttribute('pin') !== 'true') {
				event.currentTarget.setAttribute('pin', 'true');
			} else {
				event.currentTarget.setAttribute('pin', 'false');
				leaveFn(notification);
			}
		}
	};

	const onClose = (event, notification) => {
		event.stopPropagation();
		registry.cancel(notification);
		leaveFn(notification);
	};

	const onMouseEnter = (event, notification) => {
		if (notification.type !== TYPES.ERROR || autoLeaveError) {
			registry.pause(notification);
		}
	};

	const onMouseOut = (event, notification) => {
		if (
			(notification.type !== TYPES.ERROR || autoLeaveError) &&
			event.currentTarget.getAttribute('pin') !== 'true'
		) {
			registry.resume(notification);
		}
	};

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
							autoLeaveError={autoLeaveError}
							onMouseEnter={onMouseEnter}
							onMouseOut={onMouseOut}
							onClose={onClose}
							onClick={onClick}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
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
