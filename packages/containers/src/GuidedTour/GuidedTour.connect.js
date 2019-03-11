import { cmfConnect } from '@talend/react-cmf';

import GuidedTourContainer from './GuidedTour.container';

export function mapStateToProps(state, props, cmfProps) {
	console.log('mapStateToProps', { state, props, cmfProps });
}

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(GuidedTourContainer);
