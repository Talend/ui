import React from 'react';
import { storiesOf } from '@storybook/react';
import { DataMapper as Mapper } from '../src/index';
import { SchemaType } from '../src/DataMapper/Constants';

/*
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
    'company'
  ]
}
*/

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
    'favorite_writer'
  ]
}

/*
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
    'code'
  ]
}
*/

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
    'favorite_writer'
  ]
}

const emptyMapping = [];

/*
const initialMapping = [
	{
		source: 'lastname',
		target: 'name'
	},
	{
		source: 'city',
		target: 'city'
	},
	{
		source: 'zip',
		target: 'code'
	}
];
*/

function getInitialState() {
	return {
		mapping: emptyMapping,
		selection: null,
	};
}

function isSelected(selection, element, type) {
	return selection != null && selection.element === element && selection.type === type;
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

function isSelectionEmpty(selection) {
	const result = selection == null || selection.element == null || selection.type == null;
	return result;
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
						inputSchema={inputSchema2}
						mapping={this.state.mapping}
						outputSchema={outputSchema2}
						performMapping={this.performMapping}
						clearMapping={this.clearMapping}
						clearConnection={this.clearConnection}
						draggable="true"
						selection={this.state.selection}
						onSelect={this.selectElement}
					/>
				);
			}
		}

		return <ConnectedDataMapper />;
	});
