/* eslint-disable import/prefer-default-export */
import '../polyfills/element-closest';
import withListGesture from './withListGesture';
import withTreeGesture from './withTreeGesture';

const Gesture = { withListGesture, withTreeGesture };

export default Gesture;
export { withListGesture, withTreeGesture };
