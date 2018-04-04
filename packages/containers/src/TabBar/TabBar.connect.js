import { cmfConnect } from '@talend/react-cmf';
import { TabBar } from '@talend/react-components';
import Immutable from 'immutable';

export const DEFAULT_STATE = new Immutable.Map({});

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	defaultProps: {
		initialState: {},
		onSelectSetState: {
			selectedKey: [1, 'key'],
		},
	},
	defaultState: DEFAULT_STATE,
})(TabBar);
