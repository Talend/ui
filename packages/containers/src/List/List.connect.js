import { connect } from 'react-redux';

import { getStateAccessors, getStateProps } from '../state';
import Container, { DEFAULT_STATE } from './List.container';
import configureGetFilteredItems from './selector';

export function getContainerInfo(ownProps) {
	return {
		name: 'List',
		id: ownProps.collectionId || 'default',
	};
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

	let items = configureGetFilteredItems({
		collectionId: ownProps.collectionId,
		items: ownProps.items,
	})(state);

	if (items) {
		items = items.toJS();
	} else {
		items = [];
	}
	props.items = items;

	return props;
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	undefined,
	{
		pure: true,
		areStatePropsEqual: (prev, next) => (
			prev.item === next.item
			&& prev.state === next.state
			&& prev.list === next.list
		),
	}
)(Container);
