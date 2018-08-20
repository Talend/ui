import get from 'lodash/get';
import { List } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './List.container';
import {
	configureGetFilteredItems,
	configureGetPagedItems,
	configureGetPagination,
	getCollectionItems,
} from './selector';

function componentId(ownProps) {
	return ownProps.collectionId;
}

function getPagedItems(state, config) {
	const items = configureGetPagedItems(config)(state);

	return items || new List();
}

export function mapStateToProps(state, ownProps, cmfProps) {
	const props = {};
	let filteredItems;
	const collectionItems = getCollectionItems(state, ownProps.collectionId);

	props.config = {
		collectionId: ownProps.collectionId,
		items: collectionItems || ownProps.items || new List(),
	};
	if (ownProps.list) {
		props.config.columns = ownProps.list.columns;
	}
	if (ownProps.defaultSaga !== false) {
		props.saga = 'List#root';
		filteredItems = configureGetFilteredItems(props.config)(state);
	}

	props.items = filteredItems || props.config.items;
	const totalResults = props.items.size;

	if (get(ownProps, ['toolbar', 'pagination'])) {
		props.items = getPagedItems(state, props.config);
	}

	const cmfState = get(cmfProps, 'state');
	if (cmfState) {
		props.state = cmfState.setIn(['totalResults'], totalResults);
		if (props.state.has('toolbar')) {
			props.state = props.state.mergeIn(
				['toolbar', 'pagination'],
				configureGetPagination(state, props.config),
			);
		}
	}

	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	if (props.actionIds) {
		delete props.actionIds;
	}
	return props;
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	componentId,
	mapStateToProps,
})(Container);
