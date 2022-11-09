/* eslint-disable import/prefer-default-export */
import '../polyfills/element-closest';
import { withListGesture } from './withListGesture';
import { withTreeGesture } from './withTreeGesture';
import { WithDynamicListGesture } from './withDynamicListGesture';
import { withCalendarGesture, withMonthCalendarGesture } from './withCalendarGesture';

const Gesture = {
	withMonthCalendarGesture,
	withListGesture,
	withTreeGesture,
	WithDynamicListGesture,
	withCalendarGesture,
};

export default Gesture;
