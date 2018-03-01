import React from 'react';
import PropTypes from 'prop-types';

function display(item) {
	return `[ ${item.source} => ${item.target} ]`;
}

export default function MappingItem({ mappingItem }) {
	return <div id="mappingItem">{display(mappingItem)}</div>;
}

MappingItem.propTypes = {
	mappingItem: PropTypes.object,
};
