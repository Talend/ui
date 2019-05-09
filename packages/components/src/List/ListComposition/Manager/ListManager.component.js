import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { ListContext } from '../context';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import { sortCollection } from './helpers';

function Manager(props) {
	const [displayMode, setDisplayMode] = useState();
	const [sortParams, setSortParams] = useState({});

	let collection = props.collection;

	// Sort items
	collection = useMemo(() => sortCollection(collection, sortParams), [collection, sortParams]);

	const contextValues = {
		collection,
		t: props.t,
		displayMode,
		setDisplayMode,
		sortParams,
		setSortParams,
	};

	return <ListContext.Provider value={contextValues}>{props.children}</ListContext.Provider>;
}
Manager.defaultProps = {
	t: getDefaultT(),
};
Manager.propTypes = {
	children: PropTypes.node,
	collection: PropTypes.array,
	t: PropTypes.func,
};
export default translate(I18N_DOMAIN_COMPONENTS)(Manager);
