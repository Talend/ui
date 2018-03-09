import React from 'react';
import { storiesOf } from '@storybook/react';
import { DataMapper as Mapper } from '../src/index';
import { SchemaType, Keys, switchSchemaType, Configs } from '../src/DataMapper/Constants';
import { createSchema, createMapping, inputSchema2, outputSchema2, emptyMapping, initialMapping } from '../src/DataMapper/Data';
import Utils from '../src/DataMapper/Utils';

function getInitialState() {
	const size = 50;
	const inputSchema = createSchema('Big input schema', 'input_element', size);
	const outputSchema = createSchema('Big output schema', 'output_element', size);
	const mapping = createMapping(inputSchema, outputSchema, true);
	return {
    inputSchema: inputSchema2,
    outputSchema: outputSchema2,
		mapping: initialMapping,
		dnd: null,
		pendingItem: null,
		selection: null,
		focused: null,
		showAll: false,
	};
}

function getConnected(mapping, element, type) {
	const items = Utils.getMappingItems(mapping, element, type);
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

function getSelection(ctrl, mapping, selection, element, type) {
	if (Utils.isSelected(selection, element, type) && ctrl) {
		return null;
	}
	return select(mapping, element, type);
}

function select(mapping, element, type) {
	return {
		element,
		connected: getConnected(mapping, element, type),
		type,
	};
}

function getFocused(element, type) {
	return {element, type};
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

function removeConnections(mapping, selection) {
	if (Utils.isSelectionEmpty(selection)) {
		return mapping;
	}
	const items = mapping.filter(item =>
		(selection.type === SchemaType.INPUT && item.source === selection.element)
		|| (selection.type === SchemaType.OUTPUT && item.target === selection.element)
	);
	if (items != null) {
		// remove items
		let updatedMapping = mapping.slice();
		for (var i = 0; i < items.length; i++) {
			const item = items[i];
			const index = updatedMapping.findIndex(it => it.source === item.source && it.target === item.target);
			if (index >= 0) {
				updatedMapping = removeConnection(updatedMapping, index);
			}
		}
		return updatedMapping;
	}
	return mapping;
}

function removeConnection(mapping, index) {
	const updatedMapping = mapping.slice();
	updatedMapping.splice(index, 1);
	return updatedMapping;
}

function getCurrentSelectedSchema(state) {
  if (Utils.isSelectionEmpty(state.selection)) {
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
		&& state.pendingItem.type != selection.type
		&& selection.type === SchemaType.OUTPUT) {
		// do not select an already connected output elements
		while (Utils.isMapped(state.mapping, newSelectedElement, selection.type)) {
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
	const targetSchema = Utils.getSchema(state, targetType);
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
				if (!Utils.isMapped(state.mapping, targetSchema.elements[i], targetType)) {
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
		element: element,
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
		class ConnectedDataMapper extends React.Component {

			constructor(props) {
				super(props);
				this.state = getInitialState();
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
				//this.dndInProgress = this.dndInProgress.bind(this);
				this.canDrop = this.canDrop.bind(this);
				this.drop = this.drop.bind(this);
				this.endDrag = this.endDrag.bind(this);
			}

      handleKeyEvent(ev) {
				//console.log(ev);
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
						}
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
					&& !Utils.isSelectionEmpty(this.state.selection)
					&& this.state.pendingItem == null) {
					if (this.state.selection.type === SchemaType.INPUT) {
						// input case
						// at least one output element must be free (i.e. not connected)
						return !Utils.fullMapped(this.state.mapping,
							this.state.outputSchema,
							SchemaType.OUTPUT);
					} else {
						// output case
						// the current selected element cannot be already connected
						return !Utils.isMapped(this.state.mapping,
							this.state.selection.element,
							this.state.selection.type);
					}
				}
				return false;
			}

			handleEndConnection(ev) {
				return ev.keyCode === Keys.ENTER
					&& !Utils.isSelectionEmpty(this.state.selection)
					&& this.state.pendingItem != null
					&& this.state.selection.type != this.state.pendingItem.type;
			}

			handleNavigation(ev) {
        const key = ev.keyCode;
        const isValidKey = key === Keys.UP
												|| key === Keys.DOWN;
				const isValidSwitch = key === Keys.SWITCH_SCHEMA
					&& this.state.pendingItem == null;
        return !Utils.isSelectionEmpty(this.state.selection)
					&& (isValidKey || isValidSwitch);
      }

			handleFirstSelect(ev) {
				const isValidKey = ev.keyCode === Keys.SWITCH_SCHEMA;
				return isValidKey && Utils.isSelectionEmpty(this.state.selection);
			}

			handleEscape(ev) {
				const isValidKey = ev.keyCode === Keys.ESCAPE;
				return isValidKey && this.state.pendingItem != null;
			}

			handleDelete(ev) {
				const isValidKey = ev.keyCode === Keys.DELETE;
				return isValidKey
					&& !Utils.isSelectionEmpty(this.state.selection)
					&& this.state.selection.connected != null;
			}

			isPreventDefaultNeeded(ev) {
				return (ev.keyCode === Keys.SWITCH_SCHEMA
					&& this.state.pendingItem != null)
					|| ev.keyCode === Keys.ENTER;
			}

			performMapping(source, target, selectionType) {
				//console.log('performMapping(' + source + ', ' + target + ')');
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
				} else {
					if (this.state.pendingItem.type === type) {
						// stop the link process
						this.setState(prevState => ({
							selection: getSelection(ctrl, prevState.mapping,
								prevState.selection, element, type),
							pendingItem: null,
						}));
					} else {
						if (this.state.pendingItem.type === SchemaType.INPUT) {
							this.performMapping(this.state.pendingItem.element,
																	element,
																	type);
						} else {
							this.performMapping(element,
																	this.state.pendingItem.element,
																	type);
						}
					}
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
						source: {element, type},
					}
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
						}
					}));
				}
				return target.type !== source.type
					&& ((target.type === SchemaType.INPUT
								&& !Utils.isMapped(this.state.mapping, source.element, source.type))
						|| (target.type === SchemaType.OUTPUT 
								&& !Utils.isMapped(this.state.mapping, target.element, target.type))
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

		return <ConnectedDataMapper />;
	});
