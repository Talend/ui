import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Schema from '../Schema/Schema.js';
import GMapping from './GMapping.js';
import { SchemaType, MappingSide } from '../Constants';

function getMapped(mapping, side) {
	return mapping.map(item => item[side]);
}

export function getMappingItems(mapping, element, type) {
	if (type === SchemaType.INPUT) {
		return mapping.filter(item => item.source === element);
	}
	return mapping.filter(item => item.target === element);
}

function getFocusedElements(mapping, focused, type) {
	if (!focused || focused.type === type) return null;
	let focusedElements = null;
	const focusedItems = getMappingItems(mapping, focused.element, focused.type);
	if (focusedItems) {
		if (focused.type === SchemaType.INPUT) {
			focusedElements = focusedItems.map(item => item.target);
		} else {
			focusedElements = focusedItems.map(item => item.source);
		}
	}
	return focusedElements;
}

export default class Mapper extends Component {

	constructor(props) {
		super(props);
		this.getConnections = this.getConnections.bind(this);
		this.getYPosition = this.getYPosition.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.revealConnection = this.revealConnection.bind(this);
		this.updateInputSchemaRef = this.updateInputSchemaRef.bind(this);
		this.updateOutputSchemaRef = this.updateOutputSchemaRef.bind(this);
		this.updateGMapRef = this.updateGMapRef.bind(this);
	}

	onScroll() {
		const wrappedGMap = this.gmap.getWrappedInstance();
		if (wrappedGMap.update) {
			wrappedGMap.update();
		}
	}

	getYPosition(element, type) {
		if (type === SchemaType.INPUT) {
			return this.inputSchema.getYPosition(element);
		}
		return this.outputSchema.getYPosition(element);
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
	//	 dndInProgress: {sourceYPos, pos}
	// }
	getConnections() {
		const {
			mapping,
			selection,
			pendingItem,
			focused,
			showAll,
			dnd,
		} = this.props;
		if (!mapping.length && !pendingItem && !dnd) return null;
		let allConnections = null;
		if (showAll && this.inputSchema && this.outputSchema) {
			const inputVisibleElements = this.inputSchema.getVisibleElements();
			const outputVisibleElements = this.outputSchema.getVisibleElements();
			// filter mapping items
			const visibleMapping = mapping.filter(
				item =>
					inputVisibleElements.includes(item.source) ||
					outputVisibleElements.includes(item.target),
			);
			// then build connections
			allConnections = visibleMapping.map(item =>
				this.getConnection(item.source, item.target));
		}
		let items = null;
		if (selection) {
			items = getMappingItems(mapping, selection.element, selection.type);
		}
		// console.log('getMappingItems returns ' + items);
		let current = null;
		if (items) {
			current = items.map(item =>
				this.getConnection(item.source, item.target));
		}
		let pending = null;
		if (selection && pendingItem) {
			if (pendingItem.type === SchemaType.INPUT) {
				pending = this.getConnection(pendingItem.element, selection.element);
			} else {
				pending = this.getConnection(selection.element, pendingItem.element);
			}
		}
		let focusedConnections = null;
		if (focused) {
			const focusedItems =
				getMappingItems(mapping, focused.element, focused.type);
			if (focusedItems) {
				focusedConnections = focusedItems.map(item =>
					this.getConnection(item.source, item.target));
			}
		}
		let dndConnection = null;
		if (dnd && dnd.source && dnd.target) {
			if (dnd.source.type === SchemaType.INPUT) {
				dndConnection =
					this.getConnection(dnd.source.element, dnd.target.element);
			} else {
				dndConnection =
					this.getConnection(dnd.target.element, dnd.source.element);
			}
		}
		let dndInProgress = null;
		if (!dndConnection && dnd && dnd.source && dnd.pos) {
			dndInProgress = {
				sourceYPos: this.getYPosition(dnd.source.element, dnd.source.type),
				pos: dnd.pos,
			};
		}

		return {
			current,
			pending,
			focused: focusedConnections,
			all: allConnections,
			dnd: dndConnection,
			dndInProgress,
		};
	}

	reveal(selection) {
		if (!selection == null) return;
		const type = selection.type;
		if (type === SchemaType.INPUT) {
			this.inputSchema.reveal(selection.element);
		} else {
			this.outputSchema.reveal(selection.element);
		}
	}

	revealConnection(element, type) {
		const mappingItems = getMappingItems(this.props.mapping, element, type);
		if (mappingItems && mappingItems.length > 0) {
			const item = mappingItems[0];
			if (type === SchemaType.INPUT) {
				this.outputSchema.reveal(item.target);
			} else {
				this.inputSchema.reveal(item.source);
			}
		}
	}

	updateInputSchemaRef(ref) {
		this.inputSchema = ref;
	}

	updateOutputSchemaRef(ref) {
		this.outputSchema = ref;
	}

	updateGMapRef(ref) {
		this.gmap = ref;
	}

	render() {
		const {
			mapperId,
			renderer,
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
			dndInProgress,
			beginDrag,
			canDrop,
			drop,
			endDrag,
		} = this.props;
		return (
			<div id={mapperId}>
				<Schema
					ref={this.updateInputSchemaRef}
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
					focusedElements={
						getFocusedElements(mapping, focused, SchemaType.INPUT)
					}
					beginDrag={beginDrag}
					canDrop={canDrop}
					drop={drop}
					endDrag={endDrag}
					revealConnection={this.revealConnection}
				/>
				<Schema
					ref={this.updateOutputSchemaRef}
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
					focusedElements={
						getFocusedElements(mapping, focused, SchemaType.OUTPUT)
					}
					beginDrag={beginDrag}
					canDrop={canDrop}
					drop={drop}
					endDrag={endDrag}
					revealConnection={this.revealConnection}
				/>
				<GMapping
					ref={this.updateGMapRef}
					mapping={mapping}
					clearConnection={clearConnection}
					clearMapping={clearMapping}
					getConnections={this.getConnections}
					getYPosition={this.getYPosition}
					selection={selection}
					showAll={showAll}
					onShowAll={onShowAll}
					dnd={dnd}
					dndInProgress={dndInProgress}
					renderer={renderer}
				/>
			</div>
		);
	}
}

Mapper.propTypes = {
	mapperId: PropTypes.string,
	renderer: PropTypes.string,
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
	dndInProgress: PropTypes.func,
	beginDrag: PropTypes.func,
	canDrop: PropTypes.func,
	drop: PropTypes.func,
	endDrag: PropTypes.func,
};
