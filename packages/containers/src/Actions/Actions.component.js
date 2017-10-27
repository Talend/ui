import PropTypes from 'prop-types';
import React from 'react';
import { Actions as PureActions } from '@talend/react-components';
import actionAPI from '../actionAPI';
import cloneDeep from 'lodash/cloneDeep';

const TYPE_DROPDOWN = 'dropdown';
/**
 * @param {Object} props react props
 * @example
<Actions name="Hello world"></Actions>
 */
function Actions({ names, ...rest }, context) {
	const onClick = (event, payload) => {
		context.store.dispatch(payload.action.payload);
	};

	let actions = null;

	if (names) {
		actions = names.map((name) => {
			const action = actionAPI.getProps(context, name);

			if (action.displayMode === TYPE_DROPDOWN) {
				delete action.onClick;
			}

			return action;
		});
	}

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
