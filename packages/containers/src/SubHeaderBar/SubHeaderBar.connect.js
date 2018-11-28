import { cmfConnect } from '@talend/react-cmf';
import SubHeaderBar, { DEFAULT_STATE } from './SubHeaderBar.container';

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	defaultState: DEFAULT_STATE,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(SubHeaderBar);
