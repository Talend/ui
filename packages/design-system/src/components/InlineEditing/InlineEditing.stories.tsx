import React from 'react';
import InlineEditing from '.';
import InlineMessage from '../InlineMessage';

export default {
	component: InlineEditing,
};

export const Text = () => <InlineEditing.Text defaultValue="Lorem Ipsum" />;
export const EmptyTextWithPlaceholder = () => (
	<InlineEditing.Text placeholder="This is a placeholder" />
);
export const Textarea = () => (
	<InlineEditing.Textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in massa velit. Duis vestibulum lectus id lacinia aliquam. Aliquam erat volutpat. Donec dignissim augue eu eros blandit faucibus eu quis nulla. In hac habitasse platea dictumst. Ut egestas viverra sem, et dictum elit lacinia interdum. Vivamus accumsan pulvinar faucibus. Donec vestibulum mauris vitae sem lacinia, eget fringilla leo efficitur. In hac habitasse platea dictumst. Nullam consectetur nunc quis tortor congue imperdiet. Ut lobortis suscipit enim, in aliquet sem viverra ut. Sed finibus ex elit, quis ultricies nulla tincidunt sit amet. Maecenas gravida diam ex, vel aliquam tortor elementum et. Duis vitae ligula tristique est iaculis consequat. Nullam in ipsum turpis. Cras aliquam tellus quis turpis convallis, ut faucibus quam tincidunt." />
);
export const Default = () => (
	<InlineEditing label="Crawler name" defaultValue="Lorem ipsum dolor sit amet" />
);
export const WithEllipsis = () => (
	<InlineEditing.Text
		label="Crawler name"
		defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla augue, fermentum ac scelerisque quis, aliquet et arcu. Nullam quis sem pulvinar, venenatis nunc vel, lobortis libero"
	/>
);
export const WithTextarea = () => (
	<InlineEditing.Textarea label="Crawler name" defaultValue="Lorem ipsum dolor sit amet" />
);
export const LongTextInTextarea = () => (
	<InlineEditing.Textarea
		label="Crawler name"
		defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla augue, fermentum ac scelerisque quis, aliquet et arcu. Nullam quis sem pulvinar, venenatis nunc vel, lobortis libero"
	/>
);
export const AsHeading = () => (
	<InlineEditing.Text
		label="AS H3 Crawler name"
		defaultValue="Lorem ipsum dolor sit amet"
		renderValueAs="h3"
	/>
);
export const LoadingMode = () => (
	<InlineEditing.Text label="Crawler name" defaultValue="Lorem ipsum dolor sit amet" loading />
);

export const InUse = () => {
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
				label="Crawler name"
				loading={loading}
				defaultValue={data}
				hasError={error}
				onEdit={onEdit}
				onCancel={onCancel}
				aria-describedby="inlinemessage-id"
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
};
