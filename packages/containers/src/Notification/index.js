import Notification from './Notification.connect';
import pushNotification from './pushNotification';
import clearNotifications from './clearNotifications';
import actionCreators from './Notification.actions';

Notification.push = pushNotification;
Notification.clear = clearNotifications;
Notification.actionCreators = actionCreators;

export default Notification;
