import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { displayModesOptions } from '../DisplayMode/ListDisplayMode.component';
import { ListContext } from '../context';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import { useCollectionSort } from './hooks/useCollectionSort.hook';
import { useCollectionFilter } from './hooks/useCollectionFilter.hook';
import theme from '../List.scss';

function Manager({
	initialDisplayMode,
	initialSortParams,
	visibleColumnsKeys,
	children,
	t,
	...rest
}) {
	let collection = rest.collection;

	const [displayMode, setDisplayMode] = useState(initialDisplayMode || displayModesOptions[0]);

	// Sort items
	const { sortedCollection, sortParams, setSortParams } = useCollectionSort(
		collection,
		initialSortParams,
	);
	collection = sortedCollection;

	// Filter by text
	const { filteredCollection, textFilter, setTextFilter } = useCollectionFilter(
		collection,
		visibleColumnsKeys,
	);
	collection = filteredCollection;

	const contextValues = {
		collection,
		displayMode,
		setDisplayMode,
		setSortParams,
		setTextFilter,
		sortParams,
		t,
		textFilter,
	};

	return (
		<ListContext.Provider value={contextValues}>
			<div className={theme.list}>{children}</div>
		</ListContext.Provider>
	);
}
Manager.defaultProps = {
	t: getDefaultT(),
};
Manager.propTypes = {
	children: PropTypes.node,
	visibleColumnsKeys: PropTypes.arrayOf(PropTypes.string),
	collection: PropTypes.array,
	id: PropTypes.string.isRequired,
	initialDisplayMode: PropTypes.oneOf(displayModesOptions),
	initialSortParams: PropTypes.shape({
		sortBy: PropTypes.string,
		isDescending: PropTypes.bool,
	}),
	t: PropTypes.func,
};
export default withTranslation(I18N_DOMAIN_COMPONENTS)(Manager);
