import Notification from './Notification.connect';
import pushNotification from './pushNotification';
import clearNotifications from './clearNotifications';
import actionCreators from './Notification.actions';
import constants from './Notification.constants';

Notification.push = pushNotification;
Notification.clear = clearNotifications;
Notification.actionCreators = actionCreators;
Notification.constants = constants;

export default Notification;
