import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { ListContext } from '../context';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

function reducer(state, action) {
	switch (action.type) {
		case 'displayMode':
			return { ...state, displayMode: action.value };
		default:
			throw new Error();
	}
}

function Manager(props) {
	const [state, dispatch] = useReducer(reducer, {});

	const contextValues = {
		...state,
		t: props.t,
		collection: props.collection,
		propagateDisplayMode: (event, value) => dispatch({ type: 'displayMode', value }),
	};

	return <ListContext.Provider value={contextValues}>{props.children}</ListContext.Provider>;
}
Manager.displayName = 'List.Manager';
Manager.defaultProps = {
	t: getDefaultT(),
};
Manager.propTypes = {
	children: PropTypes.node,
	collection: PropTypes.array,
	t: PropTypes.func,
};
export default translate(I18N_DOMAIN_COMPONENTS)(Manager);
