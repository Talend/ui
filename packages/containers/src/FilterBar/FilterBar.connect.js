import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './FilterBar.container';

export default cmfConnect({
	componentId: ownProps => ownProps.id,
	defaultState: DEFAULT_STATE,
})(Container);
