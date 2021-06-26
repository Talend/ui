import React, { Component } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import { DragDropContext } from 'react-dnd';
// eslint-disable-next-line import/no-extraneous-dependencies
import HTML5Backend from 'react-dnd-html5-backend';

import Schema from './Schema/Schema';
import Mapping from './Mapping/Mapping';
import Constants from './Constants';

/**
 * This function returns the mapped elements for the specified side (input/output)
 * as an array.
 * @param {object} dataAccessor -
 * @param {array} mapping - an array of mapping items {source, target}
 * @param {string} side - the mapping side, i.e. input or output.
 */
function getMappedElements(dataAccessor, mapping, side) {
	return mapping.map(item => dataAccessor.getMappedElement(item, side));
}

/**
 * This function returns the focused elements for the specified side (input/output)
 * as an array.
 * A focused element is an element which is overflew or which is mapped to an overflew element.
 * @param {object} dataAccessor -
 * @param {array} mapping - an array of mapping items {source, target}
 * @param {object} focused - the current overflown/focused element
 * @param {string} side - the mapping side, i.e. input or output.
 */
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
				focusedItems.map(item => dataAccessor.getMappedElement(item, side)),
			);
		}
		if (focused.side === side && !dataAccessor.includes(focusedElements, focused.element)) {
			focusedElements = focusedElements.concat(focused.element);
		}
	}
	return focusedElements;
}

/**
 * This function computes the visible mapping items.
 * It filters all the mapping items and keeps only item with at least one visible
 * element (source or/and target).
 */
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

/**
 * This function indicates if the given mapping item has to be rendered or not.
 */
function filterMappingItem(dataAccessor, schema, mappingItem, elements, side) {
	const oppositeSide = Constants.switchMappingSide(side);
	return (
		dataAccessor.includes(elements, dataAccessor.getMappedElement(mappingItem, side)) &&
		!dataAccessor.isFiltered(schema, dataAccessor.getMappedElement(mappingItem, oppositeSide))
	);
}

/**
 * This function filters the given mapping items.
 */
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
			filterMappingItem(
				dataAccessor,
				outputSchema,
				item,
				visibleInputElements,
				Constants.MappingSide.INPUT,
			) ||
			filterMappingItem(
				dataAccessor,
				inputSchema,
				item,
				visibleOutputElements,
				Constants.MappingSide.OUTPUT,
			),
	);
}

function mappingHasChanged(dataAccessor, version) {
	return dataAccessor.getMappingVersion() !== version;
}

function filtersHaveChanged(dataAccessor, schema, version) {
	return dataAccessor.getFiltersVersion(schema) !== version;
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

function sortHasChanged(status) {
	return (status & Constants.StateStatus.SORT) !== 0;
}

class MapperComponent extends Component {
	constructor(props) {
		super(props);
		this.visibleInputElements = null;
		this.visibleOutputElements = null;
		this.inputFilterVersion = props.dataAccessor.getFiltersVersion(props.input.schema);
		this.outputFilterVersion = props.dataAccessor.getFiltersVersion(props.output.schema);
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
		this.isElementVisible = this.isElementVisible.bind(this);
		this.filtersVersion = { input: 0, output: 0 };
	}

	componentDidMount() {
		this.resetAll();
		this.forceUpdate();
	}

	componentDidUpdate() {
		if (this.props.trigger && this.props.trigger.code === Constants.Events.FILTERING) {
			const side = this.props.trigger.side;
			const filtersVersion = this.props.trigger.filtersVersion;
			if (this.filtersVersion[side] < filtersVersion) {
				this.filtersVersion[side] = filtersVersion;
				// need re render
				this.forceUpdate();
			}
		}
	}

	resetAll() {
		this.anchors = resetAnchors(this.anchors);
		this.visibleMapping = null;
		this.visibleInputElements = null;
		this.visibleOutputElements = null;
	}

	componentWillReceiveProps(nextProps) {
		if (needResetAnchors(nextProps.status)) {
			this.anchors = resetAnchors(this.anchors);
		}
		if (sortHasChanged(nextProps.status)) {
			this.visibleMapping = null;
			this.anchors = resetAnchors(this.anchors);
			switch (nextProps.trigger.side) {
				case Constants.MappingSide.INPUT:
					this.visibleInputElements = null;
					break;
				case Constants.MappingSide.OUTPUT:
					this.visibleOutputElements = null;
					break;
				default:
					break;
			}
		}
		if (mappingHasChanged(nextProps.dataAccessor, this.mappingVersion)) {
			this.visibleMapping = null;
			this.mappingVersion = nextProps.dataAccessor.getMappingVersion();
			this.anchors = resetAnchors(this.anchors);
		}
		if (
			filtersHaveChanged(nextProps.dataAccessor, this.props.input.schema, this.inputFilterVersion)
		) {
			this.visibleMapping = null;
			this.visibleInputElements = null;
			this.inputFilterVersion = nextProps.dataAccessor.getFiltersVersion(this.props.input.schema);
			this.anchors = resetAnchors(this.anchors);
		}
		if (
			filtersHaveChanged(nextProps.dataAccessor, this.props.output.schema, this.outputFilterVersion)
		) {
			this.visibleMapping = null;
			this.visibleOutputElements = null;
			this.outputFilterVersion = nextProps.dataAccessor.getFiltersVersion(this.props.output.schema);
			this.anchors = resetAnchors(this.anchors);
		}
	}

	updateVisibleInfo(side) {
		if (!side || side === Constants.MappingSide.INPUT) {
			this.visibleInputElements = this.inputSchemaRef.getVisibleElements();
		}
		if (!side || side === Constants.MappingSide.OUTPUT) {
			this.visibleOutputElements = this.outputSchemaRef.getVisibleElements();
		}
		this.visibleMapping = updateVisibleMapping(
			this.props.dataAccessor,
			this.props.mapping,
			this.visibleInputElements,
			this.visibleOutputElements,
		);
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
		const gMap = this.getMappingComponent();
		if (gMap.update) {
			gMap.update();
		}
	}

	getMappingComponent() {
		let comp = this.gMapRef;
		if (this.gMapRef.getWrappedInstance) {
			comp = this.gMapRef.getWrappedInstance();
		}
		return comp;
	}

	getYPosition(element, side) {
		if (side === Constants.MappingSide.INPUT) {
			return this.inputSchemaRef.getYPosition(element);
		}
		return this.outputSchemaRef.getYPosition(element);
	}

	getElementAtPosition(position, side) {
		if (side === Constants.MappingSide.INPUT) {
			return this.inputSchemaRef.getElementAtPosition(position);
		}
		return this.outputSchemaRef.getElementAtPosition(position);
	}

	getConnectionKey(sourceElement, targetElement) {
		return `${sourceElement.id}-${targetElement.id}`;
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

	getVisibility(sourceIsVisible, targetIsVisible, sourceYPos, targetYPos) {
		if (sourceIsVisible && targetIsVisible) {
			return Constants.Connection.VISIBILITY.FULL;
		} else if (sourceIsVisible) {
			return Constants.Connection.VISIBILITY.LEFT;
		} else if (targetIsVisible) {
			return Constants.Connection.VISIBILITY.RIGHT;
		}
		return Constants.Connection.VISIBILITY.NONE;
	}

	getConnectionWithVisibility(sourceElement, targetElement, sourceIsVisible, targetIsVisible) {
		const sourceYPos = this.getYPosition(sourceElement, Constants.MappingSide.INPUT);
		const targetYPos = this.getYPosition(targetElement, Constants.MappingSide.OUTPUT);
		return {
			sourceYPos,
			targetYPos,
			key: this.getConnectionKey(sourceElement, targetElement),
			visibility: this.getVisibility(sourceIsVisible, targetIsVisible, sourceYPos, targetYPos),
		};
	}

	getConnectionWithVisibilityFromItem(
		dataAccessor,
		item,
		visibleInputElements,
		visibleOutputElements,
	) {
		const sourceElement = dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT);
		const targetElement = dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT);
		return this.getConnectionWithVisibility(
			sourceElement,
			targetElement,
			dataAccessor.includes(visibleInputElements, sourceElement),
			dataAccessor.includes(visibleOutputElements, targetElement),
		);
	}

	getVisibleElements(side) {
		switch (side) {
			case Constants.MappingSide.INPUT:
				return this.getInputVisibleElements();
			case Constants.MappingSide.OUTPUT:
				return this.getOutputVisibleElements();
			default:
				return [];
		}
	}

	getInputVisibleElements() {
		if (this.visibleInputElements) {
			return this.visibleInputElements;
		}
		if (this.inputSchemaRef) {
			this.visibleInputElements = this.inputSchemaRef.getVisibleElements();
			return this.visibleInputElements;
		}
		return this.props.dataAccessor.getSchemaElements(this.props.input.schema, true);
	}

	getOutputVisibleElements() {
		if (this.visibleOutputElements) {
			return this.visibleOutputElements;
		}
		if (this.outputSchemaRef) {
			this.visibleOutputElements = this.outputSchemaRef.getVisibleElements();
			return this.visibleOutputElements;
		}
		return this.props.dataAccessor.getSchemaElements(this.props.output.schema, true);
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
		return `${side}-${elem.id}`;
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

	updatePropertyValue(dataAccessor, item, visibleElements, anchors, property, value) {
		if (dataAccessor.includes(visibleElements[item.side], item.element)) {
			anchors[item.side][item.element.id][property] = value;
		}
	}

	populateAnchors(dataAccessor, anchors, visibleElements, side, visibleMapping) {
		for (let i = 0; i < visibleElements[side].length; i += 1) {
			const elem = visibleElements[side][i];
			const mapped = dataAccessor.isElementMapped(visibleMapping, elem, side);
			anchors[side][elem.id] = this.getAnchor(elem, side, mapped);
		}
	}

	getAnchors() {
		if (this.inputSchemaRef && this.outputSchemaRef) {
			this.anchors = this.computeAnchors(this.anchors.version + 1);
		}
		if (areAnchorsValid(this.anchors)) {
			return this.anchors;
		}
		return {
			input: null,
			output: null,
			version: -1,
		};
	}

	computeAnchors(version) {
		const { dataAccessor, focused, selection, pendingItem } = this.props;
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

			this.populateAnchors(
				dataAccessor,
				anchors,
				visibleElements,
				Constants.MappingSide.INPUT,
				visibleMapping,
			);
			this.populateAnchors(
				dataAccessor,
				anchors,
				visibleElements,
				Constants.MappingSide.OUTPUT,
				visibleMapping,
			);

			if (selection) {
				this.updatePropertyValue(
					dataAccessor,
					selection,
					visibleElements,
					anchors,
					'selected',
					true,
				);
			}

			if (focused) {
				this.updatePropertyValue(dataAccessor, focused, visibleElements, anchors, 'focused', true);
			}

			if (pendingItem) {
				this.updatePropertyValue(
					dataAccessor,
					pendingItem,
					visibleElements,
					anchors,
					'visible',
					false,
				);
				if (selection) {
					this.updatePropertyValue(
						dataAccessor,
						selection,
						visibleElements,
						anchors,
						'visible',
						false,
					);
				}
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
	getConnections(onlyDndInProgress) {
		const { dataAccessor, selection, pendingItem, focused, preferences, dnd } = this.props;
		const inputSchema = this.props.input.schema;
		const outputSchema = this.props.output.schema;

		if (onlyDndInProgress) {
			return this.getDnDInProgressConnection(dnd);
		}

		const visibleMapping = this.getVisibleMapping();
		const hasVisibleMapping = visibleMapping.length > 0;

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
				if (preferences.gradientStops50 || preferences.gradientStops100) {
					// build connections with visibility information
					allConnections = filteredMappingItems.map(item =>
						this.getConnectionWithVisibilityFromItem(
							dataAccessor,
							item,
							inputVisibleElements,
							outputVisibleElements,
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
		if (!dndConnection && dnd && dnd.source && dnd.inProgress && this.dndPos) {
			dndInProgress = this.getDnDInProgressConnection(dnd);
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

	getDnDInProgressConnection(dnd) {
		return {
			sourceYPos: this.getYPosition(dnd.source.element, dnd.source.side),
			pos: this.dndPos,
			key: 'dnd-in-progress',
		};
	}

	revealSelection(selection) {
		if (!selection) return;
		let revealed = false;
		if (selection.side === Constants.MappingSide.INPUT) {
			revealed = this.inputSchemaRef.reveal(selection.element);
		} else {
			revealed = this.outputSchemaRef.reveal(selection.element);
		}
		if (revealed) {
			this.updateVisibleInfo(selection.side);
			this.renderSchema(selection.side);
		}
	}

	renderSchema(side) {
		if ((!side || side === Constants.MappingSide.INPUT) && this.inputSchemaRef) {
			this.inputSchemaRef.forceUpdate();
		}
		if ((!side || side === Constants.MappingSide.OUTPUT) && this.outputSchemaRef) {
			this.outputSchemaRef.forceUpdate();
		}
	}

	revealConnectedElement(element, side) {
		const dataAccessor = this.props.dataAccessor;
		const mappingItems = dataAccessor.getMappingItemsWithElement(this.props.mapping, element, side);
		if (mappingItems && mappingItems.length > 0) {
			const item = mappingItems[0];
			let revealed = false;
			if (side === Constants.MappingSide.INPUT) {
				revealed = this.outputSchemaRef.reveal(
					dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT),
				);
			} else {
				revealed = this.inputSchemaRef.reveal(
					dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT),
				);
			}
			if (revealed) {
				this.updateVisibleInfo(side);
				this.renderSchema(side);
			}
		}
	}

	revealConnection(source, target) {
		let revealed = false;
		revealed = this.inputSchemaRef.reveal(source) || revealed;
		revealed = this.outputSchemaRef.reveal(target) || revealed;
		if (revealed) {
			this.updateVisibleInfo();
			this.renderSchema();
		}
		const gMap = this.getMappingComponent();
		if (gMap.reveal) {
			const connectionKey = this.getConnectionKey(source, target);
			gMap.reveal(connectionKey);
		}
	}

	isElementVisible(element, side) {
		const dataAccessor = this.props.dataAccessor;
		return dataAccessor.includes(this.getVisibleElements(side), element);
	}

	beginDrag(element, side) {
		this.dndPos = null;
		return this.props.dndListener.beginDrag(element, side);
	}

	dndInProgress(pos) {
		this.dndPos = pos;
		this.props.dndListener.dndInProgress(pos);
		const gMap = this.getMappingComponent();
		if (gMap.updateDND) {
			gMap.updateDND();
		}
	}

	canDrop(sourceItem, targetItem) {
		this.dndPos = null;
		return this.props.dndListener.canDrop(sourceItem, targetItem);
	}

	drop(sourceItem, targetItem) {
		this.dndPos = null;
		this.props.dndListener.drop(sourceItem, targetItem);
	}

	endDrag() {
		this.dndPos = null;
		this.props.dndListener.endDrag();
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
		const { mappingActions, mapping, input, output, ...commonSchemaProps } = this.props;
		const {
			dataAccessor,
			selection,
			focused,
			preferences,
			dnd,
			dndListener,
			onEnterElement,
			onLeaveElement,
		} = this.props;
		const inputSide = Constants.MappingSide.INPUT;
		const outputSide = Constants.MappingSide.OUTPUT;
		return (
			<div className="mapper" data-focusable>
				<Schema
					{...commonSchemaProps}
					ref={this.updateInputSchemaRef}
					schema={input.schema}
					columns={input.columns}
					rowsClassName={input.rowsClassName}
					withTitle={input.withTitle}
					withHeader={input.withHeader}
					filters={input.filters}
					sorters={input.sorters}
					side={inputSide}
					onScroll={this.onScroll}
					revealConnectedElement={this.revealConnectedElement}
					mappedElements={getMappedElements(dataAccessor, mapping, inputSide)}
					focusedElements={getFocusedElements(dataAccessor, mapping, focused, inputSide)}
					isElementVisible={this.isElementVisible}
				/>
				<Schema
					{...commonSchemaProps}
					ref={this.updateOutputSchemaRef}
					schema={output.schema}
					columns={output.columns}
					rowsClassName={output.rowsClassName}
					withTitle={output.withTitle}
					withHeader={output.withHeader}
					filters={output.filters}
					sorters={output.sorters}
					side={outputSide}
					onScroll={this.onScroll}
					revealConnectedElement={this.revealConnectedElement}
					mappedElements={getMappedElements(dataAccessor, mapping, outputSide)}
					focusedElements={getFocusedElements(dataAccessor, mapping, focused, outputSide)}
					isElementVisible={this.isElementVisible}
				/>
				<Mapping
					ref={this.updateGMapRef}
					mapping={mapping}
					mappingActions={mappingActions}
					getConnections={this.getConnections}
					getAnchors={this.getAnchors}
					getYPosition={this.getYPosition}
					selection={selection}
					preferences={preferences}
					dnd={dnd}
					dndListener={this}
					onEnterAnchor={onEnterElement}
					onLeaveAnchor={onLeaveElement}
				/>
			</div>
		);
	}
}

MapperComponent.propTypes = {
	dataAccessor: PropTypes.object,
	mapping: PropTypes.array,
	mappingActions: PropTypes.object,
	input: PropTypes.shape({
		schema: PropTypes.object,
		columns: PropTypes.array,
		rowsClassName: PropTypes.objectOf(PropTypes.string),
		withTitle: PropTypes.bool,
		withHeader: PropTypes.bool,
		filters: PropTypes.array,
		sorters: PropTypes.object,
	}).isRequired,
	output: PropTypes.shape({
		schema: PropTypes.object,
		columns: PropTypes.array,
		rowsClassName: PropTypes.objectOf(PropTypes.string),
		withTitle: PropTypes.bool,
		withHeader: PropTypes.bool,
		filters: PropTypes.array,
		sorters: PropTypes.object,
	}).isRequired,
	onFilterChange: PropTypes.func,
	onSortChange: PropTypes.func,
	selection: PropTypes.object,
	onSelect: PropTypes.func,
	focused: PropTypes.object,
	dnd: PropTypes.object,
	dndListener: PropTypes.object,
	pendingItem: PropTypes.object,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	preferences: PropTypes.object,
	trigger: PropTypes.object,
	status: PropTypes.number,
};

export default DragDropContext(HTML5Backend)(MapperComponent);
