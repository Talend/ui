import React from 'react';
import PropTypes from 'prop-types';
import { HeaderBar, Layout, Dialog, Drawer } from '@talend/react-components';
import { action } from '@storybook/addon-actions';

import Form from '../src/index';

const simple = require('./json/concepts/core-simple.json');
const old = require('../stories/json/simple.json');

const actions = [
	{
		name: 'cancel',
		style: 'link',
		onClick: action('CANCEL'),
		type: 'button',
		label: 'CANCEL',
	},
	{
		style: 'primary',
		type: 'submit',
		label: 'SUBMIT',
		disabled: true,
		'data-feature': 'form.feature',
		onClick: action('SUBMIT'),
	},
];

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
				<p>To use a Form in a drawer you just have to create your component this way:</p>
				<code>{'<Drawer.Container><Form {...props} /></Drawer.Container>'}</code>
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
	},
	{ name: 'drawer', story: () => <LayoutDrawer title="Form in a drawer" data={simple} /> },
	{
		name: 'drawer-stacked',
		story: () => <LayoutDrawer title="Form in a drawer" data={simple} stacked />,
	},
	{
		name: 'modal',
		story: () => (
			<Dialog header="Form in a Modal" flex show>
				<Form data={simple} />
			</Dialog>
		),
	},
	{
		name: 'skeleton',
		story: () => <Form loading />,
	},
	{
		name: 'skeleton-drawer',
		story: () => <LayoutDrawer loading title="Form in loading in drawer" />,
	},
	{
		name: 'skeleton-srawer-stacked',
		story: () => <LayoutDrawer loading title="Form in loading in drawer" stacked />,
	},
	{
		name: 'default-old',
		story: () => (
			<div>
				<h1>Form (old) by default take 100% with of the container</h1>
				<Form data={old} />
			</div>
		),
	},
	{ name: 'drawer-old', story: () => <LayoutDrawer title="Form (old) in a drawer" data={old} /> },
	{
		name: 'drawer-stacked-old',
		story: () => <LayoutDrawer title="Form (old) in a drawer" data={old} actions={actions} stacked />,
	},
	{
		name: 'modal-old',
		story: () => (
			<Dialog header="Form (old) in a Modal" flex show>
				<Form data={simple} />
			</Dialog>
		),
	},
];
