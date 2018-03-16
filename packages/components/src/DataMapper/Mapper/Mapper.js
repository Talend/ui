import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Schema from '../Schema/Schema.js';
import GMapping from './GMapping.js';
import { MappingSide } from '../Constants';

function getMappedElements(dataAccessor, mapping, side) {
	const mappingItems = dataAccessor.getMappingItems(mapping);
	return mappingItems.map(item => dataAccessor.getMappedElement(item, side));
}

function getFocusedElements(dataAccessor, mapping, focused, side) {
	if (!focused || focused.side === side) return null;
	const focusedItems = dataAccessor.getMappingItemsWithElement(mapping,
		focused.element, focused.side);
	if (focusedItems) {
			return focusedItems.map(item => dataAccessor.getMappedElement(item, side));
	}
	return null;
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
		const wrappedGMap = this.gMapRef.getWrappedInstance();
		if (wrappedGMap.update) {
			wrappedGMap.update();
		}
	}

	getYPosition(element, side) {
		if (side === MappingSide.INPUT) {
			return this.inputSchemaRef.getYPosition(element);
		}
		return this.outputSchemaRef.getYPosition(element);
	}

	getConnection(sourceElement, targetElement) {
		const sourceYPos = this.getYPosition(sourceElement, MappingSide.INPUT);
		const targetYPos = this.getYPosition(targetElement, MappingSide.OUTPUT);
		return { sourceYPos, targetYPos };
	}

	getConnectionFromItem(dataAccessor, item) {
		return this.getConnection(
			dataAccessor.getMappedElement(item, MappingSide.INPUT),
			dataAccessor.getMappedElement(item, MappingSide.OUTPUT),
		);
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
			dataAccessor,
			mapping,
			selection,
			pendingItem,
			focused,
			showAll,
			dnd,
		} = this.props;
		if (dataAccessor.isMappingEmpty(mapping) && !pendingItem && !dnd) return null;
		let allConnections = null;
		if (showAll && this.inputSchemaRef && this.outputSchemaRef) {
			const inputVisibleElements = this.inputSchemaRef.getVisibleElements();
			const outputVisibleElements = this.outputSchemaRef.getVisibleElements();
			// filter mapping items
			const mappingItems = dataAccessor.getMappingItems(mapping);
			const visibleMappingItems = mappingItems.filter(
				item =>
					dataAccessor.includes(inputVisibleElements,
						dataAccessor.getMappedElement(item, MappingSide.INPUT))
					|| dataAccessor.includes(outputVisibleElements,
						dataAccessor.getMappedElement(item, MappingSide.OUTPUT)),
			);
			// then build connections
			allConnections = visibleMappingItems.map(item =>
				this.getConnectionFromItem(dataAccessor, item));
		}
		let items = null;
		if (selection) {
			items = dataAccessor.getMappingItemsWithElement(mapping, selection.element, selection.side);
		}
		// console.log('getMappingItems returns ' + items);
		let current = null;
		if (items) {
			current = items.map(item =>
				this.getConnectionFromItem(dataAccessor, item));
		}
		let pending = null;
		if (selection && pendingItem) {
			if (pendingItem.side === MappingSide.INPUT) {
				pending = this.getConnection(pendingItem.element, selection.element);
			} else {
				pending = this.getConnection(selection.element, pendingItem.element);
			}
		}
		let focusedConnections = null;
		if (focused) {
			const focusedItems = dataAccessor.getMappingItemsWithElement(mapping,
				focused.element, focused.side);
			if (focusedItems) {
				focusedConnections = focusedItems.map(item =>
					this.getConnectionFromItem(dataAccessor, item));
			}
		}
		let dndConnection = null;
		if (dnd && dnd.source && dnd.target) {
			if (dnd.source.side === MappingSide.INPUT) {
				dndConnection = this.getConnection(dnd.source.element, dnd.target.element);
			} else {
				dndConnection = this.getConnection(dnd.target.element, dnd.source.element);
			}
		}
		let dndInProgress = null;
		if (!dndConnection && dnd && dnd.source && dnd.pos) {
			dndInProgress = {
				sourceYPos: this.getYPosition(dnd.source.element, dnd.source.side),
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
		if (!selection) return;
		if (selection.side === MappingSide.INPUT) {
			this.inputSchemaRef.reveal(selection.element);
		} else {
			this.outputSchemaRef.reveal(selection.element);
		}
	}

	revealConnection(element, side) {
		const dataAccessor = this.props.dataAccessor;
		const mappingItems = dataAccessor.getMappingItemsWithElement(this.props.mapping,
			element, side);
		if (mappingItems && mappingItems.length > 0) {
			const item = mappingItems[0];
			if (side === MappingSide.INPUT) {
				this.outputSchemaRef.reveal(dataAccessor.getMappedElement(item, MappingSide.OUTPUT));
			} else {
				this.inputSchemaRef.reveal(dataAccessor.getMappedElement(item, MappingSide.INPUT));
			}
		}
	}

	updateInputSchemaRef(ref) {
		this.inputSchemaRef = ref;
	}

	updateOutputSchemaRef(ref) {
		this.outputSchemaRef = ref;
	}

	updateGMapRef(ref) {
		this.gMapRef = ref;
	}

	render() {
		const {
			dataAccessor,
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
					dataAccessor={dataAccessor}
					ref={this.updateInputSchemaRef}
					side={MappingSide.INPUT}
					schema={inputSchema}
					draggable={draggable}
					mappedElements={getMappedElements(dataAccessor, mapping, MappingSide.INPUT)}
					performMapping={performMapping}
					selection={selection}
					onSelect={onSelect}
					onScroll={this.onScroll}
					pendingItem={pendingItem}
					onEnterElement={onEnterElement}
					onLeaveElement={onLeaveElement}
					focusedElements={getFocusedElements(dataAccessor, mapping, focused, MappingSide.INPUT)}
					dnd={dnd}
					beginDrag={beginDrag}
					canDrop={canDrop}
					drop={drop}
					endDrag={endDrag}
					revealConnection={this.revealConnection}
				/>
				<Schema
					dataAccessor={dataAccessor}
					ref={this.updateOutputSchemaRef}
					side={MappingSide.OUTPUT}
					schema={outputSchema}
					draggable={draggable}
					mappedElements={getMappedElements(dataAccessor, mapping, MappingSide.OUTPUT)}
					performMapping={performMapping}
					selection={selection}
					onSelect={onSelect}
					onScroll={this.onScroll}
					pendingItem={pendingItem}
					onEnterElement={onEnterElement}
					onLeaveElement={onLeaveElement}
					focusedElements={getFocusedElements(dataAccessor, mapping, focused, MappingSide.OUTPUT)}
					dnd={dnd}
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
	dataAccessor: PropTypes.object,
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
