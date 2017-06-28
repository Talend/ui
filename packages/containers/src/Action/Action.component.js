import React, { PropTypes } from 'react';
import { Action as PureAction } from 'react-talend-components';
import actions from '../actionAPI';

/**
 * @param {Object} props react props
 * @example
<Action name="menu:demo"></Action>
 */
function Action({ name, ...rest }, context) {
	const onClick = (event, payload) => {
		context.store.dispatch(payload.action.payload);
	};
	if (name) {
		const action = actions.getProps(context, name, rest.model);
		return (<PureAction {...action} onClick={onClick} />);
	}
	return (<PureAction {...rest} onClick={onClick} />);
}

Action.propTypes = {
	name: PropTypes.string,
};

Action.contextTypes = {
	router: PropTypes.object,
	store: PropTypes.object,
	registry: PropTypes.object,
};

Action.displayName = 'CMFContainer(Action)';

export default Action;
