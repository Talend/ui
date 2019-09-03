import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { ListContext } from '../context';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import useCollectionSort from './hooks/useCollectionSort.hook';
import useCollectionFilter from './hooks/useCollectionFilter.hook';
import theme from '../List.scss';

function Manager(props) {
	let collection = props.collection;

	const [displayMode, setDisplayMode] = useLocalStorage(props.id && `${props.id}-displayMode`);

	// Sort items
	const { sortedCollection, sortParams, setSortParams } = useCollectionSort(collection);
	collection = sortedCollection;

	// Filter by text
	const { filteredCollection, textFilter, setTextFilter } = useCollectionFilter(collection);
	collection = filteredCollection;

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

	return (
		<ListContext.Provider value={contextValues}>
			<div className={theme.list}>{props.children}</div>
		</ListContext.Provider>
	);
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
