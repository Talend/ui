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

function getFocusedElements(mapping, focused, type) {
	if (focused == null || focused.type === type) {
		return null;
	}
	let focusedElements = null;
	const focusedItems = getMappingItems(mapping, focused.element, focused.type);
	if (focusedItems != null) {
		if (focused.type === SchemaType.INPUT) {
			focusedElements = focusedItems.map(item => item.target);
		} else {
			focusedElements = focusedItems.map(item => item.source);
		}
	}
	// console.log('Focused elements in ' + type + 'schema are ' + focusedElements);
	return focusedElements;
}

export default class Mapper extends Component {
	constructor(props) {
		super(props);
		this.getConnections = this.getConnections.bind(this);
		this.getYPosition = this.getYPosition.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.revealConnection = this.revealConnection.bind(this);
	}

	onScroll() {
		if (this.gmap.update) {
			this.gmap.update();
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
		// console.log('getConnection(' + source + ', ' + target + ')');
		const sourceYPos = this.getYPosition(source, SchemaType.INPUT);
		const targetYPos = this.getYPosition(target, SchemaType.OUTPUT);
		return { sourceYPos, targetYPos };
	}

	// { current : [ {sourceYPos1, targetYPos1}, {sourceYPos2, targetYPos2} ],
	//   pending : {sourceYPos, targetYPos},
	//   focused: [ {sourceYPos1, targetYPos1}, {sourceYPos2, targetYPos2} ],
	//   all: [ {sourceYPos1, targetYPos1}, {sourceYPos2, targetYPos2} ],
	//   dnd: {sourceYPos, targetYPos},
	// }
	getConnections() {
		const { mapping, selection, pendingItem, focused, showAll, dnd } = this.props;
		if (mapping.length === 0 && pendingItem == null && dnd == null) {
			return null;
		}
		let allConnections = null;
		if (showAll) {
			const inputVisibleElements = this.inputSchema.getVisibleElements();
			const outputVisibleElements = this.outputSchema.getVisibleElements();
			// filter mapping items
			const visibleMapping = mapping.filter(item =>
				(inputVisibleElements.includes(item.source))
				|| (outputVisibleElements.includes(item.target))
			);
			// then build connections
			allConnections = visibleMapping.map(item => this.getConnectionFromItem(item));
		}
		let items = null;
		if (selection != null) {
			items = getMappingItems(mapping, selection.element, selection.type);
		}
		// console.log('getMappingItems returns ' + items);
		let current = null;
		if (items != null) {
			current = items.map(item => this.getConnectionFromItem(item));
		}
		let pending = null;
		if (selection != null && pendingItem != null) {
			if (pendingItem.type === SchemaType.INPUT) {
				pending = this.getConnection(pendingItem.element, selection.element);
			} else {
				pending = this.getConnection(selection.element, pendingItem.element);
			}
		}
		let focusedConnections = null;
		if (focused != null) {
			const focusedItems = getMappingItems(mapping, focused.element, focused.type);
			if (focusedItems != null) {
				focusedConnections = focusedItems.map(item => this.getConnectionFromItem(item));
			}
		}
		let dndConnection = null;
		if (dnd != null && dnd.source != null && dnd.target != null) {
			if (dnd.source.type === SchemaType.INPUT) {
				dndConnection = this.getConnection(dnd.source.element, dnd.target.element);
			} else {
				dndConnection = this.getConnection(dnd.target.element, dnd.source.element);
			}
		}

		return {
			current,
			pending,
			focused: focusedConnections,
			all: allConnections,
			dnd: dndConnection,
		};
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

	revealConnection(element, type) {
		const mappingItems = getMappingItems(this.props.mapping, element, type);
		if (mappingItems != null && mappingItems.length > 0) {
			const item = mappingItems[0];
			if (type === SchemaType.INPUT) {
				this.outputSchema.reveal(item.target);
			} else {
				this.inputSchema.reveal(item.source);
			}
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
			onEnterElement,
			onLeaveElement,
			focused,
			showAll,
			onShowAll,
			dnd,
			beginDrag,
			canDrop,
			drop,
			endDrag,
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
					onEnterElement={onEnterElement}
					onLeaveElement={onLeaveElement}
					focusedElements={getFocusedElements(mapping, focused, SchemaType.INPUT)}
					beginDrag={beginDrag}
					canDrop={canDrop}
					drop={drop}
					endDrag={endDrag}
					revealConnection={this.revealConnection}
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
					onEnterElement={onEnterElement}
					onLeaveElement={onLeaveElement}
					focusedElements={getFocusedElements(mapping, focused, SchemaType.OUTPUT)}
					beginDrag={beginDrag}
					canDrop={canDrop}
					drop={drop}
					endDrag={endDrag}
					revealConnection={this.revealConnection}
				/>
				<GMapping
					ref={gmap => {
						this.gmap = gmap;
					}}
					mapping={mapping}
					clearConnection={clearConnection}
					clearMapping={clearMapping}
					getConnections={this.getConnections}
					getYPosition={this.getYPosition}
					selection={selection}
					showAll={showAll}
					onShowAll={onShowAll}
					dnd={dnd}
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
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	focused: PropTypes.object,
	showAll: PropTypes.bool,
	onShowAll: PropTypes.func,
	dnd: PropTypes.object,
	beginDrag: PropTypes.func,
	canDrop: PropTypes.func,
	drop: PropTypes.func,
	endDrag: PropTypes.func,
};
