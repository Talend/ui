import { Map, List } from 'immutable';
import { api, cmfConnect } from '@talend/react-cmf';
import Container from './FilterBar.container';
import { getFilterInputValue } from './FilterBar.selectors';

const DEFAULT_STATE = Map({ filterInputValue: '', collectionFiltered: List() });

function mapStateToProps(state, ownProps) {
	if (!ownProps.actionId && !ownProps.name) {
		return {};
	}
	const actionInfo = api.action.getActionInfo(
		{
			registry: api.registry.getRegistry(),
			store: {
				getState: () => state,
			},
		},
		ownProps.actionId || ownProps.getname,
	);
	return {
		collectionToFilter: state.cmf.collections.get(actionInfo['collection-to-filter']),
		filterInputValue: getFilterInputValue(state, actionInfo.id),
		actionInfo,
	};
}

export default cmfConnect({
	componentId: ownProps => (ownProps && ownProps.id) || 'FilterBar',
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(Container);
