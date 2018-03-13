import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { DataMapper as Mapper } from '../src/index';
import { getMappingItems } from '../src/DataMapper/Mapper/Mapper';
import { isSelected } from '../src/DataMapper/Schema/Schema';
import { SchemaType, Keys, switchSchemaType, Configs } from '../src/DataMapper/Constants';

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

function createSchema(name, elementName, size) {
	let elements = [];
	for (let i = 0; i < size; i += 1) {
		elements = elements.concat(`${elementName}_${i}`);
	}
	return { name, elements };
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

const emptyState = {
	inputSchema: [],
	outputSchema: [],
	mapping: [],
	dnd: null,
	pendingItem: null,
	selection: null,
	focused: null,
	showAll: false,
};

function getDefaultInitialState() {
	return {
		...emptyState,
    inputSchema: inputSchema2,
    outputSchema: outputSchema2,
		mapping: initialMapping,
	};
}

function getEmptyInitialState() {
	return {
		...emptyState,
    inputSchema: inputSchema2,
    outputSchema: outputSchema2,
		mapping: emptyMapping,
	};
}

function getBigSchemaInitialState() {
	const size = 50;
	const inputSchema = createSchema('Big input schema', 'input_element', size);
	const outputSchema = createSchema('Big output schema', 'output_element', size);
	const mapping = createMapping(inputSchema, outputSchema, true);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping,
		showAll: true,
	};
}

/** isSelectionEmpty returns true if the given selection is empty */
function isSelectionEmpty(selection) {
	return selection == null || selection.element == null || selection.type == null;
}

/**
 * isMapped returns true if the given (element, type) is mapped
 * (i.e. if it appears in the mapping)
 */
function isMapped(mapping, element, type) {
	if (mapping != null) {
		return mapping.find(
			item =>
				(type === SchemaType.INPUT && item.source === element) ||
				(type === SchemaType.OUTPUT && item.target === element),
		);
	}
	return false;
}

/** fullMapped returns true if all the elements of the given schema are mapped */
function fullMapped(mapping, schema, type) {
	// TODO could be optimized
	for (let i = 0; i < schema.elements.length; i += 1) {
		if (!isMapped(mapping, schema.elements[i], type)) {
			return false;
		}
	}
	return true;
}

/** Returns the schema corresponding to the given type */
function getSchema(state, type) {
	if (type === SchemaType.INPUT) {
		return state.inputSchema;
	} else if (type === SchemaType.OUTPUT) {
		return state.outputSchema;
	}
	return null;
}

function getConnected(mapping, element, type) {
	const items = getMappingItems(mapping, element, type);
	if (items != null) {
		if (type === SchemaType.INPUT) {
			return items.map(item => item.target);
		}
		return items.map(item => item.source);
	}
	return null;
}

function appendConnected(mapping, source, target, type) {
	const connected = getConnected(mapping, source, type);
	if (connected != null) {
		return connected.concat(target);
	}
	return [target];
}

function select(mapping, element, type) {
	return {
		element,
		connected: getConnected(mapping, element, type),
		type,
	};
}

function getSelection(ctrl, mapping, selection, element, type) {
	if (isSelected(selection, element, type) && ctrl) {
		return null;
	}
	return select(mapping, element, type);
}

function getFocused(element, type) {
	return { element, type };
}

function clearConnected(selection) {
	if (selection == null) {
		return null;
	}
	return {
		element: selection.element,
		connected: null,
		type: selection.type,
	};
}

function removeConnection(mapping, index) {
	const updatedMapping = mapping.slice();
	updatedMapping.splice(index, 1);
	return updatedMapping;
}

function removeConnections(mapping, selection) {
	if (isSelectionEmpty(selection)) {
		return mapping;
	}
	const items = mapping.filter(item =>
		(selection.type === SchemaType.INPUT && item.source === selection.element)
		|| (selection.type === SchemaType.OUTPUT && item.target === selection.element)
	);
	if (items != null) {
		// remove items
		let updatedMapping = mapping.slice();
		for (let i = 0; i < items.length; i += 1) {
			const item = items[i];
			const index = updatedMapping.findIndex(it =>
				it.source === item.source && it.target === item.target);
			if (index >= 0) {
				updatedMapping = removeConnection(updatedMapping, index);
			}
		}
		return updatedMapping;
	}
	return mapping;
}

function getCurrentSelectedSchema(state) {
  if (isSelectionEmpty(state.selection)) {
    return null;
  }
  if (state.selection.type === SchemaType.INPUT) {
    return state.inputSchema;
  } else if (state.selection.type === SchemaType.OUTPUT) {
    return state.outputSchema;
  }
  return null;
}

function getNextElement(schema, element, nav) {
	const selectedElemIndex = schema.elements.indexOf(element);
  const size = schema.elements.length;
  let newSelectedElemIndex = selectedElemIndex;
  switch (nav) {
    case Keys.UP:
      newSelectedElemIndex = selectedElemIndex - 1;
      if (newSelectedElemIndex < 0) {
        newSelectedElemIndex = size - 1;
      }
      break;
    case Keys.DOWN:
      newSelectedElemIndex = selectedElemIndex + 1;
      if (newSelectedElemIndex >= size) {
        newSelectedElemIndex = 0;
      }
      break;
		default:
			return element;
  }
	return schema.elements[newSelectedElemIndex];
}

function navigateUpDown(state, nav) {

	const selection = state.selection;
  const schema = getCurrentSelectedSchema(state);
	let newSelectedElement = getNextElement(schema, selection.element, nav);

	if (state.pendingItem != null
		&& state.pendingItem.type !== selection.type
		&& selection.type === SchemaType.OUTPUT) {
		// do not select an already connected output elements
		while (isMapped(state.mapping, newSelectedElement, selection.type)) {
			newSelectedElement = getNextElement(schema, newSelectedElement, nav);
		}
	}

  return {
		element: newSelectedElement,
		connected: getConnected(state.mapping, newSelectedElement, selection.type),
		type: selection.type,
	};
}

function switchSchema(state, connectContext) {
  const selection = state.selection;
	const targetType = switchSchemaType(selection.type);
	let targetElem = null;
  if (!connectContext
		&& selection.connected != null
		&& selection.connected.length > 0) {
		targetElem = selection.connected[0];
  }
	const targetSchema = getSchema(state, targetType);
	if (targetElem == null) {
  	// try to find an element with the same name
   	targetElem = targetSchema.elements.find(elem =>
			(!connectContext && elem === selection.element)
			|| (connectContext
					&& elem === selection.element
					&& (selection.connected == null || !selection.connected.includes(elem)))
		);
	}
  if (targetElem == null) {
    // get the first element in target schema
		if (connectContext) {
			// for connexion context we try to get a non connected element
			for (let i = 0; i < targetSchema.elements.length; i += 1) {
				if (!isMapped(state.mapping, targetSchema.elements[i], targetType)) {
					targetElem = targetSchema.elements[i];
					break;
				}
			}
		} else {
    	targetElem = targetSchema.elements[0];
		}
  }
  return {
		element: targetElem,
		connected: getConnected(state.mapping, targetElem, targetType),
		type: targetType,
	};
}

function firstSelect(state) {
	const element = state.inputSchema.elements[0];
	return {
		element,
		connected: getConnected(state.mapping, element, SchemaType.INPUT),
		type: SchemaType.INPUT,
	};
}

function navigate(state, nav) {
  switch (nav) {
    case Keys.UP:
      return navigateUpDown(state, nav);
    case Keys.DOWN:
      return navigateUpDown(state, nav);
    case Keys.SWITCH_SCHEMA:
			return switchSchema(state, false);
		case Keys.ENTER:
      return switchSchema(state, true);
		default:
			break;
  }
  return state.selection;
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
		this.canDrop = this.canDrop.bind(this);
		this.drop = this.drop.bind(this);
		this.endDrag = this.endDrag.bind(this);
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
					type: prevState.selection.type,
				},
			}));
			reveal = true;
		} else if (this.handleEndConnection(ev)) {
			ev.preventDefault();
			if (this.state.pendingItem.type === SchemaType.INPUT) {
				this.performMapping(this.state.pendingItem.element,
														this.state.selection.element,
														this.state.pendingItem.type);
			} else {
				this.performMapping(this.state.selection.element,
														this.state.pendingItem.element,
														this.state.pendingItem.type);
			}
			reveal = true;
		} else if (this.handleEscape(ev)) {
			ev.preventDefault();
			const fromItem = this.state.pendingItem.element;
			const fromType = this.state.pendingItem.type;
			this.setState(prevState => ({
				pendingItem: null,
				selection: select(prevState.mapping, fromItem, fromType),
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
		if (ev.keyCode === Keys.ENTER
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.pendingItem == null) {
			if (this.state.selection.type === SchemaType.INPUT) {
				// input case
				// at least one output element must be free (i.e. not connected)
				return !fullMapped(this.state.mapping,
					this.state.outputSchema,
					SchemaType.OUTPUT);
			}
			// output case
			// the current selected element cannot be already connected
			return !isMapped(this.state.mapping,
				this.state.selection.element,
				this.state.selection.type);
		}
		return false;
	}

	handleEndConnection(ev) {
		return ev.keyCode === Keys.ENTER
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.pendingItem != null
			&& this.state.selection.type !== this.state.pendingItem.type;
	}

	handleNavigation(ev) {
		const key = ev.keyCode;
		const isValidKey = key === Keys.UP
										|| key === Keys.DOWN;
		const isValidSwitch = key === Keys.SWITCH_SCHEMA
			&& this.state.pendingItem == null;
		return !isSelectionEmpty(this.state.selection)
			&& (isValidKey || isValidSwitch);
	}

	handleFirstSelect(ev) {
		const isValidKey = ev.keyCode === Keys.SWITCH_SCHEMA;
		return isValidKey && isSelectionEmpty(this.state.selection);
	}

	handleEscape(ev) {
		const isValidKey = ev.keyCode === Keys.ESCAPE;
		return isValidKey && this.state.pendingItem != null;
	}

	handleDelete(ev) {
		const isValidKey = ev.keyCode === Keys.DELETE;
		return isValidKey
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.selection.connected != null;
	}

	isPreventDefaultNeeded(ev) {
		return (ev.keyCode === Keys.SWITCH_SCHEMA
			&& this.state.pendingItem != null)
			|| ev.keyCode === Keys.ENTER;
	}

	performMapping(source, target, selectionType) {
		let selectedSourceElement = source;
		let selectedTargetElement = target;
		if (selectionType === SchemaType.OUTPUT) {
			selectedSourceElement = target;
			selectedTargetElement = source;
		}
		this.setState(prevState => ({
			mapping: prevState.mapping.concat([{ source, target }]),
			selection: {
				element: selectedSourceElement,
				connected: appendConnected(prevState.mapping,
																	selectedSourceElement,
																	selectedTargetElement,
																	selectionType),
				type: selectionType,
			},
			pendingItem: null,
			dnd: null,
		}));
	}

	clearMapping() {
		this.setState(prevState => ({
			mapping: [],
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

	selectElement(ctrl, element, type) {
		if (this.state.pendingItem == null) {
			this.setState(prevState => ({
				selection: getSelection(ctrl, prevState.mapping,
					prevState.selection, element, type),
			}));
		} else if (this.state.pendingItem.type === type) {
			// stop the link process
			this.setState(prevState => ({
				selection: getSelection(ctrl, prevState.mapping,
					prevState.selection, element, type),
				pendingItem: null,
			}));
		} else if (this.state.pendingItem.type === SchemaType.INPUT) {
			this.performMapping(this.state.pendingItem.element,
													element,
													type);
		} else {
			this.performMapping(element,
													this.state.pendingItem.element,
													type);
		}
	}

	clearSelection() {
		this.setState({
			selection: null,
		});
	}

	onEnterElement(element, type) {
		this.setState({
			focused: getFocused(element, type),
		});
	}

	onLeaveElement(element, type) {
		this.setState({
			focused: null,
		});
	}

	onShowAll() {
		this.setState(prevState => ({
			showAll: !prevState.showAll,
		}));
	}

	beginDrag(element, type) {
		this.setState(prevState => ({
			dnd: {
				source: { element, type },
			},
		}));
	}

	canDrop(source, target) {
		let update = true;
		if (this.state.dnd != null) {
			if (this.state.dnd.target != null
				&& this.state.dnd.target.element === target.element
				&& this.state.dnd.target.type === target.type) {
					update = false;
			}
			if (this.state.dnd.source.type === target.type) {
				update = false;
			}
		}
		if (update) {
			this.setState(prevState => ({
				dnd: {
					source: prevState.dnd.source,
					target,
				},
			}));
		}
		return target.type !== source.type
			&& ((target.type === SchemaType.INPUT
						&& !isMapped(this.state.mapping, source.element, source.type))
				|| (target.type === SchemaType.OUTPUT
						&& !isMapped(this.state.mapping, target.element, target.type))
			);
	}

	drop(element, type) {
		this.setState(prevState => ({
			dnd: null,
		}));
	}

	endDrag() {
		this.setState(prevState => ({
			dnd: null,
		}));
	}

	render() {
		return (
			<Mapper
				ref={m => {
					this.mapper = m;
				}}
				mapperId={this.props.mapperId}
				inputSchema={this.state.inputSchema}
				mapping={this.state.mapping}
				outputSchema={this.state.outputSchema}
				performMapping={this.performMapping}
				clearMapping={this.clearMapping}
				clearConnection={this.clearConnection}
				draggable={Configs.DRAGGABLE}
				selection={this.state.selection}
				pendingItem={this.state.pendingItem}
				onSelect={this.selectElement}
				showAll={this.state.showAll}
				onShowAll={this.onShowAll}
				onEnterElement={this.onEnterElement}
				onLeaveElement={this.onLeaveElement}
				focused={this.state.focused}
				dnd={this.state.dnd}
				beginDrag={this.beginDrag}
				canDrop={this.canDrop}
				drop={this.drop}
				endDrag={this.endDrag}
			/>
		);
	}
}

ConnectedDataMapper.propTypes = {
	initialState: PropTypes.object,
	mapperId: PropTypes.string,
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
	.addWithInfo('default', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getDefaultInitialState()}
		/>;
	})
	.addWithInfo('empty', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getEmptyInitialState()}
		/>;
	})
	.addWithInfo('50-mapped', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={getBigSchemaInitialState()}
		/>;
	});
