import React from 'react';
import PropTypes from 'prop-types';
import MappingItem from './MappingItem.js';

function key(item) {
	return `${item.source}-${item.target}`;
}

export default function Mapping({ mapping, clearMapping, clearConnection }) {
	return (
		<div className="mapping mapper-element">
			<div className="mapping-tools">
				<button className="clear-connection" onClick={clearConnection}>
					Clear connection
				</button>
				<button className="clear-mapping" onClick={clearMapping}>
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
