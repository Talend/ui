import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { ListContext } from '../context';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

function Manager(props) {
	const [displayMode, setDisplayMode] = useState();

	const contextValues = {
		collection: props.collection,
		t: props.t,
		displayMode,
		setDisplayMode,
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
