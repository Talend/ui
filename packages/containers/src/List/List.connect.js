import get from 'lodash/get';
import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './List.container';
import {
	configureGetFilteredItems,
	configureGetPagination,
	configureGetPagedItems,
} from './selector';
import ActionBar from '../ActionBar';
import getRenderers from '../renderers';

const renderers = {
	ActionBar,
};

function componentId(ownProps) {
	return ownProps.collectionId;
}

function getItems(state, config) {
	const items = configureGetFilteredItems(config)(state);

	if (items) {
		return items.toJS();
	}
	return [];
}

function getPagedItems(state, config) {
	const items = configureGetPagedItems(config)(state);

	if (items) {
		return items.toJS();
	}
	return [];
}

export function mapStateToProps(state, ownProps, cmfProps) {
	const props = {};
	const config = {
		collectionId: ownProps.collectionId,
		items: ownProps.items,
	};
	if (ownProps.list) {
		config.columns = ownProps.list.columns;
	}

	props.items = getItems(state, config);
	const totalResults = props.items.length;

	if (ownProps.toolbar && ownProps.toolbar.pagination) {
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
		if (ownProps.toolbar && ownProps.toolbar.pagination) {
			if (props.state.getIn(['startIndex']) === 0) {
				props.state = props.state.setIn(['startIndex'], ownProps.toolbar.pagination.startIndex || 0);
			}
			if (props.state.getIn(['itemsPerPage']) === 0) {
				props.state = props.state.setIn(['itemsPerPage'], ownProps.toolbar.pagination.itemsPerPage || 0);
			}
		}
	}

	props.renderers = getRenderers(renderers);
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
