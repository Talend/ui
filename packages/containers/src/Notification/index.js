import Notification from './Notification.connect';
import pushNotification from './pushNotification';
import clearNotifications from './clearNotifications';
import * as actions from './Notification.actions';
import constants from './Notification.constants';
import sagas from './Notification.sagas';

Notification.push = pushNotification;
Notification.clear = clearNotifications;
Notification.actions = actions;
Notification.constants = constants;
Notification.sagas = sagas;

export default Notification;
