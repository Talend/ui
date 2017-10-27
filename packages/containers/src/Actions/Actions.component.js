import PropTypes from 'prop-types';
import React from 'react';
import { Actions as PureActions } from '@talend/react-components';
import actionAPI from '../actionAPI';
import cloneDeep from 'lodash/cloneDeep';
/**
 * @param {Object} props react props
 * @example
<Actions name="Hello world"></Actions>
 */
function Actions({ names, ...rest }, context) {
	const onClick = (event, payload) => {
		context.store.dispatch(payload.action.payload);
	};
	let actions = names ? names.map(name => actionAPI.getProps(context, name)) : null;

	actions = actions
		? actions.map((action) => {
			if (action.displayMode === 'dropdown') {
				delete action.onClick;
			}

			return action;
		})
		: null;

	return <PureActions actions={actions} {...rest} onClick={onClick} />;
}

Actions.propTypes = {
	names: PropTypes.arrayOf(PropTypes.string),
};

Actions.contextTypes = {
	store: PropTypes.object,
	registry: PropTypes.object,
};

Actions.displayName = 'CMF(Actions)';

export default Actions;
