import { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './SelectObject.container';
import { DISPLAY_NAME } from '../FilterBar/FilterBar.container';
import { DISPLAY_NAME as TREE_NAME } from '../TreeView/TreeView.container';

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.source) {
		props.sourceData = state.cmf.collections.getIn(ownProps.source.split('.'));
	}
	if (ownProps.nameAttr && ownProps.tree) {
		props.tree = Object.assign(
			{
				nameAttr: ownProps.nameAttr,
			},
			ownProps.tree,
		);
	}
	const filterPath = [DISPLAY_NAME, ownProps.id];
	const filterState = state.cmf.components.getIn(filterPath);
	if (filterState) {
		props.query = filterState.get('query', '');
	} else {
		props.query = '';
	}
	const treeState = state.cmf.components.getIn([TREE_NAME, ownProps.id]);
	if (treeState) {
		props.selectedId = treeState.get('selectedId');
	}
	return props;
}

export default cmfConnect({
	mapStateToProps,
	defaultState: DEFAULT_STATE,
})(Container);
