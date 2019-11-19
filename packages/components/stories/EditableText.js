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
	.add('without value', () => {
		const propWithoutText = { ...props, text: '' };
		return (
			<div style={{ width: 150 }}>
				<EditableText {...propWithoutText} />
			</div>
		);
	})
	.add('with ellipsis', () => (
		<div style={{ width: '150px' }}>
			<EditableText {...props} />
		</div>
	))
	.add('loading', () => <EditableText loading {...props} />)
	.add('disabled', () => <EditableText disabled {...props} />)
	.add('in progress', () => <EditableText inProgress {...props} />)
	.add('edit mode', () => <EditableText editMode {...props} />)
	.add('not required', () => <EditableText required={false} editMode {...props} />)
	.add('placeholder', () => (
		<EditableText editMode placeholder="Enter your text here.." {...props} text="" />
	))
	.add('with error', () => (
		<EditableText editMode {...props} text="" errorMessage="custom error message" />
	));
