import cmfConnect from '../cmfConnect';
import Container, { DEFAULT_STATE } from './List.container';
import { configureGetFilteredItems, configureGetPagination } from './selector';

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

export function mapStateToProps(state, ownProps) {
	const props = {};
	const config = {
		collectionId: ownProps.collectionId,
		items: ownProps.items,
	};
	props.items = getItems(state, config);
	// FIXME: this will not work here...
	if (props.state && props.state.has('toolbar')) {
		props.state = props.state.mergeIn(
			['toolbar', 'pagination'],
			configureGetPagination(state, config)
		);
	}
	return props;
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	componentId,
	mapStateToProps,
})(Container);
