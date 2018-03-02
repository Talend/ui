import React from 'react';
import { storiesOf } from '@storybook/react';
import { DataMapper as Mapper } from '../src/index';
import { SchemaType, Navigation, switchSchemaType, Configs } from '../src/DataMapper/Constants';
import { inputSchema2, outputSchema2, emptyMapping } from '../src/DataMapper/Data';
import { isSelected, isSelectionEmpty, getSchema } from '../src/DataMapper/Utils';

function getInitialState() {
	return {
    inputSchema: inputSchema2,
    outputSchema: outputSchema2,
		mapping: emptyMapping,
		selection: null,
	};
}

function getMappingItem(mapping, element, type) {
	if (type === SchemaType.INPUT) {
		return mapping.find(item => item.source === element);
	}
	return mapping.find(item => item.target === element);
}

function getConnected(mapping, element, type) {
	const item = getMappingItem(mapping, element, type);
	if (item != null) {
		if (type === SchemaType.INPUT) {
			return item.target;
		}
		return item.source;
	}
	return null;
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

function removeConnection(mapping, selection) {
	if (isSelectionEmpty(selection)) {
		return mapping;
	}
	const index = mapping.findIndex(item =>
		(selection.type === SchemaType.INPUT && item.source === selection.element)
		|| (selection.type === SchemaType.OUTPUT && item.target === selection.element)
	);
	if (index >= 0) {
		// remove Item
		const updatedMapping = mapping.slice();
		updatedMapping.splice(index, 1);
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
  if (selection.connected != null) {
    return {
			element: selection.connected,
			connected: selection.element,
			type: switchSchemaType(selection.type),
  	};
  }
  // try to find an element with the same name
  const targetType = switchSchemaType(selection.type);
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
						connected: target,
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
					mapping: removeConnection(prevState.mapping, prevState.selection),
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
					/>
				);
			}
		}

		return <ConnectedDataMapper />;
	});
