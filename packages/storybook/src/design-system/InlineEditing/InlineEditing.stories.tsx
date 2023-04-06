import { useState } from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { InlineEditing } from '@talend/design-system';

export default {
	component: InlineEditing,
};

export const Text = {
	render: (props: Story) => (
		<InlineEditing.Text
			label="Edit the value"
			placeholder="What is your Lorem Ipsum?"
			defaultValue="Lorem Ipsum"
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};
export const EmptyTextWithPlaceholder = {
	render: (props: Story) => (
		<InlineEditing.Text
			label="Edit the value"
			placeholder="This is a placeholder"
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};
export const Textarea = {
	render: (props: Story) => (
		<InlineEditing.Textarea
			label="Edit the value"
			placeholder="What is your Lorem Ipsum?"
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in massa velit. Duis vestibulum lectus id lacinia aliquam. Aliquam erat volutpat. Donec dignissim augue eu eros blandit faucibus eu quis nulla. In hac habitasse platea dictumst. Ut egestas viverra sem, et dictum elit lacinia interdum. Vivamus accumsan pulvinar faucibus. Donec vestibulum mauris vitae sem lacinia, eget fringilla leo efficitur. In hac habitasse platea dictumst. Nullam consectetur nunc quis tortor congue imperdiet. Ut lobortis suscipit enim, in aliquet sem viverra ut. Sed finibus ex elit, quis ultricies nulla tincidunt sit amet. Maecenas gravida diam ex, vel aliquam tortor elementum et. Duis vitae ligula tristique est iaculis consequat. Nullam in ipsum turpis. Cras aliquam tellus quis turpis convallis, ut faucibus quam tincidunt."
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};
export const Default = {
	render: (props: Story) => (
		<InlineEditing
			label="Edit the value"
			placeholder="What is your Lorem Ipsum?"
			defaultValue="Lorem ipsum dolor sit amet"
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};
export const WithEllipsis = {
	render: (props: Story) => (
		<InlineEditing.Text
			placeholder="Input a crawler name"
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla augue, fermentum ac scelerisque quis, aliquet et arcu. Nullam quis sem pulvinar, venenatis nunc vel, lobortis libero"
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};
export const WithTextarea = {
	render: (props: Story) => (
		<InlineEditing.Textarea
			placeholder="Input a crawler name"
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet"
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};
export const LongTextInTextarea = {
	render: (props: Story) => (
		<InlineEditing.Textarea
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla augue, fermentum ac scelerisque quis, aliquet et arcu. Nullam quis sem pulvinar, venenatis nunc vel, lobortis libero"
			placeholder="Enter a description"
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};
export const AsHeading = {
	render: (props: Story) => (
		<InlineEditing.Text
			placeholder="Input a crawler name"
			label="AS H3 Crawler name"
			defaultValue="Lorem ipsum dolor sit amet"
			renderValueAs="h3"
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};
export const LoadingMode = {
	render: (props: Story) => (
		<InlineEditing.Text
			placeholder="Input a crawler name"
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet"
			loading
			onEdit={action('onEdit')}
			{...props}
		/>
	),
};

export const InUse = (props: Story) => {
	const [data, setData] = useState('this is a default value');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const onCancel = () => {
		setError(false);
	};
	const onEdit = () => {
		setError(false);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setData(data);
			setError(true);
		}, 2000);
	};

	return (
		<>
			<InlineEditing.Text
				placeholder="Input a crawler name"
				label="Crawler name"
				loading={loading}
				defaultValue={data}
				hasError={error}
				onToggle={action('onToggle')}
				onEdit={onEdit}
				onCancel={onCancel}
				aria-describedby="inlinemessage-id"
				description={error ? 'An error occurred' : undefined}
				{...props}
			/>
		</>
	);
};
