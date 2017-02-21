import { connect } from 'react-redux';

import { getStateAccessors, getStateProps } from '../state';
import Container, { DEFAULT_STATE } from './List.container';
import { configureGetFilteredItems, configureGetPagination } from './selector';

export function getContainerInfo(ownProps) {
	return {
		name: 'List',
		id: ownProps.collectionId || 'default',
	};
}

function getItems(state, config) {
	const items = configureGetFilteredItems(config)(state);

	if (items) {
		return items.toJS();
	}
	return [];
}

export function mapDispatchToProps(dispatch, ownProps) {
	const { name, id } = getContainerInfo(ownProps);
	const props = getStateAccessors(dispatch, name, id, DEFAULT_STATE);
	props.dispatch = dispatch;
	return props;
}

export function mapStateToProps(state, ownProps) {
	const { name, id } = getContainerInfo(ownProps);
	const props = getStateProps(state, name, id);
	const config = {
		collectionId: ownProps.collectionId,
		items: ownProps.items,
	};

	props.items = getItems(state, config);
	if (props.state && props.state.has('toolbar')) {
		props.state = props.state.setIn(['toolbar', 'pagination'], configureGetPagination(state, config));
	}

	return props;
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Container);
