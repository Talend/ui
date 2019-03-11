import Notification from './Notification.connect';
import pushNotification from './pushNotification';
import clearNotifications from './clearNotifications';
import notificationActionCreator from './Notification.actions';

Notification.push = pushNotification;
Notification.clear = clearNotifications;

export default Notification;

export {
	notificationActionCreator,
};
