import { cmfConnect } from '@talend/react-cmf';
import TabBar, { DEFAULT_STATE } from './TabBar.container';

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	defaultState: DEFAULT_STATE,
})(TabBar);
