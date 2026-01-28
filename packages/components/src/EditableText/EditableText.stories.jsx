import EditableText from './EditableText.component';

const props = {
	text: 'Lorem ipsum dolor sit amet',
	onEdit: () => console.log('onEdit'),
	onSubmit: () => console.log('onSubmit'),
	onChange: () => console.log('onChange'),
	onCancel: () => console.log('onCancel'),
};

const meta = {
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

export const Default = {
	render: () => <EditableText {...props} />,
};

export const WithoutValue = {
	render: () => {
		const propWithoutText = { ...props, text: '' };
		return (
			<div style={{ width: 150 }}>
				<EditableText {...propWithoutText} />
			</div>
		);
	},
};

export const WithEllipsis = {
	render: () => (
		<div style={{ width: '150px' }}>
			<EditableText {...props} />
		</div>
	),
};

export const Loading = {
	render: () => <EditableText loading {...props} />,
};

export const Disabled = {
	render: () => <EditableText disabled {...props} />,
};

export const InProgress = {
	render: () => <EditableText inProgress {...props} />,
};

export const EditMode = {
	render: () => <EditableText editMode {...props} />,
};

export const NotRequired = {
	render: () => <EditableText required={false} editMode {...props} />,
};

export const Placeholder = {
	render: () => <EditableText editMode placeholder="Enter your text here.." {...props} text="" />,
};

export const WithError = {
	render: () => <EditableText editMode {...props} text="" errorMessage="custom error message" />,
};
