import get from 'lodash/get';
import { List } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './List.container';
import {
	configureGetPagination,
	configureGetPagedItems,
} from './selector';

function componentId(ownProps) {
	return ownProps.collectionId;
}

function getItems(componentState, config) {
	let items = config.items;
	if (componentState && componentState.get('items')) {
		items = componentState.get('items');
	}
	return items;
}

function getPagedItems(state, config) {
	const items = configureGetPagedItems(config)(state);

	return items || new List();
}

export function mapStateToProps(state, ownProps, cmfProps) {
	const props = {};
	props.config = {
		collectionId: ownProps.collectionId,
		items: ownProps.items,
	};
	if (ownProps.list) {
		props.config.columns = ownProps.list.columns;
	}

	props.items = getItems(ownProps.state, props.config);

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
	defaultProps: {
		saga: 'List#default',
	},
	componentId,
	mapStateToProps,
})(Container);
