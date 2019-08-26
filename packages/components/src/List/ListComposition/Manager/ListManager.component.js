import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { ListContext } from '../context';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import useCollectionSort from './hooks/useCollectionSort.hook';
import { filterCollectionByText } from './filter';

function Manager(props) {
	let collection;

	const [displayMode, setDisplayMode] = useLocalStorage(props.id && `${props.id}-displayMode`);
	const [textFilter, setTextFilter] = useState();

	// Sort items
	const { sortedCollection, sortParams, setSortParams } = useCollectionSort(props.collection);
	collection = sortedCollection;

	// Filter by text
	collection = useMemo(() => filterCollectionByText(collection, textFilter), [
		collection,
		textFilter,
	]);

	const contextValues = {
		collection,
		displayMode,
		setDisplayMode,
		setSortParams,
		setTextFilter,
		sortParams,
		t: props.t,
		textFilter,
	};

	return <ListContext.Provider value={contextValues}>{props.children}</ListContext.Provider>;
}
Manager.defaultProps = {
	t: getDefaultT(),
};
Manager.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node,
	collection: PropTypes.array,
	t: PropTypes.func,
};
export default withTranslation(I18N_DOMAIN_COMPONENTS)(Manager);
