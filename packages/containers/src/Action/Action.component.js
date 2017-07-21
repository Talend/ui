import React, { PropTypes } from 'react';
import { api } from '@talend/react-cmf';
import { Action as PureAction } from '@talend/react-components';
import actions from '../actionAPI';

/**
 * @param {Object} props react props
 * @example
<Action name="menu:demo"></Action>
 */
function Action({ name, ...rest }, context) {
	let action;
	if (name) {
		action = actions.getProps(context, name, rest.model);
	} else {
		action = actions.evalExpressions(rest, context);
	}
	if (action.available === false) {
		return null;
	}
	const onClick = (event, payload) => {
		if (payload.action.actionCreator) {
			context.store.dispatch(
				api.action.getActionObject(context, payload.action.actionCreator, event, payload.model)
			);
		} else if (payload.action.payload) {
			context.store.dispatch(payload.action.payload);
		}
	};
	return (<PureAction {...action} onClick={onClick} />);
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
