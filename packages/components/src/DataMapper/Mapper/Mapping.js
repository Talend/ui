import React, { Component } from 'react';
import MappingItem from './MappingItem.js';

function key(item) {
	return item.source + '-' + item.target;
}

export default class Mapping extends Component {
	render() {
		const { mapping, clearMapping, clearConnection } = this.props;
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
}
