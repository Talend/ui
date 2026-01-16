import type { Meta, StoryObj } from '@storybook/react';
import EditableText from './EditableText.component';

const props = {
	text: 'Lorem ipsum dolor sit amet',
	onEdit: () => console.log('onEdit'),
	onSubmit: () => console.log('onSubmit'),
	onChange: () => console.log('onChange'),
	onCancel: () => console.log('onCancel'),
};

type Story = StoryObj<typeof EditableText>;

const meta: Meta<typeof EditableText> = {
	title: 'Components/Form - Inline form/EditableText',
	component: EditableText,
	tags: ['autodocs'],
	decorators: [
		story => (
			<div>
				<h1>EditableText</h1>
				{story()}
			</div>
		),
	],
};

export default meta;

export const Default: Story = {
	render: () => <EditableText {...props} />,
};

export const WithoutValue: Story = {
	render: () => {
		const propWithoutText = { ...props, text: '' };
		return (
			<div style={{ width: 150 }}>
				<EditableText {...propWithoutText} />
			</div>
		);
	},
};

export const WithEllipsis: Story = {
	render: () => (
		<div style={{ width: '150px' }}>
			<EditableText {...props} />
		</div>
	),
};

export const Loading: Story = {
	render: () => <EditableText loading {...props} />,
};

export const Disabled: Story = {
	render: () => <EditableText disabled {...props} />,
};

export const InProgress: Story = {
	render: () => <EditableText inProgress {...props} />,
};

export const EditMode: Story = {
	render: () => <EditableText editMode {...props} />,
};

export const NotRequired: Story = {
	render: () => <EditableText required={false} editMode {...props} />,
};

export const Placeholder: Story = {
	render: () => <EditableText editMode placeholder="Enter your text here.." {...props} text="" />,
};

export const WithError: Story = {
	render: () => <EditableText editMode {...props} text="" errorMessage="custom error message" />,
};
