import { cmfConnect } from '@talend/react-cmf';
import Component from './HomeListView.component';

export default cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Component);
