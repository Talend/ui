import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { EditableText, IconsProvider } from '../src/index';

const props = {
	text: 'Lorem ipsum dolor sit amet',
	onEdit: action('onEdit'),
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
	onCancel: action('onCancel'),
};

storiesOf('EditableText', module)
	.addDecorator(story => (
		<div>
			<IconsProvider />
			<h1>EditableText</h1>
			{story()}
		</div>
	))
	.add('default', () => <EditableText {...props} />)
	.add('loading', () => <EditableText loading {...props} />)
	.add('disabled', () => <EditableText disabled {...props} />)
	.add('in progress', () => <EditableText inProgress {...props} />)
	.add('edit mode', () => <EditableText editMode {...props} />);
