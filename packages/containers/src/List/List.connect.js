import get from 'lodash/get';
import { Map } from 'immutable';
import { cmfConnect } from 'react-cmf';
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

	if (cmfState && ownProps.localStorageKey) {
		const itemStored = JSON.parse(localStorage.getItem(ownProps.localStorageKey));
		let storedState = {};
		if (itemStored !== null && typeof itemStored === 'object') {
			storedState = itemStored;
		}
		props.state = new Map({ ...cmfProps.state.toJS(), ...storedState });
	}

	if (cmfState && cmfState.has('toolbar')) {
		props.state = cmfState.mergeIn(
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
