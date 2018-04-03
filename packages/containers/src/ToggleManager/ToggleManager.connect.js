import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './ToggleManager.container';

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	componentId: ownProps => ownProps.id || ownProps.componentId,
})(Container);
