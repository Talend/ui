import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Schema from '../Schema/Schema.js';
import GMapping from './GMapping.js';
import { SchemaType, MappingSide } from '../Constants';
import { getMappingItems } from '../Utils';

function getMapped(mapping, side) {
	const mappedElements = mapping.map(item => item[side]);
	return Array.from(new Set(mappedElements));
}

export default class Mapper extends Component {
	constructor(props) {
		super(props);
		this.getConnections = this.getConnections.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}

	onScroll() {
		if (this.gmap.updateCanvas) {
			this.gmap.updateCanvas(true, false);
		}
	}

	getYPosition(element, type) {
		if (type === SchemaType.INPUT) {
			return this.inputSchema.getYPosition(element);
		}
		return this.outputSchema.getYPosition(element);
	}

	getConnectionFromItem(item) {
		const source = item.source;
		const target = item.target;
		return this.getConnection(source, target);
	}

	getConnection(source, target) {
		//console.log('getConnection(' + source + ', ' + target + ')');
		const sourceYPos = this.getYPosition(source, SchemaType.INPUT);
		const targetYPos = this.getYPosition(target, SchemaType.OUTPUT);
		return { sourceYPos, targetYPos };
	}

	// { current : [ {sourceYPos1, targetYPos1}, {sourceYPos2, targetYPos2} ],
	//   pending : {sourceYPos, targetYPos}
	// }
	getConnections() {
		const { mapping, selection, pendingItem } = this.props;
		if (selection == null || (mapping.length === 0 && pendingItem == null)) {
			return null;
		}
		//console.log('mapping is ' + mapping);
		const items = getMappingItems(mapping, selection.element, selection.type);
		//console.log('getMappingItems returns ' + items);
		let current = null;
		if (items != null) {
			current = items.map(item => this.getConnectionFromItem(item));
		}
		let pending = null;
		if (pendingItem != null) {
			//console.log('PENDING ITEM is ' + pendingItem);
			if (pendingItem.type === SchemaType.INPUT) {
				pending = this.getConnection(pendingItem.element, selection.element);
			} else {
				pending = this.getConnection(selection.element, pendingItem.element);
			}
		}
		return {current, pending};
	}

	reveal(selection) {
		if (selection == null) {
			return;
		}
		const type = selection.type;
		if (type === SchemaType.INPUT) {
			this.inputSchema.reveal(selection.element);
		} else {
			this.outputSchema.reveal(selection.element);
		}
	}

	render() {
		const {
			inputSchema,
			mapping,
			outputSchema,
			performMapping,
			clearMapping,
			clearConnection,
			draggable,
			selection,
			onSelect,
			pendingItem,
		} = this.props;
		return (
			<div id="mapper">
				<Schema
					ref={input => {
						this.inputSchema = input;
					}}
					type={SchemaType.INPUT}
					schema={inputSchema}
					draggable={draggable}
					mapped={getMapped(mapping, MappingSide.SOURCE)}
					performMapping={performMapping}
					selection={selection}
					onSelect={onSelect}
					onScroll={this.onScroll}
					pendingItem={pendingItem}
				/>
				<Schema
					ref={output => {
						this.outputSchema = output;
					}}
					type={SchemaType.OUTPUT}
					schema={outputSchema}
					draggable={draggable}
					mapped={getMapped(mapping, MappingSide.TARGET)}
					performMapping={performMapping}
					selection={selection}
					onSelect={onSelect}
					onScroll={this.onScroll}
					pendingItem={pendingItem}
				/>
				<GMapping
					ref={gmap => {
						this.gmap = gmap;
					}}
					mapping={mapping}
					clearConnection={clearConnection}
					clearMapping={clearMapping}
					getConnections={this.getConnections}
					selection={selection}
				/>
			</div>
		);
	}
}

Mapper.propTypes = {
	mapping: PropTypes.array,
	selection: PropTypes.object,
	inputSchema: PropTypes.object,
	outputSchema: PropTypes.object,
	performMapping: PropTypes.func,
	clearMapping: PropTypes.func,
	clearConnection: PropTypes.func,
	draggable: PropTypes.bool,
	onSelect: PropTypes.func,
	pendingItem: PropTypes.object,
};
