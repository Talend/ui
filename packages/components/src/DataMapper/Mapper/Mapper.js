import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Schema2 from '../Schema/Schema2.js';
import GMapping from './GMapping.js';
import * as Constants from '../Constants';

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
		this.getAnchors = this.getAnchors.bind(this);
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
		if (side === Constants.MappingSide.INPUT) {
			return this.inputSchemaRef.getYPosition(element);
		}
		return this.outputSchemaRef.getYPosition(element);
	}

	getConnection(sourceElement, targetElement) {
		const sourceYPos = this.getYPosition(sourceElement, Constants.MappingSide.INPUT);
		const targetYPos = this.getYPosition(targetElement, Constants.MappingSide.OUTPUT);
		return { sourceYPos, targetYPos };
	}

	getConnectionFromItem(dataAccessor, item) {
		return this.getConnection(
			dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT),
			dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT),
		);
	}

	// {
	//	unmapped: {
	//		input: [ypos1, ypos2, ...],
	//		output: [ypos1, ypos2, ...],
	//  },
	//	mapped: {
	//		input: [ypos1, ypos2, ...],
	//		output: [ypos1, ypos2, ...],
	//	},
	//	selected: {
	//		input: [ypos1, ypos2, ...],
	//		output: [ypos1, ypos2, ...],
	//	},
	//	focused: {
	//		input: [ypos1, ypos2, ...],
	//		output: [ypos1, ypos2, ...],
	//	},
	// }
	getAnchors() {
		const {
			mapping,
			dataAccessor,
			focused,
			selection,
		} = this.props;
		const anchors = {
			unmapped: {},
			mapped: {},
			selected: {},
			focused: {},
		};
		if (this.inputSchemaRef && this.outputSchemaRef) {
			const inputVisibleElements = this.inputSchemaRef.getVisibleElements();
			const outputVisibleElements = this.outputSchemaRef.getVisibleElements();
			// first get input elements which are not mapped
			const unmappedInputElements = inputVisibleElements.filter(elem =>
				!dataAccessor.isElementMapped(mapping, elem, Constants.MappingSide.INPUT)
			);
			if (unmappedInputElements) {
				const yPositions = unmappedInputElements.map(elem => this.getYPosition(elem, Constants.MappingSide.INPUT));
				anchors.unmapped.input = yPositions;
			}
			// then get output elements which are not mapped
			const unmappedOutputElements = outputVisibleElements.filter(elem =>
				!dataAccessor.isElementMapped(mapping, elem, Constants.MappingSide.OUTPUT)
			);
			if (unmappedOutputElements) {
				const yPositions = unmappedOutputElements.map(elem => this.getYPosition(elem, Constants.MappingSide.OUTPUT));
				anchors.unmapped.output = yPositions;
			}
			// input mapped elements
			const mappedInputElements = inputVisibleElements.filter(elem =>
				dataAccessor.isElementMapped(mapping, elem, Constants.MappingSide.INPUT)
			);
			if (mappedInputElements) {
				const yPositions = mappedInputElements.map(elem => this.getYPosition(elem, Constants.MappingSide.INPUT));
				anchors.mapped.input = yPositions;
			}
			// output mapped elements
			const mappedOutputElements = outputVisibleElements.filter(elem =>
				dataAccessor.isElementMapped(mapping, elem, Constants.MappingSide.OUTPUT)
			);
			if (mappedOutputElements) {
				const yPositions = mappedOutputElements.map(elem => this.getYPosition(elem, Constants.MappingSide.OUTPUT));
				anchors.mapped.output = yPositions;
			}
			// selected Anchor
			if (selection) {
				if (selection.side === Constants.MappingSide.INPUT) {
					anchors.selected.input = [this.getYPosition(selection.element, Constants.MappingSide.INPUT)];
				} else {
					anchors.selected.output = [this.getYPosition(selection.element, Constants.MappingSide.OUTPUT)];
				}
			}
			// FOCUSED Anchor
			if (focused) {
				if (focused.side === Constants.MappingSide.INPUT) {
					anchors.focused.input = [this.getYPosition(focused.element, Constants.MappingSide.INPUT)];
				} else {
					anchors.focused.output = [this.getYPosition(focused.element, Constants.MappingSide.OUTPUT)];
				}
			}
		}
		return anchors;
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
						dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT))
					|| dataAccessor.includes(outputVisibleElements,
						dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT)),
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
			if (pendingItem.side === Constants.MappingSide.INPUT) {
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
			if (dnd.source.side === Constants.MappingSide.INPUT) {
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
		if (selection.side === Constants.MappingSide.INPUT) {
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
			if (side === Constants.MappingSide.INPUT) {
				this.outputSchemaRef.reveal(dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT));
			} else {
				this.inputSchemaRef.reveal(dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT));
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
			mapperId,
			mappingRenderer,
			mapping,
			inputSchema,
			outputSchema,
			inputSchemaRenderer,
			outputSchemaRenderer,
			clearMapping,
			clearConnection,
			inputSchemaColumns,
			outputSchemaColumns,
			...commonSchemaProps,
		} = this.props;
		const {
			dataAccessor,
			performMapping,
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
				<Schema2
					{...commonSchemaProps}
					ref={this.updateInputSchemaRef}
					schema={inputSchema}
					schemaRenderer={inputSchemaRenderer}
					side={Constants.MappingSide.INPUT}
					onScroll={this.onScroll}
					revealConnection={this.revealConnection}
					mappedElements={getMappedElements(dataAccessor, mapping, Constants.MappingSide.INPUT)}
			    focusedElements={getFocusedElements(dataAccessor, mapping, focused, Constants.MappingSide.INPUT)}
					columnKeys={inputSchemaColumns}
				/>
				<Schema2
					{...commonSchemaProps}
					ref={this.updateOutputSchemaRef}
					schema={outputSchema}
					schemaRenderer={outputSchemaRenderer}
					side={Constants.MappingSide.OUTPUT}
					onScroll={this.onScroll}
					revealConnection={this.revealConnection}
					mappedElements={getMappedElements(dataAccessor, mapping, Constants.MappingSide.OUTPUT)}
			    focusedElements={getFocusedElements(dataAccessor, mapping, focused, Constants.MappingSide.OUTPUT)}
					columnKeys={outputSchemaColumns}
				/>
				<GMapping
					ref={this.updateGMapRef}
					mapping={mapping}
					clearConnection={clearConnection}
					clearMapping={clearMapping}
					getConnections={this.getConnections}
					getAnchors={this.getAnchors}
					getYPosition={this.getYPosition}
					selection={selection}
					showAll={showAll}
					onShowAll={onShowAll}
					dnd={dnd}
					dndInProgress={dndInProgress}
					renderer={mappingRenderer}
				/>
			</div>
		);
	}
}

Mapper.propTypes = {
	dataAccessor: PropTypes.object,
	mapperId: PropTypes.string,
	mappingRenderer: PropTypes.string,
	mapping: PropTypes.array,
	selection: PropTypes.object,
	inputSchema: PropTypes.object,
	outputSchema: PropTypes.object,
	inputSchemaRenderer: PropTypes.object,
	outputSchemaRenderer: PropTypes.object,
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
	inputSchemaColumns: PropTypes.array,
	outputSchemaColumns: PropTypes.array,
};
