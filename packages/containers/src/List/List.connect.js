import get from 'lodash/get';
import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './List.container';
import { configureGetFilteredItems, configureGetPagination } from './selector';
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
	const cmfState = get(cmfProps, 'state');
	if (cmfState && cmfState.has('toolbar')) {
		props.state = cmfState.mergeIn(
			['toolbar', 'pagination'],
			configureGetPagination(state, config)
		);
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
