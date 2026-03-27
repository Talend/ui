import cmf, { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './SelectObject.container';
import { DISPLAY_NAME as FILTER_NAME, QUERY_ATTR } from '../FilterBar/FilterBar.container';
import { DISPLAY_NAME as TREE_NAME } from '../TreeView/TreeView.container';

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.source) {
		props.sourceData = cmf.selectors.collections.get(state, ownProps.source.split('.'));
	}
	if (ownProps.nameAttr && ownProps.tree) {
		props.tree = {
			nameAttr: ownProps.nameAttr,
			...ownProps.tree,
		};
	}
	const filterState = state.cmf.components?.[FILTER_NAME]?.[ownProps.id];
	props.query = filterState?.[QUERY_ATTR] ?? '';
	const treeState = state.cmf.components?.[TREE_NAME]?.[ownProps.id];
	if (treeState) {
		props.selectedId = treeState.selectedId;
	}
	return props;
}

export default cmfConnect({
	mapStateToProps,
	defaultState: DEFAULT_STATE,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Container);
