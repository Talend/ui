import { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './ObjectViewer.container';

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	componentId: ownProps => ownProps.id || 'ObjectViewer',
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Container);
