import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { ListContext } from '../context';

function reducer(state, action) {
	switch (action.type) {
		case 'displayMode':
			return { ...state, displayMode: action.value };
		default:
			throw new Error();
	}
}

export default function Manager(props) {
	const [state, dispatch] = useReducer(reducer, {});

	const contextValues = {
		...state,
		collection: props.collection,
		propagateDisplayMode: (event, value) => dispatch({ type: 'displayMode', value }),
	};

	return <ListContext.Provider value={contextValues}>{props.children}</ListContext.Provider>;
}
Manager.displayName = 'List.Manager';
Manager.propTypes = {
	children: PropTypes.node,
	collection: PropTypes.array,
};
