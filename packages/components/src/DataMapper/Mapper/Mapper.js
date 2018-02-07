import React, { Component } from 'react';
import Schema from '../Schema/Schema.js';
//import Mapping from './Mapping.js'
import GMapping from '../GMapping.js';
import { SchemaType, MappingSide } from '../Constants';

function getMapped(mapping, side) {
	var mappedElements = mapping.map(item => item[side]);
	return Array.from(new Set(mappedElements));
}

export default class Mapper extends Component {
	constructor(props) {
		super(props);
		this.getConnection = this.getConnection.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}

	getYPosition(element, type) {
		if (type === SchemaType.INPUT) {
			return this.inputSchema.getYPosition(element);
		} else {
			return this.outputSchema.getYPosition(element);
		}
	}

	getMappingItem(mapping, selection) {
		if (selection.type === SchemaType.INPUT) {
			return mapping.find(item => item.source === selection.element);
		} else {
			return mapping.find(item => item.target === selection.element);
		}
	}

	getConnection() {
		const { mapping, selection } = this.props;
		if (selection == null || mapping.length === 0) {
			return null;
		}
		const item = this.getMappingItem(mapping, selection);
		if (item != null) {
			const source = item.source;
			const target = item.target;
			const sourceYPos = this.getYPosition(source, SchemaType.INPUT);
			const targetYPos = this.getYPosition(target, SchemaType.OUTPUT);
			return { sourceYPos: sourceYPos, targetYPos: targetYPos };
		}
		return {};
	}

	onScroll() {
		if (this.gmap.updateCanvas) {
			this.gmap.updateCanvas();
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
				/>
				<GMapping
					ref={gmap => {
						this.gmap = gmap;
					}}
					mapping={mapping}
					clearConnection={clearConnection}
					clearMapping={clearMapping}
					getConnection={this.getConnection}
					selection={selection}
				/>
			</div>
		);
	}
}
