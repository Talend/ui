import React from 'react';
import { action } from '@storybook/addon-actions';
import EditableText from './EditableText.component';

const props = {
	text: 'Lorem ipsum dolor sit amet',
	onEdit: action('onEdit'),
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
	onCancel: action('onCancel'),
};

export default {
	title: 'Form/Inline form/EditableText',

	decorators: [
		story => (
			<div>
				<h1>EditableText</h1>
				{story()}
			</div>
		),
	],
};

export const Default = () => <EditableText {...props} />;

Default.story = {
	name: 'default',
};

export const WithoutValue = () => {
	const propWithoutText = { ...props, text: '' };
	return (
		<div style={{ width: 150 }}>
			<EditableText {...propWithoutText} />
		</div>
	);
};

WithoutValue.story = {
	name: 'without value',
};

export const WithEllipsis = () => (
	<div style={{ width: '150px' }}>
		<EditableText {...props} />
	</div>
);

WithEllipsis.story = {
	name: 'with ellipsis',
};

export const Loading = () => <EditableText loading {...props} />;

Loading.story = {
	name: 'loading',
};

export const Disabled = () => <EditableText disabled {...props} />;

Disabled.story = {
	name: 'disabled',
};

export const InProgress = () => <EditableText inProgress {...props} />;

InProgress.story = {
	name: 'in progress',
};

export const EditMode = () => <EditableText editMode {...props} />;

EditMode.story = {
	name: 'edit mode',
};

export const NotRequired = () => <EditableText required={false} editMode {...props} />;

NotRequired.story = {
	name: 'not required',
};

export const Placeholder = () => (
	<EditableText editMode placeholder="Enter your text here.." {...props} text="" />
);

Placeholder.story = {
	name: 'placeholder',
};

export const WithError = () => (
	<EditableText editMode {...props} text="" errorMessage="custom error message" />
);

WithError.story = {
	name: 'with error',
};
