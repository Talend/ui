import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { ListContext } from '../context';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

/**
 * Basic text filtering method over an array of objects (properties string lower-cased compared)
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

	// Filter by text
	const collection = useMemo(
		() => filterCollectionByText(props.collection, textFilter),
		[props.collection, textFilter]
	);

	const contextValues = {
		collection,
		t: props.t,
		displayMode,
		setDisplayMode,
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
