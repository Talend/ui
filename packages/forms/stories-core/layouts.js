import React from 'react';
import PropTypes from 'prop-types';
import { HeaderBar, Layout, Dialog, Drawer } from '@talend/react-components';
import Form from '../src/index';

const simple = require('./json/concepts/core-simple.json');

function LayoutDrawer({ title, stacked, ...props }) {
	const drawers = [
		<Drawer.Container stacked={stacked}>
			<Form {...props} />
		</Drawer.Container>,
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
}
LayoutDrawer.propTypes = {
	title: PropTypes.string,
	stacked: PropTypes.bool,
};

export default [
	{
		name: 'default',
		story: () => (
			<div>
				<h1>Form by default take 100% with of the container</h1>
				<Form data={simple} />
			</div>
		),
		options: { layout: false },
	},
	{
		name: 'drawer',
		story: () => <LayoutDrawer title="UIForm in a drawer" data={simple} />,
		options: { layout: false },
	},
	{
		name: 'drawer-stacked',
		story: () => <LayoutDrawer title="UIForm in a drawer" data={simple} stacked />,
		options: { layout: false },
	},
	{
		name: 'modal',
		story: () => (
			<Dialog header="UIForm in a Modal" flex show>
				<Form data={simple} />
			</Dialog>
		),
		options: { layout: false },
	},
	{
		name: 'skeleton',
		story: () => <Form loading />,
		options: { layout: false },
	},
	{
		name: 'skeleton-drawer',
		story: () => <LayoutDrawer loading title="Form in loading in drawer" />,
		options: { layout: false },
	},
	{
		name: 'skeleton-srawer-stacked',
		story: () => <LayoutDrawer loading title="Form in loading in drawer" stacked />,
		options: { layout: false },
	},
];
