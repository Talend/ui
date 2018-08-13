import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { EditableText, IconsProvider } from '../src/index';

const props = {
	text: 'Lorem ipsum dolor sit amet',
	onEdit: action('onEdit'),
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
	onCancel: action('onCancel'),
};

storiesOf('EditableText', module)
	.addDecorator(checkA11y)
	.addDecorator(story => (
		<div>
			<IconsProvider />
			<h1>EditableText</h1>
			{story()}
		</div>
	))
	.addWithInfo('default', () => <EditableText {...props} />)
	.addWithInfo('loading', () => <EditableText loading {...props} />)
	.addWithInfo('disabled', () => <EditableText disabled {...props} />)
	.addWithInfo('in progress', () => <EditableText inProgress {...props} />)
	.addWithInfo('edit mode', () => <EditableText editMode {...props} />);
