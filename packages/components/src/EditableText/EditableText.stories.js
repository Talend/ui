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

export const WithoutValue = () => {
	const propWithoutText = { ...props, text: '' };
	return (
		<div style={{ width: 150 }}>
			<EditableText {...propWithoutText} />
		</div>
	);
};

export const WithEllipsis = () => (
	<div style={{ width: '150px' }}>
		<EditableText {...props} />
	</div>
);

export const Loading = () => <EditableText loading {...props} />;

export const Disabled = () => <EditableText disabled {...props} />;

export const InProgress = () => <EditableText inProgress {...props} />;

export const EditMode = () => <EditableText editMode {...props} />;

export const NotRequired = () => <EditableText required={false} editMode {...props} />;

export const Placeholder = () => (
	<EditableText editMode placeholder="Enter your text here.." {...props} text="" />
);

export const WithError = () => (
	<EditableText editMode {...props} text="" errorMessage="custom error message" />
);
