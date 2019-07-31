import { Map } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';

import GuidedTourContainer from './GuidedTour.container';

export const DEFAULT_STATE = Map({});

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	defaultProps: {
		saga: 'GuidedTour#default',
	},
	defaultState: DEFAULT_STATE,
	withComponentId: true,
	withComponentRegistry: true,
	keepComponentState: true,
})(GuidedTourContainer);
