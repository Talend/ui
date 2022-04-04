import React from 'react';
import { Story } from '@storybook/react';

import InlineEditing from '.';
import InlineMessage from '../InlineMessage';

export default {
	component: InlineEditing,
};

export const Text = {
	render: (props: Story) => (
		<InlineEditing.Text ariaLabel="Edit the value" defaultValue="Lorem Ipsum" {...props} />
	),
};
export const EmptyTextWithPlaceholder = {
	render: (props: Story) => (
		<InlineEditing.Text ariaLabel="Edit the value" placeholder="This is a placeholder" {...props} />
	),
};
export const Textarea = {
	render: (props: Story) => (
		<InlineEditing.Textarea
			ariaLabel="Edit the value"
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in massa velit. Duis vestibulum lectus id lacinia aliquam. Aliquam erat volutpat. Donec dignissim augue eu eros blandit faucibus eu quis nulla. In hac habitasse platea dictumst. Ut egestas viverra sem, et dictum elit lacinia interdum. Vivamus accumsan pulvinar faucibus. Donec vestibulum mauris vitae sem lacinia, eget fringilla leo efficitur. In hac habitasse platea dictumst. Nullam consectetur nunc quis tortor congue imperdiet. Ut lobortis suscipit enim, in aliquet sem viverra ut. Sed finibus ex elit, quis ultricies nulla tincidunt sit amet. Maecenas gravida diam ex, vel aliquam tortor elementum et. Duis vitae ligula tristique est iaculis consequat. Nullam in ipsum turpis. Cras aliquam tellus quis turpis convallis, ut faucibus quam tincidunt."
			{...props}
		/>
	),
};
export const Default = {
	render: (props: Story) => (
		<InlineEditing
			ariaLabel="Edit the value"
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet"
			{...props}
		/>
	),
};
export const WithEllipsis = {
	render: (props: Story) => (
		<InlineEditing.Text
			ariaLabel="Edit the value"
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla augue, fermentum ac scelerisque quis, aliquet et arcu. Nullam quis sem pulvinar, venenatis nunc vel, lobortis libero"
			{...props}
		/>
	),
};
export const WithTextarea = {
	render: (props: Story) => (
		<InlineEditing.Textarea
			ariaLabel="Edit the value"
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet"
			{...props}
		/>
	),
};
export const LongTextInTextarea = {
	render: (props: Story) => (
		<InlineEditing.Textarea
			ariaLabel="Edit the value"
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla augue, fermentum ac scelerisque quis, aliquet et arcu. Nullam quis sem pulvinar, venenatis nunc vel, lobortis libero"
			placeholder="Enter a description"
			{...props}
		/>
	),
};
export const AsHeading = {
	render: (props: Story) => (
		<InlineEditing.Text
			ariaLabel="Edit the value"
			label="AS H3 Crawler name"
			defaultValue="Lorem ipsum dolor sit amet"
			placeholder="This is a placeholder"
			renderValueAs="h3"
			{...props}
		/>
	),
};
export const LoadingMode = {
	render: (props: Story) => (
		<InlineEditing.Text
			ariaLabel="Edit the value"
			label="Crawler name"
			defaultValue="Lorem ipsum dolor sit amet"
			loading
			{...props}
		/>
	),
};

export const InUse = {
	render: (props: Story) => {
		const [data, setData] = React.useState('this is a default value');
		const [error, setError] = React.useState(false);
		const [loading, setLoading] = React.useState(false);
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
					ariaLabel="Edit the value"
					label="Crawler name"
					loading={loading}
					defaultValue={data}
					hasError={error}
					onEdit={onEdit}
					onCancel={onCancel}
					aria-describedby="inlinemessage-id"
					{...props}
				/>
				{error && (
					<InlineMessage.Destructive
						id="inlinemessage-id"
						title="Oops"
						description="An error occured"
						withBackground
					/>
				)}
			</>
		);
	},
};
