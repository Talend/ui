import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { ListContext } from '../context';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import { sortCollection } from './sort';
import { filterCollectionByText } from './filter';

function Manager(props) {
	const [displayMode, setDisplayMode] = useState();
	const [sortParams, setSortParams] = useState({});
	const [textFilter, setTextFilter] = useState();

	let collection = props.collection;

	// Sort items
	collection = useMemo(() => sortCollection(collection, sortParams), [collection, sortParams]);

	// Filter by text
	collection = useMemo(() => filterCollectionByText(collection, textFilter), [
		collection,
		textFilter,
	]);

	const contextValues = {
		collection,
		t: props.t,
		displayMode,
		setDisplayMode,
		sortParams,
		setSortParams,
		textFilter,
		setTextFilter,
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
