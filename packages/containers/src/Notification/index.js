import Notification from './Notification.connect';
import pushNotification from './pushNotification';
import clearNotifications from './clearNotifications';

Notification.push = pushNotification;
Notification.clear = clearNotifications;
export default Notification;
