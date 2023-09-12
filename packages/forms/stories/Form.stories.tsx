import type { Meta, StoryObj } from '@storybook/react';

import { HeaderBar, Layout, Dialog, Drawer as DrawerComponent } from '@talend/react-components';
import Form from '../src';

const simple = require('./json/concepts/simple.json');

const meta: Meta<typeof Form> = {
	title: 'Forms/Form',
	component: Form,
	parameters: {
		centeredLayout: true,
	},
};

export default meta;

interface LayoutDrawerProps {
	title: string;
	stacked?: boolean;
	[x: string]: unknown;
}
const LayoutDrawer = ({ title, stacked = false, ...props }: LayoutDrawerProps) => {
	const drawers = [
		<DrawerComponent.Container key="first" stacked={stacked}>
			<Form {...props} />
		</DrawerComponent.Container>,
	];
	return (
		<Layout drawers={drawers} mode="TwoColumns" header={<HeaderBar />}>
			<div style={{ margin: 10 }}>
				<h1>{title}</h1>
				<p>To use a UIForm in a drawer you just have to create your component this way:</p>
				<code>{'<Drawer.Container><UIForm {...props} /></Drawer.Container>'}</code>
			</div>
		</Layout>
	);
};

type Story = StoryObj<typeof Form>;

export const Default: Story = {
	render: () => (
		<div>
			<h1>Form by default take 100% width of the container</h1>
			<Form data={simple} />
		</div>
	),
};

export const Drawer: Story = {
	args: {
		title: 'UIForm in a drawer',
		data: simple,
	},
	render: ({ title, data }) => <LayoutDrawer title={title} data={data} />,
};

export const DrawerStacked: Story = {
	args: {
		title: 'UIForm in a drawer',
		data: simple,
		stacked: true,
	},
	render: ({ title, data, stacked }) => (
		<LayoutDrawer title={title} data={data} stacked={stacked} />
	),
};

export const Modal: Story = {
	args: {
		data: simple,
	},
	render: ({ data }) => (
		<Dialog header="UIForm in a Modal" flex show>
			<Form data={data} />
		</Dialog>
	),
};

export const Skeleton: Story = {
	args: {
		loading: true,
	},
};

export const NoButton: Story = {
	args: {
		loading: true,
		actions: [],
	},
};

export const SkeletonDrawer: Story = {
	args: {
		loading: true,
		title: 'Form in loading in drawer',
	},
	render: ({ loading, title }) => <LayoutDrawer loading={loading} title={title} />,
};

export const SkeletonDrawerStacked: Story = {
	args: {
		loading: true,
		title: 'Form in loading in drawer',
		stacked: true,
	},
	render: ({ loading, title, stacked }) => (
		<LayoutDrawer loading={loading} title={title} stacked={stacked} />
	),
};
