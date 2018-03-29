import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './AvroViewer.container';

export default cmfConnect({
	componentId: ownProps => ownProps.id || ownProps.componentId,
	defaultState: DEFAULT_STATE,
})(Container);
