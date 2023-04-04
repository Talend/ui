/* eslint-disable import/prefer-default-export */
import { withListGesture } from './withListGesture';
import { withTreeGesture } from './withTreeGesture';
import { WithDynamicListGesture } from './withDynamicListGesture';
import { withCalendarGesture } from './withCalendarGesture';
import { withMonthCalendarGesture } from './withMonthCalendarGesture';
import * as focus from './focus';

const Gesture = {
	withMonthCalendarGesture,
	withListGesture,
	withTreeGesture,
	WithDynamicListGesture,
	withCalendarGesture,
};

export { focus };
export default Gesture;
