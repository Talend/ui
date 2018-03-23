import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { DataMapper as Mapper } from '../src/index';
import { isSelected } from '../src/DataMapper/Schema/Schema';
import * as Constants from '../src/DataMapper/Constants';
import DefaultDataAccessor from '../src/DataMapper/DefaultDataAccessor';
import DataAccessorWrapper from '../src/DataMapper/DataAccessorWrapper';
import DefaultRenderer from '../src/DataMapper/Schema/SchemaRenderers/DefaultRenderer';
import ListRenderer from '../src/DataMapper/Schema/SchemaRenderers/ListRenderer';

const inputSchema1 = {
	name: 'user_info',
	elements: [
		'firstname',
		'lastname',
		'street',
		'zip',
		'city',
		'state',
		'birthday',
		'company',
	],
};

const inputSchema2 = {
	name: 'user_info_full',
	elements: [
		'firstname',
		'lastname',
		'street',
		'zip',
		'city',
		'state',
		'birthday',
		'company',
		'favorite_color',
		'favorite_number',
		'favorite_movie',
		'favorite_song',
		'favorite_video_game',
		'favorite_dessert',
		'favorite_country',
		'favorite_football_player',
		'favorite_writer',
	],
};

const outputSchema1 = {
	name: 'customer_data',
	elements: [
		'name',
		'city',
		'state',
		'company',
		'birthday',
		'age',
		'identifier',
		'code',
	],
};

const outputSchema2 = {
	name: 'customer_data_full',
	elements: [
		'name',
		'city',
		'state',
		'company',
		'birthday',
		'age',
		'identifier',
		'code',
		'favorite_color',
		'favorite_number',
		'favorite_movie',
		'favorite_song',
		'favorite_video_game',
		'favorite_dessert',
		'favorite_country',
		'favorite_football_player',
		'favorite_writer',
	],
};

const emptyMapping = [];

const initialMapping = [
	{
		source: 'lastname',
		target: 'name',
	},
	{
		source: 'lastname',
		target: 'identifier',
	},
	{
		source: 'city',
		target: 'city',
	},
	{
		source: 'zip',
		target: 'code',
	},
];

const inputListColumns = [
  Constants.Schema.DATA_KEYS.TYPE,
	Constants.Schema.DATA_KEYS.NAME,
];

const outputListColumns = [
	Constants.Schema.DATA_KEYS.NAME,
  Constants.Schema.DATA_KEYS.TYPE,
	Constants.Schema.DATA_KEYS.DESC,
];

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

const defaultSchemaRenderer = new DefaultRenderer();
const inputListRenderer = new ListRenderer();
const outputListRenderer = new ListRenderer();

function createSchema(name, elementName, size) {
	let elements = [];
	for (let i = 0; i < size; i += 1) {
		elements = elements.concat(`${elementName}_${i}`);
	}
	return { name, elements };
}

function randomType() {
	const keys = Object.keys(Constants.Types);
	const nbrOfTypes = keys.length;
	const index = Math.floor((Math.random() * nbrOfTypes));
	return Constants.Types[keys[index]];
}

function buildElement(elem, index) {
	return {
		id: `${index}`,
		name: elem,
		type: randomType(),
		description: `Description of ${elem}`,
	};
}

function finalizeSchema(schema) {
	const result = {
		name: schema.name,
	};
	const elements = schema.elements.map(buildElement);
	result.elements = elements;
	return result;
}

function buildMappingItem(item, inputSchema, outputSchema) {
	return {
		source: inputSchema.elements.find(elem => elem.name === item.source),
		target: outputSchema.elements.find(elem => elem.name === item.target),
	};
}

function finalizeMapping(mapping, inputSchema, outputSchema) {
	return mapping.map(item => buildMappingItem(item, inputSchema, outputSchema));
}

function createShuffledMapping(inputSchema, outputSchema) {
	let mapping = [];
	const outputElements = outputSchema.elements.slice();
	for (let i = 0; i < inputSchema.elements.length; i += 1) {
		const index = Math.floor(Math.random() * outputElements.length);
		const target = outputElements[index];
		mapping = mapping.concat({
			source: inputSchema.elements[i],
			target,
		});
		outputElements.splice(index, 1);
	}
	return mapping;
}

function createOneToOneMapping(inputSchema, outputSchema) {
	let mapping = [];
	for (let i = 0; i < inputSchema.elements.length; i += 1) {
		mapping = mapping.concat({
			source: inputSchema.elements[i],
			target: outputSchema.elements[i],
		});
	}
	return mapping;
}

function createMapping(inputSchema, outputSchema, shuffle) {
	if (shuffle) {
		return createShuffledMapping(inputSchema, outputSchema);
	}
	return createOneToOneMapping(inputSchema, outputSchema);
}

/**
* Default empty state
*/
const emptyState = {
	dataAccessor,
	inputSchema: {},
	outputSchema: {},
	mapping: [],
	dnd: null,
	pendingItem: null,
	selection: null,
	focused: null,
	showAll: false,
};

function getDefaultInitialState() {
	const inputSchema = finalizeSchema(inputSchema2);
	const outputSchema = finalizeSchema(outputSchema2);
	const mapping = finalizeMapping(initialMapping, inputSchema, outputSchema);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping,
	};
}

function getEmptyInitialState() {
	const inputSchema = finalizeSchema(inputSchema2);
	const outputSchema = finalizeSchema(outputSchema2);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping: emptyMapping,
	};
}

function getBigSchemaInitialState() {
	const size = 50;
	const schema1 = createSchema('Big input schema', 'input_element', size);
	const schema2 = createSchema('Big output schema', 'output_element', size);
	const tempMap = createMapping(schema1, schema2, true);
	const inputSchema = finalizeSchema(schema1);
	const outputSchema = finalizeSchema(schema2);
	const mapping = finalizeMapping(tempMap, inputSchema, outputSchema);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping,
		showAll: true,
	};
}

/**
* isSelectionEmpty returns true if the given selection is empty
*/
function isSelectionEmpty(selection) {
	return selection == null || selection.element == null || selection.side == null;
}

/** Returns the schema corresponding to the given side */
function getSchema(state, side) {
	if (side === Constants.MappingSide.INPUT) {
		return state.inputSchema;
	} else if (side === Constants.MappingSide.OUTPUT) {
		return state.outputSchema;
	}
	return null;
}

function appendConnected(mapping, source, target, side) {
	const connected = dataAccessor.getConnectedElements(mapping, source, side);
	if (connected != null) {
		return connected.concat(target);
	}
	return [target];
}

function select(mapping, element, side) {
	return {
		element,
		connected: dataAccessor.getConnectedElements(mapping, element, side),
		side,
	};
}

function getSelection(ctrl, mapping, selection, element, side) {
	if (isSelected(dataAccessor, selection, element, side) && ctrl) {
		return null;
	}
	return select(mapping, element, side);
}

function getFocused(element, side) {
	return { element, side };
}

function clearConnected(selection) {
	if (selection == null) {
		return null;
	}
	return {
		element: selection.element,
		connected: null,
		side: selection.side,
	};
}

function removeConnections(mapping, selection) {
	if (isSelectionEmpty(selection)) {
		return mapping;
	}
	const items = dataAccessor.getMappingItemsWithElement(mapping, selection.element, selection.side);
	if (items != null) {
		// remove items
		let updatedMapping = mapping;
		for (let i = 0; i < items.length; i += 1) {
			const item = items[i];
			const source = dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT);
			const target = dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT);
			updatedMapping = dataAccessor.removeMapping(updatedMapping, source, target);
		}
		return updatedMapping;
	}
	return mapping;
}

function getCurrentSelectedSchema(state) {
  if (isSelectionEmpty(state.selection)) {
    return null;
  }
  if (state.selection.side === Constants.MappingSide.INPUT) {
    return state.inputSchema;
  } else if (state.selection.side === Constants.MappingSide.OUTPUT) {
    return state.outputSchema;
  }
  return null;
}

function getNextElement(schema, element, nav) {
	const selectedElemIndex = dataAccessor.getSchemaElementIndex(schema, element);
  const size = dataAccessor.getSchemaSize(schema);
  let newSelectedElemIndex = selectedElemIndex;
  switch (nav) {
    case Constants.Keys.UP:
      newSelectedElemIndex = selectedElemIndex - 1;
      if (newSelectedElemIndex < 0) {
        newSelectedElemIndex = size - 1;
      }
      break;
    case Constants.Keys.DOWN:
      newSelectedElemIndex = selectedElemIndex + 1;
      if (newSelectedElemIndex >= size) {
        newSelectedElemIndex = 0;
      }
      break;
		default:
			return element;
  }
	return dataAccessor.getSchemaElement(schema, newSelectedElemIndex);
}

function navigateUpDown(state, nav) {

	const selection = state.selection;
  const schema = getCurrentSelectedSchema(state);
	let newSelectedElement = getNextElement(schema, selection.element, nav);

	if (state.pendingItem != null
		&& state.pendingItem.side !== selection.side
		&& selection.side === Constants.MappingSide.OUTPUT) {
		// do not select an already connected output elements
		while (dataAccessor.isElementMapped(state.mapping, newSelectedElement, selection.side)) {
			newSelectedElement = getNextElement(schema, newSelectedElement, nav);
		}
	}

  return {
		element: newSelectedElement,
		connected: dataAccessor.getConnectedElements(state.mapping, newSelectedElement, selection.side),
		side: selection.side,
	};
}

/**
* This method tries to find an element in the schema with the same name as
* given element.
*/
function findTargetElement(schema, selection, mappingInProgress) {
	const elements = dataAccessor.getSchemaElements(schema);
	return elements.find(elem =>
		(!mappingInProgress && dataAccessor.haveSameName(elem, selection.element))
		|| (mappingInProgress
				&& dataAccessor.haveSameName(elem, selection.element)
				&& (selection.connected == null || !dataAccessor.includes(selection.connected, elem)))
	);
}

function findNonConnectedTargetElement(schema, mapping, side) {
	for (let i = 0; i < dataAccessor.getSchemaSize(schema); i += 1) {
		const elem = dataAccessor.getSchemaElement(schema, i);
		if (!dataAccessor.isElementMapped(mapping, elem, side)) {
			return elem;
		}
	}
	return null;
}

function switchSchema(state, mappingInProgress) {
  const selection = state.selection;
	const targetSide = Constants.switchMappingSide(selection.side);
	let targetElem = null;
  if (!mappingInProgress
		&& selection.connected != null
		&& selection.connected.length > 0) {
		targetElem = selection.connected[0];
  }
	const targetSchema = getSchema(state, targetSide);
	if (targetElem == null) {
  	// try to find an element with the same name
   	targetElem = findTargetElement(targetSchema, selection, mappingInProgress);
	}
  if (targetElem == null) {
    // get the first element in target schema
		if (mappingInProgress) {
			// for connexion context we try to get a non connected element
			targetElem = findNonConnectedTargetElement(targetSchema, state.mapping, targetSide);
		} else {
			// by default select the first element
    	targetElem = dataAccessor.getSchemaElement(targetSchema, 0);
		}
  }
  return {
		element: targetElem,
		connected: dataAccessor.getConnectedElements(state.mapping, targetElem, targetSide),
		side: targetSide,
	};
}

function firstSelect(state) {
	const element = dataAccessor.getSchemaElement(state.inputSchema, 0);
	return {
		element,
		connected: dataAccessor.getConnectedElements(state.mapping, element,
			Constants.MappingSide.INPUT),
		side: Constants.MappingSide.INPUT,
	};
}

function navigate(state, nav) {
  switch (nav) {
    case Constants.Keys.UP:
      return navigateUpDown(state, nav);
    case Constants.Keys.DOWN:
      return navigateUpDown(state, nav);
    case Constants.Keys.SWITCH_SCHEMA:
			return switchSchema(state, false);
		case Constants.Keys.ENTER:
      return switchSchema(state, true);
		default:
			break;
  }
  return state.selection;
}

function arePositionsClosed(pos1, pos2, delta) {
	return Math.abs(pos1.x - pos2.x) <= delta && Math.abs(pos1.y - pos2.y) <= delta;
}

class ConnectedDataMapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = props.initialState;
		this.performMapping = this.performMapping.bind(this);
		this.clearMapping = this.clearMapping.bind(this);
		this.clearConnection = this.clearConnection.bind(this);
		this.selectElement = this.selectElement.bind(this);
		this.handleNavigation = this.handleNavigation.bind(this);
		this.handleKeyEvent = this.handleKeyEvent.bind(this);
		this.onEnterElement = this.onEnterElement.bind(this);
		this.onLeaveElement = this.onLeaveElement.bind(this);
		this.onShowAll = this.onShowAll.bind(this);
		this.beginDrag = this.beginDrag.bind(this);
		this.dndInProgress = this.dndInProgress.bind(this);
		this.canDrop = this.canDrop.bind(this);
		this.drop = this.drop.bind(this);
		this.endDrag = this.endDrag.bind(this);
		this.updateMapperRef = this.updateMapperRef.bind(this);
	}

	handleKeyEvent(ev) {
		let reveal = false;
		if (this.handleFirstSelect(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				selection: firstSelect(prevState),
			}));
			reveal = true;
		} else if (this.handleNavigation(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				selection: navigate(prevState, ev.keyCode),
			}));
			reveal = true;
		} else if (this.handleStartConnection(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				selection: navigate(prevState, ev.keyCode),
				pendingItem: {
					element: prevState.selection.element,
					side: prevState.selection.side,
				},
			}));
			reveal = true;
		} else if (this.handleEndConnection(ev)) {
			ev.preventDefault();
			if (this.state.pendingItem.side === Constants.MappingSide.INPUT) {
				this.performMapping(this.state.pendingItem.element,
														this.state.selection.element,
														this.state.pendingItem.side);
			} else {
				this.performMapping(this.state.selection.element,
														this.state.pendingItem.element,
														this.state.pendingItem.side);
			}
			reveal = true;
		} else if (this.handleEscape(ev)) {
			ev.preventDefault();
			const fromElement = this.state.pendingItem.element;
			const fromSide = this.state.pendingItem.side;
			this.setState(prevState => ({
				pendingItem: null,
				selection: select(prevState.mapping, fromElement, fromSide),
			}));
		} else if (this.handleDelete(ev)) {
			this.clearConnection();
		} else if (this.isPreventDefaultNeeded(ev)) {
			ev.preventDefault();
		}
		if (reveal) {
			// reveal
			const mapperInstance = this.mapper.getDecoratedComponentInstance();
			mapperInstance.reveal(this.state.selection);
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyEvent);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyEvent);
	}

	handleStartConnection(ev) {
		if (ev.keyCode === Constants.Keys.ENTER
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.pendingItem == null) {
			if (this.state.selection.side === Constants.MappingSide.INPUT) {
				// input case
				// at least one output element must be free (i.e. not connected)
				return !this.state.dataAccessor.isFullMapped(
					this.state.mapping,
					this.state.outputSchema,
					Constants.MappingSide.OUTPUT
				);
			}
			// output case
			// the current selected element cannot be already connected
			return !this.state.dataAccessor.isElementMapped(
				this.state.mapping,
				this.state.selection.element,
				this.state.selection.side
			);
		}
		return false;
	}

	handleEndConnection(ev) {
		return ev.keyCode === Constants.Keys.ENTER
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.pendingItem != null
			&& this.state.selection.side !== this.state.pendingItem.side;
	}

	handleNavigation(ev) {
		const key = ev.keyCode;
		const isValidKey = key === Constants.Keys.UP
										|| key === Constants.Keys.DOWN;
		const isValidSwitch = key === Constants.Keys.SWITCH_SCHEMA
			&& this.state.pendingItem == null;
		return !isSelectionEmpty(this.state.selection)
			&& (isValidKey || isValidSwitch);
	}

	handleFirstSelect(ev) {
		const isValidKey = ev.keyCode === Constants.Keys.SWITCH_SCHEMA;
		return isValidKey && isSelectionEmpty(this.state.selection);
	}

	handleEscape(ev) {
		const isValidKey = ev.keyCode === Constants.Keys.ESCAPE;
		return isValidKey && this.state.pendingItem != null;
	}

	handleDelete(ev) {
		const isValidKey = ev.keyCode === Constants.Keys.DELETE;
		return isValidKey
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.selection.connected != null;
	}

	isPreventDefaultNeeded(ev) {
		return (ev.keyCode === Constants.Keys.SWITCH_SCHEMA
			&& this.state.pendingItem != null)
			|| ev.keyCode === Constants.Keys.ENTER;
	}

	performMapping(sourceElement, targetElement, selectionSide) {
		let selectedSourceElement = sourceElement;
		let selectedTargetElement = targetElement;
		if (selectionSide === Constants.MappingSide.OUTPUT) {
			selectedSourceElement = targetElement;
			selectedTargetElement = sourceElement;
		}
		this.setState(prevState => ({
			mapping: prevState.dataAccessor.addMapping(prevState.mapping, sourceElement, targetElement),
			selection: {
				element: selectedSourceElement,
				connected: appendConnected(prevState.mapping,
																	selectedSourceElement,
																	selectedTargetElement,
																	selectionSide),
				side: selectionSide,
			},
			pendingItem: null,
			dnd: null,
		}));
	}

	clearMapping() {
		this.setState(prevState => ({
			mapping: prevState.dataAccessor.clearMapping(prevState.mapping),
			selection: clearConnected(prevState.selection),
			pendingItem: null,
			dnd: null,
		}));
	}

	clearConnection() {
		this.setState(prevState => ({
			mapping: removeConnections(prevState.mapping, prevState.selection),
			selection: clearConnected(prevState.selection),
			pendingItem: null,
			dnd: null,
		}));
	}

	selectElement(ctrl, element, side) {
		if (this.state.pendingItem == null) {
			this.setState(prevState => ({
				selection: getSelection(ctrl, prevState.mapping,
					prevState.selection, element, side),
			}));
		} else if (this.state.pendingItem.side === side) {
			// stop the link process
			this.setState(prevState => ({
				selection: getSelection(ctrl, prevState.mapping,
					prevState.selection, element, side),
				pendingItem: null,
			}));
		} else if (this.state.pendingItem.side === Constants.MappingSide.INPUT) {
			this.performMapping(this.state.pendingItem.element,
													element,
													side);
		} else {
			this.performMapping(element,
													this.state.pendingItem.element,
													side);
		}
	}

	clearSelection() {
		this.setState({
			selection: null,
		});
	}

	onEnterElement(element, side) {
		this.setState({
			focused: getFocused(element, side),
		});
	}

	onLeaveElement(element, side) {
		this.setState({
			focused: null,
		});
	}

	onShowAll() {
		this.setState(prevState => ({
			showAll: !prevState.showAll,
		}));
	}

	beginDrag(element, side) {
		this.setState(prevState => ({
			dnd: {
				source: { element, side },
				target: null,
				pos: null,
			},
		}));
		return { element, side };
	}

	dndInProgress(pos) {
		if (this.state.dnd.pos != null
			&& arePositionsClosed(this.state.dnd.pos, pos, 3)) {
			// do not update state
			return;
		}
		this.setState(prevState => ({
			dnd: {
				source: prevState.dnd.source,
				target: null,
				pos,
			},
		}));
	}

	canDrop(sourceItem, targetItem) {
		let update = true;
		if (this.state.dnd != null) {
			if (this.state.dnd.target != null
				&& this.state.dnd.target.element === targetItem.element
				&& this.state.dnd.target.side === targetItem.side) {
					update = false;
			}
			if (this.state.dnd.source.side === targetItem.side) {
				update = false;
			}
		}
		if (update) {
			this.setState(prevState => ({
				dnd: {
					source: prevState.dnd.source,
					target: targetItem,
					pos: null,
				},
			}));
		}
		return targetItem.side !== sourceItem.side
			&& ((targetItem.side === Constants.MappingSide.INPUT
						&& !this.state.dataAccessor.isElementMapped(
							this.state.mapping, sourceItem.element, sourceItem.side
						))
				|| (targetItem.side === Constants.MappingSide.OUTPUT
						&& !this.state.dataAccessor.isElementMapped(
							this.state.mapping, targetItem.element, targetItem.side
						))
			);
	}

	drop(element, side) {
		this.setState(prevState => ({
			dnd: null,
		}));
	}

	endDrag() {
		this.setState(prevState => ({
			dnd: null,
		}));
	}

	updateMapperRef(ref) {
		this.mapper = ref;
	}

	render() {
		const {
			mapperId,
			mappingRenderer,
			inputSchemaRenderer,
			outputSchemaRenderer,
			inputSchemaColumns,
			outputSchemaColumns,
		} = this.props;
		return (
			<Mapper
				dataAccessor={this.state.dataAccessor}
				ref={this.updateMapperRef}
				mapperId={mapperId}
				mappingRenderer={mappingRenderer}
				inputSchemaRenderer={inputSchemaRenderer}
				outputSchemaRenderer={outputSchemaRenderer}
				inputSchema={this.state.inputSchema}
				mapping={this.state.mapping}
				outputSchema={this.state.outputSchema}
				performMapping={this.performMapping}
				clearMapping={this.clearMapping}
				clearConnection={this.clearConnection}
				draggable={Constants.Configs.DRAGGABLE}
				selection={this.state.selection}
				pendingItem={this.state.pendingItem}
				onSelect={this.selectElement}
				showAll={this.state.showAll}
				onShowAll={this.onShowAll}
				onEnterElement={this.onEnterElement}
				onLeaveElement={this.onLeaveElement}
				focused={this.state.focused}
				dnd={this.state.dnd}
				dndInProgress={this.dndInProgress}
				beginDrag={this.beginDrag}
				canDrop={this.canDrop}
				drop={this.drop}
				endDrag={this.endDrag}
				inputSchemaColumns={inputSchemaColumns}
				outputSchemaColumns={outputSchemaColumns}
			/>
		);
	}
}

ConnectedDataMapper.propTypes = {
	initialState: PropTypes.object,
	mapperId: PropTypes.string,
	mappingRenderer: PropTypes.string,
	inputSchemaRenderer: PropTypes.object,
	outputSchemaRenderer: PropTypes.object,
	inputSchemaColumns: PropTypes.array,
	outputSchemaColumns: PropTypes.array,
};

const stories = storiesOf('DataMapper', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => (
		<div id="mapper-container">
			{story()}
		</div>
	))
	.addWithInfo('default (canvas)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getDefaultInitialState()}
			mappingRenderer={Constants.Connection.RENDERER.CANVAS}
			inputSchemaRenderer={defaultSchemaRenderer}
			outputSchemaRenderer={defaultSchemaRenderer}
		/>;
	})
	.addWithInfo('empty (canvas)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getEmptyInitialState()}
			mappingRenderer={Constants.Connection.RENDERER.CANVAS}
			inputSchemaRenderer={defaultSchemaRenderer}
			outputSchemaRenderer={defaultSchemaRenderer}
		/>;
	})
	.addWithInfo('50-mapped (canvas)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getBigSchemaInitialState()}
			mappingRenderer={Constants.Connection.RENDERER.CANVAS}
			inputSchemaRenderer={defaultSchemaRenderer}
			outputSchemaRenderer={defaultSchemaRenderer}
		/>;
	})
	.addWithInfo('default (svg)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getDefaultInitialState()}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			inputSchemaRenderer={defaultSchemaRenderer}
			outputSchemaRenderer={defaultSchemaRenderer}
		/>;
	})
	.addWithInfo('50-mapped (svg)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getBigSchemaInitialState()}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			inputSchemaRenderer={defaultSchemaRenderer}
			outputSchemaRenderer={defaultSchemaRenderer}
		/>;
	})
	.addWithInfo('default (svg, list)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getDefaultInitialState()}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			inputSchemaRenderer={inputListRenderer}
			outputSchemaRenderer={outputListRenderer}
			inputSchemaColumns={inputListColumns}
			outputSchemaColumns={outputListColumns}
		/>;
	})
	.addWithInfo('50-mapped (svg, list)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getBigSchemaInitialState()}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			inputSchemaRenderer={inputListRenderer}
			outputSchemaRenderer={outputListRenderer}
			inputSchemaColumns={inputListColumns}
			outputSchemaColumns={outputListColumns}
		/>;
	});
