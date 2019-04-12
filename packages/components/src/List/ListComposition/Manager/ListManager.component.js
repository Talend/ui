import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';
import { ListContext } from '../context';

/**
 * Generic sorting function for an array of items
 * @param {array} collection
 * @param {object} sortParams
 * @param {string} sortParams.sortBy Field to use to sort items
 * @param {boolean} sortParams.isDescending Sorting direction
 * @returns {array}
 */
function sortCollection(collection, sortParams = {}) {
	const { sortBy, isDescending } = sortParams;

	if (!sortBy) {
		return collection;
	}

	const direction = isDescending ? -1 : 1;

	return collection.sort((a, b) => {
		const valueA = a[sortBy];
		const valueB = b[sortBy];

		const result = isNaN(valueA) || isNaN(valueB)
			? valueA.toString().localeCompare(valueB.toString())
			: valueA - valueB;

		return result * direction;
	});
}

/**
 * Basic text filtering method over an array of objects.
 * Properties compared as string, case insensitive.
 * @param {array} collection
 * @param {string} text
 * @returns {array}
 */
function filterCollectionByText(collection, text) {
	if (!text) {
		return collection;
	}

	const searchedText = text.toLowerCase();

	return collection
		.filter(item => Object.values(item).find(
			value => value.toString().toLowerCase().includes(searchedText)
		));
}

function Manager(props) {
	const [displayMode, setDisplayMode] = useState();
	const [textFilter, setTextFilter] = useState();
	const [sortParams, setSortParams] = useState({});

	let collection = props.collection;

	// Sort items
	collection = useMemo(
		() => sortCollection(collection, sortParams),
		[collection, sortParams]
	);

	// Filter by text
	collection = useMemo(
		() => filterCollectionByText(collection, textFilter),
		[collection, textFilter]
	);

	const contextValues = {
		collection,
		t: props.t,
		displayMode,
		setDisplayMode,
		textFilter,
		setTextFilter,
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
