import type { Meta, StoryObj } from '@storybook/react';

import { Dialog, Drawer as DrawerComponent, HeaderBar, Layout } from '@talend/react-components';

import Form from '../src';
import { argTypes } from './argTypes';
import { displayModeSchema } from './UIFormStoriesSchemas/displayMode.schema';

const simple = require('./json/concepts/simple.json');

const meta: Meta<typeof Form> = {
	title: 'Forms/Schema/Layout',
	component: Form,
	argTypes,
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
		<DrawerComponent key="first" stacked={stacked}>
			<Form {...props} />
		</DrawerComponent>,
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
	render: props => (
		<div>
			<h1>Form by default take 100% width of the container</h1>
			<Form {...props} />
		</div>
	),
};
Default.args = {
	data: simple,
};

export const Drawer: Story = {
	args: {
		title: 'UIForm in a drawer',
		data: simple,
	},
	render: ({ title, ...props }) => <LayoutDrawer title={title} {...props} />,
};
Drawer.args = {
	data: simple,
};

export const DrawerButtonsToBottom: Story = {
	args: {
		title: 'UIForm in a drawer',
		data: simple,
	},
	render: ({ title, ...props }) => <LayoutDrawer title={title} {...props} />,
};
DrawerButtonsToBottom.args = {
	data: simple,
	anchorButtonsToFooter: true,
};

export const DrawerTextMode: Story = {
	args: {
		title: 'UIForm in a drawer',
		data: displayModeSchema,
		displayMode: 'text',
	},
	render: ({ title, ...props }) => <LayoutDrawer title={title} {...props} />,
};
DrawerTextMode.args = {
	data: displayModeSchema,
	displayMode: 'text',
};

export const DrawerStacked: Story = {
	args: {
		title: 'UIForm in a drawer',
		data: simple,
		stacked: true,
	},
	render: ({ title, stacked, ...props }) => (
		<LayoutDrawer title={title} {...props} stacked={stacked} />
	),
};

export const Modal: Story = {
	args: {
		data: simple,
	},
	render: props => (
		<Dialog header="UIForm in a Modal" flex show>
			<Form {...props} />
		</Dialog>
	),
};

export const Skeleton: Story = {
	args: {
		loading: true,
		data: simple, // in case the user switch to loading: false
	},
};

export const NoButton: Story = {
	args: {
		loading: true,
		actions: [],
		data: simple, // in case the user switch to loading: false
	},
};

export const SkeletonDrawer: Story = {
	args: {
		loading: true,
		title: 'Form in loading in drawer',
		data: simple, // in case the user switch to loading: false
	},
	render: ({ title, ...props }) => <LayoutDrawer {...props} title={title} />,
};

export const SkeletonDrawerStacked: Story = {
	args: {
		loading: true,
		data: simple, // in case the user switch to loading: false
		title: 'Form in loading in drawer',
		stacked: true,
	},
	render: ({ title, stacked, ...props }) => (
		<LayoutDrawer {...props} title={title} stacked={stacked} />
	),
};
