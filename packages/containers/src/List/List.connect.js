import get from 'lodash/get';
import { List } from 'immutable';
import { api, cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './List.container';
import {
	configureGetFilteredItems,
	configureGetPagination,
	configureGetPagedItems,
} from './selector';

function componentId(ownProps) {
	return ownProps.collectionId;
}

function getItems(state, config) {
	const items = configureGetFilteredItems(config)(state);

	return items || new List();
}

function getPagedItems(state, config) {
	const items = configureGetPagedItems(config)(state);

	return items || new List();
}

export function mapStateToProps(state, ownProps, cmfProps) {
	const props = {};
	const config = {
		collectionId: ownProps.collectionId,
		items: ownProps.items,
	};
	if (ownProps.list) {
		config.columns = ownProps.list.columns;

		if (ownProps.selectedIdPath) {
			const isActive = item =>
				item.id === api.selectors.collections.get(state, ownProps.selectedIdPath);
			props.list = {
				...ownProps.list,
				...api.expression.mapStateToProps(state, ownProps.list),
				itemProps: {
					...ownProps.list.itemProps,
					isActive,
				},
			};
		}
	}

	props.items = getItems(state, config);

	const totalResults = props.items.size;

	if (get(ownProps, ['toolbar', 'pagination'])) {
		props.items = getPagedItems(state, config);
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
