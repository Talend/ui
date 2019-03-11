import { cmfConnect } from '@talend/react-cmf';
import { Map } from 'immutable';

import GuidedTourContainer from './GuidedTour.container';

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	defaultState: Map(),
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(GuidedTourContainer);
