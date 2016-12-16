import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import { Action } from '../Actions';
import theme from './Notification.scss';

export const timerRegistry = {};

export const Registry = {
	register: (notification, timer) => {
		timerRegistry[notification.id] = timer;
	},
	cancel(notification) {
		if (this.isRegistered(notification)) {
			clearTimeout(timerRegistry[notification.id]);
		}
	},
	isRegistered: notification => !!timerRegistry[notification.id],
};

export const onMouseEnter = (notification) => {
	if (notification.type !== 'error') {
		Registry.cancel(notification);
	}
};

export const onMouseOut = (event, notification, leaveFn, autoLeaveTimeout) => {
	if (notification.type === 'error' || event.currentTarget.getAttribute('pin') === 'true') {
		return;
	}
	Registry.register(
		notification,
		setTimeout(() => leaveFn(notification), autoLeaveTimeout),
	);
};

export const onClick = (event, notification) => {
	if (notification.type !== 'error') {
		if (event.currentTarget.getAttribute('pin') !== 'true') {
			event.currentTarget.setAttribute('pin', 'true');
		} else {
			event.currentTarget.setAttribute('pin', 'false');
		}
	}
};

export const onManuallyClose = (event, notification, leaveFn) => {
	event.stopPropagation();
	Registry.cancel(notification);
	leaveFn(notification);
};

function CloseButton({notification, leaveFn}){
	return (
		<Action
			onClick={() => leaveFn(notification)}
			label={''}
			icon={'talend-crossbig'}
			bsClass={classNames(
				theme['tc-notification-action'], 'tc-notification-action',
				theme['tc-notification-close'], '.tc-notification-close'
			)}
		/>
	);
}

function MessageAction({ action }) {
	return !!action &&
		<Action
			{...action}
			bsClass={classNames(
				theme['tc-notification-action'], 'tc-notification-action',
				theme['tc-notification-message-action'], 'tc-notification-message-action'
			)}
		/>;
}

function Message({ notification }) {
	const { message, action } = notification;
	const messageClass = classNames(theme['tc-notification-message'], 'tc-notification-message');
	return Array.isArray(message) ?
		<article>
			{message.map((paragraph, index) => (
				<p key={index} className={messageClass}>
					{paragraph}
					{ index === (message.length - 1) && <MessageAction action={action} /> }
				</p>
			))}
		</article>
		 :
		<p className={messageClass}>
			{message}
			<MessageAction action={action} />
		</p>
}

function TimerBar({ type }) {
	return type !== 'error' && <div
		className={classNames(
			theme['tc-notification-timer-bar'], 'tc-notification-timer-bar'
		)}
	/>
}

function Notification({ notification, leaveFn, autoLeaveTimeout }) {
	const notificationClasses = {
		[theme['tc-notification']]: true,
		'tc-notification': true,

		[theme['tc-notification-info']]: !notification.type || notification.type === 'info',
		'tc-notification-info': !notification.type || notification.type === 'info',

		[theme['tc-notification-warning']]: notification.type === 'warning',
		'tc-notification-warning': notification.type === 'warning',

		[theme['tc-notification-error']]: notification.type === 'error',
		'tc-notification-error': notification.type === 'error',
	};
	const classes = classNames(notificationClasses);
	let tabIndex = 1;
	return (
		<div
			role="status"
			className={classes}
			onMouseEnter={() => onMouseEnter(notification)}
			onMouseLeave={event => onMouseOut(event, notification, leaveFn, autoLeaveTimeout)}
			onClick={event => onClick(event, notification)}
			tabIndex={tabIndex += 1}
		>
			<CloseButton {...{notification, leaveFn}} />
			<Message notification={notification} />
			<TimerBar type={notification.type} />
		</div>
	);
}

function renderNotifications({ notifications, leaveFn, autoLeaveTimeout }) {
	return notifications.map(
		(notification) => {
			if (!Registry.isRegistered(notification) && notification.type !== 'error') {
				Registry.register(
					notification,
					setTimeout(() => leaveFn(notification), autoLeaveTimeout)
				);
			}
			return <Notification key={notification.id} {...{notification, leaveFn, autoLeaveTimeout}} />;
		}
	);
}

function NotificationsContainer({ enterTimeout, leaveTimeout, notifications, leaveFn, autoLeaveTimeout }) {
	return (
		<div className={classNames(theme['tc-notification-container'], 'tc-notification-container')}>
			<ReactCSSTransitionGroup
				transitionName="tc-notification"
				transitionEnterTimeout={enterTimeout}
				transitionLeaveTimeout={leaveTimeout}
			>
				{renderNotifications({notifications, leaveFn, autoLeaveTimeout})}
			</ReactCSSTransitionGroup>
		</div>
	);
}

const notificationShape = {
	id: PropTypes.any.isRequired,
	type: PropTypes.oneOf(['info', 'warning', 'error']),
	message: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	]).isRequired,
	action: PropTypes.shape(Action.propTypes),
};

CloseButton.propTypes = {
	notification: PropTypes.shape(notificationShape).isRequired,
	leaveFn: PropTypes.func.isRequired,
};

MessageAction.propTypes = {
	action: PropTypes.shape(Action.propTypes)
};

Message.propTypes = {
	notification: PropTypes.shape(notificationShape).isRequired
};

TimerBar.propTypes = {
	type: PropTypes.oneOf(['info', 'warning', 'error'])
};

Notification.propTypes = {
	notification: PropTypes.shape(notificationShape).isRequired,
	leaveFn: PropTypes.func.isRequired,
	autoLeaveTimeout: PropTypes.number,
};

NotificationsContainer.propTypes = {
	enterTimeout: PropTypes.number,
	leaveTimeout: PropTypes.number,
	autoLeaveTimeout: PropTypes.number,
	notifications: PropTypes.arrayOf(PropTypes.shape(notificationShape)).isRequired,
	leaveFn: PropTypes.func.isRequired,
};

NotificationsContainer.defaultProps = {
	enterTimeout: 300,
	leaveTimeout: 280,
	autoLeaveTimeout: 4000,
};

export default NotificationsContainer;
