import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Schema from '../Schema/Schema.js';
import Mapping from './Mapping.js';
import * as Constants from '../Constants';

function getMappedElements(dataAccessor, mapping, side) {
	const mappingItems = dataAccessor.getMappingItems(mapping);
	return mappingItems.map(item => dataAccessor.getMappedElement(item, side));
}

function getFocusedElements(dataAccessor, mapping, focused, side) {
	let focusedElements = [];
	if (focused) {
		const focusedItems = dataAccessor.getMappingItemsWithElement(
			mapping,
			focused.element,
			focused.side,
		);
		if (focusedItems) {
			focusedElements = focusedElements.concat(
				focusedItems.map(item => dataAccessor.getMappedElement(item, side))
			);
		}
		if (focused.side === side && !dataAccessor.includes(focusedElements, focused.element)) {
			focusedElements = focusedElements.concat(focused.element);
		}
	}
	return focusedElements;
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

function initAnchors() {
	return {
		input: null,
		output: null,
		version: -1,
	};
}

function resetAnchors(anchors) {
	return {
		input: null,
		output: null,
		version: anchors.version,
	};
}

function areAnchorsValid(anchors) {
	return anchors.input && anchors.output;
}

function needResetAnchors(status) {
	const focusedChanged = (status & Constants.StateStatus.FOCUSED) !== 0;
	const selectionChanged = (status & Constants.StateStatus.SELECTION) !== 0;
	const pendingChanged = (status & Constants.StateStatus.PENDING) !== 0;
	return focusedChanged || selectionChanged || pendingChanged;
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
		this.anchors = initAnchors();
		this.getAnchors = this.getAnchors.bind(this);
		this.getConnections = this.getConnections.bind(this);
		this.getYPosition = this.getYPosition.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.revealConnectedElement = this.revealConnectedElement.bind(this);
		this.updateInputSchemaRef = this.updateInputSchemaRef.bind(this);
		this.updateOutputSchemaRef = this.updateOutputSchemaRef.bind(this);
		this.updateGMapRef = this.updateGMapRef.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (needResetAnchors(nextProps.status)) {
			this.anchors = resetAnchors(this.anchors);
		}
		if (mappingHasChanged(nextProps.dataAccessor, this.mappingVersion)) {
			this.visibleMapping = null;
			this.mappingVersion = nextProps.dataAccessor.getMappingVersion();
			this.anchors = resetAnchors(this.anchors);
		}
		if (filterHasChanged(nextProps.dataAccessor, this.props.inputSchema, this.inputFilterVersion)) {
			this.visibleMapping = null;
			this.visibleInputElements = null;
			this.inputFilterVersion = nextProps.dataAccessor.getFilterVersion(this.props.inputSchema);
			this.anchors = resetAnchors(this.anchors);
		}
		if (
			filterHasChanged(nextProps.dataAccessor, this.props.outputSchema, this.outputFilterVersion)
		) {
			this.visibleMapping = null;
			this.visibleOutputElements = null;
			this.outputFilterVersion = nextProps.dataAccessor.getFilterVersion(this.props.outputSchema);
			this.anchors = resetAnchors(this.anchors);
		}
	}

	getMappingComponent() {
		let comp = this.gMapRef;
		if (this.gMapRef.getWrappedInstance) {
			comp = this.gMapRef.getWrappedInstance();
		}
		return comp;
	}

	onScroll(side) {
		this.anchors = resetAnchors(this.anchors);
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
		let gMap = this.getMappingComponent();
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

	getConnectionKey(sourceElement, targetElement) {
		const key1 = this.props.dataAccessor.getElementId(sourceElement);
		const key2 = this.props.dataAccessor.getElementId(targetElement);
		return `${key1}-${key2}`;
	}

	getConnection(sourceElement, targetElement) {
		const sourceYPos = this.getYPosition(sourceElement, Constants.MappingSide.INPUT);
		const targetYPos = this.getYPosition(targetElement, Constants.MappingSide.OUTPUT);
		return {
			sourceYPos,
			targetYPos,
			key: this.getConnectionKey(sourceElement, targetElement),
		};
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
			key: this.getConnectionKey(sourceElement, targetElement),
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

	getAnchorKey(elem, side) {
		const key = this.props.dataAccessor.getElementId(elem);
		return `${side}-${key}`;
	}

	getAnchor(elem, side, mapped) {
		return {
			yPos: this.getYPosition(elem, side),
			element: elem,
			side,
			key: this.getAnchorKey(elem, side),
			mapped,
			visible: true,
		};
	}

	updatePropertyValue(
		dataAccessor,
		item,
		visibleElements,
		anchors,
		property,
		value,
	) {
		const elemId = dataAccessor.getElementId(item.element);
		if (dataAccessor.includes(visibleElements[item.side], item.element)) {
			anchors[item.side][elemId][property] = value;
		}
	}

	populateAnchors(
		dataAccessor,
		anchors,
		visibleElements,
		side,
		visibleMapping,
	) {
		for (let i = 0; i < visibleElements[side].length; i += 1) {
			const elem = visibleElements[side][i];
			const elemId = dataAccessor.getElementId(elem);
			const mapped = dataAccessor.isElementMapped(visibleMapping, elem, side);
			anchors[side][elemId] = this.getAnchor(elem, side, mapped);
		}
	}

	getAnchors() {
		if (!areAnchorsValid(this.anchors) && this.inputSchemaRef && this.outputSchemaRef) {
			this.anchors = this.computeAnchors(this.anchors.version + 1);
		}
		if (areAnchorsValid(this.anchors)) {
			return this.anchors;
		}
		return {
			input: {},
			output: {},
			version: -1,
		};
	}

	computeAnchors(version) {
		const { dataAccessor, focused, selection, pendingItem, dnd } = this.props;
		const anchors = {
			input: {},
			output: {},
			version,
		};

		if (this.inputSchemaRef && this.outputSchemaRef) {
			const visibleElements = {
				input: this.getInputVisibleElements(),
				output: this.getOutputVisibleElements(),
			};
			const visibleMapping = this.getVisibleMapping();

			this.populateAnchors(dataAccessor, anchors, visibleElements, Constants.MappingSide.INPUT, visibleMapping);
			this.populateAnchors(dataAccessor, anchors, visibleElements, Constants.MappingSide.OUTPUT, visibleMapping);

			if (selection) {
				this.updatePropertyValue(dataAccessor, selection, visibleElements, anchors, 'selected', true);
			}

			if (focused) {
				this.updatePropertyValue(dataAccessor, focused, visibleElements, anchors, 'focused', true);
			}

			if (pendingItem) {
				this.updatePropertyValue(dataAccessor, pendingItem, visibleElements, anchors, 'visible', false);
				if (selection) {
					this.updatePropertyValue(dataAccessor, selection, visibleElements, anchors, 'visible', false);
				}
			}

			// TODO
			// if (dnd) {
			// 	this.updatePropertyValue(dataAccessor, dnd.source, visibleElements, anchors, 'visible', false);
			// 	if (dnd.target) {
			// 		this.updatePropertyValue(dataAccessor, dnd.target, visibleElements, anchors, 'visible', false);
			// 	}
			// }

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

		const hasVisibleMapping = !dataAccessor.isMappingEmpty(visibleMapping);

		// if there is no mapping and no pending connection and no drag and drop in progress
		// then there is no connection to display
		if (!hasVisibleMapping && !pendingItem && !dnd) return null;

		const inputVisibleElements = this.getInputVisibleElements();
		const outputVisibleElements = this.getOutputVisibleElements();

		// first check if we display all the connections ('show all' option)
		let allConnections = null;
		if (preferences.showAll && this.inputSchemaRef && this.outputSchemaRef && hasVisibleMapping) {
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
		if (selection && hasVisibleMapping) {
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
		if (focused && hasVisibleMapping) {
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

	revealSelection(selection) {
		if (!selection) return;
		if (selection.side === Constants.MappingSide.INPUT) {
			this.inputSchemaRef.reveal(selection.element);
		} else {
			this.outputSchemaRef.reveal(selection.element);
		}
	}

	revealConnectedElement(element, side) {
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

	revealElement(element, side) {
		if (side === Constants.MappingSide.INPUT) {
			this.inputSchemaRef.reveal(element);
		} else {
			this.outputSchemaRef.reveal(element);
		}
	}

	revealConnection(source, target) {
		this.inputSchemaRef.reveal(source);
		this.outputSchemaRef.reveal(target);
		let gMap = this.getMappingComponent();
		if (gMap.reveal) {
			const connectionKey = this.getConnectionKey(source, target);
			gMap.reveal(connectionKey);
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
			dndListener,
			onEnterElement,
			onLeaveElement,
			draggable,
			status,
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
					revealConnectedElement={this.revealConnectedElement}
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
					revealConnectedElement={this.revealConnectedElement}
					mappedElements={getMappedElements(dataAccessor, mapping, outputSide)}
					focusedElements={getFocusedElements(dataAccessor, mapping, focused, outputSide)}
					columnKeys={schemaConfiguration.getColumns(outputSide)}
					filters={filters.output}
				/>
				<Mapping
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
					draggable={draggable}
					dnd={dnd}
					dndListener={dndListener}
					mappingConfiguration={mappingConfiguration}
					onEnterAnchor={onEnterElement}
					onLeaveAnchor={onLeaveElement}
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
	dndListener: PropTypes.object,
	filters: PropTypes.object,
	filterComponents: PropTypes.object,
	onFilterChange: PropTypes.func,
	trigger: PropTypes.object,
	status: PropTypes.number,
};
