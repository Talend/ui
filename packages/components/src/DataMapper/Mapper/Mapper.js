import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Schema from '../Schema/Schema.js';
import GMapping from './GMapping.js';
import * as Constants from '../Constants';

function getMappedElements(dataAccessor, mapping, side) {
	const mappingItems = dataAccessor.getMappingItems(mapping);
	return mappingItems.map(item => dataAccessor.getMappedElement(item, side));
}

function getFocusedElements(dataAccessor, mapping, focused, side) {
	if (!focused || focused.side === side) return [];
	const focusedItems = dataAccessor.getMappingItemsWithElement(
		mapping,
		focused.element,
		focused.side,
	);
	if (focusedItems) {
		return focusedItems.map(item => dataAccessor.getMappedElement(item, side));
	}
	return [];
}

function updateVisibleMapping(dataAccessor, mapping, visibleInputElements, visibleOutputElements) {
	return mapping.filter(
		item =>
			dataAccessor.includes(
				visibleInputElements,
				dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT),
			) ||
			dataAccessor.includes(
				visibleOutputElements,
				dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT),
			),
	);
}

function filterMappingItems(
	dataAccessor,
	inputSchema,
	outputSchema,
	mappingItems,
	visibleInputElements,
	visibleOutputElements,
) {
	return mappingItems.filter(
		item =>
			(dataAccessor.includes(
				visibleInputElements,
				dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT),
			) &&
				!dataAccessor.isFiltered(
					outputSchema,
					dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT),
				)) ||
			(dataAccessor.includes(
				visibleOutputElements,
				dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT),
			) &&
				!dataAccessor.isFiltered(
					inputSchema,
					dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT),
				)),
	);
}

function mappingHasChanged(dataAccessor, version) {
	return dataAccessor.getMappingVersion() !== version;
}

function filterHasChanged(dataAccessor, schema, version) {
	return dataAccessor.getFilterVersion(schema) !== version;
}

export default class Mapper extends Component {
	constructor(props) {
		super(props);
		this.visibleInputElements = null;
		this.visibleOutputElements = null;
		this.inputFilterVersion = props.dataAccessor.getFilterVersion(props.inputSchema);
		this.outputFilterVersion = props.dataAccessor.getFilterVersion(props.outputSchema);
		this.visibleMapping = null;
		this.mappingVersion = props.dataAccessor.getMappingVersion();
		this.getAnchors = this.getAnchors.bind(this);
		this.getConnections = this.getConnections.bind(this);
		this.getYPosition = this.getYPosition.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.revealConnection = this.revealConnection.bind(this);
		this.updateInputSchemaRef = this.updateInputSchemaRef.bind(this);
		this.updateOutputSchemaRef = this.updateOutputSchemaRef.bind(this);
		this.updateGMapRef = this.updateGMapRef.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (mappingHasChanged(nextProps.dataAccessor, this.mappingVersion)) {
			this.visibleMapping = null;
			this.mappingVersion = nextProps.dataAccessor.getMappingVersion();
		}
		if (filterHasChanged(nextProps.dataAccessor, this.props.inputSchema, this.inputFilterVersion)) {
			this.visibleMapping = null;
			this.visibleInputElements = null;
			this.inputFilterVersion = nextProps.dataAccessor.getFilterVersion(this.props.inputSchema);
		}
		if (
			filterHasChanged(nextProps.dataAccessor, this.props.outputSchema, this.outputFilterVersion)
		) {
			this.visibleMapping = null;
			this.visibleOutputElements = null;
			this.outputFilterVersion = nextProps.dataAccessor.getFilterVersion(this.props.outputSchema);
		}
	}

	onScroll(side) {
		switch (side) {
			case Constants.MappingSide.INPUT:
				if (this.inputSchemaRef) {
					this.visibleInputElements = this.inputSchemaRef.getVisibleElements();
					this.visibleMapping = updateVisibleMapping(
						this.props.dataAccessor,
						this.props.mapping,
						this.visibleInputElements,
						this.visibleOutputElements,
					);
				}
				break;
			case Constants.MappingSide.OUTPUT:
				if (this.outputSchemaRef) {
					this.visibleOutputElements = this.outputSchemaRef.getVisibleElements();
					this.visibleMapping = updateVisibleMapping(
						this.props.dataAccessor,
						this.props.mapping,
						this.visibleInputElements,
						this.visibleOutputElements,
					);
				}
				break;
			default:
				break;
		}
		let gMap = this.gMapRef;
		if (this.gMapRef.getWrappedInstance) {
			gMap = this.gMapRef.getWrappedInstance();
		}
		if (gMap.update) {
			gMap.update();
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

	getVisibility(sourceIsVisible, targetIsVisible, sourceYPos, targetYPos, gradientMargin) {
		const delta = Math.abs(sourceYPos - targetYPos);
		if (sourceIsVisible && targetIsVisible) {
			return Constants.Connection.VISIBILITY.FULL;
		} else if (sourceIsVisible) {
			if (delta <= gradientMargin) {
				return Constants.Connection.VISIBILITY.FULL;
			}
			return Constants.Connection.VISIBILITY.LEFT;
		} else if (targetIsVisible) {
			if (delta <= gradientMargin) {
				return Constants.Connection.VISIBILITY.FULL;
			}
			return Constants.Connection.VISIBILITY.RIGHT;
		}
		return Constants.Connection.VISIBILITY.NONE;
	}

	getConnectionWithVisibility(
		sourceElement,
		targetElement,
		sourceIsVisible,
		targetIsVisible,
		gradientMargin,
	) {
		const sourceYPos = this.getYPosition(sourceElement, Constants.MappingSide.INPUT);
		const targetYPos = this.getYPosition(targetElement, Constants.MappingSide.OUTPUT);
		return {
			sourceYPos,
			targetYPos,
			visibility: this.getVisibility(
				sourceIsVisible,
				targetIsVisible,
				sourceYPos,
				targetYPos,
				gradientMargin,
			),
		};
	}

	getConnectionWithVisibilityFromItem(
		dataAccessor,
		item,
		visibleInputElements,
		visibleOutputElements,
		gradientMargin,
	) {
		const sourceElement = dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT);
		const targetElement = dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT);
		return this.getConnectionWithVisibility(
			sourceElement,
			targetElement,
			dataAccessor.includes(visibleInputElements, sourceElement),
			dataAccessor.includes(visibleOutputElements, targetElement),
			gradientMargin,
		);
	}

	getInputVisibleElements() {
		if (this.visibleInputElements) {
			return this.visibleInputElements;
		}
		if (this.inputSchemaRef) {
			this.visibleInputElements = this.inputSchemaRef.getVisibleElements();
			return this.visibleInputElements;
		}
		return this.props.dataAccessor.getSchemaElements(this.props.inputSchema, true);
	}

	getOutputVisibleElements() {
		if (this.visibleOutputElements) {
			return this.visibleOutputElements;
		}
		if (this.outputSchemaRef) {
			this.visibleOutputElements = this.outputSchemaRef.getVisibleElements();
			return this.visibleOutputElements;
		}
		return this.props.dataAccessor.getSchemaElements(this.props.outputSchema, true);
	}

	getVisibleMapping() {
		if (!this.visibleMapping) {
			this.visibleMapping = updateVisibleMapping(
				this.props.dataAccessor,
				this.props.mapping,
				this.getInputVisibleElements(),
				this.getOutputVisibleElements(),
			);
		}
		return this.visibleMapping;
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
		const { dataAccessor, focused, selection, pendingItem, dnd } = this.props;
		const anchors = {
			unmapped: {},
			mapped: {},
			selected: {},
			focused: {},
		};

		if (this.inputSchemaRef && this.outputSchemaRef) {
			const inputVisibleElements = this.getInputVisibleElements();
			const outputVisibleElements = this.getOutputVisibleElements();
			const visibleMapping = this.getVisibleMapping();

			// first get input elements which are not mapped
			const unmappedInputElements = inputVisibleElements.filter(
				elem => !dataAccessor.isElementMapped(visibleMapping, elem, Constants.MappingSide.INPUT),
			);
			if (unmappedInputElements) {
				const yPositions = unmappedInputElements.map(elem =>
					this.getYPosition(elem, Constants.MappingSide.INPUT),
				);
				anchors.unmapped.input = yPositions;
			}
			// then get output elements which are not mapped
			const unmappedOutputElements = outputVisibleElements.filter(
				elem => (
					!dataAccessor.isElementMapped(visibleMapping, elem, Constants.MappingSide.OUTPUT)
					&& (!pendingItem
						|| pendingItem.side === Constants.MappingSide.INPUT
						|| !dataAccessor.areEquals(pendingItem.element, elem))
					&& (!selection
						|| selection.side === Constants.MappingSide.INPUT
						|| !dataAccessor.areEquals(selection.element, elem))
					&& (!dnd
						|| (dnd.source.side === Constants.MappingSide.INPUT &&
							(!dnd.target || !dataAccessor.areEquals(dnd.target.element, elem)))
						|| (dnd.source.side === Constants.MappingSide.OUTPUT
							&& !dataAccessor.areEquals(dnd.source.element, elem))
					)
				)
			);
			if (unmappedOutputElements) {
				const yPositions = unmappedOutputElements.map(elem =>
					this.getYPosition(elem, Constants.MappingSide.OUTPUT),
				);
				anchors.unmapped.output = yPositions;
			}
			// input mapped elements
			const mappedInputElements = inputVisibleElements.filter(elem =>
				dataAccessor.isElementMapped(visibleMapping, elem, Constants.MappingSide.INPUT),
			);
			if (mappedInputElements) {
				const yPositions = mappedInputElements.map(elem =>
					this.getYPosition(elem, Constants.MappingSide.INPUT),
				);
				anchors.mapped.input = yPositions;
			}
			// output mapped elements
			const mappedOutputElements = outputVisibleElements.filter(elem =>
				dataAccessor.isElementMapped(visibleMapping, elem, Constants.MappingSide.OUTPUT),
			);
			if (mappedOutputElements) {
				const yPositions = mappedOutputElements.map(elem =>
					this.getYPosition(elem, Constants.MappingSide.OUTPUT),
				);
				anchors.mapped.output = yPositions;
			}
			// selected Anchor
			if (selection && !pendingItem) {
				if (selection.side === Constants.MappingSide.INPUT) {
					anchors.selected.input = [
						this.getYPosition(selection.element, Constants.MappingSide.INPUT),
					];
				} else {
					anchors.selected.output = [
						this.getYPosition(selection.element, Constants.MappingSide.OUTPUT),
					];
				}
				anchors.selected.mapped = dataAccessor.isElementMapped(
					visibleMapping, selection.element, selection.side);
			}
			// FOCUSED Anchor
			if (focused && (!dnd || !dataAccessor.areEquals(dnd.source.element, focused.element))) {
				if (focused.side === Constants.MappingSide.INPUT) {
					anchors.focused.input = [this.getYPosition(focused.element, Constants.MappingSide.INPUT)];
				} else {
					anchors.focused.output = [
						this.getYPosition(focused.element, Constants.MappingSide.OUTPUT),
					];
				}
				anchors.focused.mapped = dataAccessor.isElementMapped(
					visibleMapping, focused.element, focused.side);
			}
		}
		return anchors;
	}

	// { current : [ {sourceYPos1, targetYPos1}, {sourceYPos2, targetYPos2} ],
	//   pending : {sourceYPos, targetYPos},
	//   focused: [ {sourceYPos1, targetYPos1}, {sourceYPos2, targetYPos2} ],
	//   all: [ {sourceYPos1, targetYPos1, visibility}, {sourceYPos2, targetYPos2, visibility} ],
	//   dnd: {sourceYPos, targetYPos},
	//	 dndInProgress: {sourceYPos, pos}
	// }
	getConnections() {
		const {
			dataAccessor,
			inputSchema,
			outputSchema,
			selection,
			pendingItem,
			focused,
			preferences,
			dnd,
		} = this.props;

		const visibleMapping = this.getVisibleMapping();

		// if there is no mapping and no pending connection and no drag and drop in progress
		// then there is no connection to display
		if (dataAccessor.isMappingEmpty(visibleMapping) && !pendingItem && !dnd) return null;

		const inputVisibleElements = this.getInputVisibleElements();
		const outputVisibleElements = this.getOutputVisibleElements();

		// first check if we display all the connections ('show all' option)
		let allConnections = null;
		if (preferences.showAll && this.inputSchemaRef && this.outputSchemaRef) {
			const filteredMappingItems = filterMappingItems(
				dataAccessor,
				inputSchema,
				outputSchema,
				visibleMapping,
				inputVisibleElements,
				outputVisibleElements,
			);
			// then build connections
			if (filteredMappingItems) {
				if (preferences.withGradient) {
					allConnections = filteredMappingItems.map(item =>
						this.getConnectionWithVisibilityFromItem(
							dataAccessor,
							item,
							inputVisibleElements,
							outputVisibleElements,
							preferences.gradientMargin,
						),
					);
				} else {
					allConnections = filteredMappingItems.map(item =>
						this.getConnectionFromItem(dataAccessor, item),
					);
				}
			}
		}

		// display selected connection
		let selectionItems = null;
		if (selection) {
			selectionItems = dataAccessor.getMappingItemsWithElement(
				visibleMapping,
				selection.element,
				selection.side,
			);
		}
		let current = null;
		if (selectionItems) {
			const filteredSelectionItems = filterMappingItems(
				dataAccessor,
				inputSchema,
				outputSchema,
				selectionItems,
				inputVisibleElements,
				outputVisibleElements,
			);
			if (filteredSelectionItems) {
				current = filteredSelectionItems.map(item =>
					this.getConnectionFromItem(dataAccessor, item),
				);
			}
		}

		// display pending connection (i.e. connection via keyboard)
		let pending = null;
		if (selection && pendingItem) {
			if (pendingItem.side === Constants.MappingSide.INPUT) {
				pending = this.getConnection(pendingItem.element, selection.element);
			} else {
				pending = this.getConnection(selection.element, pendingItem.element);
			}
		}

		// display focused connections, i.e. overflown mapped elements
		let focusedConnections = null;
		if (focused) {
			const focusedItems = dataAccessor.getMappingItemsWithElement(
				visibleMapping,
				focused.element,
				focused.side,
			);
			if (focusedItems) {
				const filteredFocusedItems = filterMappingItems(
					dataAccessor,
					inputSchema,
					outputSchema,
					focusedItems,
					inputVisibleElements,
					outputVisibleElements,
				);
				if (filteredFocusedItems) {
					focusedConnections = filteredFocusedItems.map(item =>
						this.getConnectionFromItem(dataAccessor, item),
					);
				}
			}
		}

		// display drag and drop in progress
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
		const mappingItems = dataAccessor.getMappingItemsWithElement(this.props.mapping, element, side);
		if (mappingItems && mappingItems.length > 0) {
			const item = mappingItems[0];
			if (side === Constants.MappingSide.INPUT) {
				this.outputSchemaRef.reveal(
					dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT),
				);
			} else {
				this.inputSchemaRef.reveal(
					dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT),
				);
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
			mappingConfiguration,
			mapping,
			inputSchema,
			outputSchema,
			schemaConfiguration,
			clearMapping,
			clearConnection,
			filters,
			...commonSchemaProps
		} = this.props;
		const {
			dataAccessor,
			selection,
			focused,
			preferences,
			onShowAll,
			dnd,
			dndInProgress,
		} = this.props;
		const inputSide = Constants.MappingSide.INPUT;
		const outputSide = Constants.MappingSide.OUTPUT;
		return (
			<div id={mapperId}>
				<Schema
					{...commonSchemaProps}
					ref={this.updateInputSchemaRef}
					schema={inputSchema}
					SchemaRenderer={schemaConfiguration.getRenderer(inputSide)}
					side={inputSide}
					onScroll={this.onScroll}
					revealConnection={this.revealConnection}
					mappedElements={getMappedElements(dataAccessor, mapping, inputSide)}
					focusedElements={getFocusedElements(dataAccessor, mapping, focused, inputSide)}
					columnKeys={schemaConfiguration.getColumns(inputSide)}
					filters={filters.input}
				/>
				<Schema
					{...commonSchemaProps}
					ref={this.updateOutputSchemaRef}
					schema={outputSchema}
					SchemaRenderer={schemaConfiguration.getRenderer(outputSide)}
					side={outputSide}
					onScroll={this.onScroll}
					revealConnection={this.revealConnection}
					mappedElements={getMappedElements(dataAccessor, mapping, outputSide)}
					focusedElements={getFocusedElements(dataAccessor, mapping, focused, outputSide)}
					columnKeys={schemaConfiguration.getColumns(outputSide)}
					filters={filters.output}
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
					preferences={preferences}
					onShowAll={onShowAll}
					dnd={dnd}
					dndInProgress={dndInProgress}
					mappingConfiguration={mappingConfiguration}
				/>
			</div>
		);
	}
}

Mapper.propTypes = {
	dataAccessor: PropTypes.object,
	mapperId: PropTypes.string,
	mappingConfiguration: PropTypes.object,
	mapping: PropTypes.array,
	selection: PropTypes.object,
	inputSchema: PropTypes.object,
	outputSchema: PropTypes.object,
	schemaConfiguration: PropTypes.object,
	performMapping: PropTypes.func,
	clearMapping: PropTypes.func,
	clearConnection: PropTypes.func,
	draggable: PropTypes.bool,
	onSelect: PropTypes.func,
	pendingItem: PropTypes.object,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	focused: PropTypes.object,
	preferences: PropTypes.object,
	onShowAll: PropTypes.func,
	dnd: PropTypes.object,
	dndInProgress: PropTypes.func,
	beginDrag: PropTypes.func,
	canDrop: PropTypes.func,
	drop: PropTypes.func,
	endDrag: PropTypes.func,
	filters: PropTypes.array,
	filterComponents: PropTypes.object,
	onFilterChange: PropTypes.func,
	trigger: PropTypes.object,
};
