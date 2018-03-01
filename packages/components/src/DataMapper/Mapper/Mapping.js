import React from 'react';
import PropTypes from 'prop-types';
import MappingItem from './MappingItem.js';

function key(item) {
	return `${item.source}-${item.target}`;
}

export default function Mapping({ mapping, clearMapping, clearConnection }) {
	return (
		<div id="mapping" className="mapper-element">
			<div className="mapping-tools">
				<button id="clear-connection" onClick={clearConnection}>
					Clear connection
				</button>
				<button id="clear-mapping" onClick={clearMapping}>
					Clear mapping
				</button>
			</div>
			<div className="mapping-content">
				{mapping.map(item => <MappingItem key={key(item)} mappingItem={item} />)}
			</div>
		</div>
	);
}

Mapping.propTypes = {
	mapping: PropTypes.array,
	clearMapping: PropTypes.func,
	clearConnection: PropTypes.func,
};
