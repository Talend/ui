import { cmfConnect } from 'react-cmf';
import Container, { DEFAULT_STATE } from './ConfirmDialog.container';

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	componentId: ownProps => (ownProps && ownProps.id) || 'ConfirmDialog',
})(Container);
