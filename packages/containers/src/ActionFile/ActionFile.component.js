import PropTypes from 'prop-types';
import React from 'react';
import { ActionFile as PureActionFile } from '@talend/react-components';
import actions from '../actionAPI';

/**
 * @param {Object} props react props
 * @example
<Action name="menu:demo"></Action>
 */
function Action({ name, ...rest }, context) {
	let action = actions.getProps(context, rest, rest.model);

	if (name) {
		action = Object.assign({}, rest, actions.getProps(context, name, rest.model));
	}
	if (action.available === false) {
		return null;
	}
	return <PureActionFile {...action} />;
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
