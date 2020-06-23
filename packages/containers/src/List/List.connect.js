import get from 'lodash/get';
import { List } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './List.container';
import {
	configureGetFilteredItems,
	configureGetPagination,
	configureGetPagedItems,
	getCollectionItems,
	configureGetSortedItems,
} from './selector';

function componentId(ownProps) {
	return ownProps.collectionId;
}

function getItems(state, config) {
	let items = config.items;
	if (config.defaultFiltering !== false) {
		items = configureGetFilteredItems(config)(state);
	}
	if (config.defaultSorting !== false) {
		items = configureGetSortedItems(config, items)(state);
	}
	return items;
}

function getPagedItems(state, config, items) {
	if (config.defaultPaging !== false) {
		return configureGetPagedItems(config, items)(state);
	}
	return items;
}

export function mapStateToProps(state, ownProps, cmfProps) {
	const props = {};
	const collectionItems = getCollectionItems(state, ownProps.collectionId);
	const config = {
		collectionId: ownProps.collectionId,
		items: collectionItems || ownProps.items || ownProps.listItems,
		defaultFiltering: get(ownProps, ['toolbar', 'filter', 'defaultFiltering']),
		defaultSorting: get(ownProps, ['toolbar', 'sort', 'defaultSorting']),
		defaultPaging: get(ownProps, ['toolbar', 'pagination', 'defaultPaging']),
	};
	if (ownProps.list) {
		config.columns = ownProps.list.columns;
	}

	props.items = getItems(state, config);

	const totalResults = props.items.size;

	if (get(ownProps, ['toolbar', 'pagination'])) {
		props.items = getPagedItems(state, config, props.items);
	}

	const cmfState = get(cmfProps, 'state');
	if (cmfState) {
		props.state = cmfState.setIn(['totalResults'], totalResults);
		if (props.state.has('toolbar')) {
			props.state = props.state.mergeIn(
				['toolbar', 'pagination'],
				configureGetPagination(state, config),
			);
		}
	}

	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = { ...ownProps, ...stateProps, ...dispatchProps };
	if (props.actionIds) {
		delete props.actionIds;
	}
	return props;
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,

	defaultProps: {
		saga: 'List#root',
		listItems: new List(),
	},

	componentId,
	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Container);
