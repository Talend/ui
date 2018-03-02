import React from 'react';
import { storiesOf } from '@storybook/react';
import { DataMapper as Mapper } from '../src/index';
import { SchemaType, Navigation, switchSchemaType, Configs } from '../src/DataMapper/Constants';
import { inputSchema2, outputSchema2, emptyMapping } from '../src/DataMapper/Data';
import { isSelected, isSelectionEmpty, getSchema, getMappingItems } from '../src/DataMapper/Utils';

function getInitialState() {
	return {
    inputSchema: inputSchema2,
    outputSchema: outputSchema2,
		mapping: emptyMapping,
		selection: null,
		showAll: false,
	};
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

function getSelection(mapping, selection, element, type) {
	if (isSelected(selection, element, type)) {
		return null;
	}
	return {
		element,
		connected: getConnected(mapping, element, type),
		type,
	};
}

function clearConnected(selection) {
	return {
		element: selection.element,
		connected: null,
		type: selection.type,
	};
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

function navigateUpDown(state, nav) {
  const selection = state.selection;
  const schema = getCurrentSelectedSchema(state);
  const selectedElemIndex = schema.elements.indexOf(selection.element);
  const size = schema.elements.length;
  let newSelectedElemIndex = selectedElemIndex;
  switch (nav) {
    case Navigation.UP:
      newSelectedElemIndex = selectedElemIndex - 1;
      if (newSelectedElemIndex < 0) {
        newSelectedElemIndex = size - 1;
      }
      break;
    case Navigation.DOWN:
      newSelectedElemIndex = selectedElemIndex + 1;
      if (newSelectedElemIndex >= size) {
        newSelectedElemIndex = 0;
      }
      break;
		default:
			return;
  }
  const newSelectedElement = schema.elements[newSelectedElemIndex];
  return {
		element: newSelectedElement,
		connected: getConnected(state.mapping, newSelectedElement, selection.type),
		type: selection.type,
	};
}

function switchSchema(state) {
  const selection = state.selection;
	const targetType = switchSchemaType(selection.type);
  if (selection.connected != null && selection.connected.length > 0) {
    return {
			element: selection.connected[0],
			connected: getConnected(state.mapping, selection.connected[0], targetType),
			type: targetType,
  	};
  }
  // try to find an element with the same name
  const targetSchema = getSchema(state, targetType);
  let targetElem = targetSchema.elements.find(e => e === selection.element);
  if (targetElem == null) {
    // get the first element in target schema
    targetElem = targetSchema.elements[0];
  }
  return {
		element: targetElem,
		connected: getConnected(state.mapping, targetElem, targetType),
		type: targetType,
	};
}

function navigate(state, nav) {
  switch (nav) {
    case Navigation.UP:
      return navigateUpDown(state, nav);
    case Navigation.DOWN:
      return navigateUpDown(state, nav);
    case Navigation.SWITCH_SCHEMA:
      return switchSchema(state);
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
			}

      handleKeyEvent(ev) {
        if (this.handleNavigation(ev)) {
          ev.preventDefault();
          this.setState(prevState => ({
  					selection: navigate(prevState, ev.key),
  				}));
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

			handleNavigation(ev) {
        const key = ev.key;
        const isValidKey = key === Navigation.UP
												|| key === Navigation.DOWN
												|| key === Navigation.SWITCH_SCHEMA;
        return isValidKey && !isSelectionEmpty(this.state.selection);
      }

			performMapping(source, target) {
				this.setState(prevState => ({
					mapping: prevState.mapping.concat([{ source, target }]),
					selection: {
						element: source,
						connected: appendConnected(prevState.mapping, source, target, SchemaType.INPUT),
						type: SchemaType.INPUT,
					},
				}));
			}

			clearMapping() {
				this.setState(prevState => ({
					mapping: [],
					selection: clearConnected(prevState.selection),
				}));
			}

			clearConnection() {
				this.setState(prevState => ({
					mapping: removeConnections(prevState.mapping, prevState.selection),
					selection: clearConnected(prevState.selection),
				}));
			}

			selectElement(element, type) {
				this.setState(prevState => ({
					selection: getSelection(prevState.mapping, prevState.selection, element, type),
				}));
			}

			clearSelection() {
				this.setState({
					selection: null,
				});
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
						onSelect={this.selectElement}
						showAll={this.state.showAll}
					/>
				);
			}
		}

		return <ConnectedDataMapper />;
	});
